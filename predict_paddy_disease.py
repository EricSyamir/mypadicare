#!/usr/bin/env python3
"""
Paddy Disease Prediction Script
Uses the trained model from results folder to predict paddy diseases
"""

import os
# Suppress TensorFlow logging BEFORE importing TensorFlow
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress all TF logs
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'  # Disable oneDNN messages

import numpy as np
import tensorflow as tf
from tensorflow import keras
from PIL import Image
import json
import argparse
import sys

class PaddyDiseasePredictor:
    def __init__(self, model_path="results/model.hdf5"):
        """
        Initialize the paddy disease predictor
        
        Args:
            model_path (str): Path to the trained model file or directory
        """
        self.model_path = model_path
        self.model = None
        self.input_size = 256  # Model expects 256x256 input
        
        # Disease class names (matches training order)
        self.class_names = [
            'bacterial_leaf_blight',
            'bacterial_leaf_streak', 
            'bacterial_panicle_blight',
            'blast',
            'brown_spot',
            'dead_heart',
            'downy_mildew',
            'hispa',
            'normal',
            'tungro'
        ]
        
        # Health status mapping
        self.health_status = {
            'normal': 'healthy',
            'bacterial_leaf_blight': 'diseased',
            'bacterial_leaf_streak': 'diseased',
            'bacterial_panicle_blight': 'diseased',
            'blast': 'diseased',
            'brown_spot': 'diseased',
            'dead_heart': 'diseased',
            'downy_mildew': 'diseased',
            'hispa': 'diseased',
            'tungro': 'diseased'
        }
        
    def load_model(self):
        """Load the trained model"""
        try:
            # Loading model (quiet mode for PHP integration)
            
            if not os.path.exists(self.model_path):
                raise FileNotFoundError(f"Model file not found: {self.model_path}")
            
            # Load the model (try different formats)
            if os.path.isdir(self.model_path):
                # Try SavedModel format with TFSMLayer for Keras 3
                try:
                    self.model = tf.keras.layers.TFSMLayer(self.model_path, call_endpoint='serving_default')
                    print("Loaded as TFSMLayer (inference-only)")
                    # Wrap in a simple model for consistent interface
                    inputs = tf.keras.Input(shape=(self.input_size, self.input_size, 3))
                    outputs = self.model(inputs)
                    self.model = tf.keras.Model(inputs=inputs, outputs=outputs)
                except Exception as e:
                    print(f"TFSMLayer failed: {e}")
                    # Fallback to direct TensorFlow loading
                    import tensorflow.saved_model as saved_model
                    self.model = saved_model.load(self.model_path)
                    print("Loaded as TensorFlow SavedModel")
            else:
                # HDF5 format
                self.model = tf.keras.models.load_model(self.model_path, compile=False)
            
            # Model loaded successfully (quiet mode for PHP integration)
            
            return True
            
        except Exception as e:
            print(f"Error loading model: {e}")
            return False
    
    def preprocess_image(self, image_path):
        """
        Preprocess image for model prediction
        
        Args:
            image_path (str): Path to the image file
            
        Returns:
            np.ndarray: Preprocessed image tensor
        """
        try:
            # Load and convert image
            image = Image.open(image_path)
            
            # Convert to RGB if needed
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Resize to model input size
            image = image.resize((self.input_size, self.input_size))
            
            # Convert to numpy array
            image_array = np.array(image)
            
            # Normalize pixel values to [0, 1]
            image_array = image_array.astype(np.float32) / 255.0
            
            # Add batch dimension
            image_batch = np.expand_dims(image_array, axis=0)
            
            return image_batch
            
        except Exception as e:
            print(f"Error preprocessing image: {e}")
            return None
    
    def predict(self, image_path, top_k=3):
        """
        Predict paddy disease from image
        
        Args:
            image_path (str): Path to the image file
            top_k (int): Number of top predictions to return
            
        Returns:
            dict: Prediction results
        """
        if self.model is None:
            print("Model not loaded. Call load_model() first.")
            return None
        
        try:
            # Analyzing image (quiet mode for PHP integration)
            
            # Preprocess image
            image_batch = self.preprocess_image(image_path)
            if image_batch is None:
                return None
            
            # Make prediction
            predictions = self.model.predict(image_batch, verbose=0)
            prediction_probs = predictions[0]  # Remove batch dimension
            
            # Get top predictions
            top_indices = np.argsort(prediction_probs)[::-1][:top_k]
            
            results = {
                'image_path': image_path,
                'predictions': [],
                'top_prediction': None,
                'health_status': None,
                'confidence': None
            }
            
            # Process predictions
            for i, idx in enumerate(top_indices):
                disease_name = self.class_names[idx]
                confidence = float(prediction_probs[idx])
                
                prediction = {
                    'rank': i + 1,
                    'disease': disease_name,
                    'confidence': confidence,
                    'percentage': confidence * 100,
                    'health_status': self.health_status[disease_name]
                }
                
                results['predictions'].append(prediction)
                
                # Set top prediction
                if i == 0:
                    results['top_prediction'] = disease_name
                    results['health_status'] = self.health_status[disease_name]
                    results['confidence'] = confidence
            
            return results
            
        except Exception as e:
            print(f"Error during prediction: {e}")
            return None
    
    def print_results(self, results):
        """Print prediction results in a formatted way"""
        if results is None:
            return
        
        print("\n" + "="*60)
        print("PADDY DISEASE PREDICTION RESULTS")
        print("="*60)
        
        print(f"Image: {os.path.basename(results['image_path'])}")
        print(f"Health Status: {results['health_status'].upper()}")
        print(f"Top Prediction: {results['top_prediction']}")
        print(f"Confidence: {results['confidence']:.2%}")
        
        print("\nTop Predictions:")
        print("-" * 50)
        
        for pred in results['predictions']:
            status_icon = "[HEALTHY]" if pred['health_status'] == 'healthy' else "[DISEASED]"
            print(f"{pred['rank']}. {status_icon} {pred['disease']}")
            print(f"   Confidence: {pred['confidence']:.2%} ({pred['percentage']:.1f}%)")
            print()
        
        # Add interpretation
        confidence = results['confidence']
        if confidence >= 0.85:
            confidence_level = "Very High"
        elif confidence >= 0.70:
            confidence_level = "High"
        elif confidence >= 0.50:
            confidence_level = "Moderate"
        else:
            confidence_level = "Low"
        
        print(f"Confidence Level: {confidence_level}")
        
        if results['health_status'] == 'diseased':
            print("\n[WARNING] Disease detected! Consider consulting agricultural experts.")
        else:
            print("\n[OK] Plant appears healthy!")
    
    def predict_batch(self, image_folder, output_file=None):
        """
        Predict diseases for all images in a folder
        
        Args:
            image_folder (str): Path to folder containing images
            output_file (str): Optional path to save results as JSON
        """
        if not os.path.exists(image_folder):
            print(f"Folder not found: {image_folder}")
            return
        
        # Get all image files
        image_extensions = ('.jpg', '.jpeg', '.png', '.bmp', '.tiff')
        image_files = [f for f in os.listdir(image_folder) 
                      if f.lower().endswith(image_extensions)]
        
        if not image_files:
            print(f"No image files found in: {image_folder}")
            return
        
        print(f"Found {len(image_files)} images to process...")
        
        batch_results = []
        
        for i, filename in enumerate(image_files, 1):
            image_path = os.path.join(image_folder, filename)
            print(f"\nProcessing {i}/{len(image_files)}: {filename}")
            
            results = self.predict(image_path)
            if results:
                batch_results.append(results)
                print(f"Result: {results['top_prediction']} ({results['confidence']:.2%})")
        
        # Save results if requested
        if output_file and batch_results:
            try:
                with open(output_file, 'w') as f:
                    json.dump(batch_results, f, indent=2)
                print(f"\nResults saved to: {output_file}")
            except Exception as e:
                print(f"Error saving results: {e}")
        
        # Print summary
        print(f"\n{'='*60}")
        print("BATCH PREDICTION SUMMARY")
        print(f"{'='*60}")
        print(f"Total images processed: {len(batch_results)}")
        
        if batch_results:
            # Count by disease
            disease_counts = {}
            healthy_count = 0
            diseased_count = 0
            
            for result in batch_results:
                disease = result['top_prediction']
                disease_counts[disease] = disease_counts.get(disease, 0) + 1
                
                if result['health_status'] == 'healthy':
                    healthy_count += 1
                else:
                    diseased_count += 1
            
            print(f"Healthy plants: {healthy_count}")
            print(f"Diseased plants: {diseased_count}")
            print("\nDisease breakdown:")
            for disease, count in sorted(disease_counts.items()):
                print(f"  {disease}: {count}")


def main():
    """Main function to run the predictor"""
    parser = argparse.ArgumentParser(description='Predict paddy diseases from images')
    parser.add_argument('input', help='Path to image file or folder')
    parser.add_argument('--model', default='results/saved_model', 
                       help='Path to model file or directory (default: results/saved_model)')
    parser.add_argument('--batch', action='store_true', 
                       help='Process all images in a folder')
    parser.add_argument('--output', help='Output file for batch results (JSON)')
    parser.add_argument('--top-k', type=int, default=3, 
                       help='Number of top predictions to show (default: 3)')
    
    args = parser.parse_args()
    
    # Initialize predictor
    predictor = PaddyDiseasePredictor(args.model)
    
    # Load model
    if not predictor.load_model():
        sys.exit(1)
    
    # Process input
    if args.batch:
        predictor.predict_batch(args.input, args.output)
    else:
        if not os.path.exists(args.input):
            print(f"File not found: {args.input}")
            sys.exit(1)
        
        results = predictor.predict(args.input, args.top_k)
        if results:
            predictor.print_results(results)


if __name__ == "__main__":
    main()

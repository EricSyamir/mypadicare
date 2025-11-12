#!/usr/bin/env python3
"""
Single Image Prediction Script for XAMPP Integration
Outputs JSON result for PHP to consume
"""

import os
import sys
import json

# Suppress TensorFlow logging BEFORE importing TensorFlow
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress all TF logs
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'  # Disable oneDNN messages

# Redirect stderr to suppress any remaining verbose output
import io
import contextlib

from predict_paddy_disease import PaddyDiseasePredictor

def main():
    if len(sys.argv) != 2:
        print(json.dumps({
            'error': 'Usage: python predict_single.py <image_path>',
            'success': False
        }))
        sys.exit(1)
    
    image_path = sys.argv[1]
    
    try:
        # Suppress stderr during model loading to prevent TF messages
        with contextlib.redirect_stderr(io.StringIO()):
            # Initialize predictor - ALWAYS use results/model.hdf5
            model_path = "results/model.hdf5"
            predictor = PaddyDiseasePredictor(model_path)
            
            # Load model (suppress verbose output)
            if not predictor.load_model():
                print(json.dumps({
                    'error': 'Failed to load AI model',
                    'success': False
                }))
                sys.exit(1)
            
            # Make prediction
            results = predictor.predict(image_path, top_k=5)
        
        if results is None:
            print(json.dumps({
                'error': 'Prediction failed',
                'success': False
            }))
            sys.exit(1)
        
        # Format output for PHP
        output = {
            'success': True,
            'health_status': results['health_status'],
            'top_prediction': results['top_prediction'],
            'confidence': results['confidence'],
            'predictions': results['predictions'],
            'image_name': os.path.basename(image_path)
        }
        
        # Output JSON (this is what PHP will capture)
        print(json.dumps(output))
        
    except Exception as e:
        print(json.dumps({
            'error': f'Prediction error: {str(e)}',
            'success': False
        }))
        sys.exit(1)

if __name__ == "__main__":
    main()

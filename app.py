"""
MyPadiCare - Flask API Server
Free hosting compatible version
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import sys
import json
from werkzeug.utils import secure_filename
import subprocess

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# Configuration
UPLOAD_DIR = 'uploads'
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'}
PYTHON_SCRIPT = 'predict_single.py'
MODEL_PATH = 'results/model.hdf5'

# Ensure upload directory exists
os.makedirs(UPLOAD_DIR, exist_ok=True)

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    """Serve the main HTML file"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files"""
    return send_from_directory('.', path)

@app.route('/predict_api.php', methods=['GET', 'POST', 'OPTIONS'])
def predict_api():
    """Main prediction API endpoint (compatible with existing frontend)"""
    
    # Handle OPTIONS preflight
    if request.method == 'OPTIONS':
        return '', 200
    
    # Handle health check
    if request.method == 'GET' and request.args.get('action') == 'health':
        model_exists = os.path.exists(MODEL_PATH)
        python_exists = os.path.exists(PYTHON_SCRIPT)
        treatments_exist = os.path.exists('data/treatments.json')
        
        return jsonify({
            'status': 'healthy',
            'model_loaded': model_exists,
            'model_path': MODEL_PATH,
            'model_size': os.path.getsize(MODEL_PATH) if model_exists else 0,
            'python_script': python_exists,
            'treatments_loaded': treatments_exist,
            'timestamp': __import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })
    
    # Handle POST prediction
    if request.method != 'POST':
        return jsonify({'success': False, 'error': 'Method not allowed'}), 405
    
    # Check if file is present
    if 'image' not in request.files:
        return jsonify({'success': False, 'error': 'No image file provided'}), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({'success': False, 'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({
            'success': False,
            'error': f'Invalid file type. Allowed: {", ".join(ALLOWED_EXTENSIONS)}'
        }), 400
    
    try:
        # Save uploaded file
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_DIR, filename)
        file.save(filepath)
        
        # Check file size
        file_size = os.path.getsize(filepath)
        if file_size > MAX_FILE_SIZE:
            os.remove(filepath)
            return jsonify({
                'success': False,
                'error': f'File too large. Maximum size: {MAX_FILE_SIZE / 1024 / 1024}MB'
            }), 400
        
        # Call Python prediction script
        try:
            result = subprocess.run(
                [sys.executable, PYTHON_SCRIPT, filepath],
                capture_output=True,
                text=True,
                timeout=30,
                cwd=os.path.dirname(os.path.abspath(__file__))
            )
            
            if result.returncode != 0:
                raise Exception(f"Python script error: {result.stderr}")
            
            # Parse JSON response from Python script
            prediction_result = json.loads(result.stdout)
            
            # Clean up uploaded file
            try:
                os.remove(filepath)
            except:
                pass
            
            return jsonify(prediction_result)
            
        except subprocess.TimeoutExpired:
            os.remove(filepath)
            return jsonify({
                'success': False,
                'error': 'Prediction timeout. Please try again.'
            }), 500
        except json.JSONDecodeError:
            os.remove(filepath)
            return jsonify({
                'success': False,
                'error': 'Invalid response from prediction service'
            }), 500
        except Exception as e:
            os.remove(filepath)
            return jsonify({
                'success': False,
                'error': f'Prediction failed: {str(e)}'
            }), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Server error: {str(e)}'
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)


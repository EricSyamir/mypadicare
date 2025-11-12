#!/usr/bin/env python3
"""
Setup script for MyPadiCare XAMPP Integration
Checks dependencies and prepares the system
"""

import subprocess
import sys
import os

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("ERROR: Python 3.8 or higher is required")
        print(f"   Current version: {sys.version}")
        return False
    
    print(f"OK: Python {sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}")
    return True

def install_requirements():
    """Install required Python packages"""
    print("Installing Python packages...")
    try:
        subprocess.check_call([
            sys.executable, "-m", "pip", "install", 
            "tensorflow>=2.13.0", "pillow>=9.0.0", "numpy>=1.21.0"
        ], stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
        print("OK: Python packages installed")
        return True
    except subprocess.CalledProcessError as e:
        print(f"ERROR: Failed to install packages: {e}")
        return False

def check_files():
    """Check if required files exist"""
    required_files = [
        'results/model.hdf5',
        'data/treatments.json',
        'predict_single.py',
        'predict_api.php',
        'index.html'
    ]
    
    missing_files = []
    for file_path in required_files:
        if os.path.exists(file_path):
            print(f"OK: {file_path}")
        else:
            print(f"ERROR: {file_path} - MISSING")
            missing_files.append(file_path)
    
    return len(missing_files) == 0, missing_files

def create_directories():
    """Create necessary directories"""
    directories = ['uploads', 'static/icons']
    
    for directory in directories:
        if not os.path.exists(directory):
            os.makedirs(directory, exist_ok=True)
            print(f"OK: Created directory: {directory}")
        else:
            print(f"OK: Directory exists: {directory}")

def generate_icons():
    """Generate PWA icons"""
    print("Generating PWA icons...")
    try:
        # Check if generate_icons.py exists
        if os.path.exists('generate_icons.py'):
            result = subprocess.run([
                sys.executable, 'generate_icons.py'
            ], capture_output=True, text=True)
            
            if result.returncode == 0:
                print("OK: Icons generated successfully")
                return True
            else:
                print(f"WARNING: Icon generation failed: {result.stderr}")
                print("Icons will need to be created manually")
                return False
        else:
            print("WARNING: generate_icons.py not found, skipping icon generation")
            return False
    except Exception as e:
        print(f"WARNING: Icon generation error: {e}")
        return False

def test_prediction():
    """Test if prediction system works"""
    print("Testing prediction system...")
    
    # Create a test image (1x1 pixel)
    try:
        from PIL import Image
        import numpy as np
        
        # Create a small test image
        test_image = Image.fromarray(np.random.randint(0, 255, (256, 256, 3), dtype=np.uint8))
        test_path = 'uploads/test_image.jpg'
        test_image.save(test_path)
        
        # Test prediction
        result = subprocess.run([
            sys.executable, 'predict_single.py', test_path
        ], capture_output=True, text=True)
        
        # Clean up test image
        if os.path.exists(test_path):
            os.remove(test_path)
        
        if result.returncode == 0:
            print("OK: Prediction system working")
            return True
        else:
            print(f"ERROR: Prediction test failed: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"ERROR: Prediction test error: {e}")
        return False

def main():
    print("Paddy Doctor XAMPP Setup")
    print("=" * 50)
    
    success = True
    
    # Check Python version
    if not check_python_version():
        success = False
    
    # Install requirements
    if success and not install_requirements():
        success = False
    
    # Check files
    if success:
        files_ok, missing = check_files()
        if not files_ok:
            print(f"\nERROR: Missing files: {', '.join(missing)}")
            success = False
    
    # Create directories
    if success:
        create_directories()
    
    # Generate icons
    if success:
        generate_icons()
    
    # Test prediction
    if success and not test_prediction():
        success = False
    
    print("\n" + "=" * 50)
    if success:
        print("Setup completed successfully!")
        print("\nNext steps:")
        print("1. Copy this folder to your XAMPP htdocs directory")
        print("2. Start XAMPP (Apache with PHP)")
        print("3. Open http://localhost/PaddyDisease in your browser")
        print("4. Upload a paddy leaf image to test!")
    else:
        print("Setup failed. Please fix the issues above.")
        sys.exit(1)

if __name__ == "__main__":
    main()

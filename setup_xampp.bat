@echo off
echo 🌾 Paddy Doctor XAMPP Setup
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.8 or higher from python.org
    pause
    exit /b 1
)

REM Run the setup script
python setup_xampp.py

echo.
echo 📁 To use with XAMPP:
echo 1. Copy this entire folder to: C:\xampp\htdocs\
echo 2. Start XAMPP Control Panel
echo 3. Start Apache service
echo 4. Open: http://localhost/PaddyDisease
echo.

pause

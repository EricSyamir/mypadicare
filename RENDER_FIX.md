# Fix for Render Deployment - Dependency Conflict

## Problem
TensorFlow 2.20.0 conflicts with numpy on Python 3.13.

## Solution

### Option 1: Set Python Version in Render Dashboard (Recommended)

1. Go to your Render dashboard
2. Select your service
3. Go to "Settings" → "Environment"
4. Add environment variable:
   - **Key**: `PYTHON_VERSION`
   - **Value**: `3.11.9`
5. Save and redeploy

### Option 2: Update Build Command

In Render dashboard → Settings → Build & Deploy:

**Build Command:**
```bash
pip install --upgrade pip && pip install -r requirements.txt --no-cache-dir
```

### Option 3: Use Python 3.11 Explicitly

Make sure `runtime.txt` contains:
```
python-3.11.9
```

And in Render, ensure Python version is set to 3.11 (not 3.13).

---

## Current Configuration

✅ `runtime.txt` - Set to Python 3.11.9
✅ `requirements.txt` - TensorFlow 2.15.0 (compatible with Python 3.11)
✅ `Procfile` - Configured correctly

---

## If Still Having Issues

Try this updated `requirements.txt` with more explicit constraints:

```txt
Flask==3.0.0
flask-cors==4.0.0
Werkzeug==3.0.1
tensorflow==2.15.0
numpy==1.24.3
Pillow==10.1.0
protobuf<5.0.0
```

Then commit and push:
```bash
git add requirements.txt runtime.txt Procfile
git commit -m "Fix dependency conflicts for Render deployment"
git push
```


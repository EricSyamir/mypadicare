# MyPadiCare - Free Hosting Deployment Guide

This guide provides step-by-step instructions for deploying MyPadiCare to free hosting platforms with Python support.

## 🚀 Quick Start Options

### Option 1: Render (Recommended - Easiest)
**Free Tier:** 750 hours/month, auto-sleeps after 15 min inactivity

#### Steps:
1. **Create Account**: Go to [render.com](https://render.com) and sign up
2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository (or use manual deploy)
3. **Configure Service**:
   - **Name**: `mypadicare`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`
   - **Instance Type**: Free
4. **Environment Variables** (if needed):
   - `PORT`: `5000` (auto-set by Render)
5. **Deploy**: Click "Create Web Service"

**Note**: First deployment takes 5-10 minutes. Service auto-sleeps after inactivity but wakes up on first request.

---

### Option 2: Railway (Best Performance)
**Free Tier:** $5 credit/month (enough for small apps)

#### Steps:
1. **Create Account**: Go to [railway.app](https://railway.app) and sign up
2. **New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo" (or upload files)
3. **Configure**:
   - Railway auto-detects Python
   - Uses `Procfile` automatically
4. **Deploy**: Railway handles everything automatically

**Advantages**: Faster cold starts, better performance, no auto-sleep

---

### Option 3: PythonAnywhere (Most Python-Friendly)
**Free Tier:** Limited to `*.pythonanywhere.com` subdomain

#### Steps:
1. **Create Account**: Go to [pythonanywhere.com](https://www.pythonanywhere.com)
2. **Upload Files**:
   - Go to "Files" tab
   - Upload all project files
3. **Create Web App**:
   - Go to "Web" tab
   - Click "Add a new web app"
   - Choose "Flask" → Python 3.10
   - Set source code path: `/home/yourusername/mysite/app.py`
4. **Configure WSGI**:
   - Edit WSGI file to point to your app
   - Add: `from app import app as application`
5. **Reload**: Click "Reload" button

**Note**: Free tier has limitations on external requests and file storage.

---

### Option 4: Replit (Easiest for Beginners)
**Free Tier:** Always-on option available

#### Steps:
1. **Create Account**: Go to [replit.com](https://replit.com)
2. **Create Repl**:
   - Click "Create Repl"
   - Choose "Python" template
   - Name: `mypadicare`
3. **Upload Files**:
   - Drag and drop all project files
   - Or use Git import
4. **Install Dependencies**:
   - Replit auto-installs from `requirements.txt`
5. **Run**:
   - Click "Run" button
   - Replit provides a public URL

**Advantages**: Built-in code editor, instant deployment, easy to update

---

### Option 5: Fly.io (Good for Production)
**Free Tier:** 3 shared VMs, 3GB persistent storage

#### Steps:
1. **Install Fly CLI**: 
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```
2. **Login**:
   ```bash
   fly auth login
   ```
3. **Initialize**:
   ```bash
   fly launch
   ```
4. **Deploy**:
   ```bash
   fly deploy
   ```

---

## 📋 Pre-Deployment Checklist

### 1. Convert PHP to Python ✅
- ✅ Created `app.py` (Flask server)
- ✅ Maintains same API endpoint (`/predict_api.php`)
- ✅ Compatible with existing frontend

### 2. Required Files
Make sure these files are in your repository:
- ✅ `app.py` - Flask server
- ✅ `requirements.txt` - Python dependencies
- ✅ `Procfile` - Process file (for Render/Railway)
- ✅ `runtime.txt` - Python version (optional)
- ✅ `predict_single.py` - Prediction script
- ✅ `predict_paddy_disease.py` - ML model handler
- ✅ `results/model.hdf5` - Trained model
- ✅ `data/treatments.json` - Treatment data
- ✅ All static files (HTML, CSS, JS)

### 3. Model File Size
⚠️ **Important**: Your `model.hdf5` file might be large (>100MB)
- **Render**: Free tier supports up to 500MB total
- **Railway**: Free tier supports up to 1GB
- **PythonAnywhere**: Free tier has 512MB storage limit
- **Replit**: Free tier has 500MB storage limit

**Solution**: If model is too large, consider:
- Using Git LFS (Large File Storage)
- Hosting model on cloud storage (S3, Google Drive)
- Compressing the model

---

## 🔧 Configuration Files

### `requirements.txt` (Already created)
Lists all Python dependencies.

### `Procfile` (Already created)
Tells hosting platform how to run your app:
```
web: python app.py
```

### `runtime.txt` (Already created)
Specifies Python version:
```
python-3.11.0
```

---

## 🌐 Environment Variables

Some platforms may need these (usually auto-configured):

| Variable | Value | Description |
|----------|-------|-------------|
| `PORT` | `5000` | Server port (auto-set by most platforms) |
| `FLASK_ENV` | `production` | Flask environment |

---

## 📝 Step-by-Step: Render Deployment

### 1. Prepare Repository
```bash
# Make sure all files are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Deploy on Render
1. Go to [render.com](https://render.com)
2. Sign up/Login
3. Click "New +" → "Web Service"
4. Connect GitHub repository
5. Configure:
   - **Name**: `mypadicare`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Your app will be live at: `https://mypadicare.onrender.com`

### 3. Update Frontend (if needed)
If your frontend makes requests to `predict_api.php`, it will work automatically since `app.py` handles that route.

---

## 🐛 Troubleshooting

### Issue: Model file too large
**Solution**: 
- Use Git LFS: `git lfs track "*.hdf5"`
- Or host model separately and download on startup

### Issue: Cold start timeout
**Solution**: 
- Render free tier has 15 min inactivity timeout
- First request after sleep takes 30-60 seconds
- Consider Railway or Fly.io for faster cold starts

### Issue: Memory limit exceeded
**Solution**:
- Optimize model loading
- Use model quantization
- Upgrade to paid tier if needed

### Issue: CORS errors
**Solution**: 
- Already handled in `app.py` with `flask-cors`
- Check if `CORS(app)` is present

---

## 🔄 Updating Your App

### Render:
- Push to GitHub → Auto-deploys
- Or manually trigger from Render dashboard

### Railway:
- Push to GitHub → Auto-deploys
- Or use Railway CLI: `railway up`

### PythonAnywhere:
- Upload new files via web interface
- Click "Reload" button

### Replit:
- Edit files in Replit editor
- Click "Run" to redeploy

---

## 📊 Platform Comparison

| Platform | Free Tier | Cold Start | Storage | Best For |
|----------|-----------|------------|---------|----------|
| **Render** | 750 hrs/month | 30-60s | 500MB | Easy deployment |
| **Railway** | $5 credit | 5-10s | 1GB | Performance |
| **PythonAnywhere** | Limited | Instant | 512MB | Python-focused |
| **Replit** | Always-on option | Instant | 500MB | Beginners |
| **Fly.io** | 3 VMs | 5-10s | 3GB | Production |

---

## 🎯 Recommended Setup

**For Beginners**: Use **Replit** or **Render**
- Easiest setup
- Good documentation
- Free tier sufficient for testing

**For Production**: Use **Railway** or **Fly.io**
- Better performance
- More reliable
- Worth the small cost

**For Learning**: Use **PythonAnywhere**
- Great for Python projects
- Good free tier for learning

---

## 📞 Support

If you encounter issues:
1. Check platform-specific logs
2. Verify all files are uploaded
3. Check `requirements.txt` is correct
4. Ensure model file is accessible
5. Verify Python version compatibility

---

## ✅ Post-Deployment

After successful deployment:
1. Test the health endpoint: `https://your-app-url/predict_api.php?action=health`
2. Test image upload and prediction
3. Update any hardcoded URLs in frontend
4. Set up custom domain (if needed, paid feature on most platforms)

---

**Good luck with your deployment! 🚀**


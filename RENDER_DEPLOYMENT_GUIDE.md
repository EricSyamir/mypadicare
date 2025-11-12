# 🚀 MyPadiCare - Render Deployment Guide

Complete step-by-step guide to deploy your MyPadiCare app to Render for FREE!

---

## 📋 Prerequisites

✅ Your code is already on GitHub: `https://github.com/EricSyamir/mypadicare`  
✅ All deployment files are ready (`app.py`, `requirements.txt`, `Procfile`)

---

## 🎯 Step-by-Step Deployment

### **Step 1: Create Render Account**

1. Go to **https://render.com**
2. Click **"Get Started for Free"** or **"Sign Up"**
3. Sign up using:
   - GitHub (Recommended - easiest)
   - Email
   - Google account

### **Step 2: Create New Web Service**

1. After logging in, you'll see the Render Dashboard
2. Click the **"New +"** button (top right)
3. Select **"Web Service"** from the dropdown

### **Step 3: Connect GitHub Repository**

1. You'll see options to connect:
   - **"Public Git repository"** - Enter your repo URL
   - **"Connect account"** - Connect your GitHub account (Recommended)

**Option A: Connect GitHub Account (Easiest)**
- Click **"Connect account"** or **"Configure account"**
- Authorize Render to access your GitHub repositories
- Select **"EricSyamir/mypadicare"** from the list

**Option B: Use Public Repository URL**
- Select **"Public Git repository"**
- Enter: `https://github.com/EricSyamir/mypadicare`
- Click **"Continue"**

### **Step 4: Configure Web Service**

Fill in the following settings:

#### **Basic Settings:**
- **Name**: `mypadicare` (or any name you prefer)
- **Region**: Choose closest to you (e.g., `Singapore`, `Oregon`, `Frankfurt`)
- **Branch**: `main` (should auto-detect)

#### **Build & Deploy Settings:**
- **Environment**: Select **`Python 3`**
- **Build Command**: 
  ```
  pip install -r requirements.txt
  ```
- **Start Command**: 
  ```
  python app.py
  ```

#### **Plan:**
- Select **`Free`** plan

### **Step 5: Advanced Settings (Optional)**

Click **"Advanced"** to configure:

#### **Environment Variables:**
You can add these if needed (usually not required):
- `PORT`: `5000` (Render sets this automatically)
- `FLASK_ENV`: `production`

#### **Health Check Path:**
- Leave default or set to: `/predict_api.php?action=health`

### **Step 6: Create Web Service**

1. Review all settings
2. Click **"Create Web Service"** button
3. Render will start building your application

### **Step 7: Wait for Deployment**

- **Build Phase**: 5-10 minutes (installing dependencies)
- **Deploy Phase**: 1-2 minutes
- You'll see live logs in the Render dashboard

**What's happening:**
1. ✅ Cloning repository from GitHub
2. ✅ Installing Python dependencies (`pip install -r requirements.txt`)
3. ✅ Starting Flask server (`python app.py`)
4. ✅ Your app goes live!

### **Step 8: Access Your Live App**

Once deployment is complete:
- Your app URL will be: `https://mypadicare.onrender.com`
- (Or `https://your-service-name.onrender.com`)

Click the URL or the **"Open Live App"** button to test!

---

## ✅ Post-Deployment Checklist

### **1. Test Health Endpoint**
Visit: `https://your-app.onrender.com/predict_api.php?action=health`

Should return:
```json
{
  "status": "healthy",
  "model_loaded": true,
  ...
}
```

### **2. Test Image Upload**
1. Go to your live app URL
2. Upload a paddy leaf image
3. Test the full workflow

### **3. Check Logs**
- Go to Render Dashboard → Your Service → **"Logs"** tab
- Monitor for any errors

---

## 🔧 Troubleshooting

### **Issue: Build Fails**

**Error**: `ModuleNotFoundError` or dependency issues

**Solution**:
1. Check `requirements.txt` is correct
2. Check Render logs for specific error
3. Ensure all dependencies are listed

### **Issue: App Crashes on Start**

**Error**: Port binding or startup errors

**Solution**:
- Verify `app.py` uses: `port = int(os.environ.get('PORT', 5000))`
- Check logs for specific error message

### **Issue: Model File Too Large**

**Error**: Build timeout or storage issues

**Solution**:
- Model file (`results/model.hdf5`) might be >100MB
- Render free tier supports up to 500MB total
- If too large, consider:
  - Using Git LFS (Large File Storage)
  - Compressing the model
  - Hosting model on cloud storage

### **Issue: Cold Start Timeout**

**Problem**: First request takes 30-60 seconds

**Solution**:
- This is normal for Render free tier
- App sleeps after 15 minutes of inactivity
- First request after sleep takes time to wake up
- Consider upgrading to paid tier for faster cold starts

### **Issue: CORS Errors**

**Solution**:
- Already handled in `app.py` with `flask-cors`
- Verify `CORS(app)` is present

---

## 📊 Render Free Tier Limits

| Feature | Free Tier Limit |
|---------|----------------|
| **Hours/Month** | 750 hours |
| **Auto-sleep** | After 15 min inactivity |
| **Cold start** | 30-60 seconds |
| **Storage** | 500MB total |
| **Bandwidth** | Unlimited |
| **Custom Domain** | ✅ Supported |

---

## 🔄 Updating Your App

### **Automatic Updates (Recommended)**

1. Make changes to your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update description"
   git push origin main
   ```
3. Render **automatically detects** the push
4. **Auto-deploys** the new version
5. Check Render dashboard for deployment status

### **Manual Deploy**

1. Go to Render Dashboard
2. Select your service
3. Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## 🎨 Custom Domain (Optional)

To use your own domain:

1. Go to Render Dashboard → Your Service → **"Settings"**
2. Scroll to **"Custom Domains"**
3. Add your domain
4. Follow DNS configuration instructions

---

## 📱 Monitoring Your App

### **View Logs**
- Dashboard → Your Service → **"Logs"** tab
- Real-time logs and errors

### **Metrics**
- Dashboard → Your Service → **"Metrics"** tab
- CPU, Memory, Request metrics

### **Events**
- Dashboard → Your Service → **"Events"** tab
- Deployment history and events

---

## 🚨 Important Notes

### **Free Tier Limitations:**
- ⚠️ App sleeps after 15 minutes of inactivity
- ⚠️ First request after sleep takes 30-60 seconds
- ⚠️ 750 hours/month limit (enough for testing)
- ⚠️ No persistent storage (uploads are temporary)

### **For Production:**
- Consider upgrading to paid tier ($7/month)
- Faster cold starts
- No auto-sleep
- More resources

---

## 🎉 Success!

Once deployed, your app will be:
- ✅ Live on the internet
- ✅ Accessible from anywhere
- ✅ Auto-updates on Git push
- ✅ Free to use (with limitations)

**Your Live URL**: `https://mypadicare.onrender.com`

---

## 📞 Need Help?

1. **Check Render Logs**: Dashboard → Logs tab
2. **Render Docs**: https://render.com/docs
3. **Render Status**: https://status.render.com
4. **Community**: Render Discord/Forum

---

## 🎯 Quick Reference Commands

```bash
# Local testing
python app.py

# Check if app runs locally
curl http://localhost:5000/predict_api.php?action=health

# Git commands for updates
git add .
git commit -m "Your message"
git push origin main
```

---

**Good luck with your deployment! 🚀**

Your app will be live in about 5-10 minutes!


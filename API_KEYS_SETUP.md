# API Keys Setup Guide

## 🔒 Security: API Keys are Now Protected

All API keys have been moved to a **gitignored** file to keep them secure.

## ✅ Quick Setup (Already Done)

Your API keys are already configured in `static/js/config.local.js` (this file is gitignored).

## 📋 For New Developers / Deployment

### Step 1: Create Local Config File

Copy the template file:
```bash
cp static/js/config.local.js.template static/js/config.local.js
```

### Step 2: Add Your API Keys

Edit `static/js/config.local.js` and replace the placeholders:

```javascript
const LOCAL_CONFIG = {
    GEMINI_API_KEY: 'your_actual_gemini_key_here',
    ELEVENLABS_API_KEY: 'your_actual_elevenlabs_key_here'
};
```

### Step 3: That's It!

The app will automatically load your keys from `config.local.js`.

---

## 🔑 Where to Get API Keys

### Google Gemini API Key
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key

### ElevenLabs API Key
1. Go to: https://elevenlabs.io/app/settings/api-keys
2. Sign in or create account
3. Click "Create API Key"
4. Copy the key

---

## 🛡️ Security Features

✅ **config.local.js is gitignored** - Never committed to Git  
✅ **Template file included** - Easy setup for new developers  
✅ **Clear warnings** - Console shows if keys are missing  
✅ **Fallback handling** - App works even if local config missing  

---

## 📁 File Structure

```
static/js/
├── config.js              # Public config (no API keys) - ✅ Committed to Git
├── config.local.js        # Your actual API keys - ❌ Gitignored
└── config.local.js.template  # Template for setup - ✅ Committed to Git
```

---

## ⚠️ Important Notes

1. **Never commit `config.local.js`** - It's in `.gitignore`
2. **Share `config.local.js.template`** - Safe to commit
3. **Each developer needs their own** `config.local.js` file
4. **For production**, set up environment variables or secure config management

---

## 🚀 Deployment

For production servers, you can:
- Use environment variables
- Use secure config management (AWS Secrets Manager, etc.)
- Keep `config.local.js` on server only (not in repo)

---

## ✅ Current Status

Your API keys are already configured and working!  
The app will use them automatically from `config.local.js`.


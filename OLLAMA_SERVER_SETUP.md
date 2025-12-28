# Ollama Server Integration Guide

Ollama is now **integrated directly into your website**! No need for users to install Ollama locally.

## 🎯 How It Works

Your website now has a **server-side proxy** that:
1. Receives AI requests from the browser
2. Forwards them to Ollama running on your server
3. Returns the response to the user

**Users don't need to install anything** - Ollama runs on your server!

---

## 🚀 Server Setup (One-Time)

### Step 1: Install Ollama on Your Server

**Windows Server:**
1. Download from: https://ollama.ai/download
2. Run installer
3. Start Ollama service

**Linux Server:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**Mac Server:**
```bash
brew install ollama
```

### Step 2: Download Model

```bash
ollama pull gemma:2b
```

### Step 3: Start Ollama Service

**Windows:**
- Ollama runs as a service automatically

**Linux/Mac:**
```bash
# Start Ollama service
ollama serve

# Or run as background service
nohup ollama serve > ollama.log 2>&1 &
```

### Step 4: Verify It's Running

```bash
curl http://localhost:11434/api/tags
```

You should see your downloaded models.

---

## ⚙️ Configuration

### Option 1: PHP Backend (XAMPP)

The PHP proxy is already configured in `predict_api.php`:
- Endpoint: `predict_api.php?action=ollama`
- Ollama URL: `http://localhost:11434` (default)

**To change Ollama URL:**
Set environment variable or edit `predict_api.php`:
```php
$ollama_url = 'http://your-ollama-server:11434';
```

### Option 2: Python Backend (Flask)

The Python proxy is already configured in `app.py`:
- Endpoint: `/api/ollama`
- Ollama URL: Set via `OLLAMA_URL` environment variable

**To change Ollama URL:**
```bash
export OLLAMA_URL=http://your-ollama-server:11434
```

Or edit `app.py`:
```python
ollama_url = os.getenv('OLLAMA_URL', 'http://localhost:11434')
```

---

## 🌐 Remote Ollama Server

If Ollama is on a different server:

### On Ollama Server:
```bash
# Allow remote connections
export OLLAMA_HOST=0.0.0.0:11434
ollama serve
```

### In Your App:
Update `predict_api.php` or `app.py`:
```php
// PHP
$ollama_url = 'http://your-ollama-server-ip:11434';

// Python
ollama_url = 'http://your-ollama-server-ip:11434'
```

---

## 📋 Model Configuration

Change model in `static/js/config.js`:

```javascript
OLLAMA_MODEL: 'gemma:2b', // Change to: gemma:7b, llama3, mistral, etc.
```

---

## ✅ Benefits

| Feature | Local Ollama | Server Integration |
|---------|-------------|-------------------|
| **User Setup** | ❌ Must install | ✅ No setup needed |
| **Privacy** | ✅ 100% local | ✅ Server-side only |
| **Accessibility** | ❌ Local only | ✅ Works anywhere |
| **Maintenance** | ❌ Per user | ✅ One server |

---

## 🔧 Troubleshooting

### "Ollama connection failed"

**Problem:** Server can't reach Ollama

**Solutions:**
1. Check Ollama is running: `curl http://localhost:11434/api/tags`
2. Check firewall allows port 11434
3. Verify `OLLAMA_URL` is correct

### "Model not found"

**Problem:** Model not downloaded on server

**Solution:**
```bash
# On your server
ollama pull gemma:2b
```

### Slow Responses

**Problem:** Server resources limited

**Solutions:**
1. Use smaller model: `gemma:2b` instead of `gemma:7b`
2. Increase server RAM
3. Use GPU if available

---

## 🎯 Current Setup

- **Proxy Endpoint:** `predict_api.php?action=ollama` (PHP) or `/api/ollama` (Python)
- **Ollama URL:** `http://localhost:11434` (on your server)
- **Model:** `gemma:2b`
- **Users:** No installation needed!

---

## 📝 For Render/Production Deployment

### On Render:

1. **Add Ollama Service:**
   - Create a new "Background Worker" service
   - Command: `ollama serve`
   - Keep it running

2. **Set Environment Variable:**
   ```
   OLLAMA_URL=http://your-ollama-service:11434
   ```

3. **Or Use External Ollama Hosting:**
   - Services like [Ollama Cloud](https://ollama.ai) (if available)
   - Or host Ollama on a separate server

---

**Your website now has Ollama integrated!** 🎉

Users can use AI features without installing anything - it all runs on your server!


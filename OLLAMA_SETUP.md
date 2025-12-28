# Ollama Setup Guide - Local AI Integration

MyPadiCare now uses **Ollama** for local AI inference instead of Google's Gemini API. This means:
- ✅ **No API keys needed** - Everything runs locally
- ✅ **100% Private** - Data never leaves your computer
- ✅ **Free** - No usage limits or costs
- ✅ **Offline** - Works without internet

---

## 🚀 Quick Setup

### Step 1: Install Ollama

**Windows:**
1. Download from: https://ollama.ai/download
2. Run the installer
3. Ollama will start automatically

**Mac:**
```bash
brew install ollama
```

**Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Step 2: Download a Model

Open terminal/command prompt and run:

```bash
# Option 1: Gemma 2B (Small, fast, similar to Gemini)
ollama pull gemma:2b

# Option 2: Gemma 7B (Better quality, slower)
ollama pull gemma:7b

# Option 3: Llama 3 (Great alternative)
ollama pull llama3

# Option 4: Mistral (Fast and efficient)
ollama pull mistral
```

**Recommended:** Start with `gemma:2b` - it's small, fast, and works well for this use case.

### Step 3: Verify Installation

```bash
# Check if Ollama is running
ollama list

# Test the model
ollama run gemma:2b "Hello, how are you?"
```

### Step 4: That's It!

The app will automatically connect to Ollama at `http://localhost:11434`.

---

## ⚙️ Configuration

### Change Model

Edit `static/js/config.js`:

```javascript
OLLAMA_MODEL: 'gemma:2b', // Change to: gemma:7b, llama3, mistral, etc.
```

### Change Ollama URL

If Ollama is running on a different machine/port:

```javascript
OLLAMA_URL: 'http://your-server:11434',
```

---

## 📋 Available Models

| Model | Size | Speed | Quality | Recommended For |
|-------|------|-------|---------|----------------|
| `gemma:2b` | 2GB | ⚡⚡⚡ Fast | ⭐⭐ Good | **Recommended** - Fast and efficient |
| `gemma:7b` | 5GB | ⚡⚡ Medium | ⭐⭐⭐ Better | Better quality, needs more RAM |
| `llama3` | 4.7GB | ⚡⚡ Medium | ⭐⭐⭐ Great | Great alternative |
| `mistral` | 4GB | ⚡⚡⚡ Fast | ⭐⭐⭐ Great | Fast and efficient |
| `phi3` | 2GB | ⚡⚡⚡ Fast | ⭐⭐ Good | Very fast, small |

---

## 🔧 Troubleshooting

### "Ollama server not available"

**Problem:** App can't connect to Ollama

**Solutions:**
1. Make sure Ollama is running:
   ```bash
   ollama serve
   ```
2. Check if Ollama is on port 11434:
   ```bash
   curl http://localhost:11434/api/tags
   ```
3. Verify firewall isn't blocking port 11434

### "Model not found"

**Problem:** Model isn't downloaded

**Solution:**
```bash
ollama pull gemma:2b
```

### Slow Responses

**Problem:** Model is too large for your system

**Solutions:**
1. Use a smaller model: `gemma:2b` instead of `gemma:7b`
2. Close other applications to free up RAM
3. Check system requirements

### Model Not Responding

**Problem:** Model times out or crashes

**Solutions:**
1. Try a different model
2. Restart Ollama:
   ```bash
   # Stop Ollama
   # Then restart it
   ollama serve
   ```
3. Check system resources (RAM, CPU)

---

## 🌐 Remote Ollama Server

If you want to run Ollama on a different machine:

### On Server:
```bash
# Set OLLAMA_HOST to allow remote connections
export OLLAMA_HOST=0.0.0.0:11434
ollama serve
```

### In App Config:
```javascript
OLLAMA_URL: 'http://your-server-ip:11434',
```

---

## 💡 Tips

1. **First Run:** First request will be slower as Ollama loads the model
2. **RAM:** Make sure you have enough RAM (2GB+ for gemma:2b, 8GB+ for gemma:7b)
3. **GPU:** Ollama can use GPU if available (much faster!)
4. **Model Size:** Smaller models = faster responses, larger models = better quality

---

## ✅ Benefits Over Google Gemini API

| Feature | Google Gemini API | Ollama (Local) |
|---------|------------------|----------------|
| **API Key** | ❌ Required | ✅ Not needed |
| **Privacy** | ⚠️ Data sent to Google | ✅ 100% local |
| **Cost** | 💰 Pay per use | ✅ Free |
| **Internet** | ❌ Required | ✅ Works offline |
| **Speed** | ⚡ Fast | ⚡ Fast (with GPU) |
| **Limits** | ⚠️ Rate limits | ✅ Unlimited |

---

## 🎯 Current Configuration

- **Ollama URL:** `http://localhost:11434`
- **Model:** `gemma:2b`
- **Temperature:** 0.5 (balanced creativity)
- **Max Tokens:** 150 (concise responses)

---

**Need Help?**  
Ollama Docs: https://ollama.ai/docs  
Ollama GitHub: https://github.com/ollama/ollama


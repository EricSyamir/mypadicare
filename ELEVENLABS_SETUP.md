# ElevenLabs Text-to-Speech Setup Guide

MyPadiCare now uses **ElevenLabs** for high-quality text-to-speech instead of Web Speech API.

## What You Need to Do

### 1. Get an ElevenLabs API Key

1. Go to [ElevenLabs](https://elevenlabs.io/)
2. Sign up for a free account (or login if you have one)
3. Go to your [Profile Settings](https://elevenlabs.io/app/settings/api-keys)
4. Click "Create API Key" or copy your existing key
5. Copy the API key (it looks like: `sk_abc123...`)

### 2. Add the API Key to Your Config

Open `static/js/config.js` and replace this line:

```javascript
ELEVENLABS_API_KEY: 'YOUR_ELEVENLABS_API_KEY_HERE',
```

With your actual API key:

```javascript
ELEVENLABS_API_KEY: 'sk_your_actual_api_key_here',
```

### 3. That's It!

The text-to-speech will now work automatically when you click "View Treatment" button.

---

## ElevenLabs Free Tier

- **10,000 characters per month** (free)
- High-quality multilingual voices
- Supports: English, Malay, Japanese, and more
- No credit card required for free tier

## Current Voice Configuration

The app uses these ElevenLabs voices:

- **English**: Sarah (warm, friendly female voice)
- **Malay/Kedahan/Kelantanese**: Adam (multilingual male voice)
- **Japanese**: Adam (multilingual male voice)

You can change the voice IDs in `static/js/speech.js` if you want different voices.

## Features

✅ **High-quality natural speech** - Much better than Web Speech API  
✅ **Multilingual support** - Works with all app languages  
✅ **Automatic voice selection** - Picks the right voice for each language  
✅ **Play/Pause/Stop controls** - Full control over speech playback  
✅ **Loading indicator** - Shows when generating audio  
✅ **Error handling** - Clear messages if something goes wrong  

## Troubleshooting

### "Invalid ElevenLabs API key"
- Check that you copied the full API key correctly
- Make sure there are no extra spaces
- Verify the key is active in your ElevenLabs dashboard

### "Quota exceeded"
- You've used your 10,000 free characters for the month
- Wait until next month or upgrade to a paid plan
- Check usage at: https://elevenlabs.io/app/usage

### "Text-to-speech failed"
- Check your internet connection
- Make sure the API key is in config.js
- Check browser console for detailed error messages

---

## Cost Estimate

**Free Tier**: 10,000 characters/month

Average recommendation: ~150 characters  
Estimated uses per month: ~65 recommendations

This should be enough for testing and moderate use!

## Optional: Upgrade Voice Quality

If you want even better voices, you can:

1. Subscribe to ElevenLabs Starter plan ($5/month)
2. Get 30,000 characters/month
3. Access to premium voices
4. Better voice cloning features

---

**Need Help?**  
Contact ElevenLabs support: https://help.elevenlabs.io/


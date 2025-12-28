/**
 * Configuration for MyPadiCare
 * Clean and optimized configuration
 * 
 * API keys are loaded from:
 * 1. Environment variables (for Render/production) - window.ENV
 * 2. config.local.js (for local development) - LOCAL_CONFIG
 * 
 * Priority: ENV vars > Local config > null
 */

// Default configuration (without API keys)
const CONFIG = {
    // Google Gemini API Configuration
    GEMINI_API_KEY: null, // Loaded from ENV or config.local.js
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-exp-03-25:generateContent',
    GEMINI_MODEL: 'gemini-2.5-pro-exp-03-25',
    
    // ElevenLabs TTS API Configuration
    ELEVENLABS_API_KEY: null, // Loaded from ENV or config.local.js
    
    // Health Detection Model Configuration
    MODEL_PATH: 'static/models/model.json',
    MODEL_INPUT_SIZE: 256,
    MODEL_ARCHITECTURE: 'Custom ResNet-style CNN',
    
    // Disease Classes (matches training order)
    CLASS_NAMES: [
        'bacterial_leaf_blight',
        'bacterial_leaf_streak',
        'bacterial_panicle_blight',
        'blast',
        'brown_spot',
        'dead_heart',
        'downy_mildew',
        'hispa',
        'normal',
        'tungro'
    ],
    
    // Health Status Categories
    HEALTH_CATEGORIES: {
        'healthy': ['normal'],
        'diseased': [
            'bacterial_leaf_blight',
            'bacterial_leaf_streak',
            'bacterial_panicle_blight',
            'blast',
            'brown_spot',
            'dead_heart',
            'downy_mildew',
            'hispa',
            'tungro'
        ]
    },
    
    // File Upload Settings
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_EXTENSIONS: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    
    // UI Settings
    CONFIDENCE_THRESHOLD_HIGH: 0.85,
    CONFIDENCE_THRESHOLD_MODERATE: 0.65,
    
    // Application Settings
    DEBUG: true,
    TESTING_MODE: false // Set to true for testing without backend
};

// Load API keys from environment variables (Render/production) or local config (development)
try {
    // Priority 1: Environment variables (for Render/production)
    // These are injected by Render at runtime via window.ENV (from env-config.js)
    if (typeof window !== 'undefined' && window.ENV) {
        CONFIG.GEMINI_API_KEY = window.ENV.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY;
        CONFIG.ELEVENLABS_API_KEY = window.ENV.ELEVENLABS_API_KEY || CONFIG.ELEVENLABS_API_KEY;
        if (CONFIG.GEMINI_API_KEY || CONFIG.ELEVENLABS_API_KEY) {
            console.log('✅ API keys loaded from environment variables (Render/env-config.js)');
        }
    }
    // Priority 2: Local config file (for local development)
    if (typeof LOCAL_CONFIG !== 'undefined') {
        CONFIG.GEMINI_API_KEY = LOCAL_CONFIG.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY;
        CONFIG.ELEVENLABS_API_KEY = LOCAL_CONFIG.ELEVENLABS_API_KEY || CONFIG.ELEVENLABS_API_KEY;
        if (CONFIG.GEMINI_API_KEY || CONFIG.ELEVENLABS_API_KEY) {
            console.log('✅ API keys loaded from config.local.js (local development)');
        }
    }
    
    // Final check - if still no keys, log warning
    if (!CONFIG.ELEVENLABS_API_KEY && !CONFIG.GEMINI_API_KEY) {
        console.warn('⚠️ No API keys found. Check environment variables or config.local.js');
    }
} catch (error) {
    console.warn('⚠️ Could not load API keys:', error);
}

// Validate API keys
if (!CONFIG.GEMINI_API_KEY) {
    console.warn('⚠️ GEMINI_API_KEY not configured');
}
if (!CONFIG.ELEVENLABS_API_KEY) {
    console.warn('⚠️ ELEVENLABS_API_KEY not configured');
}

console.log('⚙️ MyPadiCare configuration loaded');
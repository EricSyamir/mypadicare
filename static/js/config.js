/**
 * Configuration for MyPadiCare
 * Clean and optimized configuration
 * 
 * IMPORTANT: API keys are loaded from config.local.js (gitignored)
 * Create config.local.js from config.local.js.template
 */

// Default configuration (without API keys)
const CONFIG = {
    // Google Gemini API Configuration
    GEMINI_API_KEY: null, // Loaded from config.local.js
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    
    // ElevenLabs TTS API Configuration
    ELEVENLABS_API_KEY: null, // Loaded from config.local.js
    
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

// Load API keys from config.local.js if it exists
// This file is gitignored and contains your actual API keys
try {
    // Try to load local config (this will be handled by script tag in HTML)
    if (typeof LOCAL_CONFIG !== 'undefined') {
        CONFIG.GEMINI_API_KEY = LOCAL_CONFIG.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY;
        CONFIG.ELEVENLABS_API_KEY = LOCAL_CONFIG.ELEVENLABS_API_KEY || CONFIG.ELEVENLABS_API_KEY;
        console.log('✅ API keys loaded from config.local.js');
    } else {
        console.warn('⚠️ config.local.js not found. API keys not loaded.');
        console.warn('⚠️ Create static/js/config.local.js from config.local.js.template');
    }
} catch (error) {
    console.warn('⚠️ Could not load local config:', error);
}

// Validate API keys
if (!CONFIG.GEMINI_API_KEY) {
    console.warn('⚠️ GEMINI_API_KEY not configured');
}
if (!CONFIG.ELEVENLABS_API_KEY) {
    console.warn('⚠️ ELEVENLABS_API_KEY not configured');
}

console.log('⚙️ MyPadiCare configuration loaded');
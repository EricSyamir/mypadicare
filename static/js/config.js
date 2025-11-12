/**
 * Configuration for MyPadiCare
 * Clean and optimized configuration
 */

const CONFIG = {
    // Google Gemini API Configuration
    GEMINI_API_KEY: 'AIzaSyCOnJaGxm18KuXFBj7kJdo16mEcdmyJYzw',
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    
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

console.log('⚙️ MyPadiCare configuration loaded');
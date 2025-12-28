/**
 * MyPadiCare - Web Speech API Integration
 * Text-to-Speech for AI recommendations and treatment advice
 * Supports: English, Malay, Japanese, Kedahan, Kelantanese dialects
 */

class SpeechManager {
    constructor() {
        this.synth = window.speechSynthesis;
        this.utterance = null;
        this.isPlaying = false;
        this.isPaused = false;
        this.voices = [];
        this.currentLanguage = 'en';
        
        // Language to voice mapping
        this.languageVoiceMap = {
            'en': ['en-US', 'en-GB', 'en-AU', 'en'],
            'ms': ['ms-MY', 'ms', 'id-ID', 'id'], // Malay, fallback to Indonesian
            'ms-kd': ['ms-MY', 'ms', 'id-ID', 'id'], // Kedahan dialect uses Malay voice
            'ms-kl': ['ms-MY', 'ms', 'id-ID', 'id'], // Kelantanese dialect uses Malay voice
            'ja': ['ja-JP', 'ja']
        };
        
        // Initialize voices
        this.loadVoices();
        
        // Chrome requires voices to be loaded asynchronously
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = () => this.loadVoices();
        }
        
        console.log('🔊 Speech Manager initialized');
    }
    
    /**
     * Load available voices
     */
    loadVoices() {
        this.voices = this.synth.getVoices();
        console.log(`🔊 Loaded ${this.voices.length} voices`);
        
        // Log available voices for debugging
        if (this.voices.length > 0) {
            console.log('🔊 Available voices:', this.voices.map(v => `${v.name} (${v.lang})`).slice(0, 10));
        }
    }
    
    /**
     * Get best voice for a language
     */
    getBestVoice(langCode) {
        const preferredLangs = this.languageVoiceMap[langCode] || this.languageVoiceMap['en'];
        
        // Try to find a voice matching preferred languages
        for (const lang of preferredLangs) {
            const voice = this.voices.find(v => 
                v.lang.toLowerCase().startsWith(lang.toLowerCase()) ||
                v.lang.toLowerCase() === lang.toLowerCase()
            );
            if (voice) {
                console.log(`🔊 Selected voice: ${voice.name} (${voice.lang}) for language: ${langCode}`);
                return voice;
            }
        }
        
        // Fallback: try to find any voice that matches the base language
        const baseLang = langCode.split('-')[0];
        const fallbackVoice = this.voices.find(v => 
            v.lang.toLowerCase().startsWith(baseLang.toLowerCase())
        );
        
        if (fallbackVoice) {
            console.log(`🔊 Using fallback voice: ${fallbackVoice.name} (${fallbackVoice.lang})`);
            return fallbackVoice;
        }
        
        // Final fallback: use default voice
        console.log('🔊 Using default system voice');
        return this.voices[0] || null;
    }
    
    /**
     * Get speech rate based on language
     */
    getSpeechRate(langCode) {
        // Adjust rate for different languages
        const rates = {
            'en': 0.9,
            'ms': 0.85,
            'ms-kd': 0.85,
            'ms-kl': 0.85,
            'ja': 0.8
        };
        return rates[langCode] || 0.9;
    }
    
    /**
     * Get pitch based on language
     */
    getSpeechPitch(langCode) {
        return 1.0; // Default pitch for all languages
    }
    
    /**
     * Speak text
     * @param {string} text - Text to speak
     * @param {string} langCode - Language code (en, ms, ms-kd, ms-kl, ja)
     * @param {Object} options - Additional options
     */
    speak(text, langCode = 'en', options = {}) {
        // Check if speech synthesis is supported
        if (!this.synth) {
            console.error('❌ Speech synthesis not supported');
            this.showNotSupported();
            return false;
        }
        
        // Stop any current speech
        this.stop();
        
        // Clean text for better speech
        const cleanedText = this.cleanTextForSpeech(text);
        
        if (!cleanedText) {
            console.warn('⚠️ No text to speak');
            return false;
        }
        
        // Create new utterance
        this.utterance = new SpeechSynthesisUtterance(cleanedText);
        
        // Set voice
        const voice = this.getBestVoice(langCode);
        if (voice) {
            this.utterance.voice = voice;
        }
        
        // Set language
        this.utterance.lang = this.getUtteranceLang(langCode);
        
        // Set rate and pitch
        this.utterance.rate = options.rate || this.getSpeechRate(langCode);
        this.utterance.pitch = options.pitch || this.getSpeechPitch(langCode);
        this.utterance.volume = options.volume || 1.0;
        
        // Event handlers
        this.utterance.onstart = () => {
            this.isPlaying = true;
            this.isPaused = false;
            this.updateUI('playing');
            console.log('🔊 Started speaking');
        };
        
        this.utterance.onend = () => {
            this.isPlaying = false;
            this.isPaused = false;
            this.updateUI('stopped');
            console.log('🔊 Finished speaking');
        };
        
        this.utterance.onerror = (event) => {
            this.isPlaying = false;
            this.isPaused = false;
            this.updateUI('stopped');
            console.error('❌ Speech error:', event.error);
        };
        
        this.utterance.onpause = () => {
            this.isPaused = true;
            this.updateUI('paused');
            console.log('🔊 Speech paused');
        };
        
        this.utterance.onresume = () => {
            this.isPaused = false;
            this.updateUI('playing');
            console.log('🔊 Speech resumed');
        };
        
        // Start speaking
        this.currentLanguage = langCode;
        this.synth.speak(this.utterance);
        
        return true;
    }
    
    /**
     * Get utterance language code
     */
    getUtteranceLang(langCode) {
        const langMap = {
            'en': 'en-US',
            'ms': 'ms-MY',
            'ms-kd': 'ms-MY',
            'ms-kl': 'ms-MY',
            'ja': 'ja-JP'
        };
        return langMap[langCode] || 'en-US';
    }
    
    /**
     * Clean text for better speech
     */
    cleanTextForSpeech(text) {
        if (!text) return '';
        
        return text
            // Remove markdown-style formatting
            .replace(/\*\*/g, '')
            .replace(/\*/g, '')
            .replace(/_/g, ' ')
            .replace(/`/g, '')
            // Remove excessive whitespace
            .replace(/\s+/g, ' ')
            // Remove URLs
            .replace(/https?:\/\/\S+/g, '')
            // Replace common abbreviations
            .replace(/\bNPK\b/g, 'N P K')
            .replace(/\bAI\b/g, 'A I')
            // Clean up
            .trim();
    }
    
    /**
     * Pause speech
     */
    pause() {
        if (this.synth && this.isPlaying && !this.isPaused) {
            this.synth.pause();
            this.isPaused = true;
            this.updateUI('paused');
            console.log('🔊 Speech paused');
        }
    }
    
    /**
     * Resume speech
     */
    resume() {
        if (this.synth && this.isPaused) {
            this.synth.resume();
            this.isPaused = false;
            this.updateUI('playing');
            console.log('🔊 Speech resumed');
        }
    }
    
    /**
     * Stop speech
     */
    stop() {
        if (this.synth) {
            this.synth.cancel();
            this.isPlaying = false;
            this.isPaused = false;
            this.updateUI('stopped');
            console.log('🔊 Speech stopped');
        }
    }
    
    /**
     * Toggle play/pause
     */
    toggle() {
        if (this.isPlaying && !this.isPaused) {
            this.pause();
        } else if (this.isPaused) {
            this.resume();
        }
    }
    
    /**
     * Check if currently speaking
     */
    isSpeaking() {
        return this.isPlaying && !this.isPaused;
    }
    
    /**
     * Update UI elements based on state
     */
    updateUI(state) {
        const playBtn = document.getElementById('speechPlayBtn');
        const pauseBtn = document.getElementById('speechPauseBtn');
        const stopBtn = document.getElementById('speechStopBtn');
        const speakBtn = document.getElementById('speakAdviceBtn');
        const speechIcon = document.getElementById('speechIcon');
        const speechStatusText = document.getElementById('speechStatusText');
        
        switch (state) {
            case 'playing':
                if (playBtn) playBtn.classList.add('hidden');
                if (pauseBtn) pauseBtn.classList.remove('hidden');
                if (stopBtn) stopBtn.classList.remove('hidden');
                if (speakBtn) {
                    speakBtn.classList.add('playing');
                    if (speechIcon) speechIcon.className = 'fas fa-pause';
                }
                if (speechStatusText) speechStatusText.textContent = this.getStatusText('playing');
                break;
                
            case 'paused':
                if (playBtn) playBtn.classList.remove('hidden');
                if (pauseBtn) pauseBtn.classList.add('hidden');
                if (stopBtn) stopBtn.classList.remove('hidden');
                if (speakBtn) {
                    speakBtn.classList.add('paused');
                    speakBtn.classList.remove('playing');
                    if (speechIcon) speechIcon.className = 'fas fa-play';
                }
                if (speechStatusText) speechStatusText.textContent = this.getStatusText('paused');
                break;
                
            case 'stopped':
            default:
                if (playBtn) playBtn.classList.remove('hidden');
                if (pauseBtn) pauseBtn.classList.add('hidden');
                if (stopBtn) stopBtn.classList.add('hidden');
                if (speakBtn) {
                    speakBtn.classList.remove('playing', 'paused');
                    if (speechIcon) speechIcon.className = 'fas fa-volume-up';
                }
                if (speechStatusText) speechStatusText.textContent = this.getStatusText('stopped');
                break;
        }
    }
    
    /**
     * Get localized status text
     */
    getStatusText(state) {
        const statusTexts = {
            en: {
                playing: 'Speaking...',
                paused: 'Paused',
                stopped: 'Listen to advice'
            },
            ms: {
                playing: 'Bercakap...',
                paused: 'Dijeda',
                stopped: 'Dengar nasihat'
            },
            'ms-kd': {
                playing: 'Bercakap...',
                paused: 'Dijeda',
                stopped: 'Dengar nasihat'
            },
            'ms-kl': {
                playing: 'Bercakap...',
                paused: 'Dijeda',
                stopped: 'Dengar nasihat'
            },
            ja: {
                playing: '話しています...',
                paused: '一時停止',
                stopped: 'アドバイスを聞く'
            }
        };
        
        const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
        const texts = statusTexts[lang] || statusTexts['en'];
        return texts[state] || texts['stopped'];
    }
    
    /**
     * Show not supported message
     */
    showNotSupported() {
        const speakBtn = document.getElementById('speakAdviceBtn');
        if (speakBtn) {
            speakBtn.style.display = 'none';
        }
        console.warn('⚠️ Speech synthesis not supported in this browser');
    }
    
    /**
     * Speak the AI expert advice
     */
    speakExpertAdvice() {
        const adviceText = document.getElementById('expertAdviceText');
        if (adviceText && adviceText.textContent) {
            const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
            
            // Check if loading message
            const loadingTexts = ['Loading AI recommendations...', 'Memuatkan cadangan AI...', 'AI推奨事項を読み込み中...'];
            if (loadingTexts.some(t => adviceText.textContent.includes(t))) {
                console.log('⚠️ Still loading, cannot speak yet');
                return false;
            }
            
            return this.speak(adviceText.textContent, lang);
        }
        return false;
    }
    
    /**
     * Speak treatment information
     */
    speakTreatment(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const items = Array.from(section.querySelectorAll('li')).map(li => li.textContent);
            const text = items.join('. ');
            const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
            return this.speak(text, lang);
        }
        return false;
    }
    
    /**
     * Speak full recommendation (advice + immediate actions)
     */
    speakFullRecommendation() {
        const adviceText = document.getElementById('expertAdviceText');
        const immediateActions = document.getElementById('immediateActions');
        
        let fullText = '';
        
        if (adviceText && adviceText.textContent) {
            fullText += adviceText.textContent + '. ';
        }
        
        if (immediateActions) {
            const items = Array.from(immediateActions.querySelectorAll('li')).map(li => li.textContent);
            if (items.length > 0) {
                const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
                const prefix = lang === 'en' ? 'Immediate actions: ' : 
                              lang === 'ja' ? '即時の対応: ' : 
                              'Tindakan segera: ';
                fullText += prefix + items.join('. ');
            }
        }
        
        if (fullText) {
            const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
            return this.speak(fullText, lang);
        }
        
        return false;
    }
    
    /**
     * Check if Web Speech API is supported
     */
    isSupported() {
        return 'speechSynthesis' in window;
    }
}

// Create global instance
let speechManager = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if ('speechSynthesis' in window) {
        speechManager = new SpeechManager();
        console.log('✅ Speech Manager ready');
        
        // Setup event listeners for speech buttons
        setupSpeechEventListeners();
    } else {
        console.warn('⚠️ Web Speech API not supported');
    }
});

/**
 * Setup speech control event listeners
 */
function setupSpeechEventListeners() {
    // Main speak button
    const speakBtn = document.getElementById('speakAdviceBtn');
    if (speakBtn) {
        speakBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (speechManager) {
                if (speechManager.isPlaying && !speechManager.isPaused) {
                    speechManager.pause();
                } else if (speechManager.isPaused) {
                    speechManager.resume();
                } else {
                    speechManager.speakFullRecommendation();
                }
            }
        });
    }
    
    // Stop button
    const stopBtn = document.getElementById('speechStopBtn');
    if (stopBtn) {
        stopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (speechManager) {
                speechManager.stop();
            }
        });
    }
}

/**
 * Global function to speak text
 */
function speakText(text, langCode) {
    if (speechManager) {
        return speechManager.speak(text, langCode);
    }
    return false;
}

/**
 * Global function to stop speech
 */
function stopSpeech() {
    if (speechManager) {
        speechManager.stop();
    }
}

/**
 * Global function to speak AI advice
 */
function speakAIAdvice() {
    if (speechManager) {
        return speechManager.speakFullRecommendation();
    }
    return false;
}

console.log('🔊 Speech module loaded');


/**
 * MyPadiCare - ElevenLabs TTS Integration
 * High-quality Text-to-Speech for AI recommendations and treatment advice
 * Supports: English, Malay, Japanese, Kedahan, Kelantanese dialects
 */

class SpeechManager {
    constructor() {
        // ElevenLabs API configuration
        this.apiKey = null;
        this.apiUrl = 'https://api.elevenlabs.io/v1/text-to-speech';
        
        // Audio player
        this.audio = null;
        this.isPlaying = false;
        this.isPaused = false;
        this.currentLanguage = 'en';
        
        // Language to voice ID mapping (ElevenLabs voices)
        // These are multilingual voices that support all languages
        this.languageVoiceMap = {
            'en': 'EXAVITQu4vr4xnSDxMaL', // Sarah - English (US) - warm, friendly female
            'ms': 'pNInz6obpgDQGcFmaJgB', // Adam - Multilingual male
            'ms-kd': 'pNInz6obpgDQGcFmaJgB', // Adam - for Kedahan dialect
            'ms-kl': 'pNInz6obpgDQGcFmaJgB', // Adam - for Kelantanese dialect
            'ja': 'pNInz6obpgDQGcFmaJgB' // Adam - multilingual supports Japanese
        };
        
        // Voice settings
        this.voiceSettings = {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true
        };
        
        // Load API key from config
        this.loadConfig();
        
        console.log('🔊 ElevenLabs Speech Manager initialized');
    }
    
    /**
     * Load configuration
     */
    loadConfig() {
        if (typeof CONFIG !== 'undefined' && CONFIG.ELEVENLABS_API_KEY) {
            this.apiKey = CONFIG.ELEVENLABS_API_KEY;
            console.log('✅ ElevenLabs API key loaded');
        } else {
            console.warn('⚠️ ElevenLabs API key not found in config');
        }
    }
    
    /**
     * Get voice ID for language
     */
    getVoiceId(langCode) {
        return this.languageVoiceMap[langCode] || this.languageVoiceMap['en'];
    }
    
    /**
     * Get language code for ElevenLabs
     */
    getLanguageCode(langCode) {
        const langMap = {
            'en': 'en',
            'ms': 'ms',
            'ms-kd': 'ms',
            'ms-kl': 'ms',
            'ja': 'ja'
        };
        return langMap[langCode] || 'en';
    }
    
    /**
     * Speak text using ElevenLabs
     * @param {string} text - Text to speak
     * @param {string} langCode - Language code (en, ms, ms-kd, ms-kl, ja)
     * @param {Object} options - Additional options
     */
    async speak(text, langCode = 'en', options = {}) {
        // Check if API key is configured
        if (!this.apiKey) {
            console.error('❌ ElevenLabs API key not configured');
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
        
        try {
            // Update UI to show loading
            this.updateUI('loading');
            
            // Get voice ID for language
            const voiceId = this.getVoiceId(langCode);
            
            // Prepare request
            const requestBody = {
                text: cleanedText,
                model_id: 'eleven_multilingual_v2',
                voice_settings: {
                    stability: options.stability || this.voiceSettings.stability,
                    similarity_boost: options.similarity_boost || this.voiceSettings.similarity_boost,
                    style: options.style || this.voiceSettings.style,
                    use_speaker_boost: options.use_speaker_boost !== undefined ? options.use_speaker_boost : this.voiceSettings.use_speaker_boost
                }
            };
            
            console.log(`🔊 Requesting TTS from ElevenLabs (voice: ${voiceId}, lang: ${langCode})...`);
            
            // Call ElevenLabs API
            const response = await fetch(`${this.apiUrl}/${voiceId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': this.apiKey
                },
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                const error = await response.text();
                throw new Error(`ElevenLabs API error: ${response.status} - ${error}`);
            }
            
            // Get audio blob
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            
            // Create audio element
            this.audio = new Audio(audioUrl);
            
            // Set up event handlers
            this.audio.onplay = () => {
                this.isPlaying = true;
                this.isPaused = false;
                this.updateUI('playing');
                console.log('🔊 Started speaking');
            };
            
            this.audio.onended = () => {
                this.isPlaying = false;
                this.isPaused = false;
                this.updateUI('stopped');
                URL.revokeObjectURL(audioUrl);
                console.log('🔊 Finished speaking');
            };
            
            this.audio.onerror = (event) => {
                this.isPlaying = false;
                this.isPaused = false;
                this.updateUI('stopped');
                URL.revokeObjectURL(audioUrl);
                console.error('❌ Audio playback error:', event);
            };
            
            this.audio.onpause = () => {
                this.isPaused = true;
                this.updateUI('paused');
                console.log('🔊 Speech paused');
            };
            
            // Play audio
            this.currentLanguage = langCode;
            await this.audio.play();
            
            return true;
            
        } catch (error) {
            console.error('❌ ElevenLabs TTS error:', error);
            this.updateUI('stopped');
            
            // Show error to user
            if (error.message.includes('401') || error.message.includes('403')) {
                this.showError('Invalid ElevenLabs API key. Please check your configuration.');
            } else if (error.message.includes('quota')) {
                this.showError('ElevenLabs quota exceeded. Please upgrade your plan or try again later.');
            } else {
                this.showError('Text-to-speech failed. Please try again.');
            }
            
            return false;
        }
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
        if (this.audio && this.isPlaying && !this.isPaused) {
            this.audio.pause();
            this.isPaused = true;
            this.updateUI('paused');
            console.log('🔊 Speech paused');
        }
    }
    
    /**
     * Resume speech
     */
    resume() {
        if (this.audio && this.isPaused) {
            this.audio.play();
            this.isPaused = false;
            this.updateUI('playing');
            console.log('🔊 Speech resumed');
        }
    }
    
    /**
     * Stop speech
     */
    stop() {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
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
            case 'loading':
                if (speakBtn) {
                    speakBtn.classList.add('loading');
                    speakBtn.disabled = true;
                    if (speechIcon) speechIcon.className = 'fas fa-spinner fa-spin';
                }
                if (speechStatusText) speechStatusText.textContent = 'Loading...';
                break;
                
            case 'playing':
                if (playBtn) playBtn.classList.add('hidden');
                if (pauseBtn) pauseBtn.classList.remove('hidden');
                if (stopBtn) stopBtn.classList.remove('hidden');
                if (speakBtn) {
                    speakBtn.classList.remove('loading');
                    speakBtn.classList.add('playing');
                    speakBtn.disabled = false;
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
                    speakBtn.classList.remove('playing', 'loading');
                    speakBtn.disabled = false;
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
                    speakBtn.classList.remove('playing', 'paused', 'loading');
                    speakBtn.disabled = false;
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
        console.warn('⚠️ ElevenLabs API key not configured');
    }
    
    /**
     * Show error message
     */
    showError(message) {
        // Create simple error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #f44336;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 400px;
            font-size: 14px;
            line-height: 1.4;
        `;
        
        errorDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; margin-left: auto;">
                    &times;
                </button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
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
     * Check if ElevenLabs is configured
     */
    isSupported() {
        return this.apiKey !== null && this.apiKey !== '';
    }
}

// Create global instance
let speechManager = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    speechManager = new SpeechManager();
    console.log('✅ ElevenLabs Speech Manager ready');
    
    // Setup event listeners for speech buttons
    setupSpeechEventListeners();
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


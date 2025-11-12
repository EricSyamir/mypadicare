/**
 * Google Gemini AI Integration
 * Generates personalized treatment recommendations
 */

class GeminiAI {
    constructor() {
        // Check if CONFIG is available
        if (typeof CONFIG === 'undefined') {
            console.error('❌ CONFIG not loaded when initializing Gemini AI');
            this.apiKey = null;
            this.apiUrl = null;
            return;
        }
        
        this.apiKey = CONFIG.GEMINI_API_KEY;
        this.apiUrl = CONFIG.GEMINI_API_URL;
        
        // Validate configuration
        if (!this.apiKey) {
            console.warn('⚠️ Gemini API key not configured');
        }
        if (!this.apiUrl) {
            console.warn('⚠️ Gemini API URL not configured');
        }
    }

    /**
     * Build prompt for Gemini AI
     */
    buildPrompt(diseaseName, severity, confidence, treatmentData, language = 'en') {
        const diseaseDisplay = diseaseName.replace(/_/g, ' ').toUpperCase();
        
        // Language-specific instructions
        const languageInstructions = {
            en: 'ANSWER IN ENGLISH.',
            ms: 'ANSWER IN MALAY LANGUAGE (Bahasa Malaysia).',
            ja: 'ANSWER IN JAPANESE (日本語).'
        };
        
        const languageInstruction = languageInstructions[language] || languageInstructions.en;
        
        const prompt = `You are an expert agricultural advisor. Give a brief, practical recommendation for a farmer.

DETECTED: ${diseaseDisplay} (${confidence.toFixed(1)}% confidence, ${severity} severity)

KEY TREATMENTS AVAILABLE:
- Immediate: ${treatmentData.immediate_actions?.slice(0, 2).join(', ')}
- Recovery time: ${treatmentData.expected_recovery}
- Cost: ${treatmentData.estimated_cost}

INSTRUCTIONS:
- Write 80-120 words maximum
- Use simple, clear language
- Focus on the most important 2-3 actions
- Be encouraging but practical
- Do NOT use asterisks, bold formatting, or special characters
- Write in plain text only
- Use a more personalized language and friendly tone and emphatatic tone as you are an agricultural advisor too.

${languageInstruction}
Provide your recommendation:`;

        return prompt;
    }

    /**
     * Call Gemini API for recommendations
     */
    async getRecommendation(diseaseName, severity, confidence, treatmentData, language = 'en') {
        try {
            console.log('🤖 Requesting AI recommendation from Gemini...');
            console.log('📊 Parameters:', { diseaseName, severity, confidence: Math.round(confidence * 100) + '%', language });
            
            // Check if API is configured
            if (!this.apiKey || !this.apiUrl) {
                throw new Error('Gemini API not properly configured');
            }
            
            // Build prompt with language support
            const prompt = this.buildPrompt(diseaseName, severity, confidence, treatmentData, language);
            
            // Prepare request body
            const requestBody = {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.5,
                    maxOutputTokens: 150,
                    topP: 0.9,
                    topK: 20
                }
            };
            
            // Make API call
            const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Extract generated text
            if (data.candidates && data.candidates.length > 0) {
                const generatedText = data.candidates[0].content.parts[0].text;
                console.log('✅ Gemini recommendation received:', generatedText.substring(0, 100) + '...');
                return generatedText.trim();
            } else {
                console.error('❌ No candidates in Gemini response:', data);
                throw new Error('No response from Gemini AI');
            }
            
        } catch (err) {
            console.error('❌ Gemini API error:', err);
            
            // Fallback to rule-based recommendation
            console.log('⚠️ Using fallback rule-based recommendation');
            return this.getFallbackRecommendation(diseaseName, severity, treatmentData, language);
        }
    }

    /**
     * Fallback recommendation if Gemini API fails
     */
    getFallbackRecommendation(diseaseName, severity, treatmentData, language = 'en') {
        const templates = {
            'bacterial_leaf_blight': {
                'High': 'Urgent action needed! Remove infected leaves and apply copper bactericide within 24 hours. Drain excess water and stop nitrogen fertilizer temporarily. Spray weekly for 2-3 weeks. Recovery expected in 7-14 days with proper treatment.',
                'Moderate': 'Apply copper bactericide and improve drainage within 24 hours. Remove infected leaves carefully and reduce nitrogen fertilizer. Recovery expected in 10-14 days with consistent treatment.',
                'Mild': 'Good news - caught early! Remove infected leaves, improve sanitation, and apply preventive bactericide once. Monitor weekly. Full recovery expected in 7-10 days.'
            },
            'blast': {
                'High': 'Critical situation! Apply Tricyclazole fungicide immediately and remove severely infected plants. Increase potassium, reduce nitrogen, and ensure good drainage. Spray every 7 days. Recovery in 14-21 days with aggressive treatment.',
                'Moderate': 'Apply Tricyclazole within 24 hours. Increase potassium while reducing nitrogen. Ensure good drainage and spray twice at 7-day intervals. Recovery expected in 14-21 days.',
                'Mild': 'Early detection is key! Apply fungicide immediately and adjust fertilization. Maintain proper water management. Recovery expected in 10-14 days with prompt treatment.'
            },
            'brown_spot': {
                'High': 'This indicates nutrient deficiency. Apply balanced NPK fertilizer and Mancozeb fungicide urgently. Ensure adequate irrigation. Recovery in 7-14 days with proper nutrition.',
                'Moderate': 'Apply balanced NPK fertilizer immediately, especially potassium. Spray Mancozeb once and ensure adequate water. Recovery in 7-10 days.',
                'Mild': 'Early nutrient imbalance detected. Apply balanced fertilizer and maintain proper watering. Consider soil testing. Quick recovery expected in 5-7 days.'
            },
            'normal': {
                'Healthy': 'Excellent! Your paddy is healthy. Continue good practices: balanced fertilization, proper water management, and regular monitoring. Keep up the great work!'
            }
        };
        
        const defaultTemplate = `${severity} severity ${diseaseName.replace(/_/g, ' ')} detected. Follow the recommended treatment protocols in the tabs below. Consult your local agricultural extension officer for specialized advice. ${treatmentData.expected_recovery || 'Monitor progress carefully.'}`;
        
        const diseaseTemplates = templates[diseaseName];
        if (diseaseTemplates && diseaseTemplates[severity]) {
            return diseaseTemplates[severity];
        }
        
        return defaultTemplate;
    }

    /**
     * Test Gemini API connection
     */
    async testConnection() {
        try {
            const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: "Say 'Hello' in one word"
                                }
                            ]
                        }
                    ]
                })
            });
            
            return response.ok;
        } catch (err) {
            return false;
        }
    }
}

// Create global Gemini instance (safely)
let geminiAI = null;

// Initialize Gemini when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        geminiAI = new GeminiAI();
        console.log('✅ Gemini AI initialized successfully');
    } catch (error) {
        console.error('❌ Failed to initialize Gemini AI:', error);
        geminiAI = null;
    }
});

// Fallback initialization if DOM already loaded
if (document.readyState === 'loading') {
    // DOM is still loading, event listener will handle it
} else {
    // DOM is already loaded
    try {
        geminiAI = new GeminiAI();
        console.log('✅ Gemini AI initialized successfully (immediate)');
    } catch (error) {
        console.error('❌ Failed to initialize Gemini AI (immediate):', error);
        geminiAI = null;
    }
}


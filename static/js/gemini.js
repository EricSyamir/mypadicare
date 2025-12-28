/**
 * Google Gemini AI Integration
 * Generates personalized treatment recommendations
 * Uses Google Gemini API
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
        this.modelName = CONFIG.GEMINI_MODEL || 'google/gemini-2.5-pro-exp-03-25';
        
        // Validate configuration
        if (!this.apiKey) {
            console.warn('⚠️ Gemini API key not configured');
        }
        if (!this.apiUrl) {
            console.warn('⚠️ Gemini API URL not configured');
        }
        
        console.log('✅ Google Gemini AI initialized');
        console.log(`🤖 Model: ${this.modelName}`);
    }

    /**
     * Build prompt for Gemini AI
     */
    buildPrompt(diseaseName, severity, confidence, treatmentData, language = 'en') {
        const diseaseDisplay = diseaseName.replace(/_/g, ' ').toUpperCase();
        
        // Language-specific instructions (including dialects)
        const languageInstructions = {
            en: 'ANSWER IN ENGLISH.',
            ms: 'ANSWER IN MALAY LANGUAGE (Bahasa Malaysia).',
            'ms-kd': 'ANSWER IN KEDAHAN DIALECT (Loghat Kedah). Use Kedahan dialect words like "hang" instead of "awak", "mek" instead of "saya", "depa" instead of "mereka", "tak" instead of "tidak". Use local Kedahan expressions and terminology.',
            'ms-kl': 'ANSWER IN KELANTANESE DIALECT (Loghat Kelantan). Use Kelantanese dialect words like "kito" instead of "kita", "dok" instead of "tidak", "gi" instead of "pergi", "doh" instead of "sudah". Use local Kelantanese expressions and terminology.',
            ja: 'ANSWER IN JAPANESE (日本語).'
        };
        
        // Handle dialects: ms-kd and ms-kl
        let languageInstruction = languageInstructions[language];
        if (!languageInstruction && language.startsWith('ms-')) {
            // Fallback to base Malay for dialects if not specifically defined
            languageInstruction = languageInstructions['ms'];
        }
        languageInstruction = languageInstruction || languageInstructions.en;
        
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
            // Check if Gemini API is disabled in admin settings
            const geminiEnabled = localStorage.getItem('mypadicare_gemini_enabled') !== 'false';
            if (!geminiEnabled) {
                console.warn('⚠️ Gemini API is disabled in admin settings');
                throw new Error('Gemini API is disabled');
            }
            
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
            
            // Make API call to Gemini
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
        // Get base language for dialect fallback
        const baseLang = language.startsWith('ms-') ? 'ms' : language;
        
        const templates = {
            en: {
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
            },
            ms: {
                'bacterial_leaf_blight': {
                    'High': 'Tindakan segera diperlukan! Buang daun yang dijangkiti dan sapukan bakterisid kuprum dalam masa 24 jam. Salirkan air berlebihan dan hentikan baja nitrogen buat sementara. Sembur setiap minggu selama 2-3 minggu. Pemulihan dijangka dalam 7-14 hari dengan rawatan yang betul.',
                    'Moderate': 'Sapukan bakterisid kuprum dan perbaiki saliran dalam masa 24 jam. Buang daun yang dijangkiti dengan berhati-hati dan kurangkan baja nitrogen. Pemulihan dijangka dalam 10-14 hari dengan rawatan konsisten.',
                    'Mild': 'Berita baik - dikesan awal! Buang daun yang dijangkiti, perbaiki sanitasi, dan sapukan bakterisid pencegahan sekali. Pantau setiap minggu. Pemulihan penuh dijangka dalam 7-10 hari.'
                },
                'blast': {
                    'High': 'Situasi kritikal! Sapukan fungisid Tricyclazole segera dan buang tanaman yang teruk dijangkiti. Tingkatkan kalium, kurangkan nitrogen, dan pastikan saliran baik. Sembur setiap 7 hari. Pemulihan dalam 14-21 hari dengan rawatan agresif.',
                    'Moderate': 'Sapukan Tricyclazole dalam masa 24 jam. Tingkatkan kalium sambil kurangkan nitrogen. Pastikan saliran baik dan sembur dua kali pada selang 7 hari. Pemulihan dijangka dalam 14-21 hari.',
                    'Mild': 'Pengesanan awal adalah kunci! Sapukan fungisid segera dan laraskan pembajaan. Kekalkan pengurusan air yang betul. Pemulihan dijangka dalam 10-14 hari dengan rawatan segera.'
                },
                'brown_spot': {
                    'High': 'Ini menunjukkan kekurangan nutrien. Sapukan baja NPK seimbang dan fungisid Mancozeb segera. Pastikan pengairan mencukupi. Pemulihan dalam 7-14 hari dengan pemakanan yang betul.',
                    'Moderate': 'Sapukan baja NPK seimbang segera, terutamanya kalium. Sembur Mancozeb sekali dan pastikan air mencukupi. Pemulihan dalam 7-10 hari.',
                    'Mild': 'Ketidakseimbangan nutrien awal dikesan. Sapukan baja seimbang dan kekalkan pengairan yang betul. Pertimbangkan ujian tanah. Pemulihan cepat dijangka dalam 5-7 hari.'
                },
                'normal': {
                    'Healthy': 'Cemerlang! Padi anda sihat. Teruskan amalan yang baik: pembajaan seimbang, pengurusan air yang betul, dan pemantauan berkala. Teruskan kerja hebat!'
                }
            },
            'ms-kd': {
                'bacterial_leaf_blight': {
                    'High': 'Tindakan segera diperlukan! Buang daun yang dijangkiti dan sapukan bakterisid kuprum dalam masa 24 jam. Salirkan air berlebihan dan hentikan baja nitrogen dulu. Sembur tiap-tiap minggu selama 2-3 minggu. Pemulihan dijangka dalam 7-14 hari kalau rawatan betul.',
                    'Moderate': 'Sapukan bakterisid kuprum dan perbaiki saliran dalam masa 24 jam. Buang daun yang dijangkiti dengan berhati-hati dan kurangkan baja nitrogen. Pemulihan dijangka dalam 10-14 hari dengan rawatan konsisten.',
                    'Mild': 'Berita baik - dikesan awal! Buang daun yang dijangkiti, perbaiki sanitasi, dan sapukan bakterisid pencegahan sekali. Pantau tiap-tiap minggu. Pemulihan penuh dijangka dalam 7-10 hari.'
                },
                'blast': {
                    'High': 'Situasi kritikal! Sapukan fungisid Tricyclazole segera dan buang tanaman yang teruk dijangkiti. Tingkatkan kalium, kurangkan nitrogen, dan pastikan saliran baik. Sembur tiap-tiap 7 hari. Pemulihan dalam 14-21 hari dengan rawatan agresif.',
                    'Moderate': 'Sapukan Tricyclazole dalam masa 24 jam. Tingkatkan kalium sambil kurangkan nitrogen. Pastikan saliran baik dan sembur dua kali pada selang 7 hari. Pemulihan dijangka dalam 14-21 hari.',
                    'Mild': 'Pengesanan awal adalah kunci! Sapukan fungisid segera dan laraskan pembajaan. Kekalkan pengurusan air yang betul. Pemulihan dijangka dalam 10-14 hari dengan rawatan segera.'
                },
                'brown_spot': {
                    'High': 'Ni tunjukkan kekurangan nutrien. Sapukan baja NPK seimbang dan fungisid Mancozeb segera. Pastikan pengairan cukup. Pemulihan dalam 7-14 hari kalau pemakanan betul.',
                    'Moderate': 'Sapukan baja NPK seimbang segera, terutama kalium. Sembur Mancozeb sekali dan pastikan air cukup. Pemulihan dalam 7-10 hari.',
                    'Mild': 'Ketidakseimbangan nutrien awal dikesan. Sapukan baja seimbang dan kekalkan pengairan yang betul. Pertimbangkan ujian tanah. Pemulihan cepat dijangka dalam 5-7 hari.'
                },
                'normal': {
                    'Healthy': 'Cemerlang! Padi hang sihat. Teruskan amalan yang baik: pembajaan seimbang, pengurusan air yang betul, dan pemantauan berkala. Teruskan kerja hebat hang!'
                }
            },
            'ms-kl': {
                'bacterial_leaf_blight': {
                    'High': 'Tindakan segera diperlukan! Buang daun yang dijangkiti dan sapukan bakterisid kuprum dalam masa 24 jam. Salirkan air berlebihan dan hentikan baja nitrogen dulu. Sembur tiap-tiap minggu selama 2-3 minggu. Pemulihan dijangka dalam 7-14 hari kalau rawatan betul.',
                    'Moderate': 'Sapukan bakterisid kuprum dan perbaiki saliran dalam masa 24 jam. Buang daun yang dijangkiti dengan berhati-hati dan kurangkan baja nitrogen. Pemulihan dijangka dalam 10-14 hari dengan rawatan konsisten.',
                    'Mild': 'Berita baik - dikesan awal! Buang daun yang dijangkiti, perbaiki sanitasi, dan sapukan bakterisid pencegahan sekali. Pantau tiap-tiap minggu. Pemulihan penuh dijangka dalam 7-10 hari.'
                },
                'blast': {
                    'High': 'Situasi kritikal! Sapukan fungisid Tricyclazole segera dan buang tanaman yang teruk dijangkiti. Tingkatkan kalium, kurangkan nitrogen, dan pastikan saliran baik. Sembur tiap-tiap 7 hari. Pemulihan dalam 14-21 hari dengan rawatan agresif.',
                    'Moderate': 'Sapukan Tricyclazole dalam masa 24 jam. Tingkatkan kalium sambil kurangkan nitrogen. Pastikan saliran baik dan sembur dua kali pada selang 7 hari. Pemulihan dijangka dalam 14-21 hari.',
                    'Mild': 'Pengesanan awal adalah kunci! Sapukan fungisid segera dan laraskan pembajaan. Kekalkan pengurusan air yang betul. Pemulihan dijangka dalam 10-14 hari dengan rawatan segera.'
                },
                'brown_spot': {
                    'High': 'Ni tunjukkan kekurangan nutrien. Sapukan baja NPK seimbang dan fungisid Mancozeb segera. Pastikan pengairan cukup. Pemulihan dalam 7-14 hari kalau pemakanan betul.',
                    'Moderate': 'Sapukan baja NPK seimbang segera, terutama kalium. Sembur Mancozeb sekali dan pastikan air cukup. Pemulihan dalam 7-10 hari.',
                    'Mild': 'Ketidakseimbangan nutrien awal dikesan. Sapukan baja seimbang dan kekalkan pengairan yang betul. Pertimbangkan ujian tanah. Pemulihan cepat dijangka dalam 5-7 hari.'
                },
                'normal': {
                    'Healthy': 'Cemerlang! Padi kito sihat. Teruskan amalan yang baik: pembajaan seimbang, pengurusan air yang betul, dan pemantauan berkala. Teruskan kerja hebat kito!'
                }
            },
            ja: {
                'bacterial_leaf_blight': {
                    'High': '緊急対応が必要です！感染した葉を取り除き、24時間以内に銅殺菌剤を塗布してください。余分な水を排出し、窒素肥料を一時的に停止します。2〜3週間、毎週散布してください。適切な治療で7〜14日で回復が期待されます。',
                    'Moderate': '24時間以内に銅殺菌剤を塗布し、排水を改善してください。感染した葉を慎重に取り除き、窒素肥料を減らします。一貫した治療で10〜14日で回復が期待されます。',
                    'Mild': '良いニュース - 早期発見！感染した葉を取り除き、衛生を改善し、予防殺菌剤を一度塗布してください。毎週監視します。7〜10日で完全な回復が期待されます。'
                },
                'blast': {
                    'High': '危機的状況！直ちにトリシクラゾール殺菌剤を塗布し、重度に感染した植物を取り除きます。カリウムを増やし、窒素を減らし、良好な排水を確保してください。7日ごとに散布します。積極的な治療で14〜21日で回復します。',
                    'Moderate': '24時間以内にトリシクラゾールを塗布してください。窒素を減らしながらカリウムを増やします。良好な排水を確保し、7日間隔で2回散布します。14〜21日で回復が期待されます。',
                    'Mild': '早期発見が鍵です！直ちに殺菌剤を塗布し、施肥を調整してください。適切な水管理を維持します。迅速な治療で10〜14日で回復が期待されます。'
                },
                'brown_spot': {
                    'High': 'これは栄養不足を示しています。バランスの取れたNPK肥料とマンコゼブ殺菌剤を緊急に塗布してください。十分な灌漑を確保します。適切な栄養で7〜14日で回復します。',
                    'Moderate': '直ちにバランスの取れたNPK肥料、特にカリウムを塗布してください。マンコゼブを一度散布し、十分な水を確保します。7〜10日で回復します。',
                    'Mild': '早期の栄養不均衡が検出されました。バランスの取れた肥料を塗布し、適切な水やりを維持します。土壌テストを検討してください。5〜7日で迅速な回復が期待されます。'
                },
                'normal': {
                    'Healthy': '素晴らしい！稲は健康です。良い実践を続けてください：バランスの取れた施肥、適切な水管理、定期的な監視。素晴らしい仕事を続けてください！'
                }
            }
        };
        
        // Try to get templates for specific language, then fallback
        let langTemplates = templates[language] || templates[baseLang] || templates['en'];
        const diseaseTemplates = langTemplates[diseaseName];
        
        if (diseaseTemplates && diseaseTemplates[severity]) {
            return diseaseTemplates[severity];
        }
        
        // Default fallback with language consideration
        const defaultTemplates = {
            en: `${severity} severity ${diseaseName.replace(/_/g, ' ')} detected. Follow the recommended treatment protocols in the tabs below. Consult your local agricultural extension officer for specialized advice. ${treatmentData.expected_recovery || 'Monitor progress carefully.'}`,
            ms: `${severity} keparahan ${diseaseName.replace(/_/g, ' ')} dikesan. Ikuti protokol rawatan yang disyorkan di tab di bawah. Rujuk pegawai penyuluhan pertanian tempatan anda untuk nasihat khusus. ${treatmentData.expected_recovery || 'Pantau kemajuan dengan teliti.'}`,
            'ms-kd': `${severity} keparahan ${diseaseName.replace(/_/g, ' ')} dikesan. Ikut protokol rawatan yang disyorkan kat tab bawah ni. Rujuk pegawai penyuluhan pertanian tempatan hang untuk nasihat khusus. ${treatmentData.expected_recovery || 'Pantau kemajuan dengan teliti.'}`,
            'ms-kl': `${severity} keparahan ${diseaseName.replace(/_/g, ' ')} dikesan. Ikut protokol rawatan yang disyorkan kat tab bawah ni. Rujuk pegawai penyuluhan pertanian tempatan kito untuk nasihat khusus. ${treatmentData.expected_recovery || 'Pantau kemajuan dengan teliti.'}`,
            ja: `${severity} 重症度の${diseaseName.replace(/_/g, ' ')}が検出されました。以下のタブで推奨される治療プロトコルに従ってください。専門的なアドバイスについては、地域の農業普及員に相談してください。${treatmentData.expected_recovery || '進捗を注意深く監視してください。'}`
        };
        
        return defaultTemplates[language] || defaultTemplates[baseLang] || defaultTemplates['en'];
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


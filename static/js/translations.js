/**
 * MyPadiCare - Multilingual Translation System
 * Supports: English, Malay (Bahasa Malaysia), Japanese, Kedahan Dialect, Kelantanese Dialect
 */

const translations = {
    en: {
        // App basics
        appName: "MyPadiCare",
        appSubtitle: "AI Disease Detection",
        
        // Header
        selectLanguage: "Select Language",
        
        // Home Screen
        diseaseDetection: "Disease Detection",
        uploadDescription: "Upload a photo of your paddy leaf and get instant AI-powered disease detection with treatment recommendations.",
        accuracy: "Accuracy",
        diseases: "Diseases",
        private: "Private",
        uploadLeafImage: "Upload Leaf Image",
        tapToSelect: "Tap to select or take a photo",
        selectFromGallery: "Select from Gallery",
        takePhoto: "Take Photo",
        analyzeImage: "Analyze Image",
        changeImage: "Change Image",
        
        // Results Screen
        analyzing: "Analyzing...",
        analyzingImage: "Analyzing image...",
        analyzedImage: "Analyzed Image",
        detectionResults: "Detection Results",
        confidenceLevel: "Confidence Level",
        whyThisHappens: "Why This Happens",
        wasThisHelpful: "Was this helpful?",
        viewTreatment: "View Treatment",
        analyzeAnother: "Analyze Another Image",
        
        // Treatment Screen
        aiExpertAdvice: "AI Expert Advice",
        poweredBy: "Powered by Google Gemini",
        loadingAI: "Loading AI recommendations...",
        immediate: "Immediate",
        shortTerm: "Short-term",
        longTerm: "Long-term",
        materials: "Materials",
        
        // Treatment sections
        immediateActions: "Immediate Actions",
        warningSigns: "Warning Signs",
        shortTermManagement: "Short-term Management",
        organicOptions: "Organic Options",
        chemicalOptions: "Chemical Options",
        longTermPrevention: "Long-term Prevention",
        culturalPractices: "Cultural Practices",
        materialsNeeded: "Materials Needed",
        estimatedCost: "Estimated Cost:",
        expectedRecovery: "Expected Recovery:",
        backToResults: "Back to Results",
        
        // How It Works
        howItWorks: "How It Works",
        howItWorksDesc: "Our AI-powered system detects paddy diseases in 4 simple steps:",
        step1Title: "Capture Image",
        step1Desc: "Take a clear photo of the affected paddy leaf",
        step2Title: "AI Analysis",
        step2Desc: "TensorFlow.js analyzes the image with 90% accuracy",
        step3Title: "Get Results",
        step3Desc: "Instant disease detection with confidence score",
        step4Title: "AI Recommendations",
        step4Desc: "Google Gemini AI provides treatment advice",
        keyFeatures: "Key Features",
        feature1Title: "100% Private",
        feature1Desc: "No data uploaded",
        feature2Title: "Works Offline",
        feature2Desc: "No internet needed",
        feature3Title: "Mobile First",
        feature3Desc: "Optimized for phones",
        feature4Title: "Instant Results",
        feature4Desc: "Real-time analysis",
        
        // Disease names for About section
        healthyLeafDetection: "Healthy Leaf Detection",
        
        // About Screen
        about: "About",
        aboutMyPadiCare: "About MyPadiCare",
        aboutDescription: "MyPadiCare is a 100% client-side AI disease detection system that runs entirely in your browser. Using TensorFlow.js and Google Gemini AI, we achieve 90% accuracy in detecting 10 common paddy diseases. Your images never leave your device.",
        privacyFirst: "Privacy First",
        privacyDescription: "All processing happens in your browser. Your images are never uploaded to any server.",
        detectedDiseases: "Detected Diseases",
        technologyStack: "Technology Stack",
        tensorFlowDesc: "Client-side ML",
        geminiDesc: "AI Recommendations",
        
        // Navigation
        home: "Home",
        
        // Feedback
        feedbackThanks: "Thank you for your feedback!",
        feedbackAppreciate: "We appreciate your feedback",
        
        // Errors
        noFileSelected: "No file selected.",
        fileTooLarge: "File too large. Maximum size is 10MB.",
        unsupportedFileType: "Unsupported file type. Please select JPG, PNG, or WEBP.",
        invalidFileExtension: "Invalid file extension. Please select a .jpg, .png, or .webp file.",
        analysisFailed: "Analysis failed",
        pleaseUploadFirst: "Please upload an image first.",
        
        // Disease names
        bacterial_leaf_blight: "Bacterial Leaf Blight",
        bacterial_leaf_streak: "Bacterial Leaf Streak",
        bacterial_panicle_blight: "Bacterial Panicle Blight",
        blast: "Blast",
        brown_spot: "Brown Spot",
        dead_heart: "Dead Heart",
        downy_mildew: "Downy Mildew",
        hispa: "Hispa",
        tungro: "Tungro",
        normal: "Healthy Leaf",
        
        // Severity
        healthy: "Healthy",
        high: "High",
        moderate: "Moderate",
        low: "Low",
        
        // Tutorial
        tutorialWelcome: "Welcome to MyPadiCare!",
        tutorialQuestion: "Is this your first time using this app?",
        tutorialYes: "Yes, show me how",
        tutorialNo: "No, let me start",
        tutorialSkip: "Skip Tutorial",
        tutorialNext: "Next",
        tutorialPrevious: "Previous",
        tutorialFinish: "Get Started",
        
        tutorialStep1Title: "Choose Your Language",
        tutorialStep1Desc: "Select your preferred language from the language button in the top right corner. MyPadiCare supports English, Bahasa Malaysia, and Japanese.",
        
        tutorialStep2Title: "Upload a Photo",
        tutorialStep2Desc: "Take a clear photo of your paddy leaf or select one from your gallery. Make sure the leaf is well-lit and the symptoms are visible.",
        
        tutorialStep3Title: "Get Instant Results",
        tutorialStep3Desc: "Our AI will analyze your photo and identify any diseases. You'll see the disease name, confidence level, and detailed treatment recommendations powered by Google Gemini AI.",
        
        tutorialStep4Title: "View Treatment Plans",
        tutorialStep4Desc: "Browse through immediate actions, short-term and long-term treatments. All recommendations are tailored to help you save your crops!"
    },
    
    ms: {
        // App basics
        appName: "MyPadiCare",
        appSubtitle: "Pengesanan Penyakit AI",
        
        // Header
        selectLanguage: "Pilih Bahasa",
        
        // Home Screen
        diseaseDetection: "Pengesanan Penyakit",
        uploadDescription: "Muat naik foto daun padi anda dan dapatkan pengesanan penyakit berkuasa AI dengan cadangan rawatan segera.",
        accuracy: "Ketepatan",
        diseases: "Penyakit",
        private: "Peribadi",
        uploadLeafImage: "Muat Naik Gambar Daun",
        tapToSelect: "Tekan untuk pilih atau ambil foto",
        selectFromGallery: "Pilih dari Galeri",
        takePhoto: "Ambil Foto",
        analyzeImage: "Analisis Gambar",
        changeImage: "Tukar Gambar",
        
        // Results Screen
        analyzing: "Menganalisis...",
        analyzingImage: "Menganalisis gambar...",
        analyzedImage: "Gambar Dianalisis",
        detectionResults: "Keputusan Pengesanan",
        confidenceLevel: "Tahap Keyakinan",
        whyThisHappens: "Mengapa Ini Berlaku",
        wasThisHelpful: "Adakah ini membantu?",
        viewTreatment: "Lihat Rawatan",
        analyzeAnother: "Analisis Gambar Lain",
        
        // Treatment Screen
        aiExpertAdvice: "Nasihat Pakar AI",
        poweredBy: "Dikuasakan oleh Google Gemini",
        loadingAI: "Memuatkan cadangan AI...",
        immediate: "Segera",
        shortTerm: "Jangka Pendek",
        longTerm: "Jangka Panjang",
        materials: "Bahan",
        
        // Treatment sections
        immediateActions: "Tindakan Segera",
        warningSigns: "Tanda Amaran",
        shortTermManagement: "Pengurusan Jangka Pendek",
        organicOptions: "Pilihan Organik",
        chemicalOptions: "Pilihan Kimia",
        longTermPrevention: "Pencegahan Jangka Panjang",
        culturalPractices: "Amalan Budaya",
        materialsNeeded: "Bahan Diperlukan",
        estimatedCost: "Anggaran Kos:",
        expectedRecovery: "Jangkaan Pemulihan:",
        backToResults: "Kembali ke Keputusan",
        
        // How It Works
        howItWorks: "Cara Ia Berfungsi",
        howItWorksDesc: "Sistem berkuasa AI kami mengesan penyakit padi dalam 4 langkah mudah:",
        step1Title: "Ambil Gambar",
        step1Desc: "Ambil foto yang jelas pada daun padi yang terjejas",
        step2Title: "Analisis AI",
        step2Desc: "TensorFlow.js menganalisis gambar dengan ketepatan 90%",
        step3Title: "Dapatkan Keputusan",
        step3Desc: "Pengesanan penyakit segera dengan skor keyakinan",
        step4Title: "Cadangan AI",
        step4Desc: "Google Gemini AI menyediakan nasihat rawatan",
        keyFeatures: "Ciri Utama",
        feature1Title: "100% Peribadi",
        feature1Desc: "Tiada data dimuat naik",
        feature2Title: "Berfungsi Luar Talian",
        feature2Desc: "Tidak perlu internet",
        feature3Title: "Utamakan Mudah Alih",
        feature3Desc: "Dioptimumkan untuk telefon",
        feature4Title: "Keputusan Segera",
        feature4Desc: "Analisis masa nyata",
        
        // Disease names for About section
        healthyLeafDetection: "Pengesanan Daun Sihat",
        
        // About Screen
        about: "Perihal",
        aboutMyPadiCare: "Perihal MyPadiCare",
        aboutDescription: "MyPadiCare adalah sistem pengesanan penyakit AI 100% dari sisi pelanggan yang berjalan sepenuhnya di pelayar anda. Menggunakan TensorFlow.js dan Google Gemini AI, kami mencapai ketepatan 90% dalam mengesan 10 penyakit padi biasa. Gambar anda tidak akan meninggalkan peranti anda.",
        privacyFirst: "Privasi Utama",
        privacyDescription: "Semua pemprosesan berlaku di pelayar anda. Gambar anda tidak pernah dimuat naik ke mana-mana pelayan.",
        detectedDiseases: "Penyakit Yang Dikesan",
        technologyStack: "Susunan Teknologi",
        tensorFlowDesc: "ML sisi pelanggan",
        geminiDesc: "Cadangan AI",
        
        // Navigation
        home: "Utama",
        
        // Feedback
        feedbackThanks: "Terima kasih atas maklum balas anda!",
        feedbackAppreciate: "Kami menghargai maklum balas anda",
        
        // Errors
        noFileSelected: "Tiada fail dipilih.",
        fileTooLarge: "Fail terlalu besar. Saiz maksimum ialah 10MB.",
        unsupportedFileType: "Jenis fail tidak disokong. Sila pilih JPG, PNG, atau WEBP.",
        invalidFileExtension: "Sambungan fail tidak sah. Sila pilih fail .jpg, .png, atau .webp.",
        analysisFailed: "Analisis gagal",
        pleaseUploadFirst: "Sila muat naik gambar terlebih dahulu.",
        
        // Disease names
        bacterial_leaf_blight: "Hawar Daun Bakteria",
        bacterial_leaf_streak: "Jalur Daun Bakteria",
        bacterial_panicle_blight: "Hawar Malai Bakteria",
        blast: "Penyakit Blast",
        brown_spot: "Bintik Coklat",
        dead_heart: "Jantung Mati",
        downy_mildew: "Kudis Bulu",
        hispa: "Hispa",
        tungro: "Tungro",
        normal: "Daun Sihat",
        
        // Severity
        healthy: "Sihat",
        high: "Tinggi",
        moderate: "Sederhana",
        low: "Rendah",
        
        // Tutorial
        tutorialWelcome: "Selamat datang ke MyPadiCare!",
        tutorialQuestion: "Adakah ini kali pertama anda menggunakan aplikasi ini?",
        tutorialYes: "Ya, tunjukkan saya",
        tutorialNo: "Tidak, saya mahu mula",
        tutorialSkip: "Langkau Tutorial",
        tutorialNext: "Seterusnya",
        tutorialPrevious: "Sebelumnya",
        tutorialFinish: "Mulakan",
        
        tutorialStep1Title: "Pilih Bahasa Anda",
        tutorialStep1Desc: "Pilih bahasa pilihan anda dari butang bahasa di penjuru kanan atas. MyPadiCare menyokong Bahasa Inggeris, Bahasa Malaysia, dan Bahasa Jepun.",
        
        tutorialStep2Title: "Muat Naik Foto",
        tutorialStep2Desc: "Ambil foto yang jelas pada daun padi anda atau pilih satu dari galeri anda. Pastikan daun mempunyai pencahayaan yang baik dan gejala dapat dilihat dengan jelas.",
        
        tutorialStep3Title: "Dapatkan Keputusan Segera",
        tutorialStep3Desc: "AI kami akan menganalisis foto anda dan mengenal pasti sebarang penyakit. Anda akan melihat nama penyakit, tahap keyakinan, dan cadangan rawatan terperinci dikuasakan oleh Google Gemini AI.",
        
        tutorialStep4Title: "Lihat Pelan Rawatan",
        tutorialStep4Desc: "Semak tindakan segera, rawatan jangka pendek dan jangka panjang. Semua cadangan disesuaikan untuk membantu anda menyelamatkan tanaman anda!"
    },
    
    ja: {
        // App basics
        appName: "MyPadiCare",
        appSubtitle: "AI病気検出",
        
        // Header
        selectLanguage: "言語を選択",
        
        // Home Screen
        diseaseDetection: "病気検出",
        uploadDescription: "稲の葉の写真をアップロードして、AI搭載の病気検出と治療の推奨事項を即座に取得します。",
        accuracy: "精度",
        diseases: "病気",
        private: "プライベート",
        uploadLeafImage: "葉の画像をアップロード",
        tapToSelect: "タップして選択または写真を撮影",
        selectFromGallery: "ギャラリーから選択",
        takePhoto: "写真を撮る",
        analyzeImage: "画像を分析",
        changeImage: "画像を変更",
        
        // Results Screen
        analyzing: "分析中...",
        analyzingImage: "画像を分析中...",
        analyzedImage: "分析された画像",
        detectionResults: "検出結果",
        confidenceLevel: "信頼度レベル",
        whyThisHappens: "なぜこれが起こるのか",
        wasThisHelpful: "これは役に立ちましたか？",
        viewTreatment: "治療を表示",
        analyzeAnother: "別の画像を分析",
        
        // Treatment Screen
        aiExpertAdvice: "AI専門家のアドバイス",
        poweredBy: "Google Geminiを搭載",
        loadingAI: "AI推奨事項を読み込み中...",
        immediate: "即時",
        shortTerm: "短期",
        longTerm: "長期",
        materials: "材料",
        
        // Treatment sections
        immediateActions: "即時の対応",
        warningSigns: "警告サイン",
        shortTermManagement: "短期管理",
        organicOptions: "有機オプション",
        chemicalOptions: "化学オプション",
        longTermPrevention: "長期予防",
        culturalPractices: "栽培方法",
        materialsNeeded: "必要な材料",
        estimatedCost: "推定コスト：",
        expectedRecovery: "予想回復期間：",
        backToResults: "結果に戻る",
        
        // How It Works
        howItWorks: "仕組み",
        howItWorksDesc: "当社のAI搭載システムは、4つの簡単なステップで稲の病気を検出します：",
        step1Title: "画像を撮影",
        step1Desc: "影響を受けた稲の葉の鮮明な写真を撮る",
        step2Title: "AI分析",
        step2Desc: "TensorFlow.jsが90%の精度で画像を分析",
        step3Title: "結果を取得",
        step3Desc: "信頼度スコア付きの即時病気検出",
        step4Title: "AI推奨事項",
        step4Desc: "Google Gemini AIが治療のアドバイスを提供",
        keyFeatures: "主な機能",
        feature1Title: "100%プライベート",
        feature1Desc: "データはアップロードされません",
        feature2Title: "オフラインで動作",
        feature2Desc: "インターネット不要",
        feature3Title: "モバイルファースト",
        feature3Desc: "スマートフォン最適化",
        feature4Title: "即時結果",
        feature4Desc: "リアルタイム分析",
        
        // Disease names for About section
        healthyLeafDetection: "健康な葉の検出",
        
        // About Screen
        about: "について",
        aboutMyPadiCare: "MyPadiCareについて",
        aboutDescription: "MyPadiCareは、ブラウザで完全に動作する100%クライアント側のAI病気検出システムです。TensorFlow.jsとGoogle Gemini AIを使用して、10種類の一般的な稲の病気を90%の精度で検出します。画像はデバイスから離れることはありません。",
        privacyFirst: "プライバシー優先",
        privacyDescription: "すべての処理はブラウザで行われます。画像はサーバーにアップロードされることはありません。",
        detectedDiseases: "検出された病気",
        technologyStack: "技術スタック",
        tensorFlowDesc: "クライアント側ML",
        geminiDesc: "AI推奨事項",
        
        // Navigation
        home: "ホーム",
        
        // Feedback
        feedbackThanks: "フィードバックありがとうございます！",
        feedbackAppreciate: "フィードバックに感謝します",
        
        // Errors
        noFileSelected: "ファイルが選択されていません。",
        fileTooLarge: "ファイルが大きすぎます。最大サイズは10MBです。",
        unsupportedFileType: "サポートされていないファイルタイプ。JPG、PNG、またはWEBPを選択してください。",
        invalidFileExtension: "無効なファイル拡張子。.jpg、.png、または.webpファイルを選択してください。",
        analysisFailed: "分析失敗",
        pleaseUploadFirst: "最初に画像をアップロードしてください。",
        
        // Disease names
        bacterial_leaf_blight: "細菌性葉枯病",
        bacterial_leaf_streak: "細菌性条斑病",
        bacterial_panicle_blight: "細菌性穂枯病",
        blast: "いもち病",
        brown_spot: "褐斑病",
        dead_heart: "芯枯れ",
        downy_mildew: "べと病",
        hispa: "イネヒメハモグリバエ",
        tungro: "ツングロ病",
        normal: "健康な葉",
        
        // Severity
        healthy: "健康",
        high: "高",
        moderate: "中",
        low: "低",
        
        // Tutorial
        tutorialWelcome: "MyPadiCareへようこそ！",
        tutorialQuestion: "このアプリを初めて使用しますか？",
        tutorialYes: "はい、使い方を教えてください",
        tutorialNo: "いいえ、始めます",
        tutorialSkip: "チュートリアルをスキップ",
        tutorialNext: "次へ",
        tutorialPrevious: "前へ",
        tutorialFinish: "始める",
        
        tutorialStep1Title: "言語を選択",
        tutorialStep1Desc: "右上の言語ボタンから希望の言語を選択してください。MyPadiCareは英語、マレー語、日本語をサポートしています。",
        
        tutorialStep2Title: "写真をアップロード",
        tutorialStep2Desc: "稲の葉の鮮明な写真を撮るか、ギャラリーから選択してください。葉が十分に照らされ、症状が見えるようにしてください。",
        
        tutorialStep3Title: "即時結果を取得",
        tutorialStep3Desc: "当社のAIが写真を分析し、病気を特定します。病気の名前、信頼度レベル、Google Gemini AIによる詳細な治療推奨事項が表示されます。",
        
        tutorialStep4Title: "治療計画を表示",
        tutorialStep4Desc: "即時の対応、短期および長期の治療を参照してください。すべての推奨事項は、作物を救うのに役立つようにカスタマイズされています！"
    },
    
    'ms-kd': {
        // Kedahan Dialect (Loghat Kedah)
        appName: "MyPadiCare",
        appSubtitle: "Pengesanan Penyakit AI",
        selectLanguage: "Pilih Bahasa",
        diseaseDetection: "Pengesanan Penyakit",
        uploadDescription: "Muat naik gambar daun padi hang dan dapatkan pengesanan penyakit berkuasa AI dengan cadangan rawatan segera.",
        accuracy: "Ketepatan",
        diseases: "Penyakit",
        private: "Peribadi",
        uploadLeafImage: "Muat Naik Gambar Daun",
        tapToSelect: "Tekan untuk pilih atau ambil gambar",
        selectFromGallery: "Pilih dari Galeri",
        takePhoto: "Ambil Gambar",
        analyzeImage: "Analisis Gambar",
        changeImage: "Tukar Gambar",
        analyzing: "Menganalisis...",
        analyzingImage: "Menganalisis gambar...",
        analyzedImage: "Gambar Dianalisis",
        detectionResults: "Keputusan Pengesanan",
        confidenceLevel: "Tahap Keyakinan",
        whyThisHappens: "Kenapa Ni Boleh Jadi",
        wasThisHelpful: "Ni membantu tak?",
        viewTreatment: "Tengok Rawatan",
        analyzeAnother: "Analisis Gambar Lain",
        aiExpertAdvice: "Nasihat Pakar AI",
        poweredBy: "Dikuasakan oleh Google Gemini",
        loadingAI: "Memuatkan cadangan AI...",
        immediate: "Segera",
        shortTerm: "Jangka Pendek",
        longTerm: "Jangka Panjang",
        materials: "Bahan",
        immediateActions: "Tindakan Segera",
        warningSigns: "Tanda Amaran",
        shortTermManagement: "Pengurusan Jangka Pendek",
        organicOptions: "Pilihan Organik",
        chemicalOptions: "Pilihan Kimia",
        longTermPrevention: "Pencegahan Jangka Panjang",
        culturalPractices: "Amalan Budaya",
        materialsNeeded: "Bahan Diperlukan",
        estimatedCost: "Anggaran Kos:",
        expectedRecovery: "Jangkaan Pemulihan:",
        backToResults: "Balik ke Keputusan",
        howItWorks: "Cara Ia Berfungsi",
        howItWorksDesc: "Sistem berkuasa AI kami mengesan penyakit padi dalam 4 langkah mudah:",
        step1Title: "Ambil Gambar",
        step1Desc: "Ambil gambar yang jelas pada daun padi yang terjejas",
        step2Title: "Analisis AI",
        step2Desc: "TensorFlow.js menganalisis gambar dengan ketepatan 90%",
        step3Title: "Dapatkan Keputusan",
        step3Desc: "Pengesanan penyakit segera dengan skor keyakinan",
        step4Title: "Cadangan AI",
        step4Desc: "Google Gemini AI menyediakan nasihat rawatan",
        keyFeatures: "Ciri Utama",
        feature1Title: "100% Peribadi",
        feature1Desc: "Tiada data dimuat naik",
        feature2Title: "Berfungsi Luar Talian",
        feature2Desc: "Tak perlu internet",
        feature3Title: "Utamakan Mudah Alih",
        feature3Desc: "Dioptimumkan untuk telefon",
        feature4Title: "Keputusan Segera",
        feature4Desc: "Analisis masa nyata",
        healthyLeafDetection: "Pengesanan Daun Sihat",
        about: "Perihal",
        aboutMyPadiCare: "Perihal MyPadiCare",
        aboutDescription: "MyPadiCare adalah sistem pengesanan penyakit AI 100% dari sisi pelanggan yang berjalan sepenuhnya di pelayar hang. Menggunakan TensorFlow.js dan Google Gemini AI, kami mencapai ketepatan 90% dalam mengesan 10 penyakit padi biasa. Gambar hang tak akan meninggalkan peranti hang.",
        privacyFirst: "Privasi Utama",
        privacyDescription: "Semua pemprosesan berlaku di pelayar hang. Gambar hang tak pernah dimuat naik ke mana-mana pelayan.",
        detectedDiseases: "Penyakit Yang Dikesan",
        technologyStack: "Susunan Teknologi",
        tensorFlowDesc: "ML sisi pelanggan",
        geminiDesc: "Cadangan AI",
        home: "Utama",
        feedbackThanks: "Terima kasih atas maklum balas hang!",
        feedbackAppreciate: "Kami menghargai maklum balas hang",
        noFileSelected: "Tiada fail dipilih.",
        fileTooLarge: "Fail terlalu besar. Saiz maksimum ialah 10MB.",
        unsupportedFileType: "Jenis fail tak disokong. Sila pilih JPG, PNG, atau WEBP.",
        invalidFileExtension: "Sambungan fail tak sah. Sila pilih fail .jpg, .png, atau .webp.",
        analysisFailed: "Analisis gagal",
        pleaseUploadFirst: "Sila muat naik gambar dulu.",
        bacterial_leaf_blight: "Hawar Daun Bakteria",
        bacterial_leaf_streak: "Jalur Daun Bakteria",
        bacterial_panicle_blight: "Hawar Malai Bakteria",
        blast: "Penyakit Blast",
        brown_spot: "Bintik Coklat",
        dead_heart: "Jantung Mati",
        downy_mildew: "Kudis Bulu",
        hispa: "Hispa",
        tungro: "Tungro",
        normal: "Daun Sihat",
        healthy: "Sihat",
        high: "Tinggi",
        moderate: "Sederhana",
        low: "Rendah",
        tutorialWelcome: "Selamat datang ke MyPadiCare!",
        tutorialQuestion: "Ni kali pertama hang guna aplikasi ni ke?",
        tutorialYes: "Ya, tunjukkan saya",
        tutorialNo: "Tak, saya nak mula",
        tutorialSkip: "Langkau Tutorial",
        tutorialNext: "Seterusnya",
        tutorialPrevious: "Sebelumnya",
        tutorialFinish: "Mulakan",
        tutorialStep1Title: "Pilih Bahasa Hang",
        tutorialStep1Desc: "Pilih bahasa pilihan hang dari butang bahasa di penjuru kanan atas. MyPadiCare menyokong Bahasa Inggeris, Bahasa Malaysia, Bahasa Jepun, Loghat Kedah, dan Loghat Kelantan.",
        tutorialStep2Title: "Muat Naik Gambar",
        tutorialStep2Desc: "Ambil gambar yang jelas pada daun padi hang atau pilih satu dari galeri hang. Pastikan daun ada pencahayaan yang baik dan gejala boleh nampak dengan jelas.",
        tutorialStep3Title: "Dapatkan Keputusan Segera",
        tutorialStep3Desc: "AI kami akan menganalisis gambar hang dan kenal pasti sebarang penyakit. Hang akan nampak nama penyakit, tahap keyakinan, dan cadangan rawatan terperinci dikuasakan oleh Google Gemini AI.",
        tutorialStep4Title: "Tengok Pelan Rawatan",
        tutorialStep4Desc: "Semak tindakan segera, rawatan jangka pendek dan jangka panjang. Semua cadangan disesuaikan untuk membantu hang selamatkan tanaman hang!"
    },
    
    'ms-kl': {
        // Kelantanese Dialect (Loghat Kelantan)
        appName: "MyPadiCare",
        appSubtitle: "Pengesanan Penyakit AI",
        selectLanguage: "Pilih Bahasa",
        diseaseDetection: "Pengesanan Penyakit",
        uploadDescription: "Muat naik gambar daun padi kito dan dapatkan pengesanan penyakit berkuasa AI dengan cadangan rawatan segera.",
        accuracy: "Ketepatan",
        diseases: "Penyakit",
        private: "Peribadi",
        uploadLeafImage: "Muat Naik Gambar Daun",
        tapToSelect: "Tekan untuk pilih atau ambil gambar",
        selectFromGallery: "Pilih dari Galeri",
        takePhoto: "Ambil Gambar",
        analyzeImage: "Analisis Gambar",
        changeImage: "Tukar Gambar",
        analyzing: "Menganalisis...",
        analyzingImage: "Menganalisis gambar...",
        analyzedImage: "Gambar Dianalisis",
        detectionResults: "Keputusan Pengesanan",
        confidenceLevel: "Tahap Keyakinan",
        whyThisHappens: "Kenapa Ni Boleh Jadi",
        wasThisHelpful: "Ni membantu dok?",
        viewTreatment: "Tengok Rawatan",
        analyzeAnother: "Analisis Gambar Lain",
        aiExpertAdvice: "Nasihat Pakar AI",
        poweredBy: "Dikuasakan oleh Google Gemini",
        loadingAI: "Memuatkan cadangan AI...",
        immediate: "Segera",
        shortTerm: "Jangka Pendek",
        longTerm: "Jangka Panjang",
        materials: "Bahan",
        immediateActions: "Tindakan Segera",
        warningSigns: "Tanda Amaran",
        shortTermManagement: "Pengurusan Jangka Pendek",
        organicOptions: "Pilihan Organik",
        chemicalOptions: "Pilihan Kimia",
        longTermPrevention: "Pencegahan Jangka Panjang",
        culturalPractices: "Amalan Budaya",
        materialsNeeded: "Bahan Diperlukan",
        estimatedCost: "Anggaran Kos:",
        expectedRecovery: "Jangkaan Pemulihan:",
        backToResults: "Balik ke Keputusan",
        howItWorks: "Cara Ia Berfungsi",
        howItWorksDesc: "Sistem berkuasa AI kami mengesan penyakit padi dalam 4 langkah mudah:",
        step1Title: "Ambil Gambar",
        step1Desc: "Ambil gambar yang jelas pada daun padi yang terjejas",
        step2Title: "Analisis AI",
        step2Desc: "TensorFlow.js menganalisis gambar dengan ketepatan 90%",
        step3Title: "Dapatkan Keputusan",
        step3Desc: "Pengesanan penyakit segera dengan skor keyakinan",
        step4Title: "Cadangan AI",
        step4Desc: "Google Gemini AI menyediakan nasihat rawatan",
        keyFeatures: "Ciri Utama",
        feature1Title: "100% Peribadi",
        feature1Desc: "Dok ada data dimuat naik",
        feature2Title: "Berfungsi Luar Talian",
        feature2Desc: "Dok perlu internet",
        feature3Title: "Utamakan Mudah Alih",
        feature3Desc: "Dioptimumkan untuk telefon",
        feature4Title: "Keputusan Segera",
        feature4Desc: "Analisis masa nyata",
        healthyLeafDetection: "Pengesanan Daun Sihat",
        about: "Perihal",
        aboutMyPadiCare: "Perihal MyPadiCare",
        aboutDescription: "MyPadiCare adalah sistem pengesanan penyakit AI 100% dari sisi pelanggan yang berjalan sepenuhnya di pelayar kito. Menggunakan TensorFlow.js dan Google Gemini AI, kami mencapai ketepatan 90% dalam mengesan 10 penyakit padi biasa. Gambar kito dok akan meninggalkan peranti kito.",
        privacyFirst: "Privasi Utama",
        privacyDescription: "Semua pemprosesan berlaku di pelayar kito. Gambar kito dok pernah dimuat naik ke mana-mana pelayan.",
        detectedDiseases: "Penyakit Yang Dikesan",
        technologyStack: "Susunan Teknologi",
        tensorFlowDesc: "ML sisi pelanggan",
        geminiDesc: "Cadangan AI",
        home: "Utama",
        feedbackThanks: "Terima kasih atas maklum balas kito!",
        feedbackAppreciate: "Kami menghargai maklum balas kito",
        noFileSelected: "Dok ada fail dipilih.",
        fileTooLarge: "Fail terlalu besar. Saiz maksimum ialah 10MB.",
        unsupportedFileType: "Jenis fail dok disokong. Sila pilih JPG, PNG, atau WEBP.",
        invalidFileExtension: "Sambungan fail dok sah. Sila pilih fail .jpg, .png, atau .webp.",
        analysisFailed: "Analisis gagal",
        pleaseUploadFirst: "Sila muat naik gambar dulu.",
        bacterial_leaf_blight: "Hawar Daun Bakteria",
        bacterial_leaf_streak: "Jalur Daun Bakteria",
        bacterial_panicle_blight: "Hawar Malai Bakteria",
        blast: "Penyakit Blast",
        brown_spot: "Bintik Coklat",
        dead_heart: "Jantung Mati",
        downy_mildew: "Kudis Bulu",
        hispa: "Hispa",
        tungro: "Tungro",
        normal: "Daun Sihat",
        healthy: "Sihat",
        high: "Tinggi",
        moderate: "Sederhana",
        low: "Rendah",
        tutorialWelcome: "Selamat datang ke MyPadiCare!",
        tutorialQuestion: "Ni kali pertama kito guna aplikasi ni ke?",
        tutorialYes: "Ya, tunjukkan saya",
        tutorialNo: "Dok, saya nak mula",
        tutorialSkip: "Langkau Tutorial",
        tutorialNext: "Seterusnya",
        tutorialPrevious: "Sebelumnya",
        tutorialFinish: "Mulakan",
        tutorialStep1Title: "Pilih Bahasa Kito",
        tutorialStep1Desc: "Pilih bahasa pilihan kito dari butang bahasa di penjuru kanan atas. MyPadiCare menyokong Bahasa Inggeris, Bahasa Malaysia, Bahasa Jepun, Loghat Kedah, dan Loghat Kelantan.",
        tutorialStep2Title: "Muat Naik Gambar",
        tutorialStep2Desc: "Ambil gambar yang jelas pada daun padi kito atau pilih satu dari galeri kito. Pastikan daun ada pencahayaan yang baik dan gejala boleh nampak dengan jelas.",
        tutorialStep3Title: "Dapatkan Keputusan Segera",
        tutorialStep3Desc: "AI kami akan menganalisis gambar kito dan kenal pasti sebarang penyakit. Kito akan nampak nama penyakit, tahap keyakinan, dan cadangan rawatan terperinci dikuasakan oleh Google Gemini AI.",
        tutorialStep4Title: "Tengok Pelan Rawatan",
        tutorialStep4Desc: "Semak tindakan segera, rawatan jangka pendek dan jangka panjang. Semua cadangan disesuaikan untuk membantu kito selamatkan tanaman kito!"
    }
};

// Current language state
let currentLanguage = 'en';

/**
 * Get translation for a key
 */
function t(key) {
    // Support dialects: if dialect not found, fallback to base language, then English
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
        return translations[currentLanguage][key];
    }
    
    // Fallback to base language for dialects (ms-kd -> ms, ms-kl -> ms)
    if (currentLanguage.startsWith('ms-')) {
        const baseLang = 'ms';
        if (translations[baseLang] && translations[baseLang][key]) {
            return translations[baseLang][key];
        }
    }
    
    // Final fallback to English
    return translations['en'][key] || key;
}

/**
 * Set current language
 */
function setLanguage(lang) {
    // Support dialects: ms-kd, ms-kl, or base languages: en, ms, ja
    if (translations[lang]) {
        currentLanguage = lang;
        localStorage.setItem('mypadicare_language', lang);
        updatePageTranslations();
        
        // Reload treatments if results are displayed
        if (typeof currentTreatments !== 'undefined' && currentTreatments && currentTreatments.disease) {
            if (typeof loadTreatments === 'function') {
                loadTreatments(currentTreatments.disease, lang).then(treatments => {
                    if (treatments && typeof displayTreatments === 'function') {
                        displayTreatments(treatments);
                    }
                });
            }
        }
        
        console.log(`✅ Language changed to: ${lang}`);
    } else {
        console.error(`❌ Language not supported: ${lang}`);
    }
}

/**
 * Get current language
 */
function getCurrentLanguage() {
    return currentLanguage;
}

/**
 * Initialize language from localStorage or browser
 */
function initializeLanguage() {
    // Check localStorage first
    const savedLang = localStorage.getItem('mypadicare_language');
    if (savedLang && translations[savedLang]) {
        currentLanguage = savedLang;
        return;
    }
    
    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('ms') || browserLang.startsWith('my')) {
        currentLanguage = 'ms';
    } else if (browserLang.startsWith('ja')) {
        currentLanguage = 'ja';
    } else {
        currentLanguage = 'en';
    }
    
    localStorage.setItem('mypadicare_language', currentLanguage);
}

/**
 * Update all page translations
 */
function updatePageTranslations() {
    // Update elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = t(key);
        
        // Update based on element type
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            // Preserve HTML structure if needed
            if (element.hasAttribute('data-translate-html')) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Emit event for other components to update
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: currentLanguage } }));
}

// Initialize on load
initializeLanguage();

console.log('🌐 Translation system loaded - Current language:', currentLanguage);


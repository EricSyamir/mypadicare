/**
 * MyPadiCare - Clean Image Picker JavaScript
 * Simplified and optimized for reliability
 */

// Global state
let uploadedImage = null;
let detectionResults = null;

// Disease descriptions database (multilingual)
const diseaseDescriptions = {
    en: {
        'bacterial_leaf_blight': 'This bacterial infection occurs due to high humidity, warm temperatures (25-30°C), and poor air circulation. It spreads through water splashing, contaminated tools, or infected plant debris. Excessive nitrogen fertilization and dense planting can worsen the condition.',
        'bacterial_leaf_streak': 'Caused by bacteria that thrive in warm, humid conditions with temperatures around 25-35°C. The disease spreads through wind-driven rain, irrigation water, and contaminated equipment. Poor drainage and overcrowding of plants increase susceptibility.',
        'bacterial_panicle_blight': 'This bacterial disease develops during the reproductive stage when humidity is high and temperatures range from 25-30°C. It spreads through rain splash, insects, and contaminated seeds. Stress from drought followed by wet conditions often triggers outbreaks.',
        'blast': 'Fungal disease caused by Magnaporthe oryzae, thriving in cool, wet conditions with high humidity. It spreads through airborne spores during cloudy, humid weather. Excessive nitrogen fertilization, dense planting, and temperature fluctuations (20-25°C) promote infection.',
        'brown_spot': 'This fungal infection occurs due to nutrient deficiency (especially potassium and silicon), water stress, and poor soil conditions. High humidity, warm temperatures (25-30°C), and weakened plants from environmental stress make rice susceptible to this disease.',
        'dead_heart': 'Caused by stem borer insects that lay eggs on rice plants. The larvae bore into stems, causing the central shoot to die. This happens more frequently in fields with poor water management, excessive nitrogen fertilization, and during the vegetative growth stage.',
        'downy_mildew': 'This fungal disease thrives in cool, humid conditions with temperatures around 15-25°C. It spreads through airborne spores and water splash. Poor air circulation, dense planting, overhead irrigation, and high relative humidity (above 85%) favor disease development.',
        'hispa': 'Caused by rice hispa beetles that feed on leaf tissue, creating characteristic scraping marks. These pests are more active during warm, humid weather and are attracted to lush, green foliage. Poor field sanitation and nearby grassy areas increase infestation risk.',
        'tungro': 'A viral disease transmitted by green leafhoppers. It occurs when infected leafhoppers feed on healthy plants, transferring the virus. The disease is more common during warm, humid seasons and in areas with high leafhopper populations. Poor weed control increases vector habitat.',
        'normal': 'Great job! Your rice plants look healthy and disease-free. This indicates proper field management, good nutrition, adequate water management, and effective pest control. Continue your excellent farming practices - regular monitoring, balanced fertilization, proper spacing, and maintaining field hygiene.'
    },
    ms: {
        'bacterial_leaf_blight': 'Jangkitan bakteria ini berlaku disebabkan kelembapan tinggi, suhu panas (25-30°C), dan peredaran udara yang lemah. Ia merebak melalui percikan air, alatan yang tercemar, atau sisa tanaman yang dijangkiti. Pembajaan nitrogen berlebihan dan penanaman padat boleh memburukkan keadaan.',
        'bacterial_leaf_streak': 'Disebabkan oleh bakteria yang membiak dalam keadaan lembap dan panas dengan suhu sekitar 25-35°C. Penyakit ini merebak melalui hujan yang dibawa angin, air pengairan, dan peralatan yang tercemar. Saliran yang lemah dan tanaman yang terlalu rapat meningkatkan kerentanan.',
        'bacterial_panicle_blight': 'Penyakit bakteria ini berkembang semasa peringkat pembiakan apabila kelembapan tinggi dan suhu antara 25-30°C. Ia merebak melalui percikan hujan, serangga, dan benih yang tercemar. Tekanan dari kemarau diikuti keadaan lembap sering mencetuskan wabak.',
        'blast': 'Penyakit kulat disebabkan oleh Magnaporthe oryzae, yang membiak dalam keadaan sejuk dan lembap dengan kelembapan tinggi. Ia merebak melalui spora bawaan udara semasa cuaca mendung dan lembap. Pembajaan nitrogen berlebihan, penanaman padat, dan turun naik suhu (20-25°C) menggalakkan jangkitan.',
        'brown_spot': 'Jangkitan kulat ini berlaku disebabkan kekurangan nutrien (terutamanya kalium dan silikon), tekanan air, dan keadaan tanah yang lemah. Kelembapan tinggi, suhu panas (25-30°C), dan tanaman yang lemah akibat tekanan persekitaran menjadikan padi terdedah kepada penyakit ini.',
        'dead_heart': 'Disebabkan oleh serangga penggerek batang yang bertelur pada tanaman padi. Larva mengorek masuk ke dalam batang, menyebabkan pucuk tengah mati. Ini berlaku lebih kerap di ladang dengan pengurusan air yang lemah, pembajaan nitrogen berlebihan, dan semasa peringkat pertumbuhan vegetatif.',
        'downy_mildew': 'Penyakit kulat ini membiak dalam keadaan sejuk dan lembap dengan suhu sekitar 15-25°C. Ia merebak melalui spora bawaan udara dan percikan air. Peredaran udara yang lemah, penanaman padat, pengairan atas, dan kelembapan relatif tinggi (melebihi 85%) menggalakkan perkembangan penyakit.',
        'hispa': 'Disebabkan oleh kumbang hispa padi yang memakan tisu daun, mencipta kesan calar yang khas. Perosak ini lebih aktif semasa cuaca panas dan lembap dan tertarik kepada dedaunan hijau subur. Sanitasi ladang yang lemah dan kawasan berumput berdekatan meningkatkan risiko serangan.',
        'tungro': 'Penyakit virus yang disebarkan oleh wereng hijau. Ia berlaku apabila wereng yang dijangkiti memakan tanaman sihat, memindahkan virus. Penyakit ini lebih biasa semasa musim panas dan lembap dan di kawasan dengan populasi wereng yang tinggi. Kawalan rumpai yang lemah meningkatkan habitat vektor.',
        'normal': 'Tahniah! Tanaman padi anda kelihatan sihat dan bebas penyakit. Ini menunjukkan pengurusan ladang yang baik, pemakanan yang baik, pengurusan air yang mencukupi, dan kawalan perosak yang berkesan. Teruskan amalan pertanian yang cemerlang - pemantauan berkala, pembajaan seimbang, jarak yang sesuai, dan menjaga kebersihan ladang.'
    },
    'ms-kd': {
        'bacterial_leaf_blight': 'Jangkitan bakteria ni jadi sebab kelembapan tinggi, suhu panas (25-30°C), dan peredaran udara yang lemah. Dia merebak melalui percikan air, alatan yang tercemar, atau sisa tanaman yang dijangkiti. Baja nitrogen berlebihan dan penanaman padat boleh memburukkan keadaan.',
        'bacterial_leaf_streak': 'Disebabkan oleh bakteria yang membiak dalam keadaan lembap dan panas dengan suhu sekitar 25-35°C. Penyakit ni merebak melalui hujan yang dibawa angin, air pengairan, dan peralatan yang tercemar. Saliran yang lemah dan tanaman yang terlalu rapat meningkatkan kerentanan.',
        'bacterial_panicle_blight': 'Penyakit bakteria ni berkembang masa peringkat pembiakan bila kelembapan tinggi dan suhu antara 25-30°C. Dia merebak melalui percikan hujan, serangga, dan benih yang tercemar. Tekanan dari kemarau diikuti keadaan lembap sering mencetuskan wabak.',
        'blast': 'Penyakit kulat disebabkan oleh Magnaporthe oryzae, yang membiak dalam keadaan sejuk dan lembap dengan kelembapan tinggi. Dia merebak melalui spora bawaan udara masa cuaca mendung dan lembap. Baja nitrogen berlebihan, penanaman padat, dan turun naik suhu (20-25°C) menggalakkan jangkitan.',
        'brown_spot': 'Jangkitan kulat ni jadi sebab kekurangan nutrien (terutama kalium dan silikon), tekanan air, dan keadaan tanah yang lemah. Kelembapan tinggi, suhu panas (25-30°C), dan tanaman yang lemah akibat tekanan persekitaran jadikan padi terdedah pada penyakit ni.',
        'dead_heart': 'Disebabkan oleh serangga penggerek batang yang bertelur pada tanaman padi. Larva dia korek masuk ke dalam batang, buat pucuk tengah mati. Ni jadi lebih kerap kat ladang dengan pengurusan air yang lemah, baja nitrogen berlebihan, dan masa peringkat pertumbuhan vegetatif.',
        'downy_mildew': 'Penyakit kulat ni membiak dalam keadaan sejuk dan lembap dengan suhu sekitar 15-25°C. Dia merebak melalui spora bawaan udara dan percikan air. Peredaran udara yang lemah, penanaman padat, pengairan atas, dan kelembapan relatif tinggi (lebih 85%) galakkan perkembangan penyakit.',
        'hispa': 'Disebabkan oleh kumbang hispa padi yang makan tisu daun, cipta kesan calar yang khas. Perosak ni lebih aktif masa cuaca panas dan lembap dan tertarik pada dedaunan hijau subur. Sanitasi ladang yang lemah dan kawasan berumput dekat ni tingkatkan risiko serangan.',
        'tungro': 'Penyakit virus yang disebarkan oleh wereng hijau. Dia jadi bila wereng yang dijangkiti makan tanaman sihat, pindah virus. Penyakit ni lebih biasa masa musim panas dan lembap dan kat kawasan dengan populasi wereng yang tinggi. Kawalan rumpai yang lemah tingkatkan habitat vektor.',
        'normal': 'Tahniah! Tanaman padi hang nampak sihat dan bebas penyakit. Ni tunjukkan pengurusan ladang yang baik, pemakanan yang baik, pengurusan air yang cukup, dan kawalan perosak yang berkesan. Teruskan amalan pertanian yang cemerlang hang - pantau berkala, baja seimbang, jarak yang sesuai, dan jaga kebersihan ladang.'
    },
    'ms-kl': {
        'bacterial_leaf_blight': 'Jangkitan bakteria ni jadi sebab kelembapan tinggi, suhu panas (25-30°C), dan peredaran udara yang lemah. Dia merebak melalui percikan air, alatan yang tercemar, atau sisa tanaman yang dijangkiti. Baja nitrogen berlebihan dan penanaman padat boleh memburukkan keadaan.',
        'bacterial_leaf_streak': 'Disebabkan oleh bakteria yang membiak dalam keadaan lembap dan panas dengan suhu sekitar 25-35°C. Penyakit ni merebak melalui hujan yang dibawa angin, air pengairan, dan peralatan yang tercemar. Saliran yang lemah dan tanaman yang terlalu rapat meningkatkan kerentanan.',
        'bacterial_panicle_blight': 'Penyakit bakteria ni berkembang masa peringkat pembiakan bila kelembapan tinggi dan suhu antara 25-30°C. Dia merebak melalui percikan hujan, serangga, dan benih yang tercemar. Tekanan dari kemarau diikuti keadaan lembap sering mencetuskan wabak.',
        'blast': 'Penyakit kulat disebabkan oleh Magnaporthe oryzae, yang membiak dalam keadaan sejuk dan lembap dengan kelembapan tinggi. Dia merebak melalui spora bawaan udara masa cuaca mendung dan lembap. Baja nitrogen berlebihan, penanaman padat, dan turun naik suhu (20-25°C) menggalakkan jangkitan.',
        'brown_spot': 'Jangkitan kulat ni jadi sebab kekurangan nutrien (terutama kalium dan silikon), tekanan air, dan keadaan tanah yang lemah. Kelembapan tinggi, suhu panas (25-30°C), dan tanaman yang lemah akibat tekanan persekitaran jadikan padi terdedah pada penyakit ni.',
        'dead_heart': 'Disebabkan oleh serangga penggerek batang yang bertelur pada tanaman padi. Larva dia korek masuk ke dalam batang, buat pucuk tengah mati. Ni jadi lebih kerap kat ladang dengan pengurusan air yang lemah, baja nitrogen berlebihan, dan masa peringkat pertumbuhan vegetatif.',
        'downy_mildew': 'Penyakit kulat ni membiak dalam keadaan sejuk dan lembap dengan suhu sekitar 15-25°C. Dia merebak melalui spora bawaan udara dan percikan air. Peredaran udara yang lemah, penanaman padat, pengairan atas, dan kelembapan relatif tinggi (lebih 85%) galakkan perkembangan penyakit.',
        'hispa': 'Disebabkan oleh kumbang hispa padi yang makan tisu daun, cipta kesan calar yang khas. Perosak ni lebih aktif masa cuaca panas dan lembap dan tertarik pada dedaunan hijau subur. Sanitasi ladang yang lemah dan kawasan berumput dekat ni tingkatkan risiko serangan.',
        'tungro': 'Penyakit virus yang disebarkan oleh wereng hijau. Dia jadi bila wereng yang dijangkiti makan tanaman sihat, pindah virus. Penyakit ni lebih biasa masa musim panas dan lembap dan kat kawasan dengan populasi wereng yang tinggi. Kawalan rumpai yang lemah tingkatkan habitat vektor.',
        'normal': 'Tahniah! Tanaman padi kito nampak sihat dan bebas penyakit. Ni tunjukkan pengurusan ladang yang baik, pemakanan yang baik, pengurusan air yang cukup, dan kawalan perosak yang berkesan. Teruskan amalan pertanian yang cemerlang kito - pantau berkala, baja seimbang, jarak yang sesuai, dan jaga kebersihan ladang.'
    },
    ja: {
        'bacterial_leaf_blight': '高湿度、高温(25-30°C)、換気不良により発生する細菌感染症です。水の跳ね返り、汚染された道具、感染した植物残渣を通じて広がります。過剰な窒素施肥と密植は状況を悪化させる可能性があります。',
        'bacterial_leaf_streak': '温暖で湿潤な条件(25-35°C)で繁殖する細菌によって引き起こされます。風雨、灌漑水、汚染された機器を通じて広がります。排水不良と植物の過密は感受性を高めます。',
        'bacterial_panicle_blight': '湿度が高く、温度が25-30°Cの生殖段階で発症する細菌性病害です。雨の跳ね返り、昆虫、汚染された種子を通じて広がります。干ばつの後に湿潤条件が続くストレスが発生の引き金になることがよくあります。',
        'blast': 'Magnaporthe oryzaeによって引き起こされる真菌病で、湿度の高い涼しく湿潤な条件で繁殖します。曇りで湿潤な天候時に空気中の胞子を通じて広がります。過剰な窒素施肥、密植、温度変動(20-25°C)が感染を促進します。',
        'brown_spot': '栄養欠乏(特にカリウムとシリコン)、水ストレス、土壌条件不良により発生する真菌感染症です。高湿度、高温(25-30°C)、環境ストレスで弱った植物は、この病気に対して脆弱になります。',
        'dead_heart': '稲に産卵する茎穿孔虫によって引き起こされます。幼虫が茎に穴を開け、中心の芽が枯れます。水管理不良、過剰な窒素施肥、栄養成長段階でより頻繁に発生します。',
        'downy_mildew': '涼しく湿潤な条件(15-25°C)で繁殖する真菌病です。空気中の胞子と水の跳ね返りを通じて広がります。換気不良、密植、頭上灌漑、高相対湿度(85%以上)が病気の発生を促します。',
        'hispa': '葉の組織を食べるイネヒメハモグリバエによって引き起こされ、特徴的な削り跡を作ります。これらの害虫は温暖で湿潤な天候時により活発で、青々とした葉に引き寄せられます。圃場の衛生管理不良と近くの草地が発生リスクを高めます。',
        'tungro': 'ツマグロヨコバイによって伝播されるウイルス病です。感染したヨコバイが健康な植物を食べ、ウイルスを移します。温暖で湿潤な季節やヨコバイの個体数が多い地域でより一般的です。雑草管理不良がベクターの生息地を増やします。',
        'normal': '素晴らしい！稲は健康で病気がありません。これは適切な圃場管理、良好な栄養、十分な水管理、効果的な害虫防除を示しています。優れた農業実践を続けてください - 定期的な監視、バランスの取れた施肥、適切な間隔、圃場衛生の維持。'
    }
};

// DOM Elements
let uploadBox, imageInput, selectFileBtn, captureBtn, imagePreview, previewImg;
let analyzeBtn, changeImageBtn, loadingOverlay, resultsSection, recommendationsSection;
let currentTreatments = null; // Store current treatments for translation switching

/**
 * Initialize Application
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌾 MyPadiCare - Initializing...');
        
    // Initialize DOM elements
    initializeDOMElements();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize language
    updatePageTranslations();
    
    // Setup language selector
    setupLanguageSelector();
    
    // Setup tutorial
    setupTutorial();
    
    // Check if first time visit
    checkFirstTimeVisit();
    
    // Initialize app
    initializeApp();
    
    console.log('✅ MyPadiCare - Ready!');
});

/**
 * Initialize DOM elements
 */
function initializeDOMElements() {
    uploadBox = document.getElementById('uploadBox');
    imageInput = document.getElementById('imageInput');
    selectFileBtn = document.getElementById('selectFileBtn');
    captureBtn = document.getElementById('captureBtn');
    imagePreview = document.getElementById('imagePreview');
    previewImg = document.getElementById('previewImg');
    analyzeBtn = document.getElementById('analyzeBtn');
    changeImageBtn = document.getElementById('changeImageBtn');
    loadingOverlay = document.getElementById('loadingOverlay');
    resultsSection = document.getElementById('results');
    recommendationsSection = document.getElementById('recommendations');
    
    console.log('DOM elements initialized');
}

/**
 * Initialize app
 */
async function initializeApp() {
    // Check if we're in testing mode
    if (typeof CONFIG !== 'undefined' && CONFIG.TESTING_MODE) {
        console.log('🧪 Testing mode enabled');
        return;
    }
    
    // Try to check backend health (optional)
    try {
        const response = await fetch('predict_api.php?action=health');
        const healthData = await response.json();
        
        if (healthData.model_loaded) {
            console.log('✅ Backend ready');
        }
    } catch (error) {
        console.log('⚠️ Backend not available, continuing anyway');
    }
}

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
    if (!uploadBox || !imageInput) {
        console.error('❌ Critical DOM elements missing!');
        console.error('uploadBox:', uploadBox);
        console.error('imageInput:', imageInput);
        return;
    }
    
    // File input change event
    imageInput.addEventListener('change', handleImageSelect);
    
    // Upload box click (entire area clickable, but exclude buttons)
    uploadBox.addEventListener('click', (e) => {
        // Only trigger if clicking directly on the upload box, not on buttons
        if (e.target === uploadBox || e.target.closest('.upload-icon, .upload-title, .upload-subtitle')) {
        imageInput.click();
        }
    });
    
    // Select file button click - ensure it works properly
    if (selectFileBtn) {
    selectFileBtn.addEventListener('click', (e) => {
            e.preventDefault();
        e.stopPropagation();
            console.log('📁 Select file button clicked');
            if (imageInput) {
        imageInput.click();
            } else {
                console.error('❌ imageInput not found!');
            }
        });
        
        // Also handle touch events for mobile
        selectFileBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('📁 Select file button touched');
            if (imageInput) {
                imageInput.click();
            }
        });
    } else {
        console.error('❌ selectFileBtn not found!');
    }
    
    // Drag and drop
    uploadBox.addEventListener('dragover', handleDragOver);
    uploadBox.addEventListener('drop', handleDrop);
    uploadBox.addEventListener('dragleave', handleDragLeave);
    
    // Other buttons
    if (captureBtn) {
        captureBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openCameraModal();
        });
        
        // Also handle touch events for mobile
        captureBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openCameraModal();
        });
    }
    
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeImage);
    }
    
    if (changeImageBtn) {
        changeImageBtn.addEventListener('click', resetUpload);
    }
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href');
            if (target && target.startsWith('#')) {
                const element = document.querySelector(target);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Treatment tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.target.getAttribute('data-tab');
            if (tabName) {
            switchTab(tabName);
            }
        });
    });
    
    console.log('✅ Event listeners setup complete');
}

/**
 * Handle image selection from file input
 */
function handleImageSelect(event) {
    const file = event.target.files[0];
    if (file) {
        console.log('📁 File selected:', file.name);
        processImageFile(file);
    }
}

/**
 * Handle drag over event
 */
function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    uploadBox.classList.add('drag-over');
    event.dataTransfer.dropEffect = 'copy';
}

/**
 * Handle drag leave event
 */
function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (!uploadBox.contains(event.relatedTarget)) {
        uploadBox.classList.remove('drag-over');
    }
}

/**
 * Handle file drop event
 */
function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    uploadBox.classList.remove('drag-over');
    
    const files = event.dataTransfer.files;
    if (files.length === 0) {
        showError('No files were dropped.');
        return;
    }
    
    if (files.length > 1) {
        showError('Please drop only one image file at a time.');
        return;
    }
    
    const file = files[0];
    console.log('📁 File dropped:', file.name);
    processImageFile(file);
}

/**
 * Process uploaded image file
 */
function processImageFile(file) {
    // Validate file
    if (!file) {
        showError('No file selected.');
        return;
    }
    
    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
        showError(`File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum size is 10MB.`);
        return;
    }
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
        showError(`Unsupported file type: ${file.type}. Please select JPG, PNG, or WEBP.`);
        return;
    }
    
    // Check file extension
    const fileName = file.name.toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
    
    if (!hasValidExtension) {
        showError('Invalid file extension. Please select a .jpg, .png, or .webp file.');
        return;
    }
    
    // Store the file
    uploadedImage = file;
    console.log('✅ File validated and stored');
    
    // Read and display the file
    const reader = new FileReader();
    reader.onload = (e) => {
        if (previewImg) {
            previewImg.src = e.target.result;
            showImagePreview();
            console.log('✅ Image preview displayed');
        } else {
            showError('Unable to show image preview. Please refresh the page.');
        }
    };
    
    reader.onerror = () => {
        showError('Failed to read the selected file. Please try a different image.');
    };
    
        reader.readAsDataURL(file);
}

/**
 * Show image preview
 */
function showImagePreview() {
    if (uploadBox) uploadBox.style.display = 'none';
    if (imagePreview) imagePreview.style.display = 'block';
    if (analyzeBtn) analyzeBtn.style.display = 'block';
    
    hideResults();
}

/**
 * Reset upload state
 */
function resetUpload() {
    uploadedImage = null;
    detectionResults = null;
    
    // Stop any ongoing speech
    if (typeof speechManager !== 'undefined' && speechManager) {
        speechManager.stop();
    }
    
    if (uploadBox) uploadBox.style.display = 'block';
    if (imagePreview) imagePreview.style.display = 'none';
    if (analyzeBtn) analyzeBtn.style.display = 'none';
    if (imageInput) imageInput.value = '';
    
    hideResults();
    console.log('🔄 Upload reset');
}

/**
 * Analyze uploaded image
 */
async function analyzeImage() {
    if (!uploadedImage) {
        showError('Please upload an image first.');
        return;
    }
    
    // Auto-scroll to top when analyze button is clicked
    scrollToTop();
    
    // Show loading screen immediately when button is clicked
    showLoadingScreen();
    updateLoadingText(t('analyzingImage') || 'Analyzing image...');
    
    // Set minimum loading time to 3 seconds
    const loadingStartTime = Date.now();
    const minLoadingTime = 3000; // 3 seconds
    
    console.log('🔬 Starting image analysis...');
    
    try {
        // Check if we're in testing mode
        console.log('🔍 CONFIG.TESTING_MODE:', typeof CONFIG !== 'undefined' ? CONFIG.TESTING_MODE : 'CONFIG not loaded');
        if (typeof CONFIG !== 'undefined' && CONFIG.TESTING_MODE) {
            console.log('🧪 Using mock results for testing');
            
            // Create mock results
            const mockResults = {
                success: true,
                top_prediction: 'bacterial_leaf_blight',
                confidence: 0.87,
                health_status: 'diseased',
                predictions: [
                    { rank: 1, disease: 'bacterial_leaf_blight', confidence: 0.87, health_status: 'diseased' },
                    { rank: 2, disease: 'blast', confidence: 0.08, health_status: 'diseased' },
                    { rank: 3, disease: 'normal', confidence: 0.05, health_status: 'healthy' }
                ],
                treatments: {
                    immediate_actions: [
                        'Remove infected leaves immediately',
                        'Apply copper bactericide spray',
                        'Improve field drainage'
                    ],
                    warning_signs: [
                        'Yellow streaks along leaf veins',
                        'Water-soaked lesions',
                        'Leaf wilting'
                    ],
                    short_term_management: [
                        'Apply bactericide weekly for 3 weeks',
                        'Reduce nitrogen fertilizer',
                        'Monitor field drainage'
                    ],
                    organic_options: [
                        'Neem oil spray',
                        'Copper sulfate solution',
                        'Biocontrol agents'
                    ],
                    chemical_options: [
                        'Streptomycin sulfate',
                        'Copper hydroxide',
                        'Bactericide rotation'
                    ],
                    long_term_prevention: [
                        'Use resistant varieties',
                        'Crop rotation',
                        'Field sanitation'
                    ],
                    cultural_practices: [
                        'Proper spacing',
                        'Balanced fertilization',
                        'Water management'
                    ],
                    materials_needed: [
                        'Copper bactericide (500ml)',
                        'Sprayer equipment',
                        'Protective gear'
                    ],
                    estimated_cost: '$15-25 USD',
                    expected_recovery: '7-14 days'
                }
            };
            
            // Wait for minimum 3 seconds, then show results
            const elapsedTime = Date.now() - loadingStartTime;
            const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
            
            setTimeout(() => {
                hideLoadingScreen();
                displayResults(mockResults);
                console.log('🧪 Mock analysis completed');
            }, remainingTime);
            
            return;
        }
        
        // Real analysis - send to PHP backend
        console.log('🚀 Using REAL backend - sending to predict_api.php');
        console.log('📡 Making API request to predict_api.php...');
        
        const formData = new FormData();
        formData.append('image', uploadedImage);
        
        // Make API call
        const response = await fetch('predict_api.php', {
            method: 'POST',
            body: formData
        });
        
        console.log('📊 Backend response received');
        const results = await response.json();
        console.log('📊 Backend response:', results);
        
        if (!results.success) {
            throw new Error(results.error || 'Prediction failed');
        }
        
        // Calculate remaining time to ensure minimum 3 seconds loading
        const elapsedTime = Date.now() - loadingStartTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        // Wait for remaining time, then hide loading and show results
        setTimeout(() => {
            hideLoadingScreen();
            detectionResults = results;
            displayResults(results);
            console.log('✅ Analysis completed');
        }, remainingTime);
        
    } catch (error) {
        console.error('❌ Analysis failed:', error);
        
        // Calculate remaining time even on error
        const elapsedTime = Date.now() - loadingStartTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        // Wait for remaining time, then hide loading and show error
        setTimeout(() => {
            hideLoadingScreen();
            showError(`Analysis failed: ${error.message}`);
        }, remainingTime);
    }
}

/**
 * Display analysis results
 */
/**
 * Auto-scroll to top of page
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function displayResults(results) {
    // Show results screen (mobile app style)
    if (typeof showScreen === 'function') {
        showScreen('resultsScreen');
    }
    
    // Auto-scroll to top after successful scan
    setTimeout(() => {
        scrollToTop();
    }, 300);
    
    // Show results section (fallback for non-mobile)
    if (resultsSection) {
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Update disease information
    const diseaseName = document.getElementById('diseaseName');
    const confidenceValue = document.getElementById('confidenceValue');
    const confidenceFill = document.getElementById('confidenceFill');
    const diseaseBadge = document.getElementById('diseaseBadge');
    const severityBadge = document.getElementById('severityBadge');
    const analyzedImage = document.getElementById('analyzedImage');
    
    // Format disease name - use translated name from translations
    const disease = results.top_prediction;
    const diseaseDisplayName = t(disease) || disease.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Update elements
    if (diseaseName) diseaseName.textContent = diseaseDisplayName;
    
    const confidencePercent = Math.round(results.confidence * 100);
    if (confidenceValue) confidenceValue.textContent = `${confidencePercent}%`;
    
    // Update pie chart
    const pieChart = document.getElementById('confidencePieChart');
    const pieChartValue = document.getElementById('pieChartValue');
    
    if (pieChart && pieChartValue) {
        // Update the center value
        pieChartValue.textContent = `${confidencePercent}%`;
        
        // Calculate the angle for the pie chart (360 degrees = 100%)
        const angle = (confidencePercent / 100) * 360;
        
        // Remove existing confidence classes
        pieChart.classList.remove('high-confidence', 'medium-confidence', 'low-confidence');
        
        // Add appropriate confidence class and set CSS custom property for angle
        if (confidencePercent >= 85) {
            pieChart.classList.add('high-confidence');
        } else if (confidencePercent >= 65) {
            pieChart.classList.add('medium-confidence');
        } else {
            pieChart.classList.add('low-confidence');
        }
        
        // Set the angle as a CSS custom property
        pieChart.style.setProperty('--confidence-angle', `${angle}deg`);
    }
    
    // Update disease badge
    if (diseaseBadge) {
        diseaseBadge.className = results.health_status === 'healthy' ? 
            'disease-badge healthy' : 'disease-badge diseased';
    }
    
    // Update severity
    if (severityBadge) {
        if (results.health_status === 'healthy') {
            severityBadge.textContent = 'Healthy';
            severityBadge.className = 'severity-badge healthy';
        } else {
            if (confidencePercent >= 85) {
                severityBadge.textContent = 'High';
                severityBadge.className = 'severity-badge high';
            } else if (confidencePercent >= 65) {
                severityBadge.textContent = 'Moderate';
                severityBadge.className = 'severity-badge moderate';
            } else {
                severityBadge.textContent = 'Low';
                severityBadge.className = 'severity-badge low';
            }
        }
    }
    
    // Update analyzed image
    if (analyzedImage && previewImg) {
        analyzedImage.src = previewImg.src;
    }
    
    // Display disease description
    displayDiseaseDescription(results.top_prediction, results.health_status);
    
    // Display predictions list
    displayPredictionsList(results.predictions);
    
    // Show treatments if disease detected
    if (results.health_status === 'diseased') {
        // Load treatments based on current language
        loadTreatments(results.top_prediction).then(treatments => {
            if (treatments) {
                displayTreatments(treatments);
                
                // Get Gemini AI recommendation with treatments
                getGeminiRecommendation({
                    ...results,
                    treatments: treatments
                });
            }
        }).catch(error => {
            console.error('❌ Failed to load treatments:', error);
            // Use default treatments from results if available
            if (results.treatments) {
                displayTreatments(results.treatments);
                getGeminiRecommendation(results);
            }
        });
    } else {
        hideRecommendations();
    }
    
    console.log('✅ Results displayed');
}

/**
 * Display disease description
 */
function displayDiseaseDescription(disease, healthStatus) {
    const descriptionElement = document.getElementById('diseaseDescriptionText');
    if (!descriptionElement) return;
    
    // Get current language
    const lang = getCurrentLanguage();
    
    // Get language-specific descriptions with fallback
    let langDescriptions = diseaseDescriptions[lang];
    if (!langDescriptions && lang.startsWith('ms-')) {
        // Fallback to base Malay for dialects
        langDescriptions = diseaseDescriptions['ms'];
    }
    if (!langDescriptions) {
        // Final fallback to English
        langDescriptions = diseaseDescriptions['en'];
    }
    
    // Get the appropriate description
    let description = langDescriptions[disease] || diseaseDescriptions['en'][disease] || '';
    
    // Fallback for missing descriptions
    if (!description) {
        description = 'This condition may be caused by various environmental factors, poor field management, or pathogen infection. Consult with agricultural experts for proper diagnosis and treatment recommendations.';
    }
    
    // Update the description text
    descriptionElement.textContent = description;
    
    console.log(`✅ Disease description displayed for: ${disease}`);
}

/**
 * Display predictions list
 */
function displayPredictionsList(predictions) {
    const predictionsList = document.getElementById('predictionsList');
    if (!predictionsList) return;
    
    predictionsList.innerHTML = '';
    
    predictions.forEach((pred) => {
        const isHealthy = pred.health_status === 'healthy';
        const diseaseName = pred.disease.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const confidence = Math.round(pred.confidence * 100);
        
        const predItem = document.createElement('div');
        predItem.className = `prediction-item ${isHealthy ? 'healthy' : 'diseased'}`;
        predItem.innerHTML = `
            <div class="prediction-rank">${pred.rank}</div>
            <div class="prediction-info">
                <div class="prediction-name">${diseaseName}</div>
                <div class="prediction-confidence">${confidence}%</div>
            </div>
            <div class="prediction-bar">
                <div class="prediction-fill" style="width: ${confidence}%"></div>
            </div>
        `;
        
        predictionsList.appendChild(predItem);
    });
}

/**
 * Display treatment recommendations
 */
function displayTreatments(treatments) {
    if (recommendationsSection) {
        recommendationsSection.style.display = 'block';
    }
    
    // Display treatment sections
    displayTreatmentSection('immediateActions', treatments.immediate_actions);
    displayTreatmentSection('warningSigns', treatments.warning_signs);
    displayTreatmentSection('shortTermActions', treatments.short_term_management);
    displayTreatmentSection('organicOptions', treatments.organic_options);
    displayTreatmentSection('chemicalOptions', treatments.chemical_options);
    displayTreatmentSection('longTermPrevention', treatments.long_term_prevention);
    displayTreatmentSection('culturalPractices', treatments.cultural_practices);
    displayTreatmentSection('materialsNeeded', treatments.materials_needed);
    
    // Display cost and recovery info
    const estimatedCost = document.getElementById('estimatedCost');
    const expectedRecovery = document.getElementById('expectedRecovery');
    
    if (estimatedCost && treatments.estimated_cost) {
        estimatedCost.textContent = treatments.estimated_cost;
    }
    
    if (expectedRecovery && treatments.expected_recovery) {
        expectedRecovery.textContent = treatments.expected_recovery;
    }
    
    // Style action lists for mobile app
    setTimeout(() => {
        if (typeof styleActionList === 'function') {
            styleActionList('immediateActions');
            styleActionList('warningSigns');
            styleActionList('shortTermActions');
            styleActionList('organicOptions');
            styleActionList('chemicalOptions');
            styleActionList('longTermPrevention');
            styleActionList('culturalPractices');
            styleActionList('materialsNeeded');
        }
    }, 100);
}

/**
 * Display treatment section
 */
function displayTreatmentSection(elementId, items) {
    const element = document.getElementById(elementId);
    if (!element || !items || !Array.isArray(items)) return;
    
    element.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        element.appendChild(li);
    });
}

/**
 * Switch treatment tabs
 */
function switchTab(tabName) {
    // Remove active class from all tabs and panes
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    
    // Add active class to selected tab and pane
    const selectedBtn = document.querySelector(`[data-tab="${tabName}"]`);
    const selectedPane = document.getElementById(`tab-${tabName}`);
    
    if (selectedBtn) selectedBtn.classList.add('active');
    if (selectedPane) selectedPane.classList.add('active');
}

/**
 * Hide results sections
 */
function hideResults() {
    if (resultsSection) resultsSection.style.display = 'none';
    hideRecommendations();
}

function hideRecommendations() {
    if (recommendationsSection) recommendationsSection.style.display = 'none';
}

/**
 * Show error message
 */
function showError(message) {
    // Create simple error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
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
    
    console.error('❌ Error:', message);
}

/**
 * Camera functionality
 */
let cameraStream = null;
let currentFacingMode = 'environment'; // 'environment' for back camera, 'user' for front

async function openCameraModal() {
    const cameraModal = document.getElementById('cameraModal');
    const cameraVideo = document.getElementById('cameraVideo');
    const cameraCanvas = document.getElementById('cameraCanvas');
    const closeCameraBtn = document.getElementById('closeCameraBtn');
    const capturePhotoBtn = document.getElementById('capturePhotoBtn');
    const switchCameraBtn = document.getElementById('switchCameraBtn');
    
    if (!cameraModal || !cameraVideo || !cameraCanvas) {
        showError('Camera elements not found. Please refresh the page.');
        return;
    }
    
    // Show the modal
    cameraModal.style.display = 'flex';
    
    try {
        // Request camera access
        const constraints = {
            video: {
                facingMode: currentFacingMode,
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        };
        
        cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
        cameraVideo.srcObject = cameraStream;
        
        // Setup event listeners
        if (closeCameraBtn) {
            closeCameraBtn.onclick = closeCameraModal;
        }
        
        if (capturePhotoBtn) {
            capturePhotoBtn.onclick = capturePhoto;
        }
        
        if (switchCameraBtn) {
            switchCameraBtn.onclick = switchCamera;
        }
        
        // Close modal when clicking outside
        cameraModal.onclick = (e) => {
            if (e.target === cameraModal) {
                closeCameraModal();
            }
        };
        
        console.log('✅ Camera opened successfully');
    } catch (error) {
        console.error('❌ Camera access failed:', error);
        closeCameraModal();
        
        let errorMessage = 'Failed to access camera. ';
        if (error.name === 'NotAllowedError') {
            errorMessage += 'Please allow camera access in your browser settings.';
        } else if (error.name === 'NotFoundError') {
            errorMessage += 'No camera found on this device.';
        } else if (error.name === 'NotReadableError') {
            errorMessage += 'Camera is already in use by another application.';
        } else {
            errorMessage += error.message;
        }
        
        showError(errorMessage);
    }
}

function closeCameraModal() {
    const cameraModal = document.getElementById('cameraModal');
    
    // Stop camera stream
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    
    // Hide modal
    if (cameraModal) {
        cameraModal.style.display = 'none';
    }
    
    console.log('📷 Camera closed');
}

async function switchCamera() {
    // Stop current stream
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
    }
    
    // Switch facing mode
    currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
    
    const cameraVideo = document.getElementById('cameraVideo');
    
    try {
        const constraints = {
            video: {
                facingMode: currentFacingMode,
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        };
        
        cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
        cameraVideo.srcObject = cameraStream;
        
        console.log(`📷 Switched to ${currentFacingMode === 'environment' ? 'back' : 'front'} camera`);
    } catch (error) {
        console.error('❌ Failed to switch camera:', error);
        showError('Failed to switch camera. Please try again.');
    }
}

function capturePhoto() {
    const cameraVideo = document.getElementById('cameraVideo');
    const cameraCanvas = document.getElementById('cameraCanvas');
    
    if (!cameraVideo || !cameraCanvas) {
        showError('Camera elements not found.');
        return;
    }
    
    // Check if video is ready
    if (cameraVideo.readyState !== cameraVideo.HAVE_ENOUGH_DATA) {
        showError('Camera is not ready yet. Please wait a moment.');
        return;
    }
    
    // Check if video has valid dimensions
    if (!cameraVideo.videoWidth || !cameraVideo.videoHeight) {
        showError('Camera video is not ready. Please wait a moment.');
        return;
    }
    
    try {
        // Set canvas dimensions to match video
        cameraCanvas.width = cameraVideo.videoWidth;
        cameraCanvas.height = cameraVideo.videoHeight;
        
        // Draw video frame to canvas
        const ctx = cameraCanvas.getContext('2d');
        ctx.drawImage(cameraVideo, 0, 0);
        
        // Convert canvas to blob
        cameraCanvas.toBlob((blob) => {
            if (!blob) {
                showError('Failed to capture photo. Please try again.');
                return;
            }
            
            // Create a File object from the blob
            const fileName = `camera-capture-${Date.now()}.jpg`;
            const file = new File([blob], fileName, { type: 'image/jpeg' });
            
            // Close camera modal
            closeCameraModal();
            
            // Process the captured image
            uploadedImage = file;
            console.log('✅ Photo captured:', fileName);
            
            // Read and display the file
            const reader = new FileReader();
            reader.onload = (e) => {
                if (previewImg) {
                    previewImg.src = e.target.result;
                    showImagePreview();
                    console.log('✅ Image preview displayed');
                } else {
                    showError('Unable to show image preview. Please refresh the page.');
                }
            };
            
            reader.onerror = () => {
                showError('Failed to read the captured photo. Please try again.');
            };
            
            reader.readAsDataURL(file);
            
        }, 'image/jpeg', 0.95); // 95% quality
        
    } catch (error) {
        console.error('❌ Photo capture failed:', error);
        showError('Failed to capture photo. Please try again.');
    }
}

/**
 * Get Gemini AI recommendation
 */
async function getGeminiRecommendation(results) {
    const expertAdviceText = document.getElementById('expertAdviceText');
    
    if (!expertAdviceText) {
        console.log('Expert advice element not found');
        return;
    }
    
    // Check if Gemini API is disabled in admin settings
    const geminiEnabled = localStorage.getItem('mypadicare_gemini_enabled') !== 'false';
    if (!geminiEnabled) {
        console.warn('⚠️ Gemini API is disabled - using fallback recommendation');
        hideLoadingScreen();
        const confidencePercent = Math.round(results.confidence * 100);
        const fallbackMessage = `Based on the detection of ${results.top_prediction.replace(/_/g, ' ')}, follow the treatment recommendations below. The confidence level is ${confidencePercent}%, indicating ${confidencePercent >= 85 ? 'high' : confidencePercent >= 65 ? 'moderate' : 'low'} certainty in this diagnosis.`;
        expertAdviceText.textContent = fallbackMessage;
        return;
    }
    
    // Show loading screen with specific message for AI
    showLoadingScreen();
    updateLoadingText(t('loadingAI') || 'Getting AI recommendation...');
    
    // Show loading message in the advice section too
    expertAdviceText.textContent = t('loadingAI') || 'Getting AI recommendation...';
    
    try {
        // Determine severity based on confidence
        const confidencePercent = Math.round(results.confidence * 100);
        let severity = 'Low';
        if (confidencePercent >= 85) {
            severity = 'High';
        } else if (confidencePercent >= 65) {
            severity = 'Moderate';
        }
        
        console.log('🤖 Requesting Gemini recommendation...');
        
        // Check if Gemini is available
        if (!geminiAI) {
            throw new Error('Gemini AI not initialized');
        }
        
        // Get current language
        const currentLang = getCurrentLanguage();
        
        // Call Gemini AI with language support
        const recommendation = await geminiAI.getRecommendation(
            results.top_prediction,
            severity,
            results.confidence,
            results.treatments,
            currentLang
        );
        
        // Hide loading screen
        hideLoadingScreen();
        
        // Display the recommendation
        expertAdviceText.textContent = recommendation;
        console.log('✅ Gemini recommendation displayed');
        
    } catch (error) {
        console.error('❌ Gemini recommendation failed:', error);
        console.error('❌ Error details:', error.message, error.stack);
        
        // Hide loading screen
        hideLoadingScreen();
        
        // Show fallback message
        const confidencePercent = Math.round(results.confidence * 100);
        const fallbackMessage = `Based on the detection of ${results.top_prediction.replace(/_/g, ' ')}, follow the treatment recommendations below. The confidence level is ${confidencePercent}%, indicating ${confidencePercent >= 85 ? 'high' : confidencePercent >= 65 ? 'moderate' : 'low'} certainty in this diagnosis.`;
        
        expertAdviceText.textContent = fallbackMessage;
    }
}

/**
 * Feedback functionality
 */
function submitFeedback(isHelpful) {
    // Update button states
    const thumbsUpBtn = document.querySelector('.btn-feedback.thumbs-up');
    const thumbsDownBtn = document.querySelector('.btn-feedback.thumbs-down');
    
    if (thumbsUpBtn && thumbsDownBtn) {
        // Remove selected state from both buttons
        thumbsUpBtn.classList.remove('selected');
        thumbsDownBtn.classList.remove('selected');
        
        // Add selected state to the clicked button
        if (isHelpful) {
            thumbsUpBtn.classList.add('selected');
        } else {
            thumbsDownBtn.classList.add('selected');
        }
    }
    
    const message = isHelpful ? 
        'Thank you for your positive feedback!' : 
        'Thank you for your feedback. We\'ll work to improve our recommendations.';
    
    // Create compact feedback notification
    const feedbackDiv = document.createElement('div');
    feedbackDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${isHelpful ? '#4CAF50' : '#FF9800'};
        color: white;
        padding: 12px 18px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 280px;
        font-size: 13px;
        line-height: 1.4;
    `;
    
    feedbackDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fas ${isHelpful ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(feedbackDiv);
    
    setTimeout(() => {
        if (feedbackDiv.parentNode) {
            feedbackDiv.parentNode.removeChild(feedbackDiv);
        }
    }, 3000);

    console.log('📝 Feedback submitted:', isHelpful ? 'Positive' : 'Negative');
}

/**
 * Setup Language Selector
 */
function setupLanguageSelector() {
    const langBtn = document.getElementById('langBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    
    if (!langBtn || !languageDropdown) return;
    
    // Toggle language dropdown
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isVisible = languageDropdown.style.display === 'block';
        languageDropdown.style.display = isVisible ? 'none' : 'block';
        
        // Highlight current language
        languageOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === getCurrentLanguage()) {
                option.classList.add('active');
            }
        });
    });
    
    // Language option selection
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = option.getAttribute('data-lang');
            setLanguage(lang);
            languageDropdown.style.display = 'none';
            
            // Refresh the page to ensure all translations are applied
            window.location.reload();
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!languageDropdown.contains(e.target) && e.target !== langBtn) {
            languageDropdown.style.display = 'none';
        }
    });
    
    console.log('✅ Language selector setup complete');
}

/**
 * Load treatments based on language
 */
async function loadTreatments(disease, language = null) {
    const lang = language || getCurrentLanguage();
    
    try {
        // Determine which treatments file to load
        // Handle dialects: ms-kd -> treatments_kd.json, ms-kl -> treatments_kl.json
        let treatmentFile;
        if (lang === 'en') {
            treatmentFile = 'data/treatments.json';
        } else if (lang === 'ms-kd') {
            treatmentFile = 'data/treatments_kd.json';
        } else if (lang === 'ms-kl') {
            treatmentFile = 'data/treatments_kl.json';
        } else if (lang === 'ms') {
            treatmentFile = 'data/treatments_ms.json';
        } else if (lang === 'ja') {
            treatmentFile = 'data/treatments_ja.json';
        } else {
            treatmentFile = `data/treatments_${lang}.json`;
        }
        
        const response = await fetch(treatmentFile);
        if (!response.ok) {
            throw new Error(`Failed to load treatments for language: ${lang}`);
        }
        
        const treatments = await response.json();
        const diseaseTreatment = treatments[disease] || treatments['default'];
        
        // Store current treatments
        currentTreatments = {
            disease: disease,
            data: diseaseTreatment,
            language: lang
        };
        
        return diseaseTreatment;
    } catch (error) {
        console.error('❌ Failed to load treatments:', error);
        // Fallback logic: dialect -> base language -> English
        if (lang.startsWith('ms-')) {
            console.log('⚠️ Falling back to Bahasa Malaysia treatments');
            return loadTreatments(disease, 'ms');
        } else if (lang !== 'en') {
            console.log('⚠️ Falling back to English treatments');
            return loadTreatments(disease, 'en');
        }
        return null;
    }
}

/**
 * Setup Tutorial
 */
function setupTutorial() {
    const tutorialModal = document.getElementById('tutorialModal');
    const tutorialClose = document.getElementById('tutorialClose');
    const tutorialYes = document.getElementById('tutorialYes');
    const tutorialNo = document.getElementById('tutorialNo');
    const tutorialFinish = document.getElementById('tutorialFinish');
    
    if (!tutorialModal) return;
    
    // Close tutorial
    const closeTutorial = () => {
        tutorialModal.style.display = 'none';
        localStorage.setItem('mypadicare_tutorial_seen', 'true');
    };
    
    if (tutorialClose) {
        tutorialClose.addEventListener('click', closeTutorial);
    }
    
    // Start tutorial
    if (tutorialYes) {
        tutorialYes.addEventListener('click', () => {
            showTutorialStep(1);
        });
    }
    
    // Skip tutorial
    if (tutorialNo) {
        tutorialNo.addEventListener('click', closeTutorial);
    }
    
    // Finish tutorial
    if (tutorialFinish) {
        tutorialFinish.addEventListener('click', closeTutorial);
    }
    
    // Navigation buttons
    for (let i = 1; i <= 4; i++) {
        const nextBtn = document.getElementById(`tutorialNext${i}`);
        const prevBtn = document.getElementById(`tutorialPrev${i}`);
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => showTutorialStep(i + 1));
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (i === 1) {
                    showTutorialStep('welcome');
                } else {
                    showTutorialStep(i - 1);
                }
            });
        }
    }
    
    console.log('✅ Tutorial setup complete');
}

/**
 * Show tutorial step
 */
function showTutorialStep(step) {
    const steps = document.querySelectorAll('.tutorial-step');
    steps.forEach(s => s.classList.remove('active'));
    
    const targetStep = document.querySelector(`[data-step="${step}"]`);
    if (targetStep) {
        targetStep.classList.add('active');
    }
}

/**
 * Check if first time visit
 */
function checkFirstTimeVisit() {
    const tutorialSeen = localStorage.getItem('mypadicare_tutorial_seen');
    
    if (!tutorialSeen) {
        // First time visit - show tutorial after a short delay
        setTimeout(() => {
            const tutorialModal = document.getElementById('tutorialModal');
            if (tutorialModal) {
                tutorialModal.style.display = 'flex';
            }
        }, 1500);
    }
}

/**
 * Show loading screen
 */
function showLoadingScreen() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        // Force display and ensure it's on top
        loadingOverlay.style.display = 'flex';
        loadingOverlay.style.zIndex = '2000';
        loadingOverlay.style.opacity = '1';
        
        // Force a reflow to ensure the display change is applied
        void loadingOverlay.offsetWidth;
    }
}

/**
 * Hide loading screen
 */
function hideLoadingScreen() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

/**
 * Update loading screen text
 */
function updateLoadingText(text) {
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
        loadingText.textContent = text;
    }
}

console.log('🌾 MyPadiCare JavaScript loaded successfully');
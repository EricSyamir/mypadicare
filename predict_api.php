<?php
/**
 * Paddy Disease Prediction API for XAMPP
 * This PHP script handles image uploads and calls Python for predictions
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Configuration
$UPLOAD_DIR = 'uploads/';
$MAX_FILE_SIZE = 16 * 1024 * 1024; // 16MB
$ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
$PYTHON_SCRIPT = 'predict_single.py';

// Ensure upload directory exists
if (!is_dir($UPLOAD_DIR)) {
    mkdir($UPLOAD_DIR, 0755, true);
}

/**
 * Handle health check
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['action']) && $_GET['action'] == 'health') {
    // Check if Python script exists and model is available
    $model_path = 'results/model.hdf5';  // ALWAYS use results/model.hdf5
    $model_exists = file_exists($model_path);
    $python_exists = file_exists($PYTHON_SCRIPT);
    $treatments_exist = file_exists('data/treatments.json');
    
    echo json_encode([
        'status' => 'healthy',
        'model_loaded' => $model_exists,
        'model_path' => $model_path,
        'model_size' => $model_exists ? filesize($model_path) : 0,
        'python_script' => $python_exists,
        'treatments_loaded' => $treatments_exist,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit;
}

/**
 * Gemini AI Proxy Endpoint
 * Handles AI recommendation requests through Gemini API (server-side to avoid CORS)
 */
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_GET['action']) && $_GET['action'] == 'gemini') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['prompt'])) {
        echo json_encode(['success' => false, 'error' => 'No prompt provided']);
        exit;
    }
    
    $prompt = $input['prompt'];
    $apiKey = $input['api_key'] ?? getenv('GEMINI_API_KEY') ?: 'AIzaSyBIvJQ3ZLyXIehPpPO0O8thXTVBm50sW2g';
    $model = $input['model'] ?? 'gemini-2.5-pro-exp-03-25';
    
    // Remove 'google/' prefix if present (API doesn't use it)
    $model = str_replace('google/', '', $model);
    
    // Prepare request to Gemini API
    $gemini_url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}";
    
    $gemini_request = [
        'contents' => [
            [
                'parts' => [
                    [
                        'text' => $prompt
                    ]
                ]
            ]
        ],
        'generationConfig' => [
            'temperature' => 0.5,
            'maxOutputTokens' => 150,
            'topP' => 0.9,
            'topK' => 20
        ]
    ];
    
    // Make request to Gemini API
    $ch = curl_init($gemini_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($gemini_request));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_TIMEOUT, 60); // 60 second timeout
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curl_error = curl_error($ch);
    curl_close($ch);
    
    if ($curl_error) {
        echo json_encode([
            'success' => false,
            'error' => 'Gemini API connection failed: ' . $curl_error
        ]);
        exit;
    }
    
    if ($http_code !== 200) {
        echo json_encode([
            'success' => false,
            'error' => 'Gemini API error: HTTP ' . $http_code,
            'response' => $response
        ]);
        exit;
    }
    
    $gemini_data = json_decode($response, true);
    
    if (isset($gemini_data['candidates'][0]['content']['parts'][0]['text'])) {
        echo json_encode([
            'success' => true,
            'text' => trim($gemini_data['candidates'][0]['content']['parts'][0]['text'])
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Invalid response from Gemini API',
            'response' => $gemini_data
        ]);
    }
    
    exit;
}

/**
 * Handle disease prediction
 */
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        // Check if image was uploaded
        if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
            throw new Exception('No image uploaded or upload error occurred');
        }
        
        $file = $_FILES['image'];
        
        // Validate file size
        if ($file['size'] > $MAX_FILE_SIZE) {
            throw new Exception('File too large. Maximum size is 16MB.');
        }
        
        // Validate file extension
        $file_extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($file_extension, $ALLOWED_EXTENSIONS)) {
            throw new Exception('Invalid file type. Please upload an image file.');
        }
        
        // Generate unique filename
        $filename = uniqid('paddy_', true) . '.' . $file_extension;
        $filepath = $UPLOAD_DIR . $filename;
        
        // Move uploaded file
        if (!move_uploaded_file($file['tmp_name'], $filepath)) {
            throw new Exception('Failed to save uploaded file');
        }
        
        // Call Python prediction script
        $python_command = "python $PYTHON_SCRIPT \"$filepath\"";
        $output = shell_exec($python_command . ' 2>&1');
        
        // Clean up uploaded file
        if (file_exists($filepath)) {
            unlink($filepath);
        }
        
        // Parse Python output
        if (empty($output)) {
            throw new Exception('Python script did not return any output');
        }
        
        // Extract JSON from output (in case there are extra messages)
        $json_start = strpos($output, '{');
        if ($json_start !== false) {
            $json_output = substr($output, $json_start);
            // Find the end of the JSON object
            $brace_count = 0;
            $json_end = $json_start;
            for ($i = $json_start; $i < strlen($output); $i++) {
                if ($output[$i] === '{') $brace_count++;
                if ($output[$i] === '}') $brace_count--;
                if ($brace_count === 0) {
                    $json_end = $i;
                    break;
                }
            }
            $json_output = substr($output, $json_start, $json_end - $json_start + 1);
        } else {
            $json_output = $output;
        }
        
        // Try to decode JSON output from Python
        $result = json_decode($json_output, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON response from Python script. Raw output: ' . $output);
        }
        
        // Add treatments data if disease detected
        if ($result['health_status'] == 'diseased') {
            $treatments_file = 'data/treatments.json';
            if (file_exists($treatments_file)) {
                $treatments_data = json_decode(file_get_contents($treatments_file), true);
                $disease = $result['top_prediction'];
                if (isset($treatments_data[$disease])) {
                    $result['treatments'] = $treatments_data[$disease];
                }
            }
        }
        
        // Return successful response
        $result['success'] = true;
        $result['timestamp'] = date('Y-m-d H:i:s');
        
        echo json_encode($result);
        
    } catch (Exception $e) {
        // Return error response
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage(),
            'timestamp' => date('Y-m-d H:i:s')
        ]);
    }
    exit;
}

/**
 * Handle treatment lookup
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['treatment'])) {
    $disease = $_GET['treatment'];
    $treatments_file = 'data/treatments.json';
    
    if (!file_exists($treatments_file)) {
        http_response_code(404);
        echo json_encode(['error' => 'Treatments database not found']);
        exit;
    }
    
    $treatments_data = json_decode(file_get_contents($treatments_file), true);
    
    if (!isset($treatments_data[$disease])) {
        http_response_code(404);
        echo json_encode(['error' => 'Treatment not found for disease: ' . $disease]);
        exit;
    }
    
    echo json_encode($treatments_data[$disease]);
    exit;
}

// Invalid request
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
?>

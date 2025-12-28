#!/bin/bash
# Build script for Render - Injects environment variables into HTML

# Create env-config.js with environment variables
cat > static/js/env-config.js << EOF
// Environment variables injected by Render at build time
window.ENV = {
    GEMINI_API_KEY: '${GEMINI_API_KEY:-}',
    ELEVENLABS_API_KEY: '${ELEVENLABS_API_KEY:-}'
};
EOF

echo "✅ Environment variables injected into env-config.js"


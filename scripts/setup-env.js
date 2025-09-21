#!/usr/bin/env node

/**
 * Environment Setup Script for Next.js Movie Discovery App
 * 
 * This script helps set up environment variables for production deployment
 */

const fs = require('fs');
const path = require('path');

const ENV_TEMPLATE = `# Next.js Environment Variables
# Required for production deployment

# The Movie Database (TMDB) API Key (Required)
# Get your free API key from: https://www.themoviedb.org/settings/api
TMDB_API_KEY=\${TMDB_API_KEY}
NEXT_PUBLIC_TMDB_API_KEY=\${TMDB_API_KEY}

# Google Gemini AI API Key (Required)
# Get your free API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=\${GEMINI_API_KEY}

# Optional: Public API keys (client-side access)
NEXT_PUBLIC_SCRAPINGBEE_API_KEY=\${SCRAPINGBEE_API_KEY:-}
NEXT_PUBLIC_OLLAMA_BASE_URL=\${OLLAMA_BASE_URL:-http://localhost:11434/api}
NEXT_PUBLIC_OLLAMA_MODEL=\${OLLAMA_MODEL:-llama3.2:3b}

# Production deployment settings
NEXTAUTH_SECRET=\${NEXTAUTH_SECRET:-your-random-secret-here}
NEXTAUTH_URL=\${NEXTAUTH_URL:-https://yourdomain.com}
`;

function setupEnvironment() {
  console.log('🚀 Setting up Next.js Movie Discovery App environment...');
  
  // Check if .env.local exists
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env.local from template...');
    fs.writeFileSync(envPath, ENV_TEMPLATE);
    console.log('✅ Created .env.local file');
    console.log('⚠️  Please update .env.local with your actual API keys');
  } else {
    console.log('✅ .env.local already exists');
  }
  
  // Validate required environment variables
  console.log('🔍 Checking environment variables...');
  
  const requiredVars = ['TMDB_API_KEY', 'GEMINI_API_KEY'];
  const missingVars = [];
  
  for (const varName of requiredVars) {
    if (!process.env[varName] || process.env[varName] === 'your_api_key_here') {
      missingVars.push(varName);
    }
  }
  
  if (missingVars.length > 0) {
    console.log('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
      console.log(`   - ${varName}`);
    });
    console.log('');
    console.log('📖 Setup instructions:');
    console.log('   1. Get TMDB API key: https://www.themoviedb.org/settings/api');
    console.log('   2. Get Gemini API key: https://makersuite.google.com/app/apikey');
    console.log('   3. Update .env.local with your actual API keys');
    process.exit(1);
  }
  
  console.log('✅ All required environment variables are set');
  console.log('🎬 Movie Discovery App is ready to run!');
}

if (require.main === module) {
  setupEnvironment();
}

module.exports = { setupEnvironment };
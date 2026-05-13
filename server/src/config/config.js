// src/config/config.js
require('dotenv').config()

module.exports = {
  port:         parseInt(process.env.PORT)   || 5000,
  nodeEnv:      process.env.NODE_ENV         || 'development',
  mongoUri:     process.env.MONGO_URI        || 'mongodb://localhost:27017/medvision',
  jwtSecret:    process.env.JWT_SECRET       || 'medvision-hackathon-2026-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN   || '8h',
  geminiApiKey: process.env.GEMINI_API_KEY   || '',
  clientUrl:    process.env.CLIENT_URL       || 'http://localhost:5173',
  maxFileSize:  10 * 1024 * 1024,            // 10 MB
}

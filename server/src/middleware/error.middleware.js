// src/middleware/error.middleware.js
const { NodeEnv } = require('../config/config') // unused but shows intent

const errorHandler = (err, req, res, _next) => {
  console.error('[Error]', err.message)

  // Multer / file errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File too large. Max size: 10 MB.' })
  }
  if (err.message && err.message.includes('Only JPEG')) {
    return res.status(400).json({ error: err.message })
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }

  // Mongoose validation
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message)
    return res.status(400).json({ error: messages.join(', ') })
  }

  const status  = err.status || err.statusCode || 500
  const message = status < 500 ? err.message : 'Internal server error'
  return res.status(status).json({ error: message })
}

module.exports = { errorHandler }

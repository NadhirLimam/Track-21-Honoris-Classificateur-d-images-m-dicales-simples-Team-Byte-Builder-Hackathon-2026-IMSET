// src/server.js
require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const morgan  = require('morgan')
const path    = require('path')

const { connectDB }     = require('./config/db')
const config            = require('./config/config')
const { errorHandler }  = require('./middleware/error.middleware')

const authRoutes      = require('./routes/auth.routes')
const predictRoutes   = require('./routes/predict.routes')
const historyRoutes   = require('./routes/history.routes')
const analyticsRoutes = require('./routes/analytics.routes')
const datasetRoutes   = require('./routes/dataset.routes')

const app = express()

// ── Security / Utility Middleware ──────────────────────────────────────────────
app.use(cors({
  origin:      config.clientUrl,
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
if (config.nodeEnv !== 'test') app.use(morgan('dev'))

// ── Static Assets ──────────────────────────────────────────────────────────────
app.use('/uploads',  express.static(path.join(__dirname, '../uploads')))
app.use('/heatmaps', express.static(path.join(__dirname, '../heatmaps')))

// ── Health / Info ──────────────────────────────────────────────────────────────
app.get('/', (_req, res) =>
  res.json({
    status:     'online',
    service:    'MedVision AI',
    aiEngine:   'Google Gemini 1.5 Flash',
    disclaimer: 'Educational prototype only. NOT for medical use.',
    version:    '1.0.0',
  })
)
app.get('/api-info', (_req, res) =>
  res.json({
    aiEngine: 'Google Gemini 1.5 Flash (Free Tier)',
    endpoints: [
      'POST /api/auth/login',
      'POST /api/auth/demo-login',
      'GET  /api/auth/me',
      'POST /api/predict',
      'GET  /api/history',
      'GET  /api/history/:id',
      'DELETE /api/history/:id',
      'GET  /api/analytics/metrics',
      'GET  /api/analytics/charts',
      'GET  /api/analytics/dataset',
    ],
  })
)

// ── API Routes ─────────────────────────────────────────────────────────────────
app.use('/api/auth',      authRoutes)
app.use('/api/predict',   predictRoutes)
app.use('/api/history',   historyRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/dataset',   datasetRoutes)

// ── 404 ────────────────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }))

// ── Global Error Handler ───────────────────────────────────────────────────────
app.use(errorHandler)

// ── Boot ───────────────────────────────────────────────────────────────────────
// Start HTTP server immediately, then attempt DB connection in background
app.listen(config.port, () => {
  console.log(`🚀 MedVision AI server running at http://localhost:${config.port}`)
  console.log(`🤖 AI Engine: Google Gemini 1.5 Flash`)
  console.log(`⚠️  Educational prototype — not for medical use`)
})

connectDB()

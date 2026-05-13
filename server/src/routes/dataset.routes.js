// src/routes/dataset.routes.js
const router = require('express').Router()
const { getDatasetStats } = require('../controllers/analytics.controller')

// GET /api/dataset/stats
router.get('/stats', getDatasetStats)

module.exports = router

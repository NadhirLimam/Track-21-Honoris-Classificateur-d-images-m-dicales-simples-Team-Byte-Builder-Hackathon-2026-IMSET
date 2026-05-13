// src/routes/analytics.routes.js
const router = require('express').Router()
const { requireAuth } = require('../middleware/auth.middleware')
const { getMetrics, getCharts, getDatasetStats } = require('../controllers/analytics.controller')

router.get('/metrics', requireAuth, getMetrics)
router.get('/charts',  requireAuth, getCharts)
router.get('/dataset', requireAuth, getDatasetStats)

module.exports = router

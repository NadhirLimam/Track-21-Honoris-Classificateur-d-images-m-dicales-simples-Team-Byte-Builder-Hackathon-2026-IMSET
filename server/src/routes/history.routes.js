// src/routes/history.routes.js
const router = require('express').Router()
const { requireAuth } = require('../middleware/auth.middleware')
const { getHistory, getPredictionById, deletePrediction } = require('../controllers/history.controller')

router.get  ('/',    requireAuth, getHistory)
router.get  ('/:id', requireAuth, getPredictionById)
router.delete('/:id', requireAuth, deletePrediction)

module.exports = router

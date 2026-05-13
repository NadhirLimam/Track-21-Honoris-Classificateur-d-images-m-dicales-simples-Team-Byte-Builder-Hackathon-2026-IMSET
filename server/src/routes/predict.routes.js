// src/routes/predict.routes.js
const router = require('express').Router()
const upload  = require('../middleware/upload.middleware')
const { requireAuth } = require('../middleware/auth.middleware')
const { createPrediction } = require('../controllers/predict.controller')

router.post('/', requireAuth, upload.single('image'), createPrediction)

module.exports = router

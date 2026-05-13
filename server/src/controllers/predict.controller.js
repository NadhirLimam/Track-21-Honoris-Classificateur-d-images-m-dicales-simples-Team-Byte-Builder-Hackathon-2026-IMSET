// src/controllers/predict.controller.js
const { analyzeImage }    = require('../services/gemini.service')
const { preprocessImage } = require('../services/image.service')
const { generateHeatmap } = require('../services/heatmap.service')
const Prediction          = require('../models/Prediction.model')

// POST /api/predict
const createPrediction = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' })
  }

  const { filename, path: originalPath } = req.file

  try {
    // Step 1 — Preprocess image (resize to 512×512 for faster Gemini call)
    const processedPath = await preprocessImage(originalPath)

    // Step 2 — Call Gemini 1.5 Flash
    const aiResult = await analyzeImage(processedPath)

    // Step 3 — Generate simulated heatmap
    const heatmapFilename = await generateHeatmap(originalPath, aiResult.result)

    // Step 4 — Persist to MongoDB
    const prediction = await Prediction.create({
      imageFilename:    filename,
      imageUrl:         `/uploads/${filename}`,
      heatmapUrl:       `/heatmaps/${heatmapFilename}`,
      result:           aiResult.result,
      confidence:       aiResult.confidence,
      probabilities:    aiResult.probabilities,
      explanation:      aiResult.explanation,
      featuresDetected: aiResult.featuresDetected,
      isMock:           aiResult.isMock || false,
    })

    // Step 5 — Respond to frontend
    return res.status(201).json({
      id:              prediction._id,
      result:          aiResult.result,
      label:           aiResult.result === 'normal' ? 'Normal' : 'À vérifier',
      emoji:           aiResult.result === 'normal' ? '🟢' : '🟠',
      confidence:      +(aiResult.confidence * 100).toFixed(2),
      probabilities: {
        normal: +(aiResult.probabilities.normal * 100).toFixed(2),
        review: +(aiResult.probabilities.review * 100).toFixed(2),
      },
      explanation:      aiResult.explanation,
      featuresDetected: aiResult.featuresDetected,
      imageUrl:         `/uploads/${filename}`,
      heatmapUrl:       `/heatmaps/${heatmapFilename}`,
      isMock:           aiResult.isMock || false,
      disclaimer:       '⚠️ Educational simulation only. NOT a medical diagnosis.',
      createdAt:        prediction.createdAt,
    })
  } catch (err) {
    console.error('Prediction controller error:', err)
    return res.status(500).json({ error: 'Prediction failed', detail: err.message })
  }
}

module.exports = { createPrediction }

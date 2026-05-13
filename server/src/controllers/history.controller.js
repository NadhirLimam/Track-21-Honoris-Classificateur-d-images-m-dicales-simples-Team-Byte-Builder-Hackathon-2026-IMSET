// src/controllers/history.controller.js
const Prediction = require('../models/Prediction.model')

// GET /api/history
const getHistory = async (req, res, next) => {
  try {
    const { result, limit = 50, page = 1 } = req.query
    const query  = result ? { result } : {}
    const skip   = (Number(page) - 1) * Number(limit)

    const [predictions, total] = await Promise.all([
      Prediction.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Prediction.countDocuments(query),
    ])

    res.json({
      predictions: predictions.map(formatPrediction),
      total,
      page:  Number(page),
      pages: Math.ceil(total / Number(limit)),
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/history/:id
const getPredictionById = async (req, res, next) => {
  try {
    const prediction = await Prediction.findById(req.params.id)
    if (!prediction) return res.status(404).json({ error: 'Prediction not found' })
    res.json(formatPrediction(prediction))
  } catch (err) {
    next(err)
  }
}

// DELETE /api/history/:id
const deletePrediction = async (req, res, next) => {
  try {
    const prediction = await Prediction.findByIdAndDelete(req.params.id)
    if (!prediction) return res.status(404).json({ error: 'Prediction not found' })
    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    next(err)
  }
}

const formatPrediction = (p) => ({
  id:               p._id,
  result:           p.result,
  confidence:       +(p.confidence * 100).toFixed(2),
  probabilities: {
    normal: +((p.probabilities?.normal ?? 0) * 100).toFixed(2),
    review: +((p.probabilities?.review ?? 0) * 100).toFixed(2),
  },
  explanation:      p.explanation,
  featuresDetected: p.featuresDetected,
  imageUrl:         p.imageUrl,
  heatmapUrl:       p.heatmapUrl,
  isMock:           p.isMock,
  disclaimer:       p.disclaimer,
  createdAt:        p.createdAt,
})

module.exports = { getHistory, getPredictionById, deletePrediction }

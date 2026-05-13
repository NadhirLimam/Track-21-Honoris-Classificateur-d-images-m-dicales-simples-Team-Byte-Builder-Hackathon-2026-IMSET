// src/controllers/analytics.controller.js
const Prediction = require('../models/Prediction.model')

// GET /api/analytics/metrics
const getMetrics = async (_req, res, next) => {
  try {
    const [total, normalCount, reviewCount, confAgg] = await Promise.all([
      Prediction.countDocuments(),
      Prediction.countDocuments({ result: 'normal' }),
      Prediction.countDocuments({ result: 'review' }),
      Prediction.aggregate([{ $group: { _id: null, avg: { $avg: '$confidence' } } }]),
    ])

    res.json({
      totalPredictions: total,
      normalCount,
      reviewCount,
      avgConfidence:  +((confAgg[0]?.avg || 0) * 100).toFixed(2),
      aiEngine:       'Google Gemini 1.5 Flash',
      disclaimer:     'Metrics based on educational demonstration predictions only.',
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/analytics/charts
// All data comes from real MongoDB predictions — no fake training curves
const getCharts = async (_req, res, next) => {
  try {
    const predictions = await Prediction.find({}, 'result confidence createdAt').lean()

    // Group by day for timeline area chart
    const byDay = {}
    predictions.forEach(p => {
      const day = p.createdAt.toISOString().slice(0, 10)
      if (!byDay[day]) byDay[day] = { normal: 0, review: 0 }
      byDay[day][p.result]++
    })

    // Confidence distribution in 10% buckets
    const confBuckets = Array(10).fill(0)
    predictions.forEach(p => {
      const bucket = Math.min(Math.floor(p.confidence * 10), 9)
      confBuckets[bucket]++
    })

    const normalCount = predictions.filter(p => p.result === 'normal').length

    res.json({
      timeline: Object.entries(byDay)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, counts]) => ({ date, ...counts, total: counts.normal + counts.review })),
      confidenceDistribution: confBuckets.map((count, i) => ({
        range: `${i * 10}-${(i + 1) * 10}%`,
        count,
      })),
      classDistribution: {
        normal: normalCount,
        review: predictions.length - normalCount,
      },
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/analytics/dataset
const getDatasetStats = (_req, res) => {
  res.json({
    total:    1000,
    normal:   600,
    review:   400,
    splits: {
      train: { total: 700, normal: 420, review: 280 },
      val:   { total: 150, normal: 90,  review: 60  },
      test:  { total: 150, normal: 90,  review: 60  },
    },
    imageSize: '512×512',
    format:    'JPEG (preprocessed by Sharp)',
    source:    'NIH ChestX-ray14 — Educational subset',
    aiEngine:  'Google Gemini 1.5 Flash (no training required)',
  })
}

module.exports = { getMetrics, getCharts, getDatasetStats }

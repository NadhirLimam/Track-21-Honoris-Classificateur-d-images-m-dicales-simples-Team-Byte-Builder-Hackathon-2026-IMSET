// src/models/Prediction.model.js
const mongoose = require('mongoose')

const predictionSchema = new mongoose.Schema({
  imageFilename:    { type: String, required: true },
  imageUrl:         { type: String, required: true },
  heatmapUrl:       { type: String },
  result:           { type: String, enum: ['normal', 'review'], required: true },
  confidence:       { type: Number, required: true, min: 0, max: 1 },
  probabilities: {
    normal: { type: Number },
    review: { type: Number },
  },
  explanation:      { type: String },       // Gemini text explanation
  featuresDetected: [String],               // Gemini feature list
  isMock:           { type: Boolean, default: false },
  disclaimer: {
    type:    String,
    default: 'Educational simulation only. NOT a medical diagnosis.',
  },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Prediction', predictionSchema)

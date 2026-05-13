// src/services/ai.service.js
require('dotenv').config()
const tf       = require('@tensorflow/tfjs-node')
const path     = require('path')
const config   = require('../config/config')
const { preprocessImage, INPUT_SIZE } = require('./image.service')
const { mockPredict } = require('../utils/mockPredict')

let _model = null

const loadModel = async () => {
  if (_model) return _model
  try {
    const modelPath = path.resolve(__dirname, '../../', config.modelPath)
    _model = await tf.loadLayersModel(`file://${modelPath}`)
    console.log('✅ TF.js model loaded')
  } catch (err) {
    console.warn(`⚠️  Model not found (${err.message}). Falling back to mock predictions.`)
    _model = null
  }
  return _model
}

/**
 * Run inference on an uploaded image file.
 * Returns { result, confidence, probabilities, isMock }.
 */
const predict = async (filePath) => {
  if (config.useMock) return mockPredict(filePath)

  const model = await loadModel()
  if (!model) return mockPredict(filePath)

  const pixelData = await preprocessImage(filePath)
  const inputTensor = tf.tensor3d(pixelData, [INPUT_SIZE, INPUT_SIZE, 3]).expandDims(0)

  let outputTensor
  try {
    outputTensor = model.predict(inputTensor)
  } finally {
    inputTensor.dispose()
  }

  const probsArray = await outputTensor.data()
  outputTensor.dispose()

  // Expect shape [1, 2] → [reviewProb, normalProb] (or vice versa — adjust to your training label order)
  const reviewProb = probsArray[0]
  const normalProb = probsArray[1] !== undefined ? probsArray[1] : 1 - reviewProb

  const result     = normalProb >= 0.5 ? 'normal' : 'review'
  const confidence = result === 'normal' ? normalProb : reviewProb

  return {
    result,
    confidence,
    probabilities: { normal: normalProb, review: reviewProb },
    isMock: false,
  }
}

module.exports = { loadModel, predict }

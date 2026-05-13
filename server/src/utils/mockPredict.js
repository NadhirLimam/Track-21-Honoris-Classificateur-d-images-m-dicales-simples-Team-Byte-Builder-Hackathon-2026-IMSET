// src/utils/mockPredict.js
const path = require('path')

/**
 * Deterministic mock prediction based on filename hash.
 * Produces realistic-looking probability values.
 * ⚠️ Educational simulation only.
 */
const mockPredict = (filePath) => {
  const name = path.basename(filePath)

  // Simple djb2 hash for determinism
  let hash = 5381
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 33) ^ name.charCodeAt(i)
    hash = hash >>> 0 // keep 32-bit unsigned
  }

  // Derive a pseudo-probability in [0.55, 0.99]
  const baseProb = 0.55 + (hash % 1000) / 2272   // maps to [0.55, 0.99]
  const isReview = hash % 3 === 0                 // ~33% review cases

  const normalProb = isReview ? +(1 - baseProb).toFixed(4) : +baseProb.toFixed(4)
  const reviewProb = +(1 - normalProb).toFixed(4)
  const result     = normalProb >= 0.5 ? 'normal' : 'review'
  const confidence = result === 'normal' ? normalProb : reviewProb

  return { result, confidence, probabilities: { normal: normalProb, review: reviewProb }, isMock: true }
}

module.exports = { mockPredict }

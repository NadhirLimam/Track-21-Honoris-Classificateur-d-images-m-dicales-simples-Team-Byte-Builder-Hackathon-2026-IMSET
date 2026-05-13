// src/services/image.service.js
const sharp = require('sharp')

/**
 * Resize image to max 512×512 before sending to Gemini.
 * Smaller payload = faster API response.
 * Returns the path of the processed file.
 */
const preprocessImage = async (inputPath) => {
  const outputPath = inputPath.replace(/(\.[^.]+)$/, '_processed$1')
  await sharp(inputPath)
    .resize(512, 512, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 90 })
    .toFile(outputPath)
  return outputPath
}

module.exports = { preprocessImage }

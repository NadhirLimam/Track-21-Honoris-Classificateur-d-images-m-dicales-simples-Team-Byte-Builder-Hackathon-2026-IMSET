// src/services/heatmap.service.js
// Uses Sharp + SVG compositing — no native canvas/node-gyp required.
const sharp = require('sharp')
const path  = require('path')
const fs    = require('fs')
const { v4: uuidv4 } = require('uuid')

const HEATMAPS_DIR = path.join(__dirname, '../../heatmaps')

/**
 * Generate a simulated Grad-CAM-style heatmap overlay.
 * For 'review': warm radial-gradient blobs (seed-deterministic positions).
 * For 'normal': soft green tint.
 * Saves JPEG to heatmaps/ and returns the filename.
 *
 * ⚠️ Educational simulation only — not actual Grad-CAM.
 */
const generateHeatmap = async (imagePath, result) => {
  if (!fs.existsSync(HEATMAPS_DIR)) fs.mkdirSync(HEATMAPS_DIR, { recursive: true })

  const SIZE = 512

  // Derive deterministic seed from filename
  const basename = path.basename(imagePath)
  let seed = 0
  for (let i = 0; i < basename.length; i++) seed = (seed * 31 + basename.charCodeAt(i)) >>> 0

  let svgContent

  if (result === 'review') {
    // Seed-based warm gradient blobs over upper/central chest region
    const defs = [0, 1, 2].map(i => {
      const color   = `rgb(255,${60 + i * 30},0)`
      const opacity = i === 0 ? 0.40 : 0.28
      return `<radialGradient id="g${i}" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stop-color="${color}" stop-opacity="${opacity}"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </radialGradient>`
    }).join('\n')

    const ellipses = [0, 1, 2].map(i => {
      const cx = 50 + ((seed * (i + 7) * 31) % (SIZE - 100))
      const cy = 40 + ((seed * (i + 3) * 17) % (SIZE / 2))
      const r  = 60 + ((seed * (i + 11) * 7) % 80)
      return `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r}" fill="url(#g${i})"/>`
    }).join('\n')

    svgContent = `<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
      <defs>${defs}</defs>
      ${ellipses}
    </svg>`
  } else {
    // Soft green tint for normal scans
    svgContent = `<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${SIZE}" height="${SIZE}" fill="rgb(52,211,153)" fill-opacity="0.15"/>
    </svg>`
  }

  const filename = `heatmap_${uuidv4().slice(0, 8)}.jpg`
  const outPath  = path.join(HEATMAPS_DIR, filename)

  await sharp(imagePath)
    .resize(SIZE, SIZE)
    .composite([{ input: Buffer.from(svgContent), blend: 'over' }])
    .jpeg({ quality: 88 })
    .toFile(outPath)

  return filename
}

module.exports = { generateHeatmap }

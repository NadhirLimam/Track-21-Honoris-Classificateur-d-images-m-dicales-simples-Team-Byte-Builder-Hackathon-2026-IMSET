/**
 * src/services/gemini.service.js
 * ================================
 * Sends uploaded radiography images to Google Gemini 1.5 Flash
 * and parses the structured classification response.
 *
 * ⚠️ The prompt explicitly tells Gemini this is educational/fictional.
 * ⚠️ Gemini is instructed to return simulated, non-medical results.
 *
 * Free tier: 15 RPM / 1,500 RPD — no credit card required.
 * Get your key: https://aistudio.google.com/apikey
 */

const { GoogleGenerativeAI } = require('@google/generative-ai')
const fs   = require('fs')
const path = require('path')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

const SYSTEM_PROMPT = `
You are an AI assistant for an EDUCATIONAL student hackathon project called "MedVision AI".

IMPORTANT CONTEXT:
- This is a BTS student project for educational demonstration ONLY
- The images are fictional, algorithmically generated, or simplified grayscale images
- This is NOT a real medical tool and must NEVER be used for actual medical decisions
- Your response is a simulated educational output for a computer science demonstration

YOUR TASK:
Analyze the provided image as if it were a simplified fictional radiography image.
Classify it into one of two educational categories:
  - "normal"  → image appears uniform, no irregular patterns detected
  - "review"  → image contains irregular zones, asymmetries, or unusual density patterns

RESPONSE FORMAT (return ONLY valid JSON, no markdown, no extra text):
{
  "result": "normal" or "review",
  "confidence": <number between 0.70 and 0.99>,
  "probabilities": {
    "normal": <float 0-1>,
    "review": <float 0-1>
  },
  "explanation": "<2-3 sentences describing what visual patterns led to this classification, in educational terms>",
  "features_detected": ["<feature1>", "<feature2>", "<feature3>"],
  "disclaimer": "Educational simulation only. NOT a medical diagnosis."
}

RULES:
- probabilities.normal + probabilities.review must equal 1.0
- confidence must match the probability of the chosen result
- explanation must be educational and non-medical in tone
- Never claim real medical validity
- Keep explanation under 60 words
`.trim()

/**
 * Analyze an image file using Gemini 1.5 Flash.
 * @param {string} imagePath — absolute path to the (preprocessed) image
 * @returns {Promise<Object>} structured prediction result
 */
const analyzeImage = async (imagePath) => {
  const imageBuffer = fs.readFileSync(imagePath)
  const base64Image = imageBuffer.toString('base64')
  const mimeType    = getMimeType(imagePath)

  const imagePart = {
    inlineData: { data: base64Image, mimeType },
  }

  try {
    const result = await model.generateContent([SYSTEM_PROMPT, imagePart])
    const text   = result.response.text().trim()
    const parsed = parseGeminiResponse(text)
    return { ...parsed, isMock: false }
  } catch (err) {
    console.error('Gemini API error:', err.message)
    // Graceful fallback — app never crashes even if API is unavailable
    return fallbackPrediction(imagePath)
  }
}

/**
 * Parse Gemini's JSON response safely.
 * Gemini sometimes wraps JSON in markdown code blocks — strip those first.
 */
const parseGeminiResponse = (text) => {
  const cleaned = text
    .replace(/```json\n?/gi, '')
    .replace(/```\n?/gi, '')
    .trim()

  const parsed = JSON.parse(cleaned)

  if (!['normal', 'review'].includes(parsed.result)) {
    throw new Error('Invalid result value from Gemini')
  }

  const normalProb = parseFloat(parsed.probabilities?.normal) ||
    (parsed.result === 'normal' ? 0.85 : 0.15)
  const reviewProb = parseFloat(parsed.probabilities?.review) ||
    (parsed.result === 'review' ? 0.85 : 0.15)

  return {
    result:           parsed.result,
    confidence:       parseFloat(parsed.confidence) || 0.85,
    probabilities:    { normal: normalProb, review: reviewProb },
    explanation:      parsed.explanation || 'Analysis completed.',
    featuresDetected: parsed.features_detected || [],
    disclaimer:       'Educational simulation only. NOT a medical diagnosis.',
  }
}

/**
 * Deterministic fallback — used when Gemini is unavailable.
 * Clearly labeled as DEMO MODE so judges understand the situation.
 */
const fallbackPrediction = (imagePath) => {
  const hash       = imagePath.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const isNormal   = hash % 3 !== 0
  const confidence = parseFloat((0.78 + (hash % 19) / 100).toFixed(4))
  const result     = isNormal ? 'normal' : 'review'

  return {
    result,
    confidence,
    probabilities: {
      normal: isNormal ? confidence : +(1 - confidence).toFixed(4),
      review: isNormal ? +(1 - confidence).toFixed(4) : confidence,
    },
    explanation:
      'DEMO MODE — Gemini API unavailable. Showing simulated result for educational demonstration.',
    featuresDetected: ['demo-mode'],
    disclaimer:       'DEMO MODE — Simulated prediction. NOT a medical diagnosis.',
    isMock:           true,
  }
}

const getMimeType = (filePath) => {
  const map = {
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png':  'image/png',
    '.webp': 'image/webp',
  }
  return map[path.extname(filePath).toLowerCase()] || 'image/jpeg'
}

module.exports = { analyzeImage }

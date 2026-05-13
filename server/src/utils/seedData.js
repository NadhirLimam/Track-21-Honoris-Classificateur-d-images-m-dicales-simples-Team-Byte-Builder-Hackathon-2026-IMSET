// src/utils/seedData.js
// Run once to populate MongoDB with demo predictions and a demo user.
// Usage: node src/utils/seedData.js
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') })
const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')
const Prediction = require('../models/Prediction.model')
const User       = require('../models/User.model')

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('✅ Connected. Seeding…')

  // Upsert demo user
  const hash = await bcrypt.hash('demo1234', 10)
  await User.findOneAndUpdate(
    { email: 'demo@medvision.ai' },
    { email: 'demo@medvision.ai', password: hash, name: 'Demo User', role: 'demo' },
    { upsert: true, new: true }
  )
  console.log('✅ Demo user upserted (demo@medvision.ai / demo1234)')

  // Seed 20 predictions
  const existing = await Prediction.countDocuments()
  if (existing < 20) {
    const fakes = Array.from({ length: 20 }, (_, i) => {
      const isReview  = i % 3 === 0
      const confidence = isReview ? 0.55 + Math.random() * 0.35 : 0.70 + Math.random() * 0.28
      return {
        imageFilename: `seed-image-${i + 1}.jpg`,
        imageUrl:      `http://localhost:5000/uploads/seed-image-${i + 1}.jpg`,
        result:        isReview ? 'review' : 'normal',
        confidence,
        probabilities: {
          normal: isReview ? +(1 - confidence).toFixed(4) : +confidence.toFixed(4),
          review: isReview ? +confidence.toFixed(4) : +(1 - confidence).toFixed(4),
        },
        isMock:    true,
        explanation:      isReview
          ? 'Irregular zone detected in upper lobe with asymmetric density pattern. Possible consolidation visible.'
          : 'Uniform lung texture with no irregular density patterns. Clear costophrenic angles.',
        featuresDetected: isReview
          ? ['asymmetric-density', 'irregular-zone', 'possible-consolidation']
          : ['uniform-texture', 'clear-angles'],
        createdAt: new Date(Date.now() - i * 3 * 60 * 60 * 1000),
      }
    })
    await Prediction.insertMany(fakes)
    console.log(`✅ Inserted ${fakes.length} seed predictions`)
  } else {
    console.log(`ℹ️  ${existing} predictions already exist — skipping`)
  }

  await mongoose.disconnect()
  console.log('Done.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})

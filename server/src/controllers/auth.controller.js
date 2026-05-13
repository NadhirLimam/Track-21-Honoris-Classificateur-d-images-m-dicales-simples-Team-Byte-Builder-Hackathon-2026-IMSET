// src/controllers/auth.controller.js
const jwt    = require('jsonwebtoken')
const User   = require('../models/User.model')
const config = require('../config/config')

const signToken = (payload) =>
  jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn })

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = signToken({ id: user._id, email: user.email, role: user.role })
    res.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } })
  } catch (err) {
    next(err)
  }
}

// POST /api/auth/demo-login
const demoLogin = async (_req, res) => {
  const token = signToken({ id: 'demo-user', email: 'demo@medvision.ai', role: 'demo' })
  res.json({
    token,
    user: { id: 'demo-user', email: 'demo@medvision.ai', name: 'Demo User', role: 'demo' },
  })
}

// GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    if (req.user.id === 'demo-user') {
      return res.json({ id: 'demo-user', email: 'demo@medvision.ai', name: 'Demo User', role: 'demo' })
    }
    const user = await User.findById(req.user.id).select('-password')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (err) {
    next(err)
  }
}

module.exports = { login, demoLogin, getMe }

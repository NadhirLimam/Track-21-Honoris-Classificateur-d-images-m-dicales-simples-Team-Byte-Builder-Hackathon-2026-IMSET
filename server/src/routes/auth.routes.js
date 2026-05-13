// src/routes/auth.routes.js
const router = require('express').Router()
const { login, demoLogin, getMe } = require('../controllers/auth.controller')
const { requireAuth } = require('../middleware/auth.middleware')

router.post('/login',       login)
router.post('/demo-login',  demoLogin)
router.get ('/me',          requireAuth, getMe)

module.exports = router

// src/middleware/upload.middleware.js
const multer = require('multer')
const path   = require('path')
const { v4: uuidv4 } = require('uuid')
const config = require('../config/config')

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename:    (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `${uuidv4()}${ext}`)
  },
})

const fileFilter = (_req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp']
  if (allowed.includes(file.mimetype)) return cb(null, true)
  cb(new Error('Only JPEG, PNG, and WebP images are accepted'), false)
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: config.maxFileSize },
})

module.exports = upload

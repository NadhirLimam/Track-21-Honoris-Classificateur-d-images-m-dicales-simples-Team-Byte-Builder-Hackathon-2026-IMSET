// src/lib/constants.js

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const LABELS = {
  normal:  'Normal',
  review:  'À vérifier',
}

export const LABEL_COLORS = {
  normal: {
    text:   '#34D399',
    bg:     'rgba(52, 211, 153, 0.10)',
    border: '#34D399',
  },
  review: {
    text:   '#FB923C',
    bg:     'rgba(251, 146, 60, 0.10)',
    border: '#FB923C',
  },
}

export const CONFIDENCE_THRESHOLDS = {
  high:   85,  // green
  medium: 70,  // yellow
  // below medium → orange
}

export const MAX_UPLOAD_SIZE_MB = 10
export const ACCEPTED_IMAGE_TYPES = { 'image/jpeg': [], 'image/png': [] }

export const DISCLAIMER_TEXT =
  '⚠️ Educational Prototype — NOT a medical tool. All predictions are simulated demonstrations only.'

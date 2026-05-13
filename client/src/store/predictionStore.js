// src/store/predictionStore.js
import { create } from 'zustand'

/**
 * @typedef {Object} Prediction
 * @property {string}  id
 * @property {string}  result       - 'normal' | 'review'
 * @property {number}  confidence   - 0–100
 * @property {Object}  probabilities
 * @property {string}  imageUrl
 * @property {string}  [heatmapUrl]
 * @property {string}  disclaimer
 * @property {string}  createdAt    - ISO date string
 */

const usePredictionStore = create((set) => ({
  /** @type {'idle'|'uploading'|'analyzing'|'success'|'error'} */
  status: 'idle',

  /** @type {Prediction|null} */
  currentPrediction: null,

  /** @type {Prediction[]} */
  history: [],

  error: null,

  setStatus: (status) => set({ status }),

  setCurrentPrediction: (prediction) =>
    set({
      currentPrediction: prediction,
      status: 'success',
      error: null,
    }),

  addToHistory: (prediction) =>
    set((state) => ({
      history: [prediction, ...state.history],
    })),

  setHistory: (history) => set({ history }),

  setError: (error) => set({ error, status: 'error' }),

  reset: () => set({ status: 'idle', currentPrediction: null, error: null }),
}))

export default usePredictionStore

// src/hooks/usePrediction.js
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import API from '../lib/api'
import usePredictionStore from '../store/predictionStore'

/**
 * POST /api/predict — multipart/form-data
 * Returns: { result, confidence, probabilities, imageUrl, heatmapUrl, disclaimer }
 */
export function usePrediction() {
  const { setStatus, setCurrentPrediction, addToHistory, setError, reset } =
    usePredictionStore()

  const predict = useCallback(
    async (file) => {
      if (!file) return

      reset()

      try {
        setStatus('uploading')
        const formData = new FormData()
        formData.append('image', file)

        setStatus('analyzing')
        const { data } = await API.post('/api/predict', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })

        const prediction = {
          ...data,
          createdAt: data.createdAt || new Date().toISOString(),
        }

        setCurrentPrediction(prediction)
        addToHistory(prediction)
        toast.success('Gemini analysis complete')
      } catch (err) {
        const message = err.response?.data?.message || err.response?.data?.error || 'Analysis failed'
        setError(message)
        toast.error(message)
      }
    },
    [reset, setStatus, setCurrentPrediction, addToHistory, setError]
  )

  return { predict, analyze: predict }
}

// src/hooks/useHistory.js
import { useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import API from '../lib/api'
import usePredictionStore from '../store/predictionStore'

/**
 * GET /api/history — fetch prediction history
 */
export function useHistory() {
  const { history, setHistory } = usePredictionStore()

  const fetchHistory = useCallback(async () => {
    try {
      const { data } = await API.get('/api/history')
      setHistory(data)
    } catch (err) {
      // Silently fail — history is non-critical
      console.error('Failed to fetch history', err)
    }
  }, [setHistory])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  return { history, refetch: fetchHistory }
}

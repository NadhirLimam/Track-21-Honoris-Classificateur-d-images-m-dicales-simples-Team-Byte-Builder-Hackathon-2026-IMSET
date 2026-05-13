// src/hooks/useAnalytics.js
import { useState, useEffect } from 'react'
import API from '../lib/api'

/**
 * GET /api/analytics/metrics — model performance metrics
 */
export function useAnalytics() {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const { data } = await API.get('/api/analytics/metrics')
        if (!cancelled) setMetrics(data)
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || 'Failed to load metrics')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return { metrics, loading, error }
}

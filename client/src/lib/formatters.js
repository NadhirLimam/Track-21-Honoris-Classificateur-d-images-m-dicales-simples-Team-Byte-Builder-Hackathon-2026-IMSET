// src/lib/formatters.js

/**
 * Format a confidence value (0–1 or 0–100) to a percentage string
 * @param {number} value
 * @returns {string} e.g. "94.2%"
 */
export function formatConfidence(value) {
  const pct = value > 1 ? value : value * 100
  return `${pct.toFixed(1)}%`
}

/**
 * Format an ISO date string to a readable date
 * @param {string} isoString
 * @returns {string} e.g. "2026-05-12"
 */
export function formatDate(isoString) {
  if (!isoString) return '—'
  const d = new Date(isoString)
  return d.toISOString().slice(0, 10)
}

/**
 * Format an ISO date string to a human-readable relative time
 * @param {string} isoString
 * @returns {string} e.g. "2 hours ago"
 */
export function formatRelativeTime(isoString) {
  if (!isoString) return '—'
  const now = Date.now()
  const diff = now - new Date(isoString).getTime()
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

/**
 * Get confidence color class based on value
 * @param {number} value  0–100
 * @returns {'green'|'yellow'|'orange'}
 */
export function confidenceColor(value) {
  const pct = value > 1 ? value : value * 100
  if (pct >= 85) return '#34D399'
  if (pct >= 70) return '#FCD34D'
  return '#FB923C'
}

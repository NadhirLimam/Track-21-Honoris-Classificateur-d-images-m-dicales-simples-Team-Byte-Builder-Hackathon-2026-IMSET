// src/components/dashboard/RecentPredictions.jsx
import { Link } from 'react-router-dom'
import PredictionBadge from '../prediction/PredictionBadge'
import { formatRelativeTime, formatConfidence } from '../../lib/formatters'

export default function RecentPredictions({ predictions = [] }) {
  const DEMO = [
    { id: '1', result: 'normal', confidence: 94.2, createdAt: new Date(Date.now() - 3600_000).toISOString() },
    { id: '2', result: 'review', confidence: 78.5, createdAt: new Date(Date.now() - 7200_000).toISOString() },
    { id: '3', result: 'normal', confidence: 91.0, createdAt: new Date(Date.now() - 86400_000).toISOString() },
    { id: '4', result: 'normal', confidence: 87.3, createdAt: new Date(Date.now() - 172800_000).toISOString() },
    { id: '5', result: 'review', confidence: 65.1, createdAt: new Date(Date.now() - 259200_000).toISOString() },
  ]

  const items = (predictions.length > 0 ? predictions : DEMO).slice(0, 5)

  return (
    <div className="bg-[#0F1623] border border-[#1E2D45] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#E8F0FF]">Recent Predictions</h3>
        <Link to="/history" className="text-xs text-[#0A84FF] hover:text-blue-400 transition-colors">
          View all →
        </Link>
      </div>

      <div className="space-y-3">
        {items.map((pred, i) => (
          <div
            key={pred.id || i}
            className="flex items-center justify-between py-2 border-b border-[#1E2D45] last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-[#161F30] flex items-center justify-center text-xs text-[#3D5470] font-mono">
                {i + 1}
              </div>
              <PredictionBadge result={pred.result} size="sm" />
            </div>
            <div className="flex items-center gap-4 text-xs text-[#7A90B0]">
              <span className="font-mono">{formatConfidence(pred.confidence)}</span>
              <span>{formatRelativeTime(pred.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

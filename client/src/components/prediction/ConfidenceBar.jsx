// src/components/prediction/ConfidenceBar.jsx
import { motion } from 'framer-motion'
import { confidenceColor } from '../../lib/formatters'

export default function ConfidenceBar({ value, showLabel = true }) {
  const pct   = value > 1 ? value : value * 100
  const color = confidenceColor(pct)

  return (
    <div className="space-y-1.5">
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#7A90B0]">Confidence</span>
          <span className="font-mono font-medium" style={{ color }}>
            {pct.toFixed(1)}%
          </span>
        </div>
      )}
      <div className="h-2 bg-[#161F30] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: '0%' }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

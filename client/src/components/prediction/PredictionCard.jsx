// src/components/prediction/PredictionCard.jsx
import { motion } from 'framer-motion'
import { Download, AlertTriangle } from 'lucide-react'
import PredictionBadge from './PredictionBadge'
import ConfidenceBar from './ConfidenceBar'
import HeatmapOverlay from './HeatmapOverlay'
import { formatDate, formatConfidence } from '../../lib/formatters'

export default function PredictionCard({ result, confidence, probabilities, imageUrl, heatmapUrl, disclaimer, createdAt }) {
  const isNormal    = result === 'normal'
  const borderColor = isNormal ? '#34D399' : '#FB923C'
  const glowClass   = isNormal ? 'border-glow-normal' : 'border-glow-review'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`bg-[#0F1623] rounded-xl border ${glowClass} p-5 space-y-5`}
      style={{ borderColor }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#E8F0FF]">Analysis Result</h3>
        {createdAt && (
          <span className="text-xs text-[#3D5470]">{formatDate(createdAt)}</span>
        )}
      </div>

      {/* Badge + confidence */}
      <div className="space-y-3">
        <PredictionBadge result={result} size="lg" />
        <ConfidenceBar value={confidence} />
      </div>

      {/* Probability breakdown */}
      {probabilities && (
        <div className="space-y-2">
          <p className="text-xs text-[#7A90B0] font-medium uppercase tracking-wider">
            Class probabilities
          </p>
          {Object.entries(probabilities).map(([label, prob]) => (
            <div key={label} className="flex items-center justify-between text-xs">
              <span className="text-[#7A90B0] capitalize">{label}</span>
              <span className="font-mono text-[#E8F0FF]">{formatConfidence(prob)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Heatmap */}
      {(imageUrl || heatmapUrl) && (
        <HeatmapOverlay heatmapUrl={heatmapUrl} originalUrl={imageUrl} />
      )}

      {/* Disclaimer */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-[rgba(251,146,60,0.06)] border border-[rgba(251,146,60,0.15)]">
        <AlertTriangle size={13} className="text-[#FB923C] mt-0.5 shrink-0" />
        <p className="text-xs text-[#7A90B0] leading-relaxed">
          {disclaimer || 'This is a simulated result for educational purposes only. Not a medical diagnosis.'}
        </p>
      </div>

      {/* Actions */}
      <button
        onClick={() => window.print()}
        className="flex items-center gap-2 text-xs text-[#7A90B0] hover:text-[#E8F0FF] transition-colors"
      >
        <Download size={13} />
        Download Report (PDF)
      </button>
    </motion.div>
  )
}

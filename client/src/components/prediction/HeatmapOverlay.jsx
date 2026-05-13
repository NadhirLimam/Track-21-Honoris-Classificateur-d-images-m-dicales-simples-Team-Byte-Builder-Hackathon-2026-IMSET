// src/components/prediction/HeatmapOverlay.jsx
import { useState } from 'react'
import { Eye, EyeOff, AlertTriangle } from 'lucide-react'

export default function HeatmapOverlay({ heatmapUrl, originalUrl }) {
  const [show, setShow] = useState(false)

  if (!heatmapUrl && !originalUrl) return null

  const displayUrl = show && heatmapUrl ? heatmapUrl : originalUrl

  return (
    <div className="space-y-3">
      {/* Toggle button */}
      <button
        onClick={() => setShow(v => !v)}
        className="flex items-center gap-2 text-xs font-medium text-[#0A84FF] hover:text-blue-400 transition-colors"
      >
        {show ? <EyeOff size={14} /> : <Eye size={14} />}
        {show ? 'Hide AI Attention Map' : 'Show AI Attention Map'}
      </button>

      {/* Image */}
      <div className="relative rounded-xl overflow-hidden border border-[#1E2D45]">
        <img
          src={displayUrl}
          alt={show ? 'AI Heatmap' : 'Original'}
          className="w-full object-contain"
          style={{
            opacity: 1,
            transition: 'opacity 0.3s ease',
            maxHeight: '280px',
          }}
        />
        {show && (
          <div className="absolute top-0 left-0 right-0 px-3 py-1.5 bg-black/60 backdrop-blur-sm">
            <p className="text-xs text-[#FB923C] flex items-center gap-1.5">
              <AlertTriangle size={11} />
              Simulated visualization — educational only
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

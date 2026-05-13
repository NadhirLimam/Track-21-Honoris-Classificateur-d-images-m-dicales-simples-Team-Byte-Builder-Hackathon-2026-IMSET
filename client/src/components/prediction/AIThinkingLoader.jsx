// src/components/prediction/AIThinkingLoader.jsx
import { Sparkles } from 'lucide-react'

export default function AIThinkingLoader({ show }) {
  if (!show) return null

  return (
    <div className="absolute inset-0 rounded-xl overflow-hidden z-10">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#080D14]/80 backdrop-blur-[2px]" />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-0.5 bg-primary animate-scan"
        style={{ boxShadow: '0 0 14px 5px rgba(10,132,255,0.55)' }}
      />

      {/* Label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          {/* Gemini icon */}
          <div
            className="h-9 w-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,rgba(10,132,255,0.2),rgba(167,139,250,0.2))' }}
          >
            <Sparkles size={16} className="text-primary" />
          </div>

          <div className="flex items-center gap-1.5 text-primary font-medium text-sm">
            <span>Consulting Gemini AI</span>
            <span className="flex gap-0.5">
              <span className="thinking-dot h-1.5 w-1.5 rounded-full bg-primary inline-block" />
              <span className="thinking-dot h-1.5 w-1.5 rounded-full bg-primary inline-block" />
              <span className="thinking-dot h-1.5 w-1.5 rounded-full bg-primary inline-block" />
            </span>
          </div>
          <p className="text-[#7A90B0] text-xs">Analyzing image with Gemini 1.5 Flash…</p>
        </div>
      </div>
    </div>
  )
}

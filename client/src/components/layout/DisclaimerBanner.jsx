// src/components/layout/DisclaimerBanner.jsx
import { AlertTriangle } from 'lucide-react'

export default function DisclaimerBanner() {
  return (
    <div
      className="w-full px-4 py-2 flex items-center justify-center gap-2 text-xs text-center"
      style={{
        background: 'rgba(251, 146, 60, 0.08)',
        borderBottom: '1px solid rgba(251, 146, 60, 0.25)',
      }}
    >
      <AlertTriangle size={13} className="text-[#FB923C] shrink-0" />
      <span className="text-[#FB923C] font-medium">
        Educational Prototype —&nbsp;
      </span>
      <span className="text-[#7A90B0]">
        NOT a medical tool. Powered by Google Gemini AI for educational demonstration only.
        All classifications are simulated and have no medical validity.
      </span>
    </div>
  )
}

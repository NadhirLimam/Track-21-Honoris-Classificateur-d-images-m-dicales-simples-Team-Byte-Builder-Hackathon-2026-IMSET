// src/components/upload/UploadProgress.jsx
import { motion } from 'framer-motion'

export default function UploadProgress({ status, fileName }) {
  const labels = {
    uploading: 'Uploading...',
    analyzing: 'AI Analyzing...',
  }

  if (status !== 'uploading' && status !== 'analyzing') return null

  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center justify-between text-xs text-[#7A90B0]">
        <span>{fileName}</span>
        <span>{labels[status]}</span>
      </div>
      <div className="h-1.5 bg-[#161F30] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: status === 'analyzing' ? '80%' : '40%' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

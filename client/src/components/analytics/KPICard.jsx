// src/components/analytics/KPICard.jsx
import { motion } from 'framer-motion'

export default function KPICard({ title, value, subtitle, color = '#0A84FF', icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-[#0F1623] border border-[#1E2D45] rounded-xl p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-[#7A90B0] font-medium uppercase tracking-wider">{title}</p>
          <p
            className="text-3xl font-bold mt-1 font-mono"
            style={{ color }}
          >
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-[#3D5470] mt-1">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div
            className="h-9 w-9 rounded-lg flex items-center justify-center"
            style={{ background: `${color}18` }}
          >
            <Icon size={17} style={{ color }} />
          </div>
        )}
      </div>
    </motion.div>
  )
}

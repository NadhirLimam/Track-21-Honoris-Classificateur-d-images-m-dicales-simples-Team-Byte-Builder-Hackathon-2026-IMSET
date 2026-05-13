// src/components/ui/Card.jsx
import { motion } from 'framer-motion'

export default function Card({ children, className = '', animate = false, ...props }) {
  const base =
    'bg-[#0F1623] border border-[#1E2D45] rounded-xl p-5'

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`${base} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={`${base} ${className}`} {...props}>
      {children}
    </div>
  )
}

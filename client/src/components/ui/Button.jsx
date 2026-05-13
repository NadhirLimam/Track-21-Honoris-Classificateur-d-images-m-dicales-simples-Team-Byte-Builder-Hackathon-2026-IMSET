// src/components/ui/Button.jsx
import { motion } from 'framer-motion'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#080D14]'

  const variants = {
    primary:
      'bg-primary text-white hover:bg-blue-500 focus:ring-primary disabled:opacity-50 border-glow-primary',
    secondary:
      'bg-[#161F30] text-[#E8F0FF] border border-[#1E2D45] hover:border-[#0A84FF] hover:text-white focus:ring-[#1E2D45]',
    ghost:
      'text-[#7A90B0] hover:text-[#E8F0FF] hover:bg-[#161F30] focus:ring-[#1E2D45]',
    danger:
      'bg-red-600 text-white hover:bg-red-500 focus:ring-red-500 disabled:opacity-50',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <motion.button
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}
      {children}
    </motion.button>
  )
}

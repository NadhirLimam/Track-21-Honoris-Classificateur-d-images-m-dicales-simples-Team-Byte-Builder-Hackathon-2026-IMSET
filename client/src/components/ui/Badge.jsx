// src/components/ui/Badge.jsx

export default function Badge({ label, variant = 'normal', size = 'md' }) {
  const styles = {
    normal: 'bg-[rgba(52,211,153,0.10)] text-[#34D399] border border-[rgba(52,211,153,0.3)]',
    review: 'bg-[rgba(251,146,60,0.10)] text-[#FB923C] border border-[rgba(251,146,60,0.3)]',
    info:   'bg-[rgba(10,132,255,0.10)] text-[#0A84FF] border border-[rgba(10,132,255,0.3)]',
    muted:  'bg-[#161F30] text-[#7A90B0] border border-[#1E2D45]',
  }

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1',
  }

  const dots = { normal: '🟢', review: '🟠' }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${styles[variant]} ${sizes[size]}`}
    >
      {dots[variant] && <span>{dots[variant]}</span>}
      {label}
    </span>
  )
}

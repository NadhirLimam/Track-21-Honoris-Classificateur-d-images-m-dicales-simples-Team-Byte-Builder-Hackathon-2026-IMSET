// src/components/layout/TopBar.jsx
import { Bell, Brain } from 'lucide-react'

export default function TopBar({ title = 'Dashboard' }) {
  let user = null
  try { user = JSON.parse(localStorage.getItem('user')) } catch { /* noop */ }

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'DM'

  return (
    <header className="fixed top-8 left-0 right-0 h-14 bg-[#080D14]/90 backdrop-blur-md border-b border-[#1E2D45] flex items-center px-4 z-30">
      {/* Mobile logo */}
      <div className="flex items-center gap-2 lg:hidden mr-4">
        <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
          <Brain size={14} className="text-white" />
        </div>
      </div>

      <span className="text-[#E8F0FF] font-semibold text-sm lg:ml-56">{title}</span>

      <div className="ml-auto flex items-center gap-3">
        {user?.isDemo && (
          <span className="hidden sm:inline-flex text-xs px-2.5 py-1 rounded-full bg-[rgba(167,139,250,0.12)] text-[#A78BFA] border border-[rgba(167,139,250,0.3)]">
            Demo Mode
          </span>
        )}
        <button className="p-1.5 rounded-lg text-[#7A90B0] hover:text-[#E8F0FF] hover:bg-[#161F30] transition-colors">
          <Bell size={17} />
        </button>
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
          {initials}
        </div>
      </div>
    </header>
  )
}

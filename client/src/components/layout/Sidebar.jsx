// src/components/layout/Sidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Upload,
  BarChart2,
  Database,
  Clock,
  Brain,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/upload',    icon: Upload,          label: 'Upload'    },
  { to: '/analytics', icon: BarChart2,       label: 'Analytics' },
  { to: '/dataset',   icon: Database,        label: 'Dataset'   },
  { to: '/history',   icon: Clock,           label: 'History'   },
]

export default function Sidebar() {
  const { logout } = useAuth()

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 lg:w-56 bg-[#0F1623] border-r border-[#1E2D45] flex flex-col z-40 pt-14">
      {/* Logo */}
      <div className="px-4 py-5 hidden lg:flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Brain size={14} className="text-white" />
        </div>
        <span className="font-bold text-[#E8F0FF] text-sm">MedVision AI</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-[rgba(10,132,255,0.12)] text-[#0A84FF] border border-[rgba(10,132,255,0.2)]'
                  : 'text-[#7A90B0] hover:text-[#E8F0FF] hover:bg-[#161F30]'
              }`
            }
          >
            <Icon size={17} className="shrink-0" />
            <span className="hidden lg:block">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-2 py-4 border-t border-[#1E2D45]">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#7A90B0] hover:text-red-400 hover:bg-[#161F30] transition-all w-full"
        >
          <LogOut size={17} className="shrink-0" />
          <span className="hidden lg:block">Logout</span>
        </button>
      </div>
    </aside>
  )
}

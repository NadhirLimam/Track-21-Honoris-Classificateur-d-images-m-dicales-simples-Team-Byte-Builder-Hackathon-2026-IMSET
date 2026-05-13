// src/components/layout/MobileNav.jsx
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Upload, BarChart2, Clock } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Home'     },
  { to: '/upload',    icon: Upload,          label: 'Upload'   },
  { to: '/analytics', icon: BarChart2,       label: 'Stats'    },
  { to: '/history',   icon: Clock,           label: 'History'  },
]

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#0F1623] border-t border-[#1E2D45] flex lg:hidden z-40">
      {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors ${
              isActive ? 'text-[#0A84FF]' : 'text-[#7A90B0]'
            }`
          }
        >
          <Icon size={20} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

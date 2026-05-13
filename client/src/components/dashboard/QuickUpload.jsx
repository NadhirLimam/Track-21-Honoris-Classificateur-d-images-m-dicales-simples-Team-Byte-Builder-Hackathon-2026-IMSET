// src/components/dashboard/QuickUpload.jsx
import { Link } from 'react-router-dom'
import { Upload, ArrowRight } from 'lucide-react'

export default function QuickUpload() {
  return (
    <div
      className="bg-[#0F1623] border border-dashed border-[#1E2D45] rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:border-primary transition-colors cursor-pointer"
    >
      <Link to="/upload" className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-[rgba(10,132,255,0.08)] flex items-center justify-center">
          <Upload size={22} className="text-primary" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-[#E8F0FF]">Quick Upload</p>
          <p className="text-xs text-[#7A90B0] mt-1">Analyze a new image immediately</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-primary font-medium">
          Start analysis <ArrowRight size={12} />
        </div>
      </Link>
    </div>
  )
}

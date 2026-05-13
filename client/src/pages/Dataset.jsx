// src/pages/Dataset.jsx
import Sidebar from '../components/layout/Sidebar'
import TopBar from '../components/layout/TopBar'
import MobileNav from '../components/layout/MobileNav'
import { Database, Image, FolderOpen, Tag } from 'lucide-react'
import KPICard from '../components/analytics/KPICard'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const SPLIT_DATA = [
  { name: 'Train',      value: 1600, fill: '#0A84FF' },
  { name: 'Validation', value: 400,  fill: '#A78BFA' },
  { name: 'Test',       value: 400,  fill: '#22D3EE' },
]

const CLASS_SPLIT = [
  { name: 'Normal',     value: 1200, fill: '#34D399' },
  { name: 'À vérifier', value: 1200, fill: '#FB923C' },
]

export default function Dataset() {
  return (
    <div className="min-h-screen bg-[#080D14]">
      <Sidebar />
      <TopBar title="Dataset" />

      <main className="lg:pl-56 pt-[88px] pb-20 lg:pb-8 px-4 lg:px-6">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="Total Images" value="2,400" color="#0A84FF" icon={Image}     />
            <KPICard title="Classes"      value="2"     color="#A78BFA" icon={Tag}       />
            <KPICard title="Train Split"  value="1,600" color="#34D399" icon={FolderOpen}/>
            <KPICard title="Test Split"   value="400"   color="#FB923C" icon={Database}  />
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Dataset split */}
            <div className="bg-[#0F1623] border border-[#1E2D45] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#E8F0FF] mb-4">Dataset Split</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={SPLIT_DATA} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                    {SPLIT_DATA.map(e => <Cell key={e.name} fill={e.fill} />)}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#161F30', border: '1px solid #1E2D45', borderRadius: 8, fontSize: 12 }}
                  />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 12, color: '#7A90B0' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Class balance */}
            <div className="bg-[#0F1623] border border-[#1E2D45] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#E8F0FF] mb-4">Class Balance</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={CLASS_SPLIT} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                    {CLASS_SPLIT.map(e => <Cell key={e.name} fill={e.fill} />)}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#161F30', border: '1px solid #1E2D45', borderRadius: 8, fontSize: 12 }}
                  />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 12, color: '#7A90B0' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Info table */}
          <div className="bg-[#0F1623] border border-[#1E2D45] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[#E8F0FF] mb-4">Dataset Info</h3>
            <div className="space-y-2 text-sm">
              {[
                ['Source',        'Chest X-Ray Images (Pneumonia) — Kaggle'],
                ['Image format',  'JPEG / PNG'],
                ['Resolution',    '224 × 224 (resized for model input)'],
                ['Classes',       'Normal · Pneumonia (À vérifier)'],
                ['Preprocessing', 'Normalization · Augmentation (flip, zoom, rotate)'],
                ['License',       'CC BY 4.0 — Educational use only'],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4 py-2 border-b border-[#1E2D45] last:border-0">
                  <span className="w-36 shrink-0 text-[#7A90B0]">{k}</span>
                  <span className="text-[#E8F0FF]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}

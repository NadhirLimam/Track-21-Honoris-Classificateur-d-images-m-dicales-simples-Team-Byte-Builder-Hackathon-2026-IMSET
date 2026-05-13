// src/pages/Analytics.jsx
import Sidebar from '../components/layout/Sidebar'
import TopBar from '../components/layout/TopBar'
import MobileNav from '../components/layout/MobileNav'
import AccuracyChart from '../components/analytics/AccuracyChart'
import LossCurve from '../components/analytics/LossCurve'
import ConfusionMatrix from '../components/analytics/ConfusionMatrix'
import ConfidenceHistogram from '../components/analytics/ConfidenceHistogram'
import KPICard from '../components/analytics/KPICard'
import { Target, TrendingUp, Activity, Award } from 'lucide-react'

// Predictions over time (demo)
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'

const TIME_DATA = [
  { day: 'Mon', count: 12 },
  { day: 'Tue', count: 19 },
  { day: 'Wed', count: 8  },
  { day: 'Thu', count: 25 },
  { day: 'Fri', count: 31 },
  { day: 'Sat', count: 14 },
  { day: 'Sun', count: 7  },
]

const CLASS_DATA = [
  { name: 'Normal',     value: 98,  fill: '#34D399' },
  { name: 'À vérifier', value: 44,  fill: '#FB923C' },
]

export default function Analytics() {
  return (
    <div className="min-h-screen bg-[#080D14]">
      <Sidebar />
      <TopBar title="Analytics" />

      <main className="lg:pl-56 pt-[88px] pb-20 lg:pb-8 px-4 lg:px-6">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="Accuracy"  value="94.2%" color="#34D399" icon={Award}     />
            <KPICard title="Precision" value="93.1%" color="#0A84FF" icon={Target}    />
            <KPICard title="Recall"    value="91.8%" color="#A78BFA" icon={Activity}  />
            <KPICard title="F1 Score"  value="92.4%" color="#FB923C" icon={TrendingUp}/>
          </div>

          {/* Row 1: training curves */}
          <div className="grid lg:grid-cols-2 gap-6">
            <AccuracyChart />
            <LossCurve />
          </div>

          {/* Row 2: confusion + histogram */}
          <div className="grid lg:grid-cols-2 gap-6">
            <ConfusionMatrix tp={88} tn={92} fp={8} fn={12} />
            <ConfidenceHistogram />
          </div>

          {/* Row 3: over time + class distribution */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Predictions over time */}
            <div className="bg-[#0F1623] border border-[#1E2D45] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#E8F0FF] mb-4">Predictions This Week</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={TIME_DATA} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" />
                  <XAxis dataKey="day" tick={{ fill: '#7A90B0', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#7A90B0', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: '#161F30', border: '1px solid #1E2D45', borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: '#E8F0FF' }}
                  />
                  <Bar dataKey="count" fill="#0A84FF" radius={[4, 4, 0, 0]} name="Predictions" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Class distribution */}
            <div className="bg-[#0F1623] border border-[#1E2D45] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#E8F0FF] mb-4">Class Distribution</h3>
              <div className="flex items-center justify-center gap-8 h-48">
                {CLASS_DATA.map(c => (
                  <div key={c.name} className="flex flex-col items-center gap-2">
                    <div
                      className="h-24 w-24 rounded-full flex items-center justify-center border-4"
                      style={{ borderColor: c.fill, background: `${c.fill}12` }}
                    >
                      <span className="text-2xl font-bold font-mono" style={{ color: c.fill }}>
                        {c.value}
                      </span>
                    </div>
                    <span className="text-xs text-[#7A90B0]">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}

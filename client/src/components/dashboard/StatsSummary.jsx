// src/components/dashboard/StatsSummary.jsx
import { Activity, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import KPICard from '../analytics/KPICard'

export default function StatsSummary({ stats }) {
  const s = stats || { total: 142, normal: 98, review: 44, accuracy: 94.2 }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Analyzed"
        value={s.total}
        subtitle="all time"
        color="#0A84FF"
        icon={Activity}
      />
      <KPICard
        title="Normal"
        value={s.normal}
        subtitle={`${((s.normal / s.total) * 100).toFixed(0)}% of total`}
        color="#34D399"
        icon={CheckCircle}
      />
      <KPICard
        title="For Review"
        value={s.review}
        subtitle={`${((s.review / s.total) * 100).toFixed(0)}% of total`}
        color="#FB923C"
        icon={AlertCircle}
      />
      <KPICard
        title="Accuracy"
        value={`${s.accuracy}%`}
        subtitle="model performance"
        color="#A78BFA"
        icon={TrendingUp}
      />
    </div>
  )
}

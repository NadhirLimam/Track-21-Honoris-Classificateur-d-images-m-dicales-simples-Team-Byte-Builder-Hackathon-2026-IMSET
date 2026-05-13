// src/pages/Dashboard.jsx
import Sidebar from '../components/layout/Sidebar'
import TopBar from '../components/layout/TopBar'
import MobileNav from '../components/layout/MobileNav'
import StatsSummary from '../components/dashboard/StatsSummary'
import RecentPredictions from '../components/dashboard/RecentPredictions'
import QuickUpload from '../components/dashboard/QuickUpload'
import ConfidenceHistogram from '../components/analytics/ConfidenceHistogram'
import usePredictionStore from '../store/predictionStore'

export default function Dashboard() {
  const history = usePredictionStore(s => s.history)

  return (
    <div className="min-h-screen bg-[#080D14]">
      <Sidebar />
      <TopBar title="Dashboard" />

      <main className="lg:pl-56 pt-[88px] pb-20 lg:pb-8 px-4 lg:px-6">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* KPI cards */}
          <StatsSummary />

          {/* Two-column row */}
          <div className="grid lg:grid-cols-2 gap-6">
            <RecentPredictions predictions={history} />
            <ConfidenceHistogram />
          </div>

          {/* Quick upload */}
          <QuickUpload />
        </div>
      </main>

      <MobileNav />
    </div>
  )
}

// src/pages/History.jsx
import { useState } from 'react'
import { Download, Search } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import TopBar from '../components/layout/TopBar'
import MobileNav from '../components/layout/MobileNav'
import Modal from '../components/ui/Modal'
import PredictionBadge from '../components/prediction/PredictionBadge'
import PredictionCard from '../components/prediction/PredictionCard'
import { useHistory } from '../hooks/useHistory'
import { formatDate, formatConfidence } from '../lib/formatters'

// Demo fallback data
const DEMO_HISTORY = [
  { id: '1', result: 'normal', confidence: 94.2, explanation: 'Uniform grayscale texture, no irregular density patterns detected.', createdAt: '2026-05-12T10:30:00Z', imageUrl: null },
  { id: '2', result: 'review', confidence: 78.5, explanation: 'Irregular zone in upper-right lobe, asymmetric density warrants review.', createdAt: '2026-05-11T14:20:00Z', imageUrl: null },
  { id: '3', result: 'normal', confidence: 91.0, explanation: 'Clear lung fields, no consolidation or opacification observed.', createdAt: '2026-05-10T09:15:00Z', imageUrl: null },
  { id: '4', result: 'normal', confidence: 87.3, explanation: 'Symmetric bilateral lung markings within expected range.', createdAt: '2026-05-09T16:45:00Z', imageUrl: null },
  { id: '5', result: 'review', confidence: 65.1, explanation: 'Patchy opacity near left base, further evaluation recommended.', createdAt: '2026-05-08T11:00:00Z', imageUrl: null },
]

export default function History() {
  const { history }         = useHistory()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const items = (history.length > 0 ? history : DEMO_HISTORY)
    .filter(p => filter === 'all' || p.result === filter)
    .filter(p => !search || (p.explanation || '').toLowerCase().includes(search.toLowerCase()))

  const exportCSV = () => {
    const header = 'id,result,confidence,explanation,date\n'
    const rows   = items.map(p =>
      `${p.id},${p.result},${formatConfidence(p.confidence)},"${(p.explanation || '').replace(/"/g, '""')}",${formatDate(p.createdAt)}`
    ).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = 'predictions.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-[#080D14]">
      <Sidebar />
      <TopBar title="Prediction History" />

      <main className="lg:pl-56 pt-[88px] pb-20 lg:pb-8 px-4 lg:px-6">
        <div className="max-w-5xl mx-auto space-y-5">

          {/* Filters + search + export */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              {['all', 'normal', 'review'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filter === f
                      ? 'bg-[rgba(10,132,255,0.12)] text-primary border border-[rgba(10,132,255,0.3)]'
                      : 'bg-[#0F1623] text-[#7A90B0] border border-[#1E2D45] hover:border-[#2a3f5f]'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'normal' ? '🟢 Normal' : '🟠 À vérifier'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#3D5470]" />
                <input
                  type="text"
                  placeholder="Search explanations…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-7 pr-3 py-1.5 rounded-lg text-xs bg-[#0F1623] text-[#E8F0FF] border border-[#1E2D45] placeholder-[#3D5470] focus:outline-none focus:border-[#0A84FF] transition-colors w-44"
                />
              </div>

              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0F1623] text-[#7A90B0] border border-[#1E2D45] hover:border-[#2a3f5f] hover:text-[#E8F0FF] transition-all"
              >
                <Download size={13} />
                Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#0F1623] border border-[#1E2D45] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1E2D45] text-xs text-[#7A90B0] uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">#</th>
                    <th className="text-left px-4 py-3 font-medium">Result</th>
                    <th className="text-left px-4 py-3 font-medium">Conf.</th>
                    <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Gemini Summary</th>
                    <th className="text-left px-4 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-[#3D5470] text-sm">
                        No predictions found.
                      </td>
                    </tr>
                  ) : (
                    items.map((pred, i) => (
                      <tr
                        key={pred.id}
                        onClick={() => setSelected(pred)}
                        className="border-b border-[#1E2D45] last:border-0 hover:bg-[#161F30] cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-3 font-mono text-[#3D5470] text-xs">{i + 1}</td>
                        <td className="px-4 py-3">
                          <PredictionBadge result={pred.result} size="sm" />
                        </td>
                        <td className="px-4 py-3 font-mono text-[#E8F0FF]">
                          {formatConfidence(pred.confidence)}
                        </td>
                        <td className="px-4 py-3 text-[#7A90B0] text-xs hidden md:table-cell max-w-xs truncate">
                          {pred.explanation
                            ? `“${pred.explanation.slice(0, 60)}…”`
                            : <span className="text-[#3D5470] italic">No explanation</span>}
                        </td>
                        <td className="px-4 py-3 text-[#7A90B0]">
                          {formatDate(pred.createdAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Detail modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Prediction Detail"
      >
        {selected && <PredictionCard {...selected} />}
      </Modal>

      <MobileNav />
    </div>
  )
}

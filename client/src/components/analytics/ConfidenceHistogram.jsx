// src/components/analytics/ConfidenceHistogram.jsx
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts'

const DEMO_DATA = [
  { range: '50-60%', count: 4  },
  { range: '60-70%', count: 9  },
  { range: '70-80%', count: 18 },
  { range: '80-90%', count: 34 },
  { range: '90-95%', count: 52 },
  { range: '95-100%',count: 25 },
]

function barColor(range) {
  const min = parseInt(range)
  if (min >= 90) return '#34D399'
  if (min >= 70) return '#0A84FF'
  return '#FB923C'
}

export default function ConfidenceHistogram({ data = DEMO_DATA }) {
  return (
    <div className="bg-[#0F1623] border border-[#1E2D45] rounded-xl p-5">
      <h3 className="text-sm font-semibold text-[#E8F0FF] mb-4">Confidence Distribution</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" />
          <XAxis dataKey="range" tick={{ fill: '#7A90B0', fontSize: 10 }} />
          <YAxis tick={{ fill: '#7A90B0', fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: '#161F30', border: '1px solid #1E2D45', borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: '#E8F0FF' }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Count">
            {data.map((entry) => (
              <Cell key={entry.range} fill={barColor(entry.range)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// src/components/analytics/AccuracyChart.jsx
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

const DEMO_DATA = Array.from({ length: 20 }, (_, i) => ({
  epoch: i + 1,
  train: +(68 + i * 1.3 + Math.random() * 2).toFixed(1),
  val:   +(65 + i * 1.1 + Math.random() * 3).toFixed(1),
}))

export default function AccuracyChart({ data = DEMO_DATA }) {
  return (
    <div className="bg-[#0F1623] border border-[#1E2D45] rounded-xl p-5">
      <h3 className="text-sm font-semibold text-[#E8F0FF] mb-4">Training Accuracy</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" />
          <XAxis
            dataKey="epoch"
            tick={{ fill: '#7A90B0', fontSize: 11 }}
            label={{ value: 'Epoch', position: 'insideBottom', offset: -2, fill: '#3D5470', fontSize: 11 }}
          />
          <YAxis tick={{ fill: '#7A90B0', fontSize: 11 }} domain={[60, 100]} />
          <Tooltip
            contentStyle={{ background: '#161F30', border: '1px solid #1E2D45', borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: '#E8F0FF' }}
          />
          <Legend iconSize={10} wrapperStyle={{ fontSize: 12, color: '#7A90B0' }} />
          <Line type="monotone" dataKey="train" stroke="#0A84FF" strokeWidth={2} dot={false} name="Train" />
          <Line type="monotone" dataKey="val"   stroke="#34D399" strokeWidth={2} dot={false} name="Val"   />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

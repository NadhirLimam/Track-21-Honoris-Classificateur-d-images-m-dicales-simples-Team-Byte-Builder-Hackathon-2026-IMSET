// src/components/analytics/ConfusionMatrix.jsx

const CELL_STYLE = {
  TP: { bg: 'rgba(52, 211, 153, 0.15)', color: '#34D399' },
  TN: { bg: 'rgba(52, 211, 153, 0.15)', color: '#34D399' },
  FP: { bg: 'rgba(251, 146, 60, 0.15)',  color: '#FB923C' },
  FN: { bg: 'rgba(251, 146, 60, 0.15)',  color: '#FB923C' },
}

export default function ConfusionMatrix({
  tp = 88,
  tn = 92,
  fp = 8,
  fn = 12,
}) {
  const cells = [
    { label: 'TP', value: tp, desc: 'True Positive',  pos: CELL_STYLE.TP },
    { label: 'FP', value: fp, desc: 'False Positive', pos: CELL_STYLE.FP },
    { label: 'FN', value: fn, desc: 'False Negative', pos: CELL_STYLE.FN },
    { label: 'TN', value: tn, desc: 'True Negative',  pos: CELL_STYLE.TN },
  ]

  return (
    <div className="bg-[#0F1623] border border-[#1E2D45] rounded-xl p-5">
      <h3 className="text-sm font-semibold text-[#E8F0FF] mb-4">Confusion Matrix</h3>

      {/* Labels */}
      <div className="flex mb-1 ml-16">
        <div className="flex-1 text-center text-xs text-[#7A90B0]">Predicted Normal</div>
        <div className="flex-1 text-center text-xs text-[#7A90B0]">Predicted Review</div>
      </div>

      <div className="flex gap-2">
        {/* Y-axis label */}
        <div className="flex flex-col justify-around w-16 shrink-0">
          <span className="text-xs text-[#7A90B0] text-right pr-2">Actual Normal</span>
          <span className="text-xs text-[#7A90B0] text-right pr-2">Actual Review</span>
        </div>

        {/* 2×2 grid */}
        <div className="flex-1 grid grid-cols-2 gap-2">
          {cells.map(cell => (
            <div
              key={cell.label}
              className="rounded-lg p-4 flex flex-col items-center justify-center gap-1"
              style={{ background: cell.pos.bg }}
            >
              <span
                className="text-2xl font-bold font-mono"
                style={{ color: cell.pos.color }}
              >
                {cell.value}
              </span>
              <span className="text-xs font-medium" style={{ color: cell.pos.color }}>
                {cell.label}
              </span>
              <span className="text-xs text-[#3D5470]">{cell.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

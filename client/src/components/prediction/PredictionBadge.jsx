// src/components/prediction/PredictionBadge.jsx
import Badge from '../ui/Badge'
import { LABELS } from '../../lib/constants'

export default function PredictionBadge({ result, size = 'md' }) {
  const variant = result === 'normal' ? 'normal' : 'review'
  const label   = LABELS[result] || result

  return <Badge label={label} variant={variant} size={size} />
}

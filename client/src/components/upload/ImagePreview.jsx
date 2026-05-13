// src/components/upload/ImagePreview.jsx

export default function ImagePreview({ src, alt = 'Medical image' }) {
  if (!src) return null
  return (
    <div className="rounded-xl overflow-hidden border border-[#1E2D45] bg-[#0F1623]">
      <img src={src} alt={alt} className="w-full object-contain max-h-64" />
    </div>
  )
}

// src/components/upload/DropZone.jsx
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Image, X } from 'lucide-react'
import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE_MB } from '../../lib/constants'
import toast from 'react-hot-toast'

export default function DropZone({ onFileAccepted, disabled = false }) {
  const [preview, setPreview] = useState(null)
  const [fileName, setFileName] = useState(null)

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const err = rejectedFiles[0].errors[0]
        if (err.code === 'file-too-large') {
          toast.error(`File too large. Max size is ${MAX_UPLOAD_SIZE_MB}MB.`)
        } else {
          toast.error('Only JPEG and PNG images are accepted.')
        }
        return
      }

      const file = acceptedFiles[0]
      if (!file) return

      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)
      setFileName(file.name)
      onFileAccepted(file)
    },
    [onFileAccepted]
  )

  const clearFile = (e) => {
    e.stopPropagation()
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setFileName(null)
    onFileAccepted(null)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_IMAGE_TYPES,
    maxSize: MAX_UPLOAD_SIZE_MB * 1024 * 1024,
    multiple: false,
    disabled,
  })

  return (
    <div
      {...getRootProps()}
      className={`relative rounded-xl cursor-pointer transition-all duration-200 overflow-hidden
        ${isDragActive
          ? 'border-2 border-primary bg-[rgba(10,132,255,0.05)]'
          : preview
            ? 'border border-[#1E2D45]'
            : 'dropzone-border bg-[#0F1623]'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      style={{ minHeight: '280px' }}
    >
      <input {...getInputProps()} />

      {preview ? (
        <div className="relative w-full h-full">
          <img
            src={preview}
            alt="Preview"
            className="w-full object-contain rounded-xl"
            style={{ maxHeight: '400px' }}
          />
          {!disabled && (
            <button
              onClick={clearFile}
              className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors"
            >
              <X size={14} />
            </button>
          )}
          {fileName && (
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-black/60 backdrop-blur-sm">
              <p className="text-xs text-[#7A90B0] flex items-center gap-1.5 truncate">
                <Image size={12} />
                {fileName}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 p-8 h-full" style={{ minHeight: '280px' }}>
          <div
            className={`h-16 w-16 rounded-2xl flex items-center justify-center transition-colors ${
              isDragActive
                ? 'bg-[rgba(10,132,255,0.2)] text-primary'
                : 'bg-[#161F30] text-[#3D5470]'
            }`}
          >
            <Upload size={28} />
          </div>
          <div className="text-center">
            <p className="text-[#E8F0FF] font-medium text-sm">
              {isDragActive ? 'Drop it here' : 'Drag & drop an image'}
            </p>
            <p className="text-[#7A90B0] text-xs mt-1">
              or <span className="text-primary">browse files</span>
            </p>
            <p className="text-[#3D5470] text-xs mt-2">JPEG, PNG · Max {MAX_UPLOAD_SIZE_MB}MB</p>
          </div>
        </div>
      )}
    </div>
  )
}

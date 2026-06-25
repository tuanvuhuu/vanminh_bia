import { useState, useRef } from 'react'
import { supabase } from '../../lib/supabaseClient'
import Lightbox from '../Lightbox'

const BUCKET = 'uploads'

async function uploadFile(file) {
  if (!file.type.startsWith('image/')) throw new Error('File không phải ảnh')
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

function Dropzone({ busy, multiple, onPick, label, className = 'h-28 w-40' }) {
  const inputRef = useRef()
  const [drag, setDrag] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDrag(true)
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDrag(false)
          onPick(e.dataTransfer.files)
        }}
        className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed text-center text-xs font-medium transition ${className} ${
          drag
            ? 'border-amber-500 bg-amber-50 text-amber-700'
            : 'border-gray-300 bg-gray-50 text-gray-500 hover:border-amber-400 hover:text-amber-600'
        }`}
      >
        {busy ? (
          <span>Đang tải...</span>
        ) : (
          <>
            <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
            <span>{label}</span>
          </>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        hidden
        onChange={(e) => onPick(e.target.files)}
      />
    </>
  )
}

export default function ImageUpload({ value, onChange, multiple = false }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [viewIndex, setViewIndex] = useState(null)

  const handlePick = async (fileList) => {
    const files = Array.from(fileList || [])
    if (!files.length) return
    setBusy(true)
    setError('')
    try {
      if (multiple) {
        const urls = []
        for (const f of files) urls.push(await uploadFile(f))
        onChange([...(Array.isArray(value) ? value : []), ...urls])
      } else {
        onChange(await uploadFile(files[0]))
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  // ----- Nhiều ảnh -----
  if (multiple) {
    const imgs = Array.isArray(value) ? value : []
    return (
      <div>
        <div className="flex flex-wrap gap-3">
          {imgs.map((url, i) => (
            <div key={url + i} className="group relative">
              <img
                src={url}
                alt=""
                onClick={() => setViewIndex(i)}
                className="h-28 w-28 rounded-lg border border-gray-200 object-cover shadow-sm transition group-hover:opacity-90 cursor-zoom-in hover:brightness-95"
              />
              <button
                type="button"
                onClick={() => onChange(imgs.filter((_, idx) => idx !== i))}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition hover:bg-red-600 focus:outline-none"
                title="Xóa ảnh"
              >
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          <Dropzone busy={busy} multiple onPick={handlePick} label="Thêm ảnh" className="h-28 w-28" />
        </div>
        {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
        {viewIndex !== null && (
          <Lightbox
            images={imgs}
            startIndex={viewIndex}
            onClose={() => setViewIndex(null)}
          />
        )}
      </div>
    )
  }

  // ----- Một ảnh -----
  return (
    <div>
      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt=""
            onClick={() => setViewIndex(0)}
            className="h-28 w-full min-w-[140px] max-w-[240px] rounded-lg border border-gray-200 object-cover shadow-sm cursor-zoom-in hover:brightness-95 transition"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition hover:bg-red-600 focus:outline-none"
            title="Xóa ảnh"
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <Dropzone busy={busy} onPick={handlePick} label="Chọn ảnh" className="h-28 w-full max-w-[240px]" />
      )}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
      {viewIndex !== null && (
        <Lightbox
          images={[value]}
          startIndex={0}
          onClose={() => setViewIndex(null)}
        />
      )}
    </div>
  )
}

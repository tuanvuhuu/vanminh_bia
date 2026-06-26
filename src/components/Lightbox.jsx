import { useEffect, useState } from 'react'

const isYoutubeUrl = (url) => {
  return url && (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('embed'))
}

const getYoutubeId = (url) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

// Lightbox xem ảnh phóng to, hỗ trợ nhiều ảnh (gallery)
export default function Lightbox({ images, startIndex = 0, onClose }) {
  const [idx, setIdx] = useState(startIndex)
  const many = images.length > 1

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && many) setIdx((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft' && many) setIdx((i) => (i - 1 + images.length) % images.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [images.length, many, onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-gold hover:text-black"
        aria-label="Đóng"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {many && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIdx((i) => (i - 1 + images.length) % images.length)
          }}
          className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-gold hover:text-black"
          aria-label="Ảnh trước"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {isYoutubeUrl(images[idx]) ? (
        <div 
          className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black" 
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={`https://www.youtube.com/embed/${getYoutubeId(images[idx])}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-play"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ) : (
        <img
          src={images[idx]}
          alt=""
          onClick={(e) => e.stopPropagation()}
          className="max-h-[88vh] max-w-full rounded-lg object-contain shadow-2xl"
        />
      )}

      {many && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIdx((i) => (i + 1) % images.length)
          }}
          className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-gold hover:text-black"
          aria-label="Ảnh sau"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {many && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
          {idx + 1} / {images.length}
        </div>
      )}
    </div>
  )
}

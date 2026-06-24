import { useState } from 'react'
import { gallery } from '../data/content'
import SectionTitle from './SectionTitle'
import Lightbox from './Lightbox'

const STEP = 12

export default function Gallery() {
  const [visible, setVisible] = useState(STEP)
  const [start, setStart] = useState(null) // index khi mở lightbox

  const shown = gallery.slice(0, visible)

  return (
    <section id="gallery" className="section bg-bg">
      <div className="container-x">
        <SectionTitle
          eyebrow="Không gian CLB"
          title="Thư viện thiết kế Vikings"
          desc="Bộ sưu tập không gian câu lạc bộ bi-a Vikings — thiết kế nội thất, ánh sáng và setup bàn đẳng cấp."
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((src, i) => (
            <button
              key={src}
              onClick={() => setStart(i)}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-ink-900"
              aria-label={`Xem ảnh ${i + 1}`}
            >
              <img
                src={src}
                alt={`Không gian Vikings ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
                </svg>
              </span>
            </button>
          ))}
        </div>

        {visible < gallery.length && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setVisible((v) => Math.min(v + STEP, gallery.length))}
              className="btn-ghost"
            >
              Xem thêm ảnh ({gallery.length - visible})
            </button>
          </div>
        )}
      </div>

      {start !== null && (
        <Lightbox images={gallery} startIndex={start} onClose={() => setStart(null)} />
      )}
    </section>
  )
}

import { useState } from 'react'
import { products, accessories, brand } from '../data/content'
import SectionTitle from './SectionTitle'
import Lightbox from './Lightbox'

export default function Products() {
  const [box, setBox] = useState(null) // { images, startIndex }

  return (
    <section id="products" className="section bg-bg">
      <div className="container-x">
        <SectionTitle
          eyebrow="Sản phẩm"
          title="Các dòng bàn Vikings"
          desc="5 dòng bàn bi-a cao cấp — khung thép hợp kim / gỗ tự nhiên, đá đen phẳng 99%, trọn bộ phụ kiện đi kèm."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const gallery = p.gallery || [p.image]
            return (
              <article
                key={p.code}
                className="group card flex flex-col overflow-hidden hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/10"
              >
                <button
                  onClick={() => setBox({ images: gallery, startIndex: 0 })}
                  className="relative block aspect-[16/10] overflow-hidden bg-ink-900"
                  aria-label={`Xem thông số ${p.name}`}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {p.badge && (
                    <span className="absolute left-3 top-3 rounded bg-gold px-2 py-1 text-xs font-bold text-black">
                      {p.badge}
                    </span>
                  )}
                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                    <span className="rounded-full border border-white/70 px-4 py-2 text-sm font-semibold text-white">
                      🔍 Xem bảng thông số
                    </span>
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-bold uppercase text-content">{p.name}</h3>
                    <span className="flex-none rounded border border-line px-1.5 py-0.5 text-[10px] text-muted">
                      {p.code}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{p.frame}</p>

                  <ul className="mt-3 grid gap-1.5">
                    {p.specs.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-muted">
                        <svg className="h-4 w-4 flex-none text-accent-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        {s}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-3 text-xs text-muted/80">{p.size}</p>

                  <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
                    <div>
                      {p.oldPrice && <span className="block text-xs text-muted line-through">{p.oldPrice}</span>}
                      <span className="font-display text-xl font-bold text-accent-ink">{p.price}</span>
                    </div>
                    <a
                      href={`tel:${brand.phoneSales.replace(/\./g, '')}`}
                      className="btn-gold px-4 py-2 text-sm"
                    >
                      Đặt mua
                    </a>
                  </div>
                </div>
              </article>
            )
          })}

          {/* Thẻ CTA cuối */}
          <article className="card flex flex-col items-center justify-center gap-3 bg-surface-2 p-8 text-center">
            <span className="text-4xl">🎱</span>
            <h3 className="font-display text-lg font-bold uppercase text-content">Cần tư vấn chọn bàn?</h3>
            <p className="text-sm text-muted">Gọi ngay để được báo giá tốt nhất & ưu đãi combo phụ kiện.</p>
            <a href={`tel:${brand.phoneSales.replace(/\./g, '')}`} className="btn-gold mt-2">
              {brand.phoneSales}
            </a>
          </article>
        </div>

        {/* Phụ kiện */}
        <div className="mt-16">
          <h3 className="heading mb-6 text-center text-2xl font-bold">Phụ kiện bi-a chính hãng</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {accessories.map((a) => (
              <div key={a.name} className="card flex items-center gap-4 p-4 hover:border-gold/50">
                <div className="flex h-16 w-16 flex-none items-center justify-center overflow-hidden rounded-lg bg-surface-2 text-accent-ink">
                  {a.img ? (
                    <img src={a.img} alt={a.name} className="h-full w-full object-cover" />
                  ) : (
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v10M7 12h10" />
                    </svg>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-content">{a.name}</h4>
                  <p className="mt-0.5 text-sm text-muted">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {box && <Lightbox images={box.images} startIndex={box.startIndex} onClose={() => setBox(null)} />}
    </section>
  )
}

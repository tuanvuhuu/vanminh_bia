import { products, accessories, brand } from '../data/content'
import SectionTitle from './SectionTitle'
import TableArt from './TableArt'

export default function Products() {
  return (
    <section id="products" className="section bg-bg">
      <div className="container-x">
        <SectionTitle
          eyebrow="Sản phẩm"
          title="Các dòng bàn bi-a"
          desc="Đa dạng dòng bàn Pool, Carom, Snooker đạt chuẩn thi đấu — sản xuất theo yêu cầu, vật liệu chính hãng."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <article
              key={p.name}
              className="group card overflow-hidden hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {p.img ? (
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <TableArt className="h-full w-full transition duration-500 group-hover:scale-105" />
                )}
                <span className="absolute left-3 top-3 rounded bg-gold px-2 py-1 text-xs font-bold text-black">
                  {p.type}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold uppercase text-content">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-accent-ink/30 px-2 py-0.5 text-[11px] text-accent-ink"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                  <span className="text-sm text-muted">
                    Giá: <strong className="text-accent-ink">{p.price}</strong>
                  </span>
                  <a
                    href={`tel:${brand.phoneSales.replace(/\./g, '')}`}
                    className="text-sm font-semibold text-accent-ink hover:underline"
                  >
                    Báo giá →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Phụ kiện */}
        <div className="mt-14">
          <h3 className="heading mb-6 text-center text-2xl font-bold">Phụ kiện bi-a chính hãng</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {accessories.map((a) => (
              <div key={a.name} className="card p-5 text-center hover:border-gold/50">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-accent-ink">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v10M7 12h10" />
                  </svg>
                </div>
                <h4 className="font-semibold text-content">{a.name}</h4>
                <p className="mt-1 text-sm text-muted">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

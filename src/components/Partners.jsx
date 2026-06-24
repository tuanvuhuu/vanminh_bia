import { partners } from '../data/content'

// Dải logo thương hiệu vật liệu chạy ngang (marquee)
export default function Partners() {
  const items = [...partners, ...partners]
  return (
    <section className="border-y border-line bg-bg py-10">
      <div className="container-x">
        <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-muted">
          Vật liệu &amp; thương hiệu đối tác
        </p>
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-12">
            {items.map((p, i) => (
              <span
                key={i}
                className="font-display text-2xl font-bold uppercase tracking-wider text-content/40 transition hover:text-accent-ink"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useState, useCallback } from 'react'
import { brand as staticBrand, banners, stats } from '../data/content'

export default function Hero({ brand: propBrand }) {
  const brand = propBrand || staticBrand
  const [idx, setIdx] = useState(0)
  const next = useCallback(() => setIdx((i) => (i + 1) % banners.length), [])
  const go = (i) => setIdx(i)

  useEffect(() => {
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [next])

  return (
     <section id="home" className="bg-bg dark:bg-ink-900 pt-[64px] md:pt-[80px]">
      {/* Slider */}
      <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[2/1] lg:aspect-[3/1]">
        {banners.map((b, i) => (
          <div
            key={b.img}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === idx ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            {/* Nền mờ lấp đầy + banner hiển thị trọn vẹn */}
            <div
              className="absolute inset-0 scale-110 bg-cover bg-center blur-xl brightness-50"
              style={{ backgroundImage: `url(${b.img})` }}
            />
            <img src={b.img} alt={`${b.title} ${b.sub}`} className="relative z-10 h-full w-full object-contain" />
          </div>
        ))}

        {/* Mũi tên */}
        <button
          onClick={() => setIdx((i) => (i - 1 + banners.length) % banners.length)}
          className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-gold hover:text-black sm:flex"
          aria-label="Banner trước"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-gold hover:text-black sm:flex"
          aria-label="Banner sau"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {banners.map((b, i) => (
            <button
              key={b.img}
              onClick={() => go(i)}
              aria-label={`Banner ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === idx ? 'w-7 bg-gold' : 'w-2.5 bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dải CTA + slogan */}
      <div className="bg-gradient-to-b from-surface to-bg dark:from-ink-900 dark:to-bg">
        <div className="container-x py-8 text-center reveal">
          <h1 className="heading text-2xl font-bold text-content dark:text-white sm:text-3xl md:text-4xl">
            {brand.name} <span className="text-gold">— {brand.slogan}</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted dark:text-gray-300">{brand.tagline}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a href="#products" className="btn-gold">
              Xem các mẫu bàn
            </a>
            <a href={`tel:${brand.phoneSales.replace(/\./g, '')}`} className="btn-ghost border-gold/60 text-accent-ink dark:text-gold">
              Tư vấn: {brand.phoneSales}
            </a>
          </div>
        </div>
      </div>

      {/* Thống kê */}
      <div className="border-y border-line bg-surface">
        <dl className="container-x grid grid-cols-2 gap-6 py-8 sm:grid-cols-4 reveal">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="font-display text-3xl font-bold text-accent-ink md:text-4xl">{s.value}</dt>
              <dd className="mt-1 text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

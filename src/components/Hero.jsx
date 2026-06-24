import { brand, stats } from '../data/content'

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Ảnh nền bìa */}
      <div className="absolute inset-0">
        <img
          src="/images/anh_bia.jpg"
          alt="Dương Minh Billiards"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/60" />
      </div>

      <div className="container-x relative z-10 pt-24">
        <div className="max-w-2xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
            ★ Xưởng sản xuất bàn bi-a chính hãng
          </span>
          <h1 className="heading mt-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            DƯƠNG MINH
            <span className="block text-gold">BILLIARDS</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-gray-300">
            {brand.tagline}. Sản xuất tận xưởng — giá tận gốc, vật liệu nhập khẩu chính
            ngạch, thi công &amp; bảo hành trọn gói trên toàn quốc.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#products" className="btn-gold">
              Xem sản phẩm
            </a>
            <a
              href={`tel:${brand.phoneSales.replace(/\./g, '')}`}
              className="btn-ghost"
            >
              Tư vấn: {brand.phoneSales}
            </a>
          </div>

          {/* Thống kê */}
          <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-bold text-gold">{s.value}</dt>
                <dd className="mt-1 text-sm text-gray-400">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#products"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 animate-float text-gold md:block"
        aria-label="Cuộn xuống"
      >
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </a>
    </section>
  )
}

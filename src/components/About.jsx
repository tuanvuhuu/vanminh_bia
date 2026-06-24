import { reasons, brand } from '../data/content'
import SectionTitle from './SectionTitle'

export default function About() {
  return (
    <section id="about" className="section bg-surface">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        {/* Ảnh */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-gold/30">
            <img src="/images/anh_bia.jpg" alt="Xưởng Dương Minh Billiards" className="w-full" />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-xl border border-gold/40 bg-bg p-5 shadow-xl sm:block">
            <p className="font-display text-3xl font-bold text-accent-ink">10+ năm</p>
            <p className="text-sm text-muted">kinh nghiệm sản xuất</p>
          </div>
        </div>

        {/* Nội dung */}
        <div>
          <SectionTitle
            eyebrow="Về chúng tôi"
            title="Vì sao chọn Dương Minh Billiards?"
            desc={`${brand.name} là xưởng sản xuất bàn bi-a uy tín tại ${brand.address}. Chúng tôi tự hào mang đến những sản phẩm chất lượng cao với mức giá tận gốc.`}
            center={false}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="flex gap-3">
                <div className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gold text-black">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-content">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn-gold mt-8">
            Nhận tư vấn miễn phí
          </a>
        </div>
      </div>
    </section>
  )
}

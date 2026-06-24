import { useFetchTable } from '../hooks/useFetchTable'
import SectionTitle from './SectionTitle'

const icons = {
  design: <path d="M3 3h7v7H3zM14 3h7v4h-7zM14 11h7v10h-7zM3 14h7v7H3z" />,
  cloth: <path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7" />,
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6z" />
  ),
  truck: <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7M5.5 19a2 2 0 1 0 0-.1M17.5 19a2 2 0 1 0 0-.1" />,
}

export default function Services() {
  const { data: services, loading } = useFetchTable('services')

  return (
    <section id="services" className="section bg-surface">
      <div className="container-x">
        <SectionTitle
          eyebrow="Dịch vụ"
          title="Giải pháp trọn gói cho CLB bi-a"
          desc="Từ tư vấn thiết kế đến thi công, bảo trì — Vikings Billiards đồng hành cùng bạn trên cả chặng đường."
        />

        {loading ? (
          <p className="text-center text-muted">Đang tải dịch vụ...</p>
        ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-xl border border-line bg-bg p-7 transition hover:border-gold/60"
            >
              <span className="absolute -right-3 -top-4 font-display text-7xl font-bold text-content/5">
                0{i + 1}
              </span>
              <div className="relative flex h-14 w-14 items-center justify-center rounded-lg bg-gold/15 text-accent-ink transition group-hover:bg-gold group-hover:text-black">
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {icons[s.icon]}
                </svg>
              </div>
              <h3 className="relative mt-5 font-display text-lg font-semibold uppercase text-content">
                {s.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}

import { useFetchTable } from '../hooks/useFetchTable'
import SectionTitle from './SectionTitle'

export default function Testimonials() {
  const { data: testimonials, loading } = useFetchTable('testimonials', 'created_at', false)

  return (
    <section id="feedback" className="section bg-bg">
      <div className="container-x">
        <SectionTitle
          eyebrow="Cảm nhận khách hàng"
          title="Khách hàng nói gì về chúng tôi"
          desc="Sự hài lòng của hàng trăm chủ CLB trên toàn quốc là động lực để Vikings Billiards không ngừng hoàn thiện."
        />

        {loading ? (
          <p className="text-center text-muted">Đang tải cảm nhận...</p>
        ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="card flex flex-col p-7 hover:border-gold/50">
              <svg className="h-9 w-9 text-gold/40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.6 8C6.5 8 4 10.5 4 13.6 4 16.6 6.2 19 9 19c.3 0 .5 0 .8-.1C8.9 20.7 7 22 7 22l1 1c4-1.7 6-5 6-9.4C14 10.5 12 8 9.6 8zm10 0c-3.1 0-5.6 2.5-5.6 5.6 0 3 2.2 5.4 5 5.4.3 0 .5 0 .8-.1-.9 1.8-2.8 3.1-2.8 3.1l1 1c4-1.7 6-5 6-9.4C24 10.5 22 8 19.6 8z" />
              </svg>
              <div className="mt-3 flex gap-0.5 text-gold">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-muted">"{t.text}"</blockquote>
              <figcaption className="mt-5 border-t border-line pt-4">
                <p className="font-semibold text-content">{t.name}</p>
                <p className="text-xs text-muted">{t.place}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}

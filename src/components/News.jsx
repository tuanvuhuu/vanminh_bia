import { news } from '../data/content'
import SectionTitle from './SectionTitle'
import TableArt from './TableArt'

export default function News() {
  return (
    <section id="news" className="section bg-surface">
      <div className="container-x">
        <SectionTitle
          eyebrow="Tin tức & kinh nghiệm"
          title="Chia sẻ từ chuyên gia"
          desc="Cập nhật kiến thức chọn bàn, setup CLB và bảo dưỡng để vận hành hiệu quả nhất."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {news.map((n) => (
            <article key={n.title} className="group card overflow-hidden hover:border-gold/50">
              <div className="relative aspect-[16/9] overflow-hidden">
                <TableArt className="h-full w-full transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded bg-gold px-2 py-1 text-xs font-bold text-black">
                  {n.cat}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs text-muted">{n.date}</p>
                <h3 className="mt-1 font-display text-lg font-semibold uppercase leading-snug text-content transition group-hover:text-accent-ink">
                  {n.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{n.excerpt}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-accent-ink">
                  Đọc tiếp →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

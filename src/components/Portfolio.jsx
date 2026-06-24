import { portfolio } from '../data/content'
import SectionTitle from './SectionTitle'
import TableArt from './TableArt'

export default function Portfolio() {
  return (
    <section id="portfolio" className="section bg-bg">
      <div className="container-x">
        <SectionTitle
          eyebrow="Dự án tiêu biểu"
          title="CLB đã setup & bàn giao"
          desc="Hàng trăm câu lạc bộ bi-a trên toàn quốc đã tin tưởng lựa chọn Dương Minh Billiards."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((c) => (
            <article key={c.name} className="group relative overflow-hidden rounded-xl border border-line">
              <div className="aspect-[16/10] overflow-hidden">
                {c.img ? (
                  <img
                    src={c.img}
                    alt={c.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                ) : (
                  <TableArt className="h-full w-full transition duration-500 group-hover:scale-110" />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="rounded bg-gold px-2 py-0.5 text-xs font-bold text-black">
                  {c.tables} bàn
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold uppercase text-white">{c.name}</h3>
                <p className="flex items-center gap-1.5 text-sm text-gray-200">
                  <svg className="h-4 w-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {c.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

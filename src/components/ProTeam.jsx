import { proTeam } from '../data/content'
import SectionTitle from './SectionTitle'

export default function ProTeam() {
  return (
    <section id="proteam" className="section bg-surface">
      <div className="container-x">
        <SectionTitle
          eyebrow="Đội ngũ chuyên nghiệp"
          title="VĐV & cố vấn đồng hành"
          desc="Các cơ thủ và huấn luyện viên giàu kinh nghiệm đồng hành cùng thương hiệu, đảm bảo mỗi cây bàn đạt chuẩn thi đấu."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {proTeam.map((m) => (
            <div
              key={m.name}
              className="group card overflow-hidden text-center hover:border-gold/60 hover:shadow-xl hover:shadow-gold/10"
            >
              <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
                <span className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold/60 bg-ink-900 font-display text-3xl font-bold text-gold">
                  {m.name.split(' ').slice(-1)[0][0]}
                </span>
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold uppercase text-content">{m.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent-ink">{m.role}</p>
                <p className="mt-3 text-sm text-muted">{m.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

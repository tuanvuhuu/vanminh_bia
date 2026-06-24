import { useFetchTable } from '../hooks/useFetchTable'
import SectionTitle from './SectionTitle'
import TableArt from './TableArt'

export default function Club() {
  const { data: clubPosts, loading } = useFetchTable('club_posts', 'created_at', false)

  return (
    <section id="club" className="section bg-surface">
      <div className="container-x">
        <SectionTitle
          eyebrow="Câu lạc bộ"
          title="Kiến thức & kinh nghiệm vận hành CLB"
          desc="Mỗi bài viết là một chủ đề riêng — từ chọn vải, setup đến bảo dưỡng — giúp bạn vận hành câu lạc bộ bi-a hiệu quả nhất."
        />

        {loading ? (
          <p className="text-center text-muted">Đang tải bài viết...</p>
        ) : (
        <div className="space-y-16 md:space-y-24">
          {clubPosts.map((post, i) => {
            const reversed = i % 2 === 1
            return (
              <article key={post.id} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                {/* Ảnh */}
                <div className={reversed ? 'lg:order-2' : ''}>
                  <div className="group relative overflow-hidden rounded-2xl border border-line shadow-lg">
                    <div className="aspect-video overflow-hidden">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <TableArt className="h-full w-full" />
                      )}
                    </div>
                    <span className="absolute left-4 top-4 rounded bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-black">
                      {post.cat}
                    </span>
                  </div>
                </div>

                {/* Nội dung */}
                <div className={reversed ? 'lg:order-1' : ''}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted">{post.date}</p>
                  <h3 className="heading mt-2 text-2xl font-bold sm:text-3xl">{post.title}</h3>
                  <div className="mt-3 h-1 w-12 rounded bg-gold" />
                  <p className="mt-5 text-muted">{post.intro}</p>

                  <ul className="mt-6 space-y-4">
                    {post.points.map((p) => (
                      <li key={p.h} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 flex-none rounded-full bg-gold" />
                        <div>
                          <h4 className="font-semibold text-content">{p.h}</h4>
                          <p className="mt-0.5 text-sm text-muted">{p.d}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <a href="#contact" className="btn-ghost mt-8">
                    Nhận tư vấn chi tiết
                  </a>
                </div>
              </article>
            )
          })}
        </div>
        )}
      </div>
    </section>
  )
}

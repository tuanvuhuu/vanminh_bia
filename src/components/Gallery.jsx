import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { gallery as fallbackGallery } from '../data/content'
import DBSectionTitle from './DBSectionTitle'
import Lightbox from './Lightbox'

const STEP = 8

// Trích xuất metadata giả lập cực kỳ thực tế cho ảnh không gian thiết kế
const getPhotoMeta = (src, index) => {
  const idNum = parseInt(src.match(/\d+/)?.[0] || index) || 1
  const catIndex = idNum % 4

  const categories = [
    { id: 'table', label: 'Bố trí bàn', tag: '#Khuvựcbàn' },
    { id: 'lighting', label: 'Đèn & Ánh sáng', tag: '#Hệthốngđèn' },
    { id: 'lounge', label: 'Quầy Lounge & Bar', tag: '#QuầyBar' },
    { id: 'blueprint', label: 'Bản vẽ 3D', tag: '#Thiếtkế3D' }
  ]

  const selectedCat = categories[catIndex]

  const titles = [
    `Phân khu bàn chơi chính Vikings`,
    `Hệ thống đèn LED vòm chuyên dụng`,
    `Khu vực sảnh chờ & Sofa đón tiếp`,
    `Bản vẽ 3D bố trí mặt bằng phối cảnh`
  ]

  return {
    category: selectedCat.id,
    categoryLabel: selectedCat.label,
    tag: selectedCat.tag,
    title: `${titles[catIndex]} #${idNum}`,
    desc: `Phối cảnh 3D không gian tối ưu khoảng cách cơ thủ, hệ thống chiếu sáng chuẩn giải đấu.`
  }
}

export default function Gallery() {
  const [images, setImages] = useState(fallbackGallery)
  const [activeTab, setActiveTab] = useState('all')
  const [visible, setVisible] = useState(STEP)
  const [lightboxIndex, setLightboxIndex] = useState(null) // index của ảnh đang mở trong danh sách lọc

  useEffect(() => {
    supabase
      .from('galleries')
      .select('image_url')
      .order('display_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length) setImages(data.map((d) => d.image_url))
      })
  }, [])

  // Mỗi lần đổi tab thì reset lại số lượng hiển thị ban đầu
  useEffect(() => {
    setVisible(STEP)
  }, [activeTab])

  // Lọc ảnh theo tab hoạt động
  const filteredImages = activeTab === 'all' 
    ? images 
    : images.filter((img, idx) => getPhotoMeta(img, idx).category === activeTab)

  const shown = filteredImages.slice(0, visible)

  const tabs = [
    { id: 'all', label: 'Tất cả không gian' },
    { id: 'table', label: 'Bố trí bàn' },
    { id: 'lighting', label: 'Hệ thống đèn' },
    { id: 'lounge', label: 'Quầy Bar & Lounge' },
    { id: 'blueprint', label: 'Bản vẽ 3D' },
  ]

  // Trả về kích thước bento grid dựa vào chỉ số index
  const getBentoSpanClass = (idx) => {
    // Tạo nhịp điệu Bento Grid lặp lại sau mỗi 8 phần tử
    const pattern = idx % 8
    if (pattern === 0) return 'md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-square' // Ô lớn góc rộng
    if (pattern === 3) return 'md:col-span-2 aspect-[16/10] md:aspect-auto' // Ô rộng nằm ngang
    return 'col-span-1 aspect-[4/3] md:aspect-auto' // Ô tiêu chuẩn
  }

  return (
    <section id="gallery" className="section bg-bg">
      <div className="container-x">
        <DBSectionTitle
          sectionKey="gallery"
          eyebrow="Không gian CLB"
          title="Thư viện thiết kế Vikings"
          desc="Bộ sưu tập thiết kế không gian CLB bi-a Vikings cao cấp — tích hợp phân chia khu vực khoa học và bản vẽ phối cảnh 3D."
        />

        {/* Categories Tab Bar */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-gold text-black border-gold shadow-md shadow-gold/15'
                    : 'bg-surface-2 text-muted border-line hover:text-content hover:border-gold/50'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:auto-rows-[180px] lg:auto-rows-[220px]">
          {shown.map((src, i) => {
            const meta = getPhotoMeta(src, i)
            const spanClass = getBentoSpanClass(i)
            return (
              <button
                key={src}
                onClick={() => setLightboxIndex(i)}
                className={`group relative overflow-hidden rounded-xl border border-line bg-ink-900 shadow-sm hover:border-gold/50 transition-all duration-300 ${spanClass}`}
                aria-label={`Xem ảnh ${meta.title}`}
              >
                <img
                  src={src}
                  alt={meta.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* Glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 text-left">
                  <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider mb-1">
                    {meta.tag}
                  </span>
                  <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">
                    {meta.title}
                  </h4>
                  <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed">
                    {meta.desc}
                  </p>
                  <span className="mt-3 text-[10px] font-extrabold text-white uppercase tracking-wider flex items-center gap-1 hover:text-gold transition-colors">
                    🔍 Xem phóng to
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Load More Button */}
        {visible < filteredImages.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisible((v) => Math.min(v + STEP, filteredImages.length))}
              className="btn-gold px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-gold/15"
            >
              Xem thêm hình ảnh ({filteredImages.length - visible})
            </button>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}

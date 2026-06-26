import { useState } from 'react'

export default function ProductQuiz({ isOpen, onClose, products = [], onOrder }) {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({
    purpose: '',
    budget: '',
    style: ''
  })

  if (!isOpen) return null

  const handleSelect = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
    setStep(prev => prev + 1)
  }

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1))
  }

  const handleReset = () => {
    setAnswers({ purpose: '', budget: '', style: '' })
    setStep(1)
  }

  // Thuật toán gợi ý bàn tối ưu
  const getRecommendation = () => {
    if (!products || products.length === 0) return null

    // Lọc theo ngân sách trước
    let candidates = [...products]
    
    // Phân loại giá
    const getPriceNumber = (priceStr) => {
      if (!priceStr) return 0
      return parseInt(priceStr.replace(/\./g, '').replace('đ', '')) || 0
    }

    if (answers.budget === 'low') {
      // Dưới 55 triệu
      candidates = products.filter(p => getPriceNumber(p.price) <= 55000000)
    } else if (answers.budget === 'mid') {
      // 55 - 75 triệu
      candidates = products.filter(p => {
        const pr = getPriceNumber(p.price)
        return pr > 55000000 && pr <= 75000000
      })
    } else if (answers.budget === 'high') {
      // Trên 75 triệu
      candidates = products.filter(p => getPriceNumber(p.price) > 75000000)
    }

    // Nếu không tìm thấy bàn nào theo ngân sách, lấy toàn bộ
    if (candidates.length === 0) {
      candidates = [...products]
    }

    // Lọc thêm theo mục đích hoặc phong cách để chọn bàn tối ưu nhất
    let bestMatch = candidates[0]
    if (answers.purpose === 'business') {
      // CLB chuộng Pro-Evo hoặc Rise hoặc Hunter
      bestMatch = candidates.find(c => ['VK-PRO-EVO', 'VK-RISE', 'VK-HUNTER'].includes(c.code)) || candidates[0]
    } else if (answers.purpose === 'home') {
      // Gia đình chuộng Monster sang xịn hoặc Hero nhỏ gọn
      bestMatch = candidates.find(c => ['VK25', 'VK-HERO', 'VK-PRO-EVO'].includes(c.code)) || candidates[0]
    } else if (answers.purpose === 'office') {
      // Văn phòng chuộng Silver hoặc Pro-Evo trẻ trung
      bestMatch = candidates.find(c => ['VK-SILVER', 'VK-PRO-EVO'].includes(c.code)) || candidates[0]
    }

    return bestMatch
  }

  const recommendedProduct = getRecommendation()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-surface-1 shadow-2xl transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-line px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold uppercase tracking-wider text-accent-ink dark:text-gold">
              🎯 Trắc nghiệm chọn bàn phù hợp
            </h3>
            <p className="text-xs text-muted">Trả lời 3 câu hỏi nhanh để tìm dòng bàn tối ưu cho bạn</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-muted hover:text-content hover:bg-gold/20 transition-all"
            aria-label="Đóng"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        {step <= 3 && (
          <div className="h-1.5 w-full bg-surface-2">
            <div 
              className="h-full bg-gold transition-all duration-500" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h4 className="text-center font-display text-base font-bold text-content uppercase tracking-wider">
                Bước 1: Mục đích sử dụng bàn bi-a của bạn là gì?
              </h4>
              <div className="grid gap-4 sm:grid-cols-3">
                <button
                  onClick={() => handleSelect('purpose', 'business')}
                  className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface-2 p-6 text-center hover:border-gold hover:bg-gold/5 transition-all duration-300 group"
                >
                  <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎱</span>
                  <span className="font-bold text-sm text-content">Kinh doanh CLB</span>
                  <span className="text-[10px] text-muted mt-1">Độ bền cao, dễ thu hồi vốn, hoạt động tần suất lớn</span>
                </button>

                <button
                  onClick={() => handleSelect('purpose', 'home')}
                  className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface-2 p-6 text-center hover:border-gold hover:bg-gold/5 transition-all duration-300 group"
                >
                  <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">🏠</span>
                  <span className="font-bold text-sm text-content">Giải trí tại gia</span>
                  <span className="text-[10px] text-muted mt-1">Kiểu dáng sang trọng, decor thẩm mỹ cho biệt thự, nhà phố</span>
                </button>

                <button
                  onClick={() => handleSelect('purpose', 'office')}
                  className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface-2 p-6 text-center hover:border-gold hover:bg-gold/5 transition-all duration-300 group"
                >
                  <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">🏢</span>
                  <span className="font-bold text-sm text-content">Kê ở Văn phòng</span>
                  <span className="text-[10px] text-muted mt-1">Giải trí gắn kết nhân viên, kiểu dáng hiện đại năng động</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h4 className="text-center font-display text-base font-bold text-content uppercase tracking-wider">
                Bước 2: Ngân sách đầu tư cho mỗi bàn khoảng bao nhiêu?
              </h4>
              <div className="grid gap-4 sm:grid-cols-3">
                <button
                  onClick={() => handleSelect('budget', 'low')}
                  className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface-2 p-6 text-center hover:border-gold hover:bg-gold/5 transition-all duration-300 group"
                >
                  <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">💰</span>
                  <span className="font-bold text-sm text-content">Tiết kiệm (Dưới 55Tr)</span>
                  <span className="text-[10px] text-muted mt-1">Tối ưu chi phí ban đầu, hoàn vốn cực nhanh</span>
                </button>

                <button
                  onClick={() => handleSelect('budget', 'mid')}
                  className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface-2 p-6 text-center hover:border-gold hover:bg-gold/5 transition-all duration-300 group"
                >
                  <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">💎</span>
                  <span className="font-bold text-sm text-content">Tầm trung (55 - 75Tr)</span>
                  <span className="text-[10px] text-muted mt-1">Chất lượng vượt trội, cấu hình chuẩn thi đấu tốt nhất</span>
                </button>

                <button
                  onClick={() => handleSelect('budget', 'high')}
                  className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface-2 p-6 text-center hover:border-gold hover:bg-gold/5 transition-all duration-300 group"
                >
                  <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">👑</span>
                  <span className="font-bold text-sm text-content">Vip / Giải đấu (&gt; 75Tr)</span>
                  <span className="text-[10px] text-muted mt-1">Đẳng cấp tối thượng, gầm thép chống rung sưởi đa vùng</span>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h4 className="text-center font-display text-base font-bold text-content uppercase tracking-wider">
                Bước 3: Phong cách căn phòng chủ đạo của bạn?
              </h4>
              <div className="grid gap-4 sm:grid-cols-3">
                <button
                  onClick={() => handleSelect('style', 'classic')}
                  className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface-2 p-6 text-center hover:border-gold hover:bg-gold/5 transition-all duration-300 group"
                >
                  <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">🪵</span>
                  <span className="font-bold text-sm text-content">Cổ điển & Ấm cúng</span>
                  <span className="text-[10px] text-muted mt-1">Tone màu gỗ trầm, vân gỗ tự nhiên sang trọng</span>
                </button>

                <button
                  onClick={() => handleSelect('style', 'modern')}
                  className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface-2 p-6 text-center hover:border-gold hover:bg-gold/5 transition-all duration-300 group"
                >
                  <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">⚙️</span>
                  <span className="font-bold text-sm text-content">Hiện đại & Tối giản</span>
                  <span className="text-[10px] text-muted mt-1">Tone màu xám/đen, chân kim loại góc hợp kim sắc sảo</span>
                </button>

                <button
                  onClick={() => handleSelect('style', 'active')}
                  className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface-2 p-6 text-center hover:border-gold hover:bg-gold/5 transition-all duration-300 group"
                >
                  <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">⚡</span>
                  <span className="font-bold text-sm text-content">Trẻ trung & Phá cách</span>
                  <span className="text-[10px] text-muted mt-1">Tone màu độc đáo, kết hợp dải đèn LED hoặc yếm liền khối cá tính</span>
                </button>
              </div>
            </div>
          )}

          {step > 3 && recommendedProduct && (
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-5xl">🎉</span>
                <h4 className="font-display text-xl font-bold uppercase text-content tracking-wide mt-2">
                  Dòng bàn tối ưu dành cho bạn!
                </h4>
                <p className="text-xs text-muted">Dựa trên các lựa chọn về nhu cầu, ngân sách và sở thích thẩm mỹ</p>
              </div>

              {/* Recommendation Card */}
              <div className="flex flex-col md:flex-row rounded-xl border border-line bg-surface-2 overflow-hidden shadow-lg">
                <div className="md:w-2/5 aspect-[16/11] md:aspect-auto relative bg-ink-900">
                  <img 
                    src={recommendedProduct.image} 
                    alt={recommendedProduct.name} 
                    className="w-full h-full object-cover" 
                  />
                  {recommendedProduct.badge && (
                    <span className="absolute top-2 left-2 bg-gold text-black border border-yellow-300/40 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                      {recommendedProduct.badge}
                    </span>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-gold uppercase tracking-widest">{recommendedProduct.code}</span>
                    <h5 className="font-display text-lg font-bold text-content mt-0.5">{recommendedProduct.name}</h5>
                    <p className="text-[11px] text-muted leading-relaxed mt-2">
                      📍 Khung: {recommendedProduct.frame}<br/>
                      📐 Kích thước đặt bàn tối ưu: <strong>5.7m × 4.45m</strong>
                    </p>
                    <ul className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1">
                      {recommendedProduct.specs?.slice(0, 4).map((spec, i) => (
                        <li key={i} className="text-[10px] text-content flex items-center gap-1">
                          <span className="text-gold text-[8px]">✔</span> {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-3 border-t border-line flex items-end justify-between">
                    <div>
                      {recommendedProduct.oldPrice && (
                        <span className="block text-[11px] text-muted line-through">{recommendedProduct.oldPrice}</span>
                      )}
                      <span className="font-display text-lg font-bold text-accent-ink">{recommendedProduct.price}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={handleReset}
                        className="px-3 py-2 border border-line hover:border-gold hover:text-gold rounded-lg text-xs font-semibold transition"
                      >
                        Làm lại
                      </button>
                      <button
                        onClick={() => {
                          onOrder(recommendedProduct)
                          onClose()
                        }}
                        className="btn-gold px-4 py-2 text-xs"
                      >
                        Đăng ký tư vấn / Đặt mua
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls for steps */}
        {step > 1 && step <= 3 && (
          <div className="border-t border-line bg-surface-2/40 px-6 py-4 flex justify-between">
            <button
              onClick={handleBack}
              className="px-4 py-2 border border-line hover:border-gold/50 rounded-lg text-xs font-semibold text-muted hover:text-content transition-all"
            >
              ← Quay lại
            </button>
            <span className="text-xs text-muted self-center">Bước {step} trên 3</span>
          </div>
        )}
      </div>
    </div>
  )
}

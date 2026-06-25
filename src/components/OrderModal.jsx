import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function OrderModal({ product, brand, onClose }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || !address.trim()) return

    setSubmitting(true)
    const orderMessage = `[ĐẶT MUA] Bàn: ${product.name} (Mã: ${product.code}) - Giá: ${product.price}.${notes ? ` Ghi chú: ${notes}` : ''}`

    try {
      const { error } = await supabase.from('consultations').insert([
        {
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          message: orderMessage,
          status: 'Chờ liên hệ',
        },
      ])

      if (error) throw error
      setSuccess(true)
    } catch (err) {
      console.error('Lỗi khi gửi đơn đặt mua:', err)
      alert('Có lỗi xảy ra khi gửi đơn hàng. Vui lòng liên hệ trực tiếp hotline.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleZaloChat = () => {
    const text = `Xin chào Vikings Billiards! Tôi muốn đặt mua Bàn ${product.name} (${product.code}) - Giá: ${product.price}. Tên tôi là ${name} (${phone}). Khu vực: ${address}.${notes ? ` Ghi chú: ${notes}` : ''}`
    window.open(`https://zalo.me/${brand.zalo}?text=${encodeURIComponent(text)}`, '_blank')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-bg dark:bg-ink-900 border border-line rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-55 text-muted hover:text-content transition-colors p-1 bg-surface-2 dark:bg-ink-950 rounded-full border border-line"
          aria-label="Đóng"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {!success ? (
          <>
            {/* Left side: Product Info */}
            <div className="w-full md:w-5/12 bg-surface-2 dark:bg-ink-950 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-line">
              <div>
                <span className="inline-block rounded-full bg-gold/15 border border-gold/30 px-3 py-1 text-[11px] font-bold text-accent-ink dark:text-gold uppercase tracking-wider mb-3">
                  Sản phẩm lựa chọn
                </span>
                <div className="aspect-[16/10] w-full rounded-lg overflow-hidden border border-line bg-black mb-4">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-content mb-1">{product.name}</h3>
                <p className="text-xs text-muted mb-4">Mã sản phẩm: <span className="font-semibold text-content">{product.code}</span></p>
                
                <div className="space-y-2">
                  <p className="text-xs text-muted flex items-center gap-2">
                    <span className="text-gold">✓</span> {product.frame}
                  </p>
                  {product.specs && product.specs.slice(0, 3).map((spec, i) => (
                    <p key={i} className="text-xs text-muted flex items-center gap-2">
                      <span className="text-gold">✓</span> {spec}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-line">
                <span className="block text-xs text-muted mb-0.5">Giá niêm yết:</span>
                <span className="font-display text-2xl font-bold text-accent-ink dark:text-gold">{product.price}</span>
              </div>
            </div>

            {/* Right side: Form */}
            <form onSubmit={handleSubmit} className="w-full md:w-7/12 p-6 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-content mb-1">Thông tin đặt mua</h2>
                <p className="text-xs text-muted mb-6">Vui lòng điền thông tin để chúng tôi liên hệ tư vấn và xác nhận đơn hàng.</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-content mb-1.5 uppercase tracking-wider">Họ và Tên <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-content placeholder-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-content mb-1.5 uppercase tracking-wider">Số điện thoại <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      required
                      placeholder="09xxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-content placeholder-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-content mb-1.5 uppercase tracking-wider">Tỉnh / Thành phố <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Hà Nội, Đà Nẵng, TP. HCM"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-content placeholder-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-content mb-1.5 uppercase tracking-wider">Yêu cầu thêm (nếu có)</label>
                    <textarea
                      placeholder="Ví dụ: Cần tư vấn thêm combo phụ kiện, hẹn giờ giao hàng..."
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full rounded-lg border border-line bg-surface px-4 py-2 text-sm text-content placeholder-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 rounded-lg border border-line bg-surface py-3 text-sm font-semibold text-content hover:bg-surface-2 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-2/3 rounded-lg bg-gold py-3 text-sm font-semibold text-black hover:bg-gold-600 transition-colors shadow-lg shadow-gold/25 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Đang xử lý...
                    </>
                  ) : (
                    'Gửi yêu cầu đặt mua'
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="w-full p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-500 mb-6 animate-bounce">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2 className="font-display text-2xl font-bold text-content mb-3 uppercase tracking-wide">Đặt mua thành công!</h2>
            <p className="text-sm text-muted max-w-md mb-8">
              Cảm ơn bạn đã tin tưởng lựa chọn **Vikings Billiards**. Chúng tôi đã ghi nhận đơn đặt hàng bàn **{product.name}** và sẽ liên hệ xác nhận qua điện thoại trong vòng 15 phút.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <button
                onClick={handleZaloChat}
                className="flex-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                💬 Chat Zalo để được giao ngay
              </button>
              <button
                onClick={onClose}
                className="flex-1 rounded-lg border border-line bg-surface hover:bg-surface-2 text-content py-3 text-sm font-semibold transition-colors"
              >
                Quay lại trang chủ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

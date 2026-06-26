import { useEffect } from 'react'
import TableCompare from './TableCompare'

export default function CompareModal({ isOpen, onClose, products, onOrder }) {
  // Khóa cuộn trang nền khi mở Modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md p-4 md:p-6 flex items-center justify-center animate-fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-5xl bg-bg dark:bg-ink-900 border border-line rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-scale-up z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-line">
          <div>
            <h3 className="font-display text-base md:text-lg font-bold text-content uppercase tracking-wider">
              So sánh các dòng bàn Vikings
            </h3>
            <p className="text-[10px] md:text-xs text-muted mt-0.5">
              Đối chiếu thông số kỹ thuật phần cứng và tầm giá của các dòng bàn.
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-surface-2 dark:bg-ink-950 border border-line hover:border-gold hover:text-gold flex items-center justify-center transition-colors text-muted"
            aria-label="Đóng"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-6 flex-1">
          <TableCompare
            products={products}
            onOrder={(p) => {
              onClose() // Đóng modal so sánh trước
              onOrder(p) // Mở modal đặt hàng sau
            }}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-line bg-surface-2/40 dark:bg-ink-950/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-line hover:border-gold text-xs font-bold uppercase tracking-wider text-muted hover:text-content transition-colors"
          >
            Đóng bảng
          </button>
        </div>
      </div>
    </div>
  )
}

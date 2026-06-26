import { useState, useEffect, useRef } from 'react'
import { useFetchTable } from '../hooks/useFetchTable'
import { products as fallbackProducts, accessories } from '../data/content'

const NAMES = [
  'Anh Tuấn', 'Anh Hải', 'Anh Minh', 'Chị Trang', 'Anh Hoàng',
  'Anh Dũng', 'Chị Mai', 'Anh Nam', 'Anh Hùng', 'Chị Lan',
  'Anh Thành', 'Anh Cường', 'Chị Vy', 'Anh Quân', 'Chị Hà',
  'Anh Huy', 'Chị Ngọc', 'Anh Phước', 'Anh Bình', 'Chị Hoa',
  'Anh Sơn', 'Anh Khánh', 'Anh Long', 'Chị Phương', 'Anh Tiến',
  'Anh Lâm', 'Anh Phong', 'Chị Tuyết', 'Anh Tùng', 'Chị Quyên'
]

const LOCATIONS = [
  'Hà Nội', 'Hải Phòng', 'Quảng Ninh', 'Bắc Ninh', 'Thái Bình',
  'Hải Dương', 'Vĩnh Phúc', 'Bắc Giang', 'Phú Thọ', 'Hưng Yên',
  'Hà Nam', 'Ninh Bình', 'Lạng Sơn', 'Thái Nguyên', 'Tuyên Quang',
  'Hòa Bình', 'Yên Bái', 'Sơn La', 'Cao Bằng', 'Nam Định',
  'Hà Đông, Hà Nội', 'Cầu Giấy, Hà Nội', 'Long Biên, Hà Nội',
  'Đông Anh, Hà Nội', 'Hoài Đức, Hà Nội', 'Thanh Trì, Hà Nội',
  'Từ Sơn, Bắc Ninh', 'Uông Bí, Quảng Ninh', 'Chí Linh, Hải Dương'
]

const TIMES = [
  'vừa xong', '3 phút trước', '5 phút trước', '8 phút trước',
  '12 phút trước', '15 phút trước', '25 phút trước', '45 phút trước'
]

export default function FakeOrders() {
  const [show, setShow] = useState(false)
  const [order, setOrder] = useState(null)
  const [isDismissed, setIsDismissed] = useState(false)

  const { data: dbProducts } = useFetchTable('products')
  const products = dbProducts && dbProducts.length > 0 ? dbProducts : fallbackProducts
  const { data: dbFakeOrders } = useFetchTable('fake_orders')

  useEffect(() => {
    // Check if user dismissed notifications in this session
    if (sessionStorage.getItem('fake_orders_dismissed') === 'true') {
      setIsDismissed(true)
      return
    }

    if (isDismissed) return

    // First notification appears after 1.5 seconds
    const initialTimeout = setTimeout(() => {
      generateOrder()
    }, 1500)

    // Interval to show next notification every 5 seconds
    const interval = setInterval(() => {
      generateOrder()
    }, 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(initialTimeout)
    }
  }, [products, dbFakeOrders, isDismissed])

  const generateOrder = () => {
    if (isDismissed) return

    const randomTime = TIMES[Math.floor(Math.random() * TIMES.length)]

    if (dbFakeOrders && dbFakeOrders.length > 0) {
      // Pick a random fake order from the database
      const dbOrder = dbFakeOrders[Math.floor(Math.random() * dbFakeOrders.length)]
      setOrder({
        name: dbOrder.name,
        location: dbOrder.location,
        time: randomTime,
        text: dbOrder.text,
        type: dbOrder.type || 'product',
        image: dbOrder.image || ''
      })
    } else {
      // Client-side fallback generator
      if (products.length === 0) return
      const randomName = NAMES[Math.floor(Math.random() * NAMES.length)]
      const randomLocation = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]

      // Determine type: 0 = product (70% weight), 1 = consultation (15%), 2 = accessory (15%)
      const rand = Math.random()
      let type = 'product'
      let text = ''
      let image = ''

      if (rand < 0.7) {
        const prod = products[Math.floor(Math.random() * products.length)]
        type = 'product'
        text = `đã đặt mua bàn ${prod.name}`
        image = prod.image || ''
      } else if (rand < 0.85) {
        type = 'consultation'
        text = `đã đăng ký tư vấn thiết kế & lắp đặt CLB`
        image = ''
      } else {
        const acc = accessories[Math.floor(Math.random() * accessories.length)]
        type = 'accessory'
        text = `đã đặt mua ${acc.name}`
        image = acc.img || ''
      }

      setOrder({
        name: randomName,
        location: randomLocation,
        time: randomTime,
        text,
        type,
        image
      })
    }

    setShow(true)

    // Hide after 3.5 seconds
    setTimeout(() => {
      setShow(false)
    }, 3500)
  }

  const handleClose = () => {
    setShow(false)
    setIsDismissed(true)
    sessionStorage.setItem('fake_orders_dismissed', 'true')
  }

  if (isDismissed || !order) return null

  // Helper for rendering image or fallback emoji/icon
  const renderAvatar = () => {
    if (order.image) {
      return (
        <img
          src={order.image}
          alt={order.text}
          className="h-full w-full object-cover rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
          onError={(e) => {
            // If image fails to load, replace with fallback SVG/emoji container
            e.target.style.display = 'none'
            const fb = e.target.nextSibling
            if (fb) fb.style.display = 'flex'
          }}
        />
      )
    }
    return null
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes order-slide-in {
          0% { transform: translateY(40px) scale(0.92); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes order-slide-out {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(20px) scale(0.95); opacity: 0; }
        }
        .animate-order-in {
          animation: order-slide-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-order-out {
          animation: order-slide-out 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
      <div
        className={`fixed bottom-5 left-5 z-[99] max-w-[340px] w-[calc(100%-2.5rem)] md:w-auto bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl shadow-xl p-3.5 flex items-center gap-3.5 transition-all duration-300 ${
          show ? 'animate-order-in' : 'animate-order-out pointer-events-none opacity-0'
        }`}
      >
        {/* Avatar/Thumbnail */}
        <div className="relative flex-shrink-0 h-12 w-12 rounded-xl bg-amber-50 dark:bg-zinc-900 border border-amber-100 dark:border-zinc-850 flex items-center justify-center overflow-hidden">
          {renderAvatar()}
          {/* Fallback Icon */}
          <div
            className="absolute inset-0 flex items-center justify-center text-xl bg-gradient-to-tr from-amber-100 to-amber-50 dark:from-zinc-900 dark:to-zinc-800 text-amber-600 dark:text-gold"
            style={{ display: order.image ? 'none' : 'flex' }}
          >
            {order.type === 'product' && '🎱'}
            {order.type === 'consultation' && '📋'}
            {order.type === 'accessory' && '📦'}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-4">
          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
            {order.name} <span className="text-zinc-500 dark:text-zinc-400 font-normal">ở</span> {order.location}
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5 line-clamp-2 leading-relaxed font-medium">
            {order.text}
          </p>
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 block">
            {order.time}
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 rounded-full text-zinc-400 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
          aria-label="Đóng thông báo"
        >
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </>
  )
}

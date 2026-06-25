import { brand as brandStatic } from '../data/content'
import { useBrand } from '../hooks/useBrand'

// Logo Vikings: bản cho nền sáng + bản cho nền tối (dark mode).
// Ưu tiên logo cấu hình trong admin (DB), nếu chưa có thì dùng ảnh tĩnh.
export default function Logo({ className = 'h-11 w-auto' }) {
  const { brand } = useBrand()
  const name = brand?.name || brandStatic.name
  const dark = brand?.logo_dark || '/images/logo-dark.png'
  const gold = brand?.logo_gold || '/images/logo-gold.png'

  return (
    <span className="inline-flex items-center">
      <img src={dark} alt={name} className={`${className} block dark:hidden`} />
      <img src={gold} alt={name} className={`${className} hidden dark:block`} />
    </span>
  )
}

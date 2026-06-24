import { brand } from '../data/content'

// Logo Vikings: bản gold cho nền tối, bản đen cho nền sáng
export default function Logo({ className = 'h-11 w-auto' }) {
  return (
    <span className="inline-flex items-center">
      <img src="/images/logo-dark.png" alt={brand.name} className={`${className} block dark:hidden`} />
      <img src="/images/logo-gold.png" alt={brand.name} className={`${className} hidden dark:block`} />
    </span>
  )
}

import { brand } from '../data/content'

// Nút liên hệ nổi (gọi điện / Zalo) ở góc màn hình
export default function FloatingContact() {
  const tel = brand.phoneSales.replace(/\./g, '')
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a
        href={`https://zalo.me/${brand.zalo}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat Zalo"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 font-bold text-white shadow-lg transition hover:scale-110"
      >
        Zalo
      </a>
      <a
        href={`tel:${tel}`}
        aria-label="Gọi điện"
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gold text-black shadow-lg transition hover:scale-110"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-gold/60" />
        <svg className="relative h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </div>
  )
}

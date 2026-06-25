import { brand as staticBrand } from '../data/content'
import { logInteraction } from '../lib/supabaseClient'

// Nút liên hệ nổi (gọi điện / Zalo / Chatbot) ở góc màn hình
export default function FloatingContact({ brand: propBrand, chatbotOpen, setChatbotOpen }) {
  const brand = propBrand || staticBrand
  const tel = brand.phoneSales.replace(/\./g, '')
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3.5">
      {/* Zalo */}
      <a
        href={`https://zalo.me/${brand.zalo}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat Zalo"
        onClick={() => logInteraction('Zalo', 'Nút nổi')}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 font-bold text-white shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-blue-500/40 animate-pulse-blue"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-blue-500/30" />
        <span className="relative z-10">Zalo</span>
      </a>

      {/* Chatbot */}
      <button
        onClick={() => setChatbotOpen && setChatbotOpen((prev) => !prev)}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-gold-600 to-amber-400 text-black shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-gold/40 animate-pulse-gold"
        aria-label="Trợ lý ảo Vikings"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-gold/30" />
        <span className="relative z-10">
          {chatbotOpen ? (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </span>
      </button>

      {/* Gọi điện */}
      <a
        href={`tel:${tel}`}
        aria-label="Gọi điện"
        onClick={() => logInteraction('Hotline', 'Nút nổi')}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gold text-black shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-gold/40 animate-pulse-gold"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-gold/50" />
        <svg className="relative z-10 h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { brand as staticBrand, navLinks } from '../data/content'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'

export default function Header({ brand: propBrand, theme, toggle }) {
  const brand = propBrand || staticBrand
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Main nav */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? 'bg-bg/95 shadow-lg shadow-black/10 backdrop-blur' : 'bg-bg/80 backdrop-blur-sm'
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-20">
          <a href="#home" className="flex items-center gap-3">
            <Logo className="h-20 w-auto md:h-28" />
          </a>

          <nav className="hidden items-center gap-6 xl:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted transition hover:text-accent-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} toggle={toggle} />
            <a
              href={`tel:${brand.phoneSales.replace(/\./g, '')}`}
              className="btn-gold hidden py-2 text-sm sm:inline-flex"
            >
              <PhoneIcon /> {brand.phoneSales}
            </a>
            <button onClick={() => setOpen((v) => !v)} className="text-accent-ink xl:hidden" aria-label="Menu">
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-bg xl:hidden">
          <nav className="container-x flex flex-col py-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 text-content transition hover:text-accent-ink"
              >
                {l.label}
              </a>
            ))}
            <a href={`tel:${brand.phoneSales.replace(/\./g, '')}`} className="btn-gold mt-4">
              <PhoneIcon /> Gọi {brand.phoneSales}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

function DotIcon() {
  return (
    <svg className="h-3.5 w-3.5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
function MenuIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

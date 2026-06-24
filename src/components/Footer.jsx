import { brand, navLinks } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-900">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src="/images/logo.jpg" alt={brand.name} className="h-12 w-auto rounded" />
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-400">
            {brand.name} — {brand.slogan}. {brand.tagline}. Cam kết chất lượng, giá tận gốc,
            bảo hành dài hạn trên toàn quốc.
          </p>
          <div className="mt-5 flex gap-3">
            <SocialLink href={brand.facebook} label="Facebook">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </SocialLink>
            <SocialLink href={`https://zalo.me/${brand.zalo}`} label="Zalo">
              <text x="5" y="16" fontSize="9" fontWeight="bold" fill="currentColor" stroke="none">Zalo</text>
            </SocialLink>
            <SocialLink href={`tel:${brand.phoneSales.replace(/\./g, '')}`} label="Gọi">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </SocialLink>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold uppercase text-white">Liên kết</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-gray-400 transition hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold uppercase text-white">Liên hệ</h4>
          <ul className="mt-4 space-y-2 text-sm text-gray-400">
            <li>📍 {brand.address}</li>
            <li>
              ☎️ <a href={`tel:${brand.phoneSales.replace(/\./g, '')}`} className="hover:text-gold">{brand.phoneSales}</a>
            </li>
            <li>
              🔧 <a href={`tel:${brand.phoneTech.replace(/\./g, '')}`} className="hover:text-gold">{brand.phoneTech}</a>
            </li>
            <li>
              ✉️ <a href={`mailto:${brand.email}`} className="hover:text-gold">{brand.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="container-x text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gray-300 transition hover:border-gold hover:bg-gold hover:text-black"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </a>
  )
}

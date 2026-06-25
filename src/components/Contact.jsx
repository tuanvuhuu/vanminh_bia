import { useState } from 'react'
import { brand as staticBrand } from '../data/content'
import { supabase, logInteraction } from '../lib/supabaseClient'
import DBSectionTitle from './DBSectionTitle'

export default function Contact({ brand: propBrand }) {
  const brand = propBrand || staticBrand
  const [sent, setSent] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = data.get('name')
    const phone = data.get('phone')
    const address = data.get('address')
    const message = data.get('message')

    try {
      await supabase.from('consultations').insert([
        { name, phone, address, message }
      ])
    } catch (err) {
      console.error('Lỗi khi lưu thông tin tư vấn:', err)
    }

    const text = `Xin chào Vikings Billiards! Tôi là ${name} (${phone}). Khu vực: ${address || '—'}. Nội dung: ${message || '—'}`
    window.location.href = `https://zalo.me/${brand.zalo}?text=${encodeURIComponent(text)}`
    setSent(true)
  }

  const info = [
    {
      label: 'Hotline kinh doanh',
      value: brand.phoneSales,
      href: `tel:${brand.phoneSales.replace(/\./g, '')}`,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      )
    },
    {
      label: 'Kỹ thuật & bảo hành',
      value: brand.phoneTech,
      href: `tel:${brand.phoneTech.replace(/\./g, '')}`,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    },
    {
      label: 'Email',
      value: brand.email,
      href: `mailto:${brand.email}`,
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      )
    },
    {
      label: 'Địa chỉ showroom',
      value: brand.address,
      href: brand.mapEmbed ? brand.mapEmbed.replace('&output=embed', '') : '#',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    }
  ]

  return (
    <section id="contact" className="section bg-bg relative overflow-hidden">
      {/* Hiệu ứng nền mờ sang trọng */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[120px]" />

      <div className="container-x relative z-10">
        <DBSectionTitle
          sectionKey="contact"
          eyebrow="Liên hệ"
          title="Nhận báo giá & tư vấn setup CLB"
          desc="Để lại thông tin, đội ngũ Vikings Billiards sẽ liên hệ tư vấn trong thời gian sớm nhất."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Thông tin + map */}
          <div className="space-y-4">
            {info.map((i) => (
              <a
                key={i.label}
                href={i.href}
                onClick={() => logInteraction(i.label, 'Trang liên hệ')}
                className="flex items-start gap-4 rounded-xl border border-line bg-surface/50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gold/40 hover:bg-surface-2/40"
              >
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gold/10 text-accent-ink dark:text-gold shadow-sm">
                  {i.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">{i.label}</p>
                  <p className="font-semibold text-content mt-0.5">{i.value}</p>
                </div>
              </a>
            ))}

            <div className="overflow-hidden rounded-2xl border border-line shadow-md bg-surface">
              <iframe
                title="Bản đồ Vikings Billiards"
                src={brand.mapEmbed}
                className="h-56 w-full filter dark:invert dark:grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-surface/60 backdrop-blur-sm p-6 sm:p-8 shadow-md">
            <div className="mb-6">
              <h3 className="text-xl font-bold font-display uppercase tracking-wide text-content">Gửi yêu cầu liên hệ</h3>
              <p className="text-xs text-muted mt-1">Thông tin được bảo mật, liên hệ lại sau ít phút.</p>
            </div>
            <div className="grid gap-5">
              <Field name="name" label="Họ và tên" placeholder="Nguyễn Văn A" required />
              <Field name="phone" label="Số điện thoại" placeholder="09xx xxx xxx" type="tel" required />
              <Field name="address" label="Khu vực" placeholder="Tỉnh / Thành phố" />
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Nội dung</label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Tôi cần tư vấn setup CLB / báo giá bàn..."
                  className="w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm text-content placeholder-muted/60 outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/15 focus:bg-bg"
                />
              </div>
              <button type="submit" className="btn-gold w-full py-3.5 shadow-lg shadow-gold/15 hover:shadow-gold/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200">
                {sent ? 'Đã gửi thành công — Xin cảm ơn!' : 'Gửi yêu cầu tư vấn'}
              </button>
              <p className="text-center text-xs text-muted">
                Hoặc gọi ngay{' '}
                <a href={`tel:${brand.phoneSales.replace(/\./g, '')}`} className="font-semibold text-accent-ink dark:text-gold hover:underline">
                  {brand.phoneSales}
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({ name, label, type = 'text', placeholder, required }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm text-content placeholder-muted/60 outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/15 focus:bg-bg"
      />
    </div>
  )
}

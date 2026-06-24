import { useState } from 'react'
import { brand } from '../data/content'
import SectionTitle from './SectionTitle'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const text = `Xin chào Dương Minh Billiards! Tôi là ${data.get('name')} (${data.get(
      'phone',
    )}). Nội dung: ${data.get('message')}`
    window.location.href = `https://zalo.me/${brand.zalo}?text=${encodeURIComponent(text)}`
    setSent(true)
  }

  const info = [
    { label: 'Hotline kinh doanh', value: brand.phoneSales, href: `tel:${brand.phoneSales.replace(/\./g, '')}` },
    { label: 'Kỹ thuật & bảo hành', value: brand.phoneTech, href: `tel:${brand.phoneTech.replace(/\./g, '')}` },
    { label: 'Email', value: brand.email, href: `mailto:${brand.email}` },
    { label: 'Địa chỉ', value: brand.address, href: brand.mapEmbed.replace('&output=embed', '') },
  ]

  return (
    <section id="contact" className="section bg-bg">
      <div className="container-x">
        <SectionTitle
          eyebrow="Liên hệ"
          title="Nhận báo giá & tư vấn setup CLB"
          desc="Để lại thông tin, đội ngũ Dương Minh Billiards sẽ liên hệ tư vấn trong thời gian sớm nhất."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Thông tin + map */}
          <div className="space-y-4">
            {info.map((i) => (
              <a key={i.label} href={i.href} className="flex items-start gap-4 card p-5 hover:border-gold/50">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gold/15 text-accent-ink">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-muted">{i.label}</p>
                  <p className="font-semibold text-content">{i.value}</p>
                </div>
              </a>
            ))}

            <div className="overflow-hidden rounded-xl border border-line">
              <iframe
                title="Bản đồ Dương Minh Billiards"
                src={brand.mapEmbed}
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="card p-6 sm:p-8">
            <div className="grid gap-4">
              <Field name="name" label="Họ và tên" placeholder="Nguyễn Văn A" required />
              <Field name="phone" label="Số điện thoại" placeholder="09xx xxx xxx" type="tel" required />
              <Field name="address" label="Khu vực" placeholder="Tỉnh / Thành phố" />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-content">Nội dung</label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Tôi cần tư vấn setup CLB / báo giá bàn..."
                  className="w-full rounded-lg border border-line bg-bg px-4 py-3 text-content placeholder-muted/60 outline-none transition focus:border-gold"
                />
              </div>
              <button type="submit" className="btn-gold w-full">
                {sent ? 'Đã gửi — Cảm ơn bạn!' : 'Gửi yêu cầu tư vấn'}
              </button>
              <p className="text-center text-xs text-muted">
                Hoặc gọi ngay{' '}
                <a href={`tel:${brand.phoneSales.replace(/\./g, '')}`} className="text-accent-ink">
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
      <label className="mb-1.5 block text-sm font-medium text-content">
        {label} {required && <span className="text-accent-ink">*</span>}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-line bg-bg px-4 py-3 text-content placeholder-muted/60 outline-none transition focus:border-gold"
      />
    </div>
  )
}

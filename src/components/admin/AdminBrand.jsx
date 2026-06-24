import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AdminBrand() {
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    slogan: '',
    tagline: '',
    address: '',
    phone_sales: '',
    phone_tech: '',
    email: '',
    zalo: '',
    facebook: '',
  })

  useEffect(() => {
    fetch()
  }, [])

  const fetch = async () => {
    try {
      const { data, error } = await supabase.from('brand_info').select('*').eq('id', 1).single()
      if (data) {
        setFormData(data)
      }
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = { id: 1, ...formData, updated_at: new Date() }
      const { error } = await supabase.from('brand_info').upsert(payload)
      if (error) throw error
      alert('Cập nhật thành công!')
      fetch()
    } catch (err) {
      alert('Lỗi: ' + err.message)
    }
  }

  if (loading) return <p className="text-muted">Đang tải...</p>

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="heading text-lg font-bold">Thông tin thương hiệu</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {Object.keys(formData).map(
          (key) =>
            key !== 'id' &&
            key !== 'updated_at' && (
              <input
                key={key}
                type="text"
                placeholder={key.replace(/_/g, ' ')}
                value={formData[key] || ''}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                className="rounded border border-line bg-surface px-3 py-2 text-content focus:outline-none focus:border-gold"
              />
            ),
        )}
      </div>
      <button type="submit" className="btn-gold">
        Cập nhật
      </button>
    </form>
  )
}

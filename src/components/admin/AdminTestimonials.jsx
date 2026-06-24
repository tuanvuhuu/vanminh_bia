import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AdminTestimonials() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    rating: '5',
    text: '',
  })

  useEffect(() => {
    fetch()
  }, [])

  const fetch = async () => {
    try {
      const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
      if (error) throw error
      setItems(data || [])
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = { ...formData, rating: parseInt(formData.rating) }
      if (editingId) {
        const { error } = await supabase.from('testimonials').update(payload).eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('testimonials').insert([payload])
        if (error) throw error
      }
      setFormData({ name: '', place: '', rating: '5', text: '' })
      setEditingId(null)
      fetch()
    } catch (err) {
      alert('Lỗi: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Xóa?')) return
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id)
      if (error) throw error
      fetch()
    } catch (err) {
      alert('Lỗi: ' + err.message)
    }
  }

  if (loading) return <p className="text-muted">Đang tải...</p>

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-line bg-bg p-4">
        <h3 className="font-bold">{editingId ? 'Sửa' : 'Thêm'} cảm nhận</h3>
        <input
          type="text"
          placeholder="Tên"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded border border-line bg-surface px-3 py-2 focus:outline-none focus:border-gold"
          required
        />
        <input
          type="text"
          placeholder="Vị trí / Công ty"
          value={formData.place}
          onChange={(e) => setFormData({ ...formData, place: e.target.value })}
          className="w-full rounded border border-line bg-surface px-3 py-2 focus:outline-none focus:border-gold"
        />
        <select
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          className="w-full rounded border border-line bg-surface px-3 py-2 focus:outline-none focus:border-gold"
        >
          <option value="5">⭐⭐⭐⭐⭐ 5 sao</option>
          <option value="4">⭐⭐⭐⭐ 4 sao</option>
          <option value="3">⭐⭐⭐ 3 sao</option>
        </select>
        <textarea
          placeholder="Nội dung"
          value={formData.text}
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          className="w-full rounded border border-line bg-surface px-3 py-2 focus:outline-none focus:border-gold"
          rows="3"
          required
        />
        <div className="flex gap-2">
          <button type="submit" className="btn-gold">
            {editingId ? 'Cập nhật' : 'Thêm'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                setFormData({ name: '', place: '', rating: '5', text: '' })
              }}
              className="btn-ghost"
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded border border-line bg-bg p-3">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-xs text-muted">{item.place} • {'⭐'.repeat(item.rating)}</p>
              <p className="text-sm text-muted mt-1">{item.text}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setFormData({ ...item, rating: String(item.rating) })
                  setEditingId(item.id)
                }}
                className="rounded bg-blue-500/20 px-3 py-1 text-xs text-blue-500"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="rounded bg-red-500/20 px-3 py-1 text-xs text-red-500"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

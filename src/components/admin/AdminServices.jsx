import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    icon: '',
    title: '',
    description: '',
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase.from('services').select('*').order('created_at')
      if (error) throw error
      setServices(data || [])
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        const { error } = await supabase.from('services').update(formData).eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('services').insert([formData])
        if (error) throw error
      }
      setFormData({ icon: '', title: '', desc: '' })
      setEditingId(null)
      fetchServices()
    } catch (err) {
      alert('Lỗi: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Chắc chắn xóa?')) return
    try {
      const { error } = await supabase.from('services').delete().eq('id', id)
      if (error) throw error
      fetchServices()
    } catch (err) {
      alert('Lỗi: ' + err.message)
    }
  }

  if (loading) return <p className="text-muted">Đang tải...</p>

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-line bg-bg p-4">
        <h3 className="font-bold">{editingId ? 'Sửa' : 'Thêm'} dịch vụ</h3>
        <input
          type="text"
          placeholder="Icon (design, cloth, wrench, truck)"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          className="w-full rounded border border-line bg-surface px-3 py-2 focus:outline-none focus:border-gold"
        />
        <input
          type="text"
          placeholder="Tiêu đề"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full rounded border border-line bg-surface px-3 py-2 focus:outline-none focus:border-gold"
          required
        />
        <textarea
          placeholder="Mô tả"
          value={formData.desc}
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          className="w-full rounded border border-line bg-surface px-3 py-2 focus:outline-none focus:border-gold"
          rows="3"
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
                setFormData({ icon: '', title: '', desc: '' })
              }}
              className="btn-ghost"
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      <div className="space-y-2">
        {services.map((s) => (
          <div key={s.id} className="flex items-center justify-between rounded border border-line bg-bg p-3">
            <div className="flex-1">
              <p className="font-semibold">{s.title}</p>
              <p className="text-xs text-muted">{s.desc}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setFormData(s)
                  setEditingId(s.id)
                }}
                className="rounded bg-blue-500/20 px-3 py-1 text-xs text-blue-500"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(s.id)}
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

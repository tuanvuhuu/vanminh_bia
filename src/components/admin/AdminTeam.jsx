import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AdminTeam() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    note: '',
  })

  useEffect(() => {
    fetch()
  }, [])

  const fetch = async () => {
    try {
      const { data, error } = await supabase.from('pro_team').select('*').order('created_at')
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
      if (editingId) {
        const { error } = await supabase.from('pro_team').update(formData).eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('pro_team').insert([formData])
        if (error) throw error
      }
      setFormData({ name: '', role: '', note: '' })
      setEditingId(null)
      fetch()
    } catch (err) {
      alert('Lỗi: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Xóa?')) return
    try {
      const { error } = await supabase.from('pro_team').delete().eq('id', id)
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
        <h3 className="font-bold">{editingId ? 'Sửa' : 'Thêm'} VĐV</h3>
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
          placeholder="Vai trò"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full rounded border border-line bg-surface px-3 py-2 focus:outline-none focus:border-gold"
        />
        <textarea
          placeholder="Ghi chú"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          className="w-full rounded border border-line bg-surface px-3 py-2 focus:outline-none focus:border-gold"
          rows="2"
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
                setFormData({ name: '', role: '', note: '' })
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
              <p className="text-xs text-muted">{item.role}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setFormData(item)
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

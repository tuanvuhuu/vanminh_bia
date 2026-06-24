import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AdminPartners() {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from('partners').select('*').order('created_at', { ascending: false })
      if (error) throw error
      setPartners(data || [])
    } catch (err) {
      console.error('Error fetching partners:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        const { error } = await supabase.from('partners').update({ name }).eq('id', editingId)
        if (error) throw error
        setEditingId(null)
      } else {
        const { error } = await supabase.from('partners').insert([{ name }])
        if (error) throw error
      }
      setName('')
      fetchPartners()
    } catch (err) {
      alert('Lỗi: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Chắc chắn xóa?')) return
    try {
      const { error } = await supabase.from('partners').delete().eq('id', id)
      if (error) throw error
      fetchPartners()
    } catch (err) {
      alert('Lỗi: ' + err.message)
    }
  }

  if (loading) return <p className="text-muted">Đang tải...</p>

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tên đối tác"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-line bg-surface px-3 py-2 text-content focus:outline-none focus:border-gold"
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
                setName('')
              }}
              className="btn-ghost"
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      <div className="space-y-2">
        <h3 className="heading text-lg font-bold">Danh sách ({partners.length})</h3>
        {partners.length === 0 ? (
          <p className="text-muted">Chưa có</p>
        ) : (
          <div className="space-y-2">
            {partners.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded border border-line bg-bg p-3">
                <p className="font-semibold">{p.name}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setName(p.name)
                      setEditingId(p.id)
                    }}
                    className="rounded bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-500"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="rounded bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-500"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

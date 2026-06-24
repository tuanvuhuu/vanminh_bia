import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AdminClubPosts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    date: '',
    cat: '',
    image: '',
    intro: '',
    points: '',
  })

  useEffect(() => {
    fetch()
  }, [])

  const fetch = async () => {
    try {
      const { data, error } = await supabase.from('club_posts').select('*').order('created_at', { ascending: false })
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
      const points = formData.points
        .split('\n---\n')
        .map(p => {
          const [h, d] = p.split('\n')
          return { h: h.trim(), d: d ? d.trim() : '' }
        })
        .filter(p => p.h)

      const payload = { ...formData, points }
      if (editingId) {
        const { error } = await supabase.from('club_posts').update(payload).eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('club_posts').insert([payload])
        if (error) throw error
      }
      setFormData({ slug: '', title: '', date: '', cat: '', image: '', intro: '', points: '' })
      setEditingId(null)
      fetch()
    } catch (err) {
      alert('Lỗi: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Xóa?')) return
    try {
      const { error } = await supabase.from('club_posts').delete().eq('id', id)
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
        <h3 className="font-bold">{editingId ? 'Sửa' : 'Thêm'} bài</h3>
        <input
          type="text"
          placeholder="Slug (chon-vai-ban)"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          className="w-full rounded border border-line bg-surface px-3 py-2 focus:outline-none focus:border-gold"
          required
        />
        <input
          type="text"
          placeholder="Tiêu đề"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full rounded border border-line bg-surface px-3 py-2 focus:outline-none focus:border-gold"
          required
        />
        <input
          type="text"
          placeholder="Ngày (12/06/2026)"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full rounded border border-line bg-surface px-3 py-2 focus:outline-none focus:border-gold"
        />
        <input
          type="text"
          placeholder="Danh mục (Kinh nghiệm, Hướng dẫn, etc)"
          value={formData.cat}
          onChange={(e) => setFormData({ ...formData, cat: e.target.value })}
          className="w-full rounded border border-line bg-surface px-3 py-2 focus:outline-none focus:border-gold"
        />
        <input
          type="text"
          placeholder="URL ảnh"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full rounded border border-line bg-surface px-3 py-2 focus:outline-none focus:border-gold"
        />
        <textarea
          placeholder="Intro / mở đầu"
          value={formData.intro}
          onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
          className="w-full rounded border border-line bg-surface px-3 py-2 focus:outline-none focus:border-gold"
          rows="2"
        />
        <textarea
          placeholder="Points: tiêu đề 1&#10;mô tả 1&#10;---&#10;tiêu đề 2&#10;mô tả 2"
          value={formData.points}
          onChange={(e) => setFormData({ ...formData, points: e.target.value })}
          className="w-full rounded border border-line bg-surface px-3 py-2 focus:outline-none focus:border-gold font-mono text-xs"
          rows="6"
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
                setFormData({ slug: '', title: '', date: '', cat: '', image: '', intro: '', points: '' })
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
              <p className="font-semibold">{item.title}</p>
              <p className="text-xs text-muted">{item.date} • {item.cat}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const pointsStr = (item.points || [])
                    .map(p => `${p.h}\n${p.d}`)
                    .join('\n---\n')
                  setFormData({ ...item, points: pointsStr })
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

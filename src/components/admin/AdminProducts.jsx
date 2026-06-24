import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    badge: '',
    price: '',
    old_price: '',
    frame: '',
    specs: '',
    size: '',
    image: '',
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
      if (error) throw error
      setProducts(data || [])
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        specs: formData.specs.split('\n').filter(s => s.trim()),
      }

      if (editingId) {
        const { error } = await supabase.from('products').update(payload).eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('products').insert([payload])
        if (error) throw error
      }

      setFormData({
        name: '',
        code: '',
        badge: '',
        price: '',
        old_price: '',
        frame: '',
        specs: '',
        size: '',
        image: '',
      })
      setEditingId(null)
      fetchProducts()
    } catch (err) {
      console.error('Error saving product:', err)
      alert('Lỗi: ' + err.message)
    }
  }

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      code: product.code,
      badge: product.badge,
      price: product.price,
      old_price: product.old_price,
      frame: product.frame,
      specs: (product.specs || []).join('\n'),
      size: product.size,
      image: product.image,
    })
    setEditingId(product.id)
  }

  const handleDelete = async (id) => {
    if (!confirm('Chắc chắn xóa?')) return
    try {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) throw error
      fetchProducts()
    } catch (err) {
      alert('Lỗi: ' + err.message)
    }
  }

  if (loading) return <p className="text-muted">Đang tải...</p>

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-line bg-bg p-6">
        <h3 className="heading text-lg font-bold">{editingId ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="rounded border border-line bg-surface px-3 py-2 text-content focus:outline-none focus:border-gold"
            required
          />
          <input
            type="text"
            placeholder="Code (VK-25)"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            className="rounded border border-line bg-surface px-3 py-2 text-content focus:outline-none focus:border-gold"
            required
          />
          <input
            type="text"
            placeholder="Badge (Cao cấp nhất)"
            value={formData.badge}
            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            className="rounded border border-line bg-surface px-3 py-2 text-content focus:outline-none focus:border-gold"
          />
          <input
            type="text"
            placeholder="Giá"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="rounded border border-line bg-surface px-3 py-2 text-content focus:outline-none focus:border-gold"
          />
          <input
            type="text"
            placeholder="Giá cũ"
            value={formData.old_price}
            onChange={(e) => setFormData({ ...formData, old_price: e.target.value })}
            className="rounded border border-line bg-surface px-3 py-2 text-content focus:outline-none focus:border-gold"
          />
          <input
            type="text"
            placeholder="Khung"
            value={formData.frame}
            onChange={(e) => setFormData({ ...formData, frame: e.target.value })}
            className="rounded border border-line bg-surface px-3 py-2 text-content focus:outline-none focus:border-gold"
          />
          <input
            type="text"
            placeholder="URL ảnh"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="rounded border border-line bg-surface px-3 py-2 text-content focus:outline-none focus:border-gold sm:col-span-2"
          />
          <textarea
            placeholder="Thông số (mỗi dòng 1 thông số)"
            value={formData.specs}
            onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
            className="rounded border border-line bg-surface px-3 py-2 text-content focus:outline-none focus:border-gold sm:col-span-2"
            rows="3"
          />
          <textarea
            placeholder="Kích thước"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            className="rounded border border-line bg-surface px-3 py-2 text-content focus:outline-none focus:border-gold sm:col-span-2"
            rows="2"
          />
        </div>

        <div className="flex gap-2">
          <button type="submit" className="btn-gold">
            {editingId ? 'Cập nhật' : 'Thêm mới'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                setFormData({
                  name: '',
                  code: '',
                  badge: '',
                  price: '',
                  old_price: '',
                  frame: '',
                  specs: '',
                  size: '',
                  image: '',
                })
              }}
              className="btn-ghost"
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      <div className="space-y-2">
        <h3 className="heading text-lg font-bold">Danh sách sản phẩm ({products.length})</h3>
        {products.length === 0 ? (
          <p className="text-muted">Chưa có sản phẩm</p>
        ) : (
          <div className="space-y-2">
            {products.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded border border-line bg-bg p-3">
                <div className="flex-1">
                  <p className="font-semibold text-content">{p.name}</p>
                  <p className="text-xs text-muted">{p.code} • {p.price}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="rounded bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-500 hover:bg-blue-500/30"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="rounded bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-500 hover:bg-red-500/30"
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

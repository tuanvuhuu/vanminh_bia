import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import ImageUpload from './ImageUpload'

export default function AdminGallery() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const fetchRows = () => {
    setLoading(true)
    supabase
      .from('galleries')
      .select('*')
      .order('display_order', { ascending: true })
      .then(({ data, error: err }) => {
        if (err) setError(err.message)
        setRows(data || [])
        setLoading(false)
      })
  }

  useEffect(fetchRows, [])

  const urls = rows.map((r) => r.image_url)

  // ImageUpload gọi onChange với danh sách URL mới -> tính diff để insert/delete
  const handleChange = async (newUrls) => {
    setBusy(true)
    setError('')
    const added = newUrls.filter((u) => !urls.includes(u))
    const removed = urls.filter((u) => !newUrls.includes(u))
    try {
      if (added.length) {
        const maxOrder = rows.reduce((m, r) => Math.max(m, r.display_order || 0), 0)
        const payload = added.map((u, i) => ({ image_url: u, display_order: maxOrder + i + 1 }))
        const { error: err } = await supabase.from('galleries').insert(payload)
        if (err) throw err
      }
      if (removed.length) {
        const { error: err } = await supabase.from('galleries').delete().in('image_url', removed)
        if (err) throw err
      }
      fetchRows()
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Thư viện ảnh</h2>
        <p className="mt-1 text-sm text-gray-500">
          {rows.length} ảnh{busy && ' · đang đồng bộ...'} — kéo-thả hoặc chọn nhiều ảnh để thêm, bấm
          × để xóa.
        </p>
      </div>

      {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-gray-500">Đang tải...</p>
        ) : (
          <ImageUpload value={urls} onChange={handleChange} multiple />
        )}
      </div>
    </div>
  )
}

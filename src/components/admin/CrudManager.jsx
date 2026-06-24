import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { ui } from './ui'
import ImageUpload from './ImageUpload'

// form value -> db value
function serialize(field, value) {
  if (field.type === 'images') return Array.isArray(value) ? value : []
  if (field.type === 'image') return value || null
  if (value === '' || value == null) {
    if (field.type === 'array' || field.type === 'points') return []
    if (field.type === 'number') return null
    return null
  }
  switch (field.type) {
    case 'number':
      return parseInt(value, 10)
    case 'array':
      return String(value)
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
    case 'points':
      return String(value)
        .split('\n---\n')
        .map((block) => {
          const [h, ...rest] = block.split('\n')
          return { h: (h || '').trim(), d: rest.join(' ').trim() }
        })
        .filter((p) => p.h)
    default:
      return value
  }
}

// db value -> form value
function deserialize(field, value) {
  switch (field.type) {
    case 'images':
      return Array.isArray(value) ? value : []
    case 'image':
      return value ?? ''
    case 'array':
      return Array.isArray(value) ? value.join('\n') : ''
    case 'points':
      return Array.isArray(value) ? value.map((p) => `${p.h}\n${p.d}`).join('\n---\n') : ''
    case 'number':
      return value == null ? '' : String(value)
    default:
      return value ?? ''
  }
}

function emptyForm(fields) {
  return Object.fromEntries(fields.map((f) => [f.key, f.type === 'images' ? [] : '']))
}

function FieldInput({ field, value, onChange }) {
  if (field.type === 'image' || field.type === 'images') {
    return <ImageUpload value={value} onChange={onChange} multiple={field.type === 'images'} />
  }
  const common = { value, onChange: (e) => onChange(e.target.value), className: ui.input }
  if (field.type === 'textarea' || field.type === 'array' || field.type === 'points') {
    return <textarea {...common} rows={field.rows || 3} placeholder={field.placeholder} />
  }
  if (field.type === 'select') {
    return (
      <select {...common}>
        <option value="">— Chọn —</option>
        {field.options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    )
  }
  return (
    <input
      {...common}
      type={field.type === 'number' ? 'number' : 'text'}
      placeholder={field.placeholder}
    />
  )
}

export default function CrudManager({ config }) {
  const { table, title, fields, columns, orderBy = 'created_at', ascending = false, singleton } = config

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm(fields))
  const [saving, setSaving] = useState(false)
  const [savedFlash, setSavedFlash] = useState(false)

  const fetchRows = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      if (singleton) {
        const { data, error: err } = await supabase.from(table).select('*').eq('id', 1).maybeSingle()
        if (err) throw err
        const f = emptyForm(fields)
        if (data) fields.forEach((fl) => (f[fl.key] = deserialize(fl, data[fl.key])))
        setForm(f)
      } else {
        const { data, error: err } = await supabase
          .from(table)
          .select('*')
          .order(orderBy, { ascending })
        if (err) throw err
        setRows(data || [])
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [table, orderBy, ascending, singleton, fields])

  useEffect(() => {
    fetchRows()
  }, [fetchRows])

  const openCreate = () => {
    setEditingId(null)
    setForm(emptyForm(fields))
    setModalOpen(true)
  }

  const openEdit = (row) => {
    const f = emptyForm(fields)
    fields.forEach((fl) => (f[fl.key] = deserialize(fl, row[fl.key])))
    setForm(f)
    setEditingId(row.id)
    setModalOpen(true)
  }

  const buildPayload = () => {
    const payload = {}
    fields.forEach((f) => (payload[f.key] = serialize(f, form[f.key])))
    return payload
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = buildPayload()
      if (singleton) {
        const { error: err } = await supabase.from(table).upsert({ id: 1, ...payload })
        if (err) throw err
        setSavedFlash(true)
        setTimeout(() => setSavedFlash(false), 2000)
      } else if (editingId) {
        const { error: err } = await supabase.from(table).update(payload).eq('id', editingId)
        if (err) throw err
        setModalOpen(false)
        fetchRows()
      } else {
        const { error: err } = await supabase.from(table).insert([payload])
        if (err) throw err
        setModalOpen(false)
        fetchRows()
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Bạn chắc chắn muốn xóa mục này?')) return
    try {
      const { error: err } = await supabase.from(table).delete().eq('id', id)
      if (err) throw err
      fetchRows()
    } catch (err) {
      setError(err.message)
    }
  }

  const setField = (key, val) => setForm((prev) => ({ ...prev, [key]: val }))

  // ---- Singleton (brand info): chỉ hiển thị form ----
  if (singleton) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">Cập nhật thông tin chung của thương hiệu.</p>
        </div>
        {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        {loading ? (
          <p className="text-gray-500">Đang tải...</p>
        ) : (
          <form onSubmit={handleSave} className={`${ui.card} max-w-3xl p-6`}>
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.key} className={f.full ? 'sm:col-span-2' : ''}>
                  <label className={ui.label}>{f.label}</label>
                  <FieldInput field={f} value={form[f.key]} onChange={(v) => setField(f.key, v)} />
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button type="submit" disabled={saving} className={ui.btnPrimary}>
                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
              {savedFlash && (
                <span className="text-sm font-medium text-green-600">✓ Đã lưu thành công</span>
              )}
            </div>
          </form>
        )}
      </div>
    )
  }

  // ---- Danh sách (table) + modal ----
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">{rows.length} mục</p>
        </div>
        <button onClick={openCreate} className={ui.btnPrimary}>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Thêm mới
        </button>
      </div>

      {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <div className={`${ui.card} overflow-hidden`}>
        {loading ? (
          <p className="p-6 text-gray-500">Đang tải...</p>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-500">Chưa có dữ liệu.</p>
            <button onClick={openCreate} className={`${ui.btnSecondary} mt-4`}>
              Thêm mục đầu tiên
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  {columns.map((c) => (
                    <th key={c.key} className="px-5 py-3 font-semibold">
                      {c.label}
                    </th>
                  ))}
                  <th className="px-5 py-3 text-right font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((row) => (
                  <tr key={row.id} className="transition hover:bg-gray-50/70">
                    {columns.map((c) => (
                      <td key={c.key} className="px-5 py-3 text-gray-700">
                        {c.render ? c.render(row) : row[c.key]}
                      </td>
                    ))}
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(row)} className={ui.btnEditSoft}>
                          Sửa
                        </button>
                        <button onClick={() => handleDelete(row.id)} className={ui.btnDangerSoft}>
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-gray-900/40 p-4 sm:p-8">
          <div className={`${ui.card} w-full max-w-4xl`}>
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">
                {editingId ? 'Chỉnh sửa' : 'Thêm mới'} — {title}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="max-h-[60vh] space-y-4 overflow-y-auto px-6 py-5">
                {error && (
                  <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  {fields.map((f) => (
                    <div key={f.key} className={f.full ? 'sm:col-span-2' : ''}>
                      <label className={ui.label}>
                        {f.label}
                        {f.required && <span className="text-red-500"> *</span>}
                      </label>
                      <FieldInput field={f} value={form[f.key]} onChange={(v) => setField(f.key, v)} />
                      {f.hint && <p className="mt-1 text-xs text-gray-400">{f.hint}</p>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
                <button type="button" onClick={() => setModalOpen(false)} className={ui.btnSecondary}>
                  Hủy
                </button>
                <button type="submit" disabled={saving} className={ui.btnPrimary}>
                  {saving ? 'Đang lưu...' : editingId ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

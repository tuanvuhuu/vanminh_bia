import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { ui } from './ui'
import ImageUpload from './ImageUpload'
import Lightbox from '../Lightbox'

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const icons = {
    success: (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-500">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </span>
    ),
    error: (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    ),
  }

  return (
    <div
      className="fixed bottom-5 right-5 z-[100] flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-xl animate-toast-in min-w-[280px] max-w-sm"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes toast-in {
          from { transform: translateY(20px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-toast-in {
          animation: toast-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
      {icons[type] || icons.success}
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900">
          {type === 'success' ? 'Thành công' : 'Lỗi hệ thống'}
        </p>
        <p className="mt-0.5 text-xs text-gray-500">{message}</p>
      </div>
      <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition focus:outline-none">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

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

// Lưới 12 cột — span cho mỗi field (literal để Tailwind JIT nhận diện)
const SPAN = {
  3: 'sm:col-span-3',
  4: 'sm:col-span-4',
  5: 'sm:col-span-5',
  6: 'sm:col-span-6',
  7: 'sm:col-span-7',
  8: 'sm:col-span-8',
  9: 'sm:col-span-9',
  12: 'sm:col-span-12',
}
const spanClass = (field) => SPAN[field.full ? 12 : field.span || 6]

function FieldInput({ field, value, onChange }) {
  if (field.type === 'image' || field.type === 'images') {
    return <ImageUpload value={value} onChange={onChange} multiple={field.type === 'images'} />
  }
  const common = { value, onChange: (e) => onChange(e.target.value), className: ui.input }
  if (field.type === 'textarea' || field.type === 'array' || field.type === 'points') {
    return <textarea {...common} rows={field.rows || 3} placeholder={field.placeholder} />
  }
  if (field.type === 'combo') {
    const listId = `dl-${field.key}`
    return (
      <>
        <input {...common} list={listId} placeholder={field.placeholder || 'Chọn hoặc nhập...'} />
        <datalist id={listId}>
          {field.options.map((o) => (
            <option key={o} value={o} />
          ))}
        </datalist>
      </>
    )
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

// Dãy số trang gọn (1 … 4 5 [6] 7 8 … 20)
function pageList(page, totalPages) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
  const out = [1]
  const lo = Math.max(2, page - 1)
  const hi = Math.min(totalPages - 1, page + 1)
  if (lo > 2) out.push('…')
  for (let i = lo; i <= hi; i++) out.push(i)
  if (hi < totalPages - 1) out.push('…')
  out.push(totalPages)
  return out
}

function Pager({ page, totalPages, onGo }) {
  const btn =
    'inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-sm font-medium transition'
  return (
    <>
      <button
        onClick={() => onGo(page - 1)}
        disabled={page <= 1}
        className={`${btn} border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        ‹
      </button>
      {pageList(page, totalPages).map((p, i) =>
        p === '…' ? (
          <span key={`e${i}`} className="px-1 text-gray-400">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onGo(p)}
            className={`${btn} ${
              p === page
                ? 'border-amber-500 bg-amber-500 text-white'
                : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onGo(page + 1)}
        disabled={page >= totalPages}
        className={`${btn} border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        ›
      </button>
    </>
  )
}

export default function CrudManager({ config }) {
  const {
    table,
    title,
    fields,
    columns,
    orderBy = 'created_at',
    ascending = false,
    singleton,
    pk = 'id',
  } = config

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm(fields))
  const [saving, setSaving] = useState(false)
  const [savedFlash, setSavedFlash] = useState(false)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState({ key: null, dir: 'asc' })
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [toast, setToast] = useState(null)
  const [lightboxData, setLightboxData] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

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
    setEditingId(row[pk])
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
        showToast('Lưu thay đổi thành công!', 'success')
      } else if (editingId != null) {
        const { error: err } = await supabase.from(table).update(payload).eq(pk, editingId)
        if (err) throw err
        setModalOpen(false)
        fetchRows()
        showToast('Cập nhật dữ liệu thành công!', 'success')
      } else {
        const { error: err } = await supabase.from(table).insert([payload])
        if (err) throw err
        setModalOpen(false)
        fetchRows()
        showToast('Thêm mục mới thành công!', 'success')
      }
    } catch (err) {
      setError(err.message)
      showToast(err.message || 'Lỗi khi lưu dữ liệu!', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Bạn chắc chắn muốn xóa mục này?')) return
    try {
      const { error: err } = await supabase.from(table).delete().eq(pk, id)
      if (err) throw err
      fetchRows()
      showToast('Xóa mục thành công!', 'success')
    } catch (err) {
      setError(err.message)
      showToast(err.message || 'Lỗi khi xóa dữ liệu!', 'error')
    }
  }

  const setField = (key, val) => setForm((prev) => ({ ...prev, [key]: val }))

  // Lọc theo ô tìm kiếm (so khớp trên các cột hiển thị)
  const q = query.trim().toLowerCase()
  const filteredRows = q
    ? rows.filter((row) =>
        columns.some((c) => {
          const raw = c.search ? c.search(row) : row[c.key]
          return String(raw ?? '').toLowerCase().includes(q)
        })
      )
    : rows

  // Sắp xếp theo cột (click header)
  const sortedRows = sort.key
    ? [...filteredRows].sort((a, b) => {
        const av = a[sort.key]
        const bv = b[sort.key]
        if (av == null) return 1
        if (bv == null) return -1
        let cmp
        if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv
        else cmp = String(av).localeCompare(String(bv), 'vi', { numeric: true })
        return sort.dir === 'asc' ? cmp : -cmp
      })
    : filteredRows

  // Phân trang
  const total = sortedRows.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * perPage
  const pagedRows = sortedRows.slice(start, start + perPage)

  const toggleSort = (key) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }))

  // Reset về trang 1 khi tìm kiếm / đổi số dòng / sắp xếp
  useEffect(() => {
    setPage(1)
  }, [query, perPage, sort.key, sort.dir])

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
          <form onSubmit={handleSave} className={`${ui.card} p-6 lg:p-8`}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-12 items-start">
              {fields.map((f) => (
                <div key={f.key} className={spanClass(f)}>
                  <label className={ui.label}>{f.label}</label>
                  <FieldInput field={f} value={form[f.key]} onChange={(v) => setField(f.key, v)} />
                  {f.hint && <p className="mt-1.5 text-xs text-gray-400">{f.hint}</p>}
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
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">
            {q ? `${filteredRows.length} / ${rows.length}` : rows.length} mục
          </p>
        </div>
      </div>

      {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <div className={`${ui.card} overflow-hidden`}>
        {/* Toolbar */}
        <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
          <div className="relative w-full max-w-xs">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm..."
              className={`${ui.input} pl-9`}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={fetchRows}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
              title="Tải lại"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
              </svg>
              Tải lại
            </button>
            <button onClick={openCreate} className={ui.btnPrimary}>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Thêm mới
            </button>
          </div>
        </div>

        <div className="min-h-[420px]">
          {loading ? (
            <p className="p-6 text-gray-500">Đang tải...</p>
          ) : rows.length === 0 ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center p-10 text-center">
              <p className="text-gray-500">Chưa có dữ liệu.</p>
              <button onClick={openCreate} className={`${ui.btnSecondary} mt-4`}>
                Thêm mục đầu tiên
              </button>
            </div>
          ) : filteredRows.length === 0 ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center p-10 text-center">
              <p className="text-gray-500">Không tìm thấy mục nào khớp “{query}”.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table
                className="w-full table-fixed text-left text-sm"
                onClick={(e) => {
                  if (e.target.tagName === 'IMG') {
                    const src = e.target.getAttribute('src')
                    if (src) setLightboxData({ images: [src], startIndex: 0 })
                  }
                }}
              >
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-700">
                    <th className="w-12 px-5 py-3">#</th>
                    {columns.map((c) => {
                      const sortable = c.sortable !== false
                      const isSorted = sort.key === c.key
                      return (
                        <th
                          key={c.key}
                          onClick={sortable ? () => toggleSort(c.key) : undefined}
                          className={`px-5 py-3 ${
                            sortable ? 'cursor-pointer select-none hover:bg-gray-200 transition' : ''
                          }`}
                        >
                          <div className="inline-flex items-center gap-2">
                            <span>{c.label}</span>
                            {sortable && (
                              <span
                                className={`inline-flex h-4 w-4 items-center justify-center ${
                                  isSorted ? 'text-amber-500' : 'text-gray-400'
                                }`}
                              >
                                {isSorted && sort.dir === 'asc' ? (
                                  <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 14l5-5 5 5z" />
                                  </svg>
                                ) : isSorted ? (
                                  <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 10l5 5 5-5z" />
                                  </svg>
                                ) : (
                                  <svg viewBox="0 0 24 24" fill="currentColor" opacity="0.4">
                                    <path d="M7 14l5-5 5 5z" />
                                  </svg>
                                )}
                              </span>
                            )}
                          </div>
                        </th>
                      )
                    })}
                    <th className="whitespace-nowrap px-5 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedRows.map((row, i) => (
                    <tr
                      key={row[pk]}
                      className={`border-b border-gray-100 transition hover:bg-amber-50/50 ${
                        i % 2 === 1 ? 'bg-gray-50/60' : ''
                      }`}
                    >
                      <td className="px-5 py-3 text-gray-400">{start + i + 1}</td>
                      {columns.map((c) => (
                        <td key={c.key} className="px-5 py-3 text-gray-700">
                          <div className="truncate">
                            {c.render ? c.render(row) : row[c.key]}
                          </div>
                        </td>
                      ))}
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEdit(row)}
                            className="rounded-lg p-1.5 text-amber-600 transition hover:bg-amber-50 hover:text-amber-700 focus:outline-none"
                            title="Sửa"
                          >
                            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(row[pk])}
                            className="rounded-lg p-1.5 text-red-500 transition hover:bg-red-50 hover:text-red-600 focus:outline-none"
                            title="Xóa"
                          >
                            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
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

        {/* Footer phân trang kiểu CoreUI */}
        {!loading && filteredRows.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-4 py-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>Hiển thị</span>
              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:border-amber-500 focus:outline-none"
              >
                {[10, 25, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <span>
                / {total} — {start + 1}-{Math.min(start + perPage, total)}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Pager page={safePage} totalPages={totalPages} onGo={setPage} />
            </div>
          </div>
        )}
      </div>

      {/* Modal form */}
      {modalOpen && (() => {
        const modalMaxWidth = config.modalSize || (
          fields.length <= 2 ? 'max-w-md' :
          fields.length <= 4 ? 'max-w-2xl' :
          fields.length <= 8 ? 'max-w-4xl' : 'max-w-5xl'
        )

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 sm:p-6">
            <div className={`${ui.card} w-full ${modalMaxWidth} overflow-hidden shadow-xl transition-all duration-300 transform scale-100 max-h-[90vh] flex flex-col`}>
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50/50">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingId ? 'Chỉnh sửa' : 'Thêm mới'} — {title}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSave} className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin">
                  {error && (
                    <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200">{error}</div>
                  )}
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-12 items-start">
                    {fields.map((f) => (
                      <div key={f.key} className={spanClass(f)}>
                        <label className={ui.label}>
                          {f.label}
                          {f.required && <span className="text-red-500"> *</span>}
                        </label>
                        <FieldInput field={f} value={form[f.key]} onChange={(v) => setField(f.key, v)} />
                        {f.hint && <p className="mt-1.5 text-xs text-gray-400 leading-normal">{f.hint}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50/60 px-6 py-4">
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
        )
      })()}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {lightboxData && (
        <Lightbox
          images={lightboxData.images}
          startIndex={lightboxData.startIndex}
          onClose={() => setLightboxData(null)}
        />
      )}
    </div>
  )
}

import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { ui } from './admin/ui'

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data, error: queryError } = await supabase
        .from('admins')
        .select('email, password_hash')
        .eq('email', email)
        .maybeSingle()

      if (queryError) throw queryError
      if (!data) {
        setError('Email không tồn tại')
      } else if (data.password_hash !== password) {
        setError('Mật khẩu không chính xác')
      } else {
        onLoginSuccess(email)
      }
    } catch (err) {
      setError(err.message || 'Lỗi đăng nhập')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-xl font-bold text-white shadow-sm">
            V
          </span>
          <h1 className="mt-4 text-xl font-bold text-gray-900">Vikings Admin</h1>
          <p className="mt-1 text-sm text-gray-500">Đăng nhập để quản trị nội dung</p>
        </div>

        <form onSubmit={handleLogin} className={`${ui.card} space-y-4 p-6`}>
          <div>
            <label className={ui.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={ui.input}
              placeholder="admin@vikingsbilliards.com"
              required
            />
          </div>
          <div>
            <label className={ui.label}>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={ui.input}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <button type="submit" disabled={loading} className={`${ui.btnPrimary} w-full`}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-400">
          Chỉ quản trị viên mới có quyền truy cập
        </p>
      </div>
    </div>
  )
}

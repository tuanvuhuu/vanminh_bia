import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

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
        .select('id, email, password_hash')
        .eq('email', email)
        .single()

      if (queryError || !data) {
        setError('Email không tồn tại')
        setLoading(false)
        return
      }

      // Simple password check (in production, use bcrypt or better hashing)
      if (data.password_hash === password) {
        onLoginSuccess(email)
      } else {
        setError('Mật khẩu không chính xác')
      }
    } catch (err) {
      setError(err.message || 'Lỗi đăng nhập')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="w-full max-w-md rounded-xl border border-line bg-bg p-8 shadow-lg">
        <h2 className="heading mb-6 text-2xl font-bold">Admin Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-content mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-line bg-surface px-3 py-2 text-content placeholder-muted focus:border-gold focus:outline-none"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-content mb-2">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-line bg-surface px-3 py-2 text-content placeholder-muted focus:border-gold focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="mt-4 text-xs text-muted text-center">
          Chỉ admin mới có quyền truy cập
        </p>
      </div>
    </div>
  )
}

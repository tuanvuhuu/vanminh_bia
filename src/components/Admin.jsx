import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default function Admin() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = sessionStorage.getItem('admin_email')
    if (session) {
      setUser({ email: session })
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('admin_email')
    setUser(null)
  }

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  return (
    <div className="min-h-screen bg-bg text-content">
      {!user ? (
        <AdminLogin onLoginSuccess={(email) => {
          setUser({ email })
          sessionStorage.setItem('admin_email', email)
        }} />
      ) : (
        <>
          <header className="border-b border-line bg-surface p-4">
            <div className="container-x flex items-center justify-between">
              <h1 className="heading text-2xl font-bold">Admin Dashboard</h1>
              <button
                onClick={handleLogout}
                className="btn-ghost text-sm"
              >
                Đăng xuất
              </button>
            </div>
          </header>
          <AdminDashboard userEmail={user.email} />
        </>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default function Admin() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = sessionStorage.getItem('admin_email')
    if (session) setUser({ email: session })
    setLoading(false)
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('admin_email')
    setUser(null)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500">
        Đang tải...
      </div>
    )
  }

  if (!user) {
    return (
      <AdminLogin
        onLoginSuccess={(email) => {
          setUser({ email })
          sessionStorage.setItem('admin_email', email)
        }}
      />
    )
  }

  return <AdminDashboard userEmail={user.email} onLogout={handleLogout} />
}

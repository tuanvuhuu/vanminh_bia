import { useState } from 'react'
import { sections } from './admin/sections'
import CrudManager from './admin/CrudManager'
import { useBrand } from '../hooks/useBrand'

export default function AdminDashboard({ userEmail, onLogout }) {
  const [activeId, setActiveId] = useState(sections[0].id)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { brand } = useBrand()

  const active = sections.find((s) => s.id === activeId)
  const brandName = brand?.name || 'Vikings'
  const brandSub = brand?.slogan || 'Quản trị nội dung'

  const goTo = (id) => {
    setActiveId(id)
    setMobileOpen(false)
  }

  const NavList = () => (
    <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
      {sections.map((s) => {
        const isActive = s.id === activeId
        return (
          <button
            key={s.id}
            onClick={() => goTo(s.id)}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg
              className={`h-5 w-5 flex-none ${isActive ? 'text-amber-400' : 'text-gray-500'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {s.icon}
            </svg>
            {s.label}
          </button>
        )
      })}
    </nav>
  )

  const SidebarInner = () => (
    <>
      <div className="flex items-center gap-2.5 border-b border-white/10 px-6 py-[18px]">
        {brand?.logo_dark ? (
          <img
            src={brand.logo_dark}
            alt={brandName}
            className="h-9 w-9 flex-none rounded-lg bg-white/90 object-contain p-0.5"
          />
        ) : (
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-amber-500 font-bold text-white">
            {brandName[0]?.toUpperCase() || 'V'}
          </span>
        )}
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-bold text-white">{brandName} Admin</p>
          <p className="truncate text-xs text-gray-400">{brandSub}</p>
        </div>
      </div>
      <NavList />
      <div className="border-t border-white/10 p-4">
        <div className="mb-3 flex items-center gap-3 px-1">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/10 text-xs font-bold text-gray-200">
            {(userEmail || 'A')[0].toUpperCase()}
          </span>
          <span className="truncate text-xs text-gray-400">{userEmail}</span>
        </div>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-red-500/20 hover:text-red-300"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Đăng xuất
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-[#ebedef] text-gray-900">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 flex-col bg-[#212631] lg:flex">
        <SidebarInner />
      </aside>

      {/* Drawer mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-gray-900/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-[#212631] shadow-xl">
            <SidebarInner />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>

          {/* Breadcrumb kiểu CoreUI */}
          <nav className="flex items-center gap-2 text-sm">
            <button
              onClick={() => goTo('dashboard')}
              className="text-gray-400 transition hover:text-gray-600"
            >
              Trang chủ
            </button>
            <span className="text-gray-300">/</span>
            <span className="font-semibold text-gray-700">{active.label}</span>
          </nav>

          <a
            href="#/"
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            Xem website
          </a>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <div className="w-full">
            {active.component ? (
              <active.component key={active.id} onNavigate={goTo} />
            ) : (
              <CrudManager key={active.id} config={active} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

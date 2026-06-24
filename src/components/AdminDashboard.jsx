import { useState } from 'react'
import { sections } from './admin/sections'
import CrudManager from './admin/CrudManager'

export default function AdminDashboard({ userEmail, onLogout }) {
  const [activeId, setActiveId] = useState(sections[0].id)
  const [mobileOpen, setMobileOpen] = useState(false)

  const active = sections.find((s) => s.id === activeId)

  const NavList = () => (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      {sections.map((s) => {
        const isActive = s.id === activeId
        return (
          <button
            key={s.id}
            onClick={() => {
              setActiveId(s.id)
              setMobileOpen(false)
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? 'bg-amber-50 text-amber-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <svg
              className={`h-5 w-5 flex-none ${isActive ? 'text-amber-600' : 'text-gray-400'}`}
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
      <div className="flex items-center gap-2.5 border-b border-gray-200 px-6 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 font-bold text-white">
          V
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-gray-900">Vikings Admin</p>
          <p className="text-xs text-gray-400">Quản trị nội dung</p>
        </div>
      </div>
      <NavList />
      <div className="border-t border-gray-200 p-4">
        <div className="mb-3 flex items-center gap-3 px-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
            {(userEmail || 'A')[0].toUpperCase()}
          </span>
          <span className="truncate text-xs text-gray-500">{userEmail}</span>
        </div>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
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
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white lg:flex">
        <SidebarInner />
      </aside>

      {/* Drawer mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-gray-900/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-white shadow-xl">
            <SidebarInner />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <h1 className="text-base font-semibold text-gray-900">{active.title}</h1>
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

        <main className="flex-1 p-4 sm:p-8">
          <div className="mx-auto max-w-6xl">
            <CrudManager key={active.id} config={active} />
          </div>
        </main>
      </div>
    </div>
  )
}

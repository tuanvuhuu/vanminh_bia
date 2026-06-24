// Nút chuyển giao diện Sáng / Tối
export default function ThemeToggle({ theme, toggle, className = '' }) {
  const isDark = theme === 'dark'
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Chuyển giao diện sáng' : 'Chuyển giao diện tối'}
      title={isDark ? 'Giao diện sáng' : 'Giao diện tối'}
      className={`relative flex h-8 w-14 items-center rounded-full border border-line bg-surface-2 px-1 transition ${className}`}
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-gold text-black shadow transition-transform duration-300 ${
          isDark ? 'translate-x-0' : 'translate-x-6'
        }`}
      >
        {isDark ? (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        )}
      </span>
    </button>
  )
}

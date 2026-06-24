/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Hệ màu semantic theo CSS variables -> tự đổi theo theme sáng/tối
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--c-surface2) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        content: 'rgb(var(--c-content) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        'accent-ink': 'rgb(var(--c-accent-ink) / <alpha-value>)',
        // Vàng gold thương hiệu (cố định cả 2 theme)
        gold: {
          DEFAULT: '#FFD60A',
          400: '#FFE34D',
          500: '#FFD60A',
          600: '#E6BE00',
        },
        ink: {
          900: '#0a0a0a',
          800: '#111111',
          700: '#1a1a1a',
          600: '#262626',
        },
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        float: 'float 2.5s ease-in-out infinite',
        marquee: 'marquee 22s linear infinite',
      },
    },
  },
  plugins: [],
}

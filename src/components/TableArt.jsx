// Minh họa bàn bi-a bằng SVG, dùng làm ảnh placeholder cho sản phẩm/dự án
export default function TableArt({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 240"
      className={className}
      role="img"
      aria-label="Bàn bi-a"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="felt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0d5c3a" />
          <stop offset="1" stopColor="#063d26" />
        </linearGradient>
        <linearGradient id="rail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c1208" />
          <stop offset="1" stopColor="#0a0703" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="#0a0a0a" />
      <rect x="40" y="40" width="320" height="160" rx="14" fill="url(#rail)" />
      <rect x="58" y="58" width="284" height="124" rx="6" fill="url(#felt)" />
      {/* lỗ góc */}
      {[
        [60, 60],
        [200, 56],
        [340, 60],
        [60, 180],
        [200, 184],
        [340, 180],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="9" fill="#050505" />
      ))}
      {/* bi */}
      <circle cx="150" cy="120" r="8" fill="#f5f5f5" />
      <circle cx="240" cy="108" r="8" fill="#FFD60A" />
      <circle cx="262" cy="124" r="8" fill="#d62828" />
      <circle cx="248" cy="140" r="8" fill="#1d4ed8" />
      <line x1="150" y1="120" x2="110" y2="132" stroke="#c69a5a" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

import { useState } from 'react'
import DBSectionTitle from './DBSectionTitle'
import OrderModal from './OrderModal'

const CLOTHS = [
  { id: 'blue', label: 'Xanh Royal (CPBA Blue)', hex: '#0f4c81', shadow: '#0b3861', light: '#1b5d9b' },
  { id: 'turquoise', label: 'Xanh ngọc (Tournament)', hex: '#0d9488', shadow: '#0f766e', light: '#14b8a6' },
  { id: 'green', label: 'Xanh lá (Classic Green)', hex: '#15803d', shadow: '#166534', light: '#22c55e' },
  { id: 'burgundy', label: 'Đỏ mận (Burgundy)', hex: '#991b1b', shadow: '#7f1d1d', light: '#ef4444' },
  { id: 'gray', label: 'Xám khói (Slate Gray)', hex: '#4b5563', shadow: '#374151', light: '#6b7280' },
  { id: 'black', label: 'Đen tuyền (Midnight)', hex: '#1f2937', shadow: '#111827', light: '#374151' },
]

const RAILS = [
  { id: 'oak', label: 'Gỗ Sồi tự nhiên (Oak)', hex: '#d97706', under: '#b45309' },
  { id: 'mahogany', label: 'Gỗ Đỏ hoàng gia (Mahogany)', hex: '#7c2d12', under: '#451a03' },
  { id: 'carbon', label: 'Đen mờ phủ Carbon', hex: '#374151', under: '#1f2937' },
  { id: 'gold', label: 'Viền vàng cao cấp (Gold Accent)', hex: '#ca8a04', under: '#854d0e' },
]

export default function InteractiveStudio({ brand }) {
  const [activeTab, setActiveTab] = useState('design') // 'design' | 'calculator'
  
  // Customizer state
  const [selectedCloth, setSelectedCloth] = useState(CLOTHS[0])
  const [selectedRail, setSelectedRail] = useState(RAILS[0])
  const [orderingCustom, setOrderingCustom] = useState(null)

  // Calculator state
  const [area, setArea] = useState(150)
  const [segment, setSegment] = useState('mid') // 'budget' | 'mid' | 'vip'

  // Tính toán dự toán CLB
  const tableAreaRequirement = 28 // 28m2/ban
  const tableCount = Math.max(1, Math.floor(area / tableAreaRequirement))
  
  const segmentMeta = {
    budget: {
      name: 'Phổ thông (Sinh viên & Tập chơi)',
      tableName: 'Vikings Hero / Silver Hero',
      tablePrice: 38000000,
      extraPrice: 15000000, // Đèn led, cơ, bóng, quầy bar chia đầu bàn
      hourlyPrice: 50000,
    },
    mid: {
      name: 'Tầm trung (CLB phong trào chất lượng)',
      tableName: 'Vikings Hunter Royal / Rise',
      tablePrice: 52000000,
      extraPrice: 22000000,
      hourlyPrice: 80000,
    },
    vip: {
      name: 'VIP & Thi đấu chuyên nghiệp',
      tableName: 'Vikings Monster (VK25)',
      tablePrice: 72000000,
      extraPrice: 35000000,
      hourlyPrice: 120000,
    }
  }[segment]

  const totalTableCost = tableCount * segmentMeta.tablePrice
  const totalExtraCost = tableCount * segmentMeta.extraPrice
  const totalInvestment = totalTableCost + totalExtraCost
  
  // Giả sử hoạt động trung bình 5 giờ/bàn/ngày, biên lợi nhuận ròng 40% sau khi trừ chi phí vận hành
  const monthlyRevenue = tableCount * 5 * segmentMeta.hourlyPrice * 30
  const monthlyProfit = monthlyRevenue * 0.40
  const paybackMonths = Math.ceil(totalInvestment / Math.max(1, monthlyProfit))

  const handleCustomOrder = () => {
    setOrderingCustom({
      name: 'Bàn Vikings Thiết Kế Màu Riêng',
      code: 'VK-CUSTOM',
      price: 'Liên hệ báo giá',
      image: '/images/san_pham/gallery-10.jpg', // Ảnh mặc định cho sản phẩm custom
      frame: `Thành băng ${selectedRail.label}`,
      specs: [
        `Màu vải nỉ: ${selectedCloth.label}`,
        `Chất liệu thành băng: ${selectedRail.label}`,
        `Hỗ trợ vận chuyển & lắp đặt toàn quốc`
      ],
      customNotes: `[Thiết kế phòng Studio] Vải nỉ: ${selectedCloth.label}, Thành băng: ${selectedRail.label}.`
    })
  }

  const handleCalcOrder = () => {
    setOrderingCustom({
      name: `Gói Setup CLB ${area}m²`,
      code: `SETUP-CLB-${tableCount}B`,
      price: `${(totalInvestment / 1000000).toFixed(0)} triệu đ`,
      image: '/images/san_pham/gallery-22.jpg',
      frame: `Quy mô: ${tableCount} bàn`,
      specs: [
        `Tổng diện tích: ${area}m²`,
        `Dòng bàn tư vấn: ${segmentMeta.tableName}`,
        `Dự kiến hoàn vốn: ${paybackMonths} tháng`
      ],
      customNotes: `[Dự toán CLB] Diện tích: ${area}m², Phân khúc: ${segmentMeta.name}, Số bàn: ${tableCount} bàn, Tổng dự toán: ${(totalInvestment / 1000000).toFixed(0)} triệu đ.`
    })
  }

  return (
    <section id="studio" className="section bg-surface/30 border-t border-b border-line reveal">
      <div className="container-x">
        <DBSectionTitle
          sectionKey="studio"
          eyebrow="Vikings Interactive Studio"
          title="Phòng thiết kế tương tác"
          desc="Trải nghiệm phối màu bàn bi-a 3D cá nhân hóa hoặc lập dự toán chi phí đầu tư mở CLB tối ưu chỉ trong 10 giây."
        />

        {/* Studio Tab Buttons */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex rounded-xl p-1 bg-surface-2 dark:bg-ink-950 border border-line">
            <button
              onClick={() => setActiveTab('design')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                activeTab === 'design'
                  ? 'bg-gold text-black shadow-md shadow-gold/15'
                  : 'text-muted hover:text-content'
              }`}
            >
              🎨 Phối màu bàn 3D
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                activeTab === 'calculator'
                  ? 'bg-gold text-black shadow-md shadow-gold/15'
                  : 'text-muted hover:text-content'
              }`}
            >
              🧮 Dự toán mở CLB
            </button>
          </div>
        </div>

        {activeTab === 'design' ? (
          /* DESIGN CUSTOMIZER */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive SVG Preview */}
            <div className="lg:col-span-7 flex justify-center bg-surface-2 dark:bg-ink-950/40 p-6 md:p-10 rounded-2xl border border-line relative overflow-hidden group">
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-white font-bold uppercase tracking-wider">
                Bản vẽ 3D trực quan
              </div>
              
              <svg viewBox="0 0 600 350" className="w-full max-w-lg h-auto transition-transform duration-500 group-hover:scale-[1.02]">
                <defs>
                  {/* Floor Shadow Gradient */}
                  <radialGradient id="floor-shadow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(0,0,0,0.45)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                  </radialGradient>

                  {/* Billiard Table Cloth Gradients */}
                  <linearGradient id="cloth-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={selectedCloth.shadow} />
                    <stop offset="60%" stopColor={selectedCloth.hex} />
                    <stop offset="100%" stopColor={selectedCloth.light} />
                  </linearGradient>

                  {/* Wooden Rail Top Gradient */}
                  <linearGradient id="rail-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={selectedRail.hex} />
                    <stop offset="30%" stopColor={selectedRail.under} />
                    <stop offset="70%" stopColor={selectedRail.hex} />
                    <stop offset="100%" stopColor={selectedRail.under} />
                  </linearGradient>

                  {/* Wooden Rail Shadowed Face Gradient */}
                  <linearGradient id="rail-dark-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={selectedRail.under} />
                    <stop offset="100%" stopColor="#111113" />
                  </linearGradient>

                  {/* Polished Metallic Corner Plates */}
                  {selectedRail.id === 'gold' ? (
                    <linearGradient id="metal-grad" x1="0%" y1="0%" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="30%" stopColor="#ca8a04" />
                      <stop offset="70%" stopColor="#fef08a" />
                      <stop offset="100%" stopColor="#854d0e" />
                    </linearGradient>
                  ) : (
                    <linearGradient id="metal-grad" x1="0%" y1="0%" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="30%" stopColor="#a1a1aa" />
                      <stop offset="70%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#3f3f46" />
                    </linearGradient>
                  )}

                  {/* 3D Cue Ball Shading */}
                  <radialGradient id="cue-ball-grad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#e4e4e7" />
                    <stop offset="100%" stopColor="#a1a1aa" />
                  </radialGradient>

                  {/* 3D Red Ball Shading */}
                  <radialGradient id="red-ball-grad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#fca5a5" />
                    <stop offset="50%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#7f1d1d" />
                  </radialGradient>

                  {/* 3D Yellow Ball Shading */}
                  <radialGradient id="yellow-ball-grad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#ca8a04" />
                    <stop offset="100%" stopColor="#713f12" />
                  </radialGradient>

                  {/* 3D Blue Ball Shading */}
                  <radialGradient id="blue-ball-grad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#93c5fd" />
                    <stop offset="50%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#1e3a8a" />
                  </radialGradient>

                  {/* Cue Stick Shadow Filter */}
                  <filter id="stick-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="-2" dy="4" stdDeviation="3" floodOpacity="0.35" />
                  </filter>
                </defs>

                {/* Table shadow */}
                <ellipse cx="300" cy="260" rx="245" ry="48" fill="url(#floor-shadow)" />

                {/* Legs Back (with depth) */}
                {/* Leg Left-Back */}
                <path d="M125,200 L125,270 L145,270 L145,200 Z" fill="#18181b" />
                <path d="M145,200 L145,270 L153,260 L153,200 Z" fill="#09090b" />

                {/* Leg Right-Back */}
                <path d="M455,200 L455,270 L475,270 L475,200 Z" fill="#18181b" />
                <path d="M475,200 L475,270 L483,260 L483,200 Z" fill="#09090b" />

                {/* Legs Front (with light & shadow) */}
                {/* Leg Left-Front */}
                <path d="M175,235 L175,305 L200,305 L200,235 Z" fill="url(#rail-grad)" stroke="#111" strokeWidth="0.2" />
                <path d="M200,235 L200,305 L208,295 L208,235 Z" fill="url(#rail-dark-grad)" />

                {/* Leg Right-Front */}
                <path d="M395,235 L395,305 L420,305 L420,235 Z" fill="url(#rail-grad)" stroke="#111" strokeWidth="0.2" />
                <path d="M420,235 L420,305 L428,295 L428,235 Z" fill="url(#rail-dark-grad)" />

                {/* Underframe support beam (Thân gỗ đỡ mặt bàn bên dưới) */}
                <polygon points="100,200 500,200 440,248 160,248" fill="url(#rail-dark-grad)" />

                {/* Outer Rails 3D Thickness (Bề nổi 3D của thành gỗ) */}
                {/* Left outer thickness */}
                <polygon points="80,188 140,242 140,250 80,196" fill="url(#rail-dark-grad)" />
                {/* Front outer thickness */}
                <polygon points="140,242 460,242 460,250 140,250" fill="url(#rail-dark-grad)" stroke="#111" strokeWidth="0.3" />
                {/* Right outer thickness */}
                <polygon points="460,242 520,188 520,196 460,250" fill="url(#rail-dark-grad)" />

                {/* Top Wood Rails (Băng gỗ phẳng bên trên) */}
                <polygon points="80,188 520,188 460,242 140,242" fill="url(#rail-grad)" stroke="#111" strokeWidth="0.5" />

                {/* Inner Cloth (Mặt nỉ phẳng) */}
                <polygon points="98,195 502,195 448,236 152,236" fill="url(#cloth-grad)" />

                {/* Cushion borders 3D Slope (Góc xiên của băng nỉ) */}
                {/* Back Cushion */}
                <polygon points="98,195 502,195 490,200 110,200" fill={selectedCloth.shadow} />
                {/* Left Cushion */}
                <polygon points="98,195 110,200 158,231 152,236" fill={selectedCloth.shadow} opacity="0.85" />
                {/* Right Cushion */}
                <polygon points="502,195 490,200 442,231 448,236" fill={selectedCloth.shadow} opacity="0.85" />
                {/* Front Cushion */}
                <polygon points="152,236 448,236 438,231 162,231" fill={selectedCloth.light} />

                {/* Shadow from cushion on the cloth (Bóng đổ nhẹ từ băng xuống mặt bàn) */}
                <polygon points="110,200 490,200 488,203 112,203" fill="#000000" opacity="0.25" />

                {/* Polished Metallic Corner Plates (Chụp góc kim loại sáng bóng) */}
                {/* Corner Left-Back */}
                <path d="M 78,188 L 94,185 L 102,197 L 88,200 Z" fill="url(#metal-grad)" stroke="#111" strokeWidth="0.2" />
                {/* Corner Right-Back */}
                <path d="M 522,188 L 506,185 L 498,197 L 512,200 Z" fill="url(#metal-grad)" stroke="#111" strokeWidth="0.2" />
                {/* Corner Left-Front */}
                <path d="M 137,242 L 151,232 L 160,243 L 142,251 Z" fill="url(#metal-grad)" stroke="#111" strokeWidth="0.2" />
                {/* Corner Right-Front */}
                <path d="M 463,242 L 449,232 L 440,243 L 458,251 Z" fill="url(#metal-grad)" stroke="#111" strokeWidth="0.2" />
                {/* Middle Pockets */}
                <path d="M 295,188 L 305,188 L 303,194 L 297,194 Z" fill="url(#metal-grad)" />
                <path d="M 294,242 L 306,242 L 304,236 L 296,236 Z" fill="url(#metal-grad)" />

                {/* Pocket Holes (Hốc lỗ đen chìm) */}
                <ellipse cx="98" cy="194" rx="6" ry="4" fill="#0c0a09" />
                <ellipse cx="502" cy="194" rx="6" ry="4" fill="#0c0a09" />
                <ellipse cx="152" cy="235" rx="7" ry="5" fill="#0c0a09" />
                <ellipse cx="448" cy="235" rx="7" ry="5" fill="#0c0a09" />
                <ellipse cx="300" cy="192" rx="5" ry="3.5" fill="#0c0a09" />
                <ellipse cx="300" cy="238" rx="6" ry="4" fill="#0c0a09" />

                {/* Diamond Sights on Wood Rails (Điểm nút ngắm khảm trai) */}
                {/* Back Rail */}
                <circle cx="200" cy="191" r="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.2" />
                <circle cx="300" cy="191" r="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.2" />
                <circle cx="400" cy="191" r="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.2" />
                {/* Front Rail */}
                <circle cx="215" cy="239" r="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.2" />
                <circle cx="300" cy="239" r="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.2" />
                <circle cx="385" cy="239" r="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.2" />

                {/* 3D Billiard Balls with Highlights */}
                {/* Cue ball */}
                <circle cx="230" cy="214" r="6.5" fill="url(#cue-ball-grad)" />
                {/* Blue ball */}
                <circle cx="340" cy="216" r="6.5" fill="url(#blue-ball-grad)" />
                {/* Red ball */}
                <circle cx="351" cy="221" r="6.5" fill="url(#red-ball-grad)" />
                {/* Yellow ball */}
                <circle cx="353" cy="213" r="6.5" fill="url(#yellow-ball-grad)" />
                
                {/* Cue Stick (Cơ bi-a bóng loáng) */}
                <g filter="url(#stick-shadow)">
                  {/* Shaft of the cue */}
                  <line x1="205" y1="222" x2="115" y2="265" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Wrap section of the cue */}
                  <line x1="145" y1="250" x2="115" y2="265" stroke="#1c1917" strokeWidth="2.8" />
                  {/* Cue Tip (Đầu tẩy trắng) */}
                  <line x1="205" y1="222" x2="209" y2="220" stroke="#f8fafc" strokeWidth="1.8" />
                </g>
              </svg>
            </div>

            {/* Selection Panel */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold text-content mb-3 uppercase tracking-wide">
                  Tùy chỉnh phối màu
                </h3>
                <p className="text-xs text-muted mb-6 leading-relaxed">
                  Lựa chọn sự kết hợp màu sắc nỉ bàn và chất liệu ốp thành băng phù hợp nhất với phong thủy CLB và không gian nội thất của bạn.
                </p>

                {/* Cloth Colors */}
                <div className="mb-6">
                  <span className="block text-xs font-bold text-content uppercase tracking-wider mb-2.5">
                    Màu vải nỉ bàn (Cloth Color):
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {CLOTHS.map((cloth) => {
                      const isSel = selectedCloth.id === cloth.id
                      return (
                        <button
                          key={cloth.id}
                          onClick={() => setSelectedCloth(cloth)}
                          className={`flex items-center gap-2 rounded-lg border p-2 text-left transition-all ${
                            isSel
                              ? 'border-gold bg-gold/10 font-semibold'
                              : 'border-line hover:border-gold/50'
                          }`}
                        >
                          <span
                            className="h-4 w-4 rounded-full border border-black/25 flex-none"
                            style={{ backgroundColor: cloth.hex }}
                          />
                          <span className="text-[11px] text-content truncate">{cloth.label.split(' ')[0]}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Rail Materials */}
                <div>
                  <span className="block text-xs font-bold text-content uppercase tracking-wider mb-2.5">
                    Chất liệu thành băng (Rail Finish):
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {RAILS.map((rail) => {
                      const isSel = selectedRail.id === rail.id
                      return (
                        <button
                          key={rail.id}
                          onClick={() => setSelectedRail(rail)}
                          className={`flex items-center gap-2.5 rounded-lg border p-3 text-left transition-all ${
                            isSel
                              ? 'border-gold bg-gold/10 font-semibold'
                              : 'border-line hover:border-gold/50'
                          }`}
                        >
                          <span
                            className="h-5 w-5 rounded-md border border-black/25 flex-none"
                            style={{ backgroundColor: rail.hex }}
                          />
                          <span className="text-[11px] text-content truncate">{rail.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Dynamic Summary Card */}
              <div className="bg-surface p-4 rounded-xl border border-line flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Cấu hình phối màu</span>
                  <h4 className="text-sm font-bold text-content mt-0.5">
                    Nỉ: <span className="text-accent-ink">{selectedCloth.label.split(' (')[0]}</span> + Băng: <span className="text-accent-ink">{selectedRail.label.split(' (')[0]}</span>
                  </h4>
                </div>
                <button
                  onClick={handleCustomOrder}
                  className="btn-gold px-5 py-2.5 text-xs uppercase tracking-wider w-full md:w-auto"
                >
                  Yêu cầu báo giá màu này
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* CLB BUDGET CALCULATOR */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls */}
            <div className="lg:col-span-5 bg-surface-2 dark:bg-ink-950/40 p-6 rounded-2xl border border-line space-y-6">
              <h3 className="font-display text-base font-bold text-content uppercase tracking-wider border-b border-line pb-3">
                Thông số CLB của bạn
              </h3>

              {/* Slider Diện tích */}
              <div>
                <div className="flex justify-between text-xs font-bold text-content uppercase tracking-wider mb-2.5">
                  <span>Diện tích mặt bằng:</span>
                  <span className="text-accent-ink dark:text-gold text-sm">{area} m²</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="1000"
                  step="10"
                  value={area}
                  onChange={(e) => setArea(parseInt(e.target.value))}
                  className="w-full accent-gold bg-line h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted mt-1">
                  <span>80 m²</span>
                  <span>500 m²</span>
                  <span>1000 m²</span>
                </div>
              </div>

              {/* Phân khúc lựa chọn */}
              <div>
                <span className="block text-xs font-bold text-content uppercase tracking-wider mb-2.5">
                  Phân khúc khách hàng mục tiêu:
                </span>
                <div className="space-y-2">
                  {[
                    { id: 'budget', name: 'Phổ thông / Giá rẻ', desc: 'Bàn Hero - Phù hợp sinh viên, hoàn vốn nhanh nhất.' },
                    { id: 'mid', name: 'Tầm trung / Phổ biến', desc: 'Bàn Hunter Royal/Rise - Đa dạng khách hàng.' },
                    { id: 'vip', name: 'Vip / Thi đấu chuyên nghiệp', desc: 'Bàn Monster - Khách VIP, nâng tầm thương hiệu.' },
                  ].map((seg) => {
                    const isSel = segment === seg.id
                    return (
                      <button
                        key={seg.id}
                        onClick={() => setSegment(seg.id)}
                        className={`w-full text-left rounded-xl border p-3.5 transition-all ${
                          isSel
                            ? 'border-gold bg-gold/10'
                            : 'border-line hover:border-gold/30'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-0.5">
                          <span className={`text-xs font-bold ${isSel ? 'text-accent-ink dark:text-gold' : 'text-content'}`}>
                            {seg.name}
                          </span>
                          <span className={`h-4 w-4 rounded-full border flex items-center justify-center ${isSel ? 'border-gold text-gold' : 'border-line'}`}>
                            {isSel && <span className="h-2 w-2 rounded-full bg-gold" />}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted">{seg.desc}</p>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Calculations Result Panel */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-surface p-6 rounded-2xl border border-line">
                <h3 className="font-display text-base font-bold text-content uppercase tracking-wider mb-4">
                  Dự báo kế hoạch đầu tư
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-surface-2 dark:bg-ink-950 p-3.5 rounded-xl border border-line text-center">
                    <span className="text-[10px] text-muted font-bold uppercase tracking-wider">Số bàn tối đa</span>
                    <p className="text-xl md:text-2xl font-bold text-accent-ink dark:text-gold mt-1">
                      {tableCount} <span className="text-xs text-content font-medium">bàn</span>
                    </p>
                  </div>
                  <div className="bg-surface-2 dark:bg-ink-950 p-3.5 rounded-xl border border-line text-center">
                    <span className="text-[10px] text-muted font-bold uppercase tracking-wider">Dòng bàn khuyên dùng</span>
                    <p className="text-sm md:text-base font-bold text-content mt-2 truncate">
                      {segmentMeta.tableName.split(' (')[0]}
                    </p>
                  </div>
                  <div className="bg-surface-2 dark:bg-ink-950 p-3.5 rounded-xl border border-line text-center col-span-2 md:col-span-1">
                    <span className="text-[10px] text-muted font-bold uppercase tracking-wider">Giá giờ chơi gợi ý</span>
                    <p className="text-xl md:text-2xl font-bold text-accent-ink dark:text-gold mt-1">
                      {segmentMeta.hourlyPrice.toLocaleString()}đ<span className="text-xs text-content font-medium">/h</span>
                    </p>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="border-t border-b border-line py-4 my-4 space-y-2.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Chi phí bàn ({tableCount} bàn):</span>
                    <span className="font-semibold text-content">{totalTableCost.toLocaleString()} đ</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Chi phí phụ trợ (Thi công, Đèn led vòm, bóng, cơ...):</span>
                    <span className="font-semibold text-content">{totalExtraCost.toLocaleString()} đ</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t border-dashed border-line pt-2.5 mt-2">
                    <span className="text-content">TỔNG VỐN ĐẦU TƯ DỰ TÍNH:</span>
                    <span className="text-accent-ink dark:text-gold">{totalInvestment.toLocaleString()} đ</span>
                  </div>
                </div>

                {/* Revenue Predictions */}
                <div className="bg-gold/5 border border-gold/20 p-4 rounded-xl space-y-2.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Doanh thu dự tính/tháng (chạy 5h/ngày):</span>
                    <span className="font-semibold text-content">{monthlyRevenue.toLocaleString()} đ</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Lợi nhuận ròng dự tính/tháng (biên 40%):</span>
                    <span className="font-semibold text-green-500 font-bold">{monthlyProfit.toLocaleString()} đ</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold border-t border-dashed border-gold/30 pt-2 mt-1.5">
                    <span>Thời gian hoàn vốn dự tính:</span>
                    <span className="text-accent-ink dark:text-gold">{paybackMonths} tháng</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <div className="text-xs text-muted leading-relaxed flex-1">
                    * Báo cáo dựa trên thống kê thực tế vận hành của hơn 150 CLB Vikings trên toàn quốc. Biên lợi nhuận thực tế phụ thuộc lớn vào kỹ năng quản lý và giá thuê mặt bằng.
                  </div>
                  <button
                    onClick={handleCalcOrder}
                    className="btn-gold py-3 px-6 text-xs uppercase tracking-wider whitespace-nowrap self-center sm:self-auto w-full sm:w-auto"
                  >
                    Nhận báo giá trọn gói & bản vẽ 2D
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {orderingCustom && (
        <OrderModal
          product={orderingCustom}
          brand={brand}
          onClose={() => setOrderingCustom(null)}
        />
      )}
    </section>
  )
}

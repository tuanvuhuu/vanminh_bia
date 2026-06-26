import { useState } from 'react'

const COMPARISON_DETAILS = {
  'VK25': {
    stone: 'Đá đen tự nhiên phẳng 99.9% (dày 25mm)',
    frame: 'Khung thép H-beam đúc nguyên khối chống rung 100%',
    cushion: 'Băng cao su Uylin K55 nhập khẩu chính hãng',
    heating: 'Sưởi nhiệt đa vùng độc lập cảm biến',
    balls: 'Aramith Pro-Cup TV (Bỉ) chuyên nghiệp',
    target: 'CLB siêu sang, giải đấu, cơ thủ chuyên nghiệp',
    value: 'Cực kỳ cao cấp',
    clearance: 'Tối ưu 5.7m × 4.45m (khoảng cách trống xung quanh ≥ 1.4m)'
  },
  'VK-RISE': {
    stone: 'Đá bùn đen cao cấp (dày 25mm, phẳng 99%)',
    frame: 'Khung thép H-beam chân chữ V chống rung',
    cushion: 'Băng K55 chuẩn thi đấu quốc tế',
    heating: 'Sưởi điện tử tự động ngắt',
    balls: 'Aramith Premium / Dyna Pro',
    target: 'CLB chuyên nghiệp cao cấp, khách VIP',
    value: 'Tối ưu thi đấu',
    clearance: 'Tối ưu 5.7m × 4.45m (khoảng cách trống xung quanh ≥ 1.4m)'
  },
  'VK-HUNTER': {
    stone: 'Đá xanh tự nhiên nhập khẩu (dày 25mm)',
    frame: 'Gỗ tự nhiên khối chống cong',
    cushion: 'Băng Premier / K55 nảy cao',
    heating: 'Không hỗ trợ',
    balls: 'Dyna Titanium / CPBA',
    target: 'CLB phong trào chất lượng tầm trung',
    value: 'Bán chạy nhất',
    clearance: 'Tối ưu 5.7m × 4.45m (khoảng cách trống xung quanh ≥ 1.4m)'
  },
  'VK-SILVER': {
    stone: 'Đá tự nhiên 3 tấm (dày 25mm)',
    frame: 'Gỗ MDF chống ẩm tăng cường',
    cushion: 'Băng cao cấp Đài Loan đàn hồi chuẩn',
    heating: 'Không hỗ trợ',
    balls: 'Dyna Titanium / Joss',
    target: 'CLB học sinh, hồi vốn nhanh',
    value: 'Tiết kiệm chi phí',
    clearance: 'Tối ưu 5.7m × 4.45m (khoảng cách trống xung quanh ≥ 1.4m)'
  },
  'VK-HERO': {
    stone: 'Đá tự nhiên 3 tấm (dày 25mm)',
    frame: 'Chân gỗ đen tiêu chuẩn',
    cushion: 'Băng cao cấp Đài Loan đàn hồi chuẩn',
    heating: 'Không hỗ trợ',
    balls: 'Diamon Ultra-C',
    target: 'CLB học sinh, giải trí gia đình',
    value: 'Giá rẻ nhất',
    clearance: 'Tối ưu 5.7m × 4.45m (khoảng cách trống xung quanh ≥ 1.4m)'
  },
  'VK-PRO-EVO': {
    stone: 'Đá đen tự nhiên phẳng 99%',
    frame: 'Khung gỗ Plywood liền yến dày 50mm chắc chắn',
    cushion: 'Băng Uylin K55 chuẩn thi đấu',
    heating: 'Không hỗ trợ',
    balls: 'Bóng Dyna Rhodium nhập khẩu',
    target: 'CLB phong trào, gia đình, văn phòng',
    value: 'Giá tốt nhất phân khúc',
    clearance: 'Tối ưu 5.7m × 4.45m (khoảng cách trống xung quanh ≥ 1.4m)'
  }
}

export default function TableCompare({ products, onOrder }) {
  // Tìm kiếm chi tiết tương ứng từ mã code bàn
  const getDetail = (code) => {
    return COMPARISON_DETAILS[code] || {
      stone: 'Đá tự nhiên chuẩn',
      frame: 'Khung gỗ tiêu chuẩn',
      cushion: 'Băng cao su nhập khẩu',
      heating: 'Không hỗ trợ',
      balls: 'Bóng tiêu chuẩn',
      target: 'Phù hợp CLB phong trào',
      value: 'Tiêu chuẩn',
      clearance: 'Tối ưu 5.7m × 4.45m (khoảng cách trống xung quanh ≥ 1.4m)'
    }
  }

  // Khởi tạo so sánh bàn đầu tiên và bàn thứ hai
  const [modelAId, setModelAId] = useState(products[0]?.code || '')
  const [modelBId, setModelBId] = useState(products[1]?.code || '')

  const modelA = products.find(p => p.code === modelAId) || products[0]
  const modelB = products.find(p => p.code === modelBId) || products[1]

  if (!modelA || !modelB) return null

  const detailsA = getDetail(modelA.code)
  const detailsB = getDetail(modelB.code)

  const CRITERIA = [
    { label: 'Phân khúc nổi bật', key: 'value', icon: '💎' },
    { label: 'Mặt đá (Slab)', key: 'stone', icon: '🪨' },
    { label: 'Khung gầm (Frame)', key: 'frame', icon: '🪵' },
    { label: 'Băng cao su (Cushion)', key: 'cushion', icon: '〰️' },
    { label: 'Hệ thống sưởi (Heating)', key: 'heating', icon: '🔥' },
    { label: 'Bóng đi kèm (Balls)', key: 'balls', icon: '🎱' },
    { label: 'Phù hợp nhu cầu', key: 'target', icon: '🎯' },
    { label: 'Kích thước sử dụng', key: 'size', icon: '📏', isDirect: true },
    { label: 'Khoảng cách đặt bàn', key: 'clearance', icon: '📐' },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="font-display text-base font-bold text-content uppercase tracking-wider flex items-center justify-center gap-2">
          🆚 So sánh trực quan các dòng bàn
        </h4>
        <p className="text-xs text-muted mt-1">
          Chọn 2 dòng bàn để so sánh trực quan cấu hình phần cứng, tầm giá và đối tượng sử dụng phù hợp.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto bg-surface-2 dark:bg-ink-950/40 p-3 rounded-xl border border-line">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Bàn thứ nhất:</label>
          <select
            value={modelAId}
            onChange={(e) => setModelAId(e.target.value)}
            className="w-full bg-surface border border-line focus:border-gold rounded-lg px-2.5 py-1.5 text-xs text-content outline-none focus:ring-4 focus:ring-gold/15 transition-all font-semibold"
          >
            {products.map(p => (
              <option key={p.code} value={p.code}>{p.name} ({p.code})</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Bàn thứ hai:</label>
          <select
            value={modelBId}
            onChange={(e) => setModelBId(e.target.value)}
            className="w-full bg-surface border border-line focus:border-gold rounded-lg px-2.5 py-1.5 text-xs text-content outline-none focus:ring-4 focus:ring-gold/15 transition-all font-semibold"
          >
            {products.map(p => (
              <option key={p.code} value={p.code}>{p.name} ({p.code})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Side by side cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-6">
        {/* Card A */}
        <div className="bg-surface border border-line rounded-2xl p-5 space-y-4 hover:border-gold/40 transition-colors shadow-sm">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-ink-900 border border-line">
            <img src={modelA.image} alt={modelA.name} className="h-full w-full object-cover" />
            {modelA.badge && (
              <span className="absolute top-2.5 left-2.5 rounded bg-gold text-black px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border border-yellow-300/40">
                {modelA.badge}
              </span>
            )}
          </div>
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-display text-base font-bold uppercase text-content">{modelA.name}</h5>
                <span className="text-[10px] text-muted font-mono">{modelA.code}</span>
              </div>
              <div className="text-right">
                {(modelA.old_price || modelA.oldPrice) && <span className="block text-[10px] text-muted line-through">{modelA.old_price || modelA.oldPrice}</span>}
                <span className="font-display text-lg font-bold text-accent-ink dark:text-gold">{modelA.price}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onOrder(modelA)}
            className="w-full btn-gold py-2 text-xs uppercase tracking-wider font-bold"
          >
            Đặt mua bàn {modelA.name}
          </button>
        </div>

        {/* Card B */}
        <div className="bg-surface border border-line rounded-2xl p-5 space-y-4 hover:border-gold/40 transition-colors shadow-sm">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-ink-900 border border-line">
            <img src={modelB.image} alt={modelB.name} className="h-full w-full object-cover" />
            {modelB.badge && (
              <span className="absolute top-2.5 left-2.5 rounded bg-gold text-black px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border border-yellow-300/40">
                {modelB.badge}
              </span>
            )}
          </div>
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-display text-base font-bold uppercase text-content">{modelB.name}</h5>
                <span className="text-[10px] text-muted font-mono">{modelB.code}</span>
              </div>
              <div className="text-right">
                {(modelB.old_price || modelB.oldPrice) && <span className="block text-[10px] text-muted line-through">{modelB.old_price || modelB.oldPrice}</span>}
                <span className="font-display text-lg font-bold text-accent-ink dark:text-gold">{modelB.price}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onOrder(modelB)}
            className="w-full btn-gold py-2 text-xs uppercase tracking-wider font-bold"
          >
            Đặt mua bàn {modelB.name}
          </button>
        </div>
      </div>

      {/* Comparisons Specs Table */}
      <div className="border border-line rounded-xl overflow-hidden bg-surface-2 dark:bg-ink-950/20 shadow-inner mt-4">
        <div className="divide-y divide-line">
          {CRITERIA.map((crit, idx) => {
            const valA = crit.isDirect ? modelA[crit.key] : detailsA[crit.key]
            const valB = crit.isDirect ? modelB[crit.key] : detailsB[crit.key]
            const isDifferent = valA !== valB

            return (
              <div key={idx} className={`p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-start ${isDifferent ? 'bg-gold/3' : ''}`}>
                {/* Criterion Name */}
                <div className="md:col-span-4 flex items-center gap-2">
                  <span className="text-sm">{crit.icon}</span>
                  <span className="text-xs font-bold text-content uppercase tracking-wider">{crit.label}</span>
                </div>

                {/* Model A Value */}
                <div className="md:col-span-4 text-xs text-muted leading-relaxed">
                  <span className="md:hidden font-bold text-[10px] text-muted uppercase tracking-wider block mb-0.5">[{modelA.name}]</span>
                  <span className={isDifferent ? 'text-content font-medium' : ''}>{valA}</span>
                </div>

                {/* Model B Value */}
                <div className="md:col-span-4 text-xs text-muted leading-relaxed border-t border-line/40 pt-2 md:pt-0 md:border-t-0">
                  <span className="md:hidden font-bold text-[10px] text-muted uppercase tracking-wider block mb-0.5">[{modelB.name}]</span>
                  <span className={isDifferent ? 'text-content font-medium' : ''}>{valB}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

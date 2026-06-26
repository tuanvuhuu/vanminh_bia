import { useState, useEffect, useRef } from 'react'

export default function FloorPlanner2D({ initialTableCount }) {
  const [roomLength, setRoomLength] = useState(15) // mét
  const [roomWidth, setRoomWidth] = useState(10) // mét
  const [tables, setTables] = useState([])
  const [draggingId, setDraggingId] = useState(null)
  
  const containerRef = useRef(null)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const tableStartRef = useRef({ x: 0, y: 0 })

  // Kích thước chuẩn bàn bi-a (mét)
  const TABLE_L = 2.9
  const TABLE_W = 1.65
  const SAFETY_ZONE = 1.4 // Khoảng cách tối thiểu từ bàn đến tường/bàn khác để thụt cơ thoải mái

  // Tự động tính toán kích thước phòng hợp lý khi số bàn thay đổi từ bên ngoài
  useEffect(() => {
    // Ước lượng diện tích tối thiểu
    const totalArea = initialTableCount * 28 // 28m2 mỗi bàn
    const approxLength = Math.max(8, Math.ceil(Math.sqrt(totalArea * 1.5)))
    const approxWidth = Math.max(6, Math.ceil(totalArea / approxLength))
    
    setRoomLength(approxLength)
    setRoomWidth(approxWidth)
    
    // Tự động sắp xếp lại bàn
    handleAutoArrange(initialTableCount, approxLength, approxWidth)
  }, [initialTableCount])

  // Lắp đặt bàn theo lưới
  const handleAutoArrange = (count = initialTableCount, len = roomLength, wid = roomWidth) => {
    let bestCols = 1
    let bestRows = count
    let maxSpacing = -1

    for (let cols = 1; cols <= count; cols++) {
      const rows = Math.ceil(count / cols)
      const cellW = len / cols
      const cellH = wid / rows
      const spacingX = cellW - TABLE_L
      const spacingY = cellH - TABLE_W
      const minSpacing = Math.min(spacingX, spacingY)

      if (spacingX >= 0 && spacingY >= 0 && minSpacing > maxSpacing) {
        maxSpacing = minSpacing
        bestCols = cols
        bestRows = rows
      }
    }

    const newTables = []
    let idx = 0
    const cellW = len / bestCols
    const cellH = wid / bestRows

    for (let r = 0; r < bestRows && idx < count; r++) {
      for (let c = 0; c < bestCols && idx < count; c++) {
        // Căn giữa bàn trong từng ô lưới
        const x = c * cellW + (cellW - TABLE_L) / 2
        const y = r * cellH + (cellH - TABLE_W) / 2
        newTables.push({
          id: idx + 1,
          x: Math.max(0, Math.min(len - TABLE_L, x)),
          y: Math.max(0, Math.min(wid - TABLE_W, y)),
          rotated: false,
        })
        idx++
      }
    }
    setTables(newTables)
  }

  // Tăng/giảm kích thước phòng
  const handleLengthChange = (e) => {
    const val = parseInt(e.target.value) || 5
    setRoomLength(val)
    // Co bàn lại nếu phòng bị thu hẹp quá bàn
    setTables(prev => prev.map(t => {
      const w = t.rotated ? TABLE_W : TABLE_L
      return {
        ...t,
        x: Math.max(0, Math.min(val - w, t.x))
      }
    }))
  }

  const handleWidthChange = (e) => {
    const val = parseInt(e.target.value) || 5
    setRoomWidth(val)
    setTables(prev => prev.map(t => {
      const h = t.rotated ? TABLE_L : TABLE_W
      return {
        ...t,
        y: Math.max(0, Math.min(val - h, t.y))
      }
    }))
  }

  // Xoay bàn
  const toggleRotate = (id) => {
    setTables(prev => prev.map(t => {
      if (t.id === id) {
        const nextRot = !t.rotated
        const w = nextRot ? TABLE_W : TABLE_L
        const h = nextRot ? TABLE_L : TABLE_W
        return {
          ...t,
          rotated: nextRot,
          // Đảm bảo sau khi xoay bàn không bị văng ra ngoài phòng
          x: Math.max(0, Math.min(roomLength - w, t.x)),
          y: Math.max(0, Math.min(roomWidth - h, t.y))
        }
      }
      return t
    }))
  }

  // Drag and Drop (Pointer Events)
  const handlePointerDown = (e, table) => {
    e.preventDefault()
    e.stopPropagation()
    setDraggingId(table.id)
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    tableStartRef.current = { x: table.x, y: table.y }
    
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId)
    }
  }

  const handlePointerMove = (e) => {
    if (draggingId === null) return
    e.preventDefault()
    
    // Tính toán tỷ lệ scale
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    
    const scaleX = rect.width / roomLength
    const scaleY = rect.height / roomWidth
    
    const dx = (e.clientX - dragStartRef.current.x) / scaleX
    const dy = (e.clientY - dragStartRef.current.y) / scaleY
    
    const table = tables.find(t => t.id === draggingId)
    if (!table) return

    const w = table.rotated ? TABLE_W : TABLE_L
    const h = table.rotated ? TABLE_L : TABLE_W

    const newX = Math.max(0, Math.min(roomLength - w, tableStartRef.current.x + dx))
    const newY = Math.max(0, Math.min(roomWidth - h, tableStartRef.current.y + dy))

    setTables(prev => prev.map(t => {
      if (t.id === draggingId) {
        return { ...t, x: newX, y: newY }
      }
      return t
    }))
  }

  const handlePointerUp = (e) => {
    if (draggingId !== null) {
      if (containerRef.current) {
        containerRef.current.releasePointerCapture(e.pointerId)
      }
      setDraggingId(null)
    }
  }

  // Thêm bàn mới
  const handleAddTable = () => {
    const id = tables.length > 0 ? Math.max(...tables.map(t => t.id)) + 1 : 1
    setTables(prev => [
      ...prev,
      {
        id,
        x: Math.max(0, roomLength / 2 - TABLE_L / 2),
        y: Math.max(0, roomWidth / 2 - TABLE_W / 2),
        rotated: false
      }
    ])
  }

  // Xóa bàn
  const handleRemoveTable = (id) => {
    setTables(prev => prev.filter(t => t.id !== id))
  }

  // Kiểm tra va chạm & khoảng cách an toàn cho từng bàn
  const checkStatus = (table) => {
    const w = table.rotated ? TABLE_W : TABLE_L
    const h = table.rotated ? TABLE_L : TABLE_W
    
    let isColliding = false
    let isTooCloseToWall = false
    let isTooCloseToTable = false

    // 1. Kiểm tra va chạm tường (Clearance)
    if (
      table.x < SAFETY_ZONE ||
      table.x + w + SAFETY_ZONE > roomLength ||
      table.y < SAFETY_ZONE ||
      table.y + h + SAFETY_ZONE > roomWidth
    ) {
      isTooCloseToWall = true
    }

    // 2. Kiểm tra với các bàn khác
    for (const other of tables) {
      if (other.id === table.id) continue
      
      const ow = other.rotated ? TABLE_W : TABLE_L
      const oh = other.rotated ? TABLE_L : TABLE_W

      // Kiểm tra đè lên nhau (Physically overlapping)
      const overlap = (
        table.x < other.x + ow &&
        table.x + w > other.x &&
        table.y < other.y + oh &&
        table.y + h > other.y
      )

      if (overlap) {
        isColliding = true
      }

      // Kiểm tra khoảng cách an toàn giữa 2 bàn (Safety clearance zone)
      const safetyOverlap = (
        table.x - SAFETY_ZONE < other.x + ow &&
        table.x + w + SAFETY_ZONE > other.x &&
        table.y - SAFETY_ZONE < other.y + oh &&
        table.y + h + SAFETY_ZONE > other.y
      )

      if (safetyOverlap) {
        isTooCloseToTable = true
      }
    }

    return { isColliding, isTooCloseToWall, isTooCloseToTable }
  }

  // Tổng hợp trạng thái toàn phòng
  const getOverallStatus = () => {
    let collides = false
    let wallCloses = false
    let tableCloses = false

    for (const t of tables) {
      const { isColliding, isTooCloseToWall, isTooCloseToTable } = checkStatus(t)
      if (isColliding) collides = true
      if (isTooCloseToWall) wallCloses = true
      if (isTooCloseToTable && !isColliding) tableCloses = true
    }

    if (collides) return { type: 'danger', msg: 'Có bàn đang đè lên nhau! Kéo để sắp xếp lại.' }
    if (wallCloses) return { type: 'warning', msg: 'Một số bàn quá sát tường (< 1.4m), người chơi có thể bị cản trở khi thụt cơ.' }
    if (tableCloses) return { type: 'info', msg: 'Khoảng cách giữa các bàn hơi hẹp, nên giãn rộng để chơi thoải mái.' }
    return { type: 'success', msg: 'Bố cục hoàn hảo! Khoảng cách an toàn chuẩn kỹ thuật thi đấu.' }
  }

  const overall = getOverallStatus()

  return (
    <div className="bg-surface border border-line rounded-2xl p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h4 className="font-display text-base font-bold text-content uppercase tracking-wider flex items-center gap-2">
            📐 Quy hoạch mặt bằng 2D tương tác
          </h4>
          <p className="text-xs text-muted mt-1 leading-relaxed">
            Thử sắp xếp vị trí các bàn trực quan trên bản vẽ kỹ thuật. Kéo thả để di chuyển, bấm nút xoay để xoay bàn hoặc xóa bàn tùy ý.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleAutoArrange()}
            className="px-4 py-2 text-xs font-bold border border-gold text-accent-ink dark:text-gold rounded-lg hover:bg-gold hover:text-black transition-colors"
          >
            ⚡ Tự động căn lề
          </button>
          <button
            onClick={handleAddTable}
            className="px-4 py-2 text-xs font-bold bg-gold hover:bg-gold-400 text-black rounded-lg transition-colors"
          >
            ＋ Thêm bàn
          </button>
        </div>
      </div>

      {/* Điều khiển kích thước phòng */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-surface-2 dark:bg-ink-950/30 p-4 rounded-xl border border-line">
        <div>
          <label className="flex justify-between text-xs font-semibold text-content mb-1">
            <span>Chiều dài phòng:</span>
            <span className="text-accent-ink dark:text-gold font-bold">{roomLength} m</span>
          </label>
          <input
            type="range"
            min="6"
            max="40"
            value={roomLength}
            onChange={handleLengthChange}
            className="w-full accent-gold bg-line h-1 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="flex justify-between text-xs font-semibold text-content mb-1">
            <span>Chiều rộng phòng:</span>
            <span className="text-accent-ink dark:text-gold font-bold">{roomWidth} m</span>
          </label>
          <input
            type="range"
            min="4"
            max="30"
            value={roomWidth}
            onChange={handleWidthChange}
            className="w-full accent-gold bg-line h-1 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-1 flex flex-row items-center justify-between text-xs bg-bg/50 border border-line/60 rounded-lg p-2.5">
          <div>
            <span className="text-muted block">Diện tích phòng vẽ:</span>
            <span className="text-sm font-bold text-content">{roomLength * roomWidth} m²</span>
          </div>
          <div className="text-right">
            <span className="text-muted block">Tổng số bàn:</span>
            <span className="text-sm font-bold text-accent-ink dark:text-gold">{tables.length} bàn</span>
          </div>
        </div>
      </div>

      {/* Thông báo trạng thái */}
      <div className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all duration-300 ${
        overall.type === 'danger' ? 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400' :
        overall.type === 'warning' ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400' :
        overall.type === 'info' ? 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400' :
        'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400'
      }`}>
        <span className="text-base">
          {overall.type === 'danger' ? '❌' :
           overall.type === 'warning' ? '⚠️' :
           overall.type === 'info' ? 'ℹ️' : '✅'}
        </span>
        <div className="leading-relaxed">
          <p className="font-bold">{overall.msg}</p>
          <p className="opacity-80 text-[10px] mt-0.5">Tiêu chuẩn kỹ thuật: Mỗi bàn cần không gian chơi tối ưu là 5.7m x 4.45m (bao gồm ~1.4m trống xung quanh thành băng để tránh va gậy).</p>
        </div>
      </div>

      {/* Blueprint Board Viewport */}
      <div className="relative overflow-auto border border-line rounded-xl bg-slate-950 dark:bg-black p-4 select-none flex items-center justify-center">
        {/* Dynamic Grid container */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative border border-dashed border-white/20 bg-slate-900/60 transition-all shadow-[inset_0_4px_20px_rgba(0,0,0,0.4)] overflow-hidden"
          style={{
            width: '100%',
            maxWidth: '650px',
            aspectRatio: `${roomLength} / ${roomWidth}`,
            // Tạo lưới nền ô vuông 1m x 1m
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
            backgroundSize: `${100 / roomLength}% ${100 / roomWidth}%`,
          }}
        >
          {/* Render tables */}
          {tables.map(t => {
            const w = t.rotated ? TABLE_W : TABLE_L
            const h = t.rotated ? TABLE_L : TABLE_W
            
            // Tính toán vị trí % để responsive
            const leftPct = (t.x / roomLength) * 100
            const topPct = (t.y / roomWidth) * 100
            const widthPct = (w / roomLength) * 100
            const heightPct = (h / roomWidth) * 100

            // Trạng thái va chạm của bàn này
            const { isColliding, isTooCloseToWall, isTooCloseToTable } = checkStatus(t)
            const hasError = isColliding
            const hasWarning = isTooCloseToWall || isTooCloseToTable

            return (
              <div
                key={t.id}
                onPointerDown={(e) => handlePointerDown(e, t)}
                className={`absolute cursor-move rounded-md flex flex-col items-center justify-between p-1 md:p-1.5 transition-shadow select-none group border-2 ${
                  draggingId === t.id ? 'z-40 shadow-2xl scale-[1.01]' : 'z-20'
                } ${
                  hasError
                    ? 'border-red-500 bg-red-600/35 shadow-lg shadow-red-500/20 text-red-200'
                    : hasWarning
                    ? 'border-amber-400 bg-amber-500/25 shadow-md shadow-amber-500/10 text-amber-200'
                    : 'border-gold bg-slate-950/90 hover:border-white shadow-sm text-gold-300'
                }`}
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  width: `${widthPct}%`,
                  height: `${heightPct}%`,
                  touchAction: 'none'
                }}
              >
                {/* Safety Clearances Halo Outline */}
                <div
                  className={`absolute rounded-lg -z-10 pointer-events-none border border-dashed transition-all ${
                    hasError ? 'border-red-500/20 bg-red-500/5' :
                    hasWarning ? 'border-amber-500/20 bg-amber-500/5' :
                    'border-gold/15 bg-gold/5'
                  }`}
                  style={{
                    left: `-${(SAFETY_ZONE / w) * 100}%`,
                    top: `-${(SAFETY_ZONE / h) * 100}%`,
                    width: `${100 + (SAFETY_ZONE * 2 / w) * 100}%`,
                    height: `${100 + (SAFETY_ZONE * 2 / h) * 100}%`,
                  }}
                />

                {/* Table ID Label */}
                <span className="text-[10px] font-bold leading-none select-none">
                  #{t.id}
                </span>

                {/* Table Inner Art drawing (Billiard pockets / bed look) */}
                <div className="w-full flex-1 flex flex-wrap justify-between content-between py-0.5 md:py-1 opacity-70 pointer-events-none">
                  {/* Pocket dots */}
                  <span className="w-1.5 h-1.5 rounded-full bg-black/80" />
                  {t.rotated && <span className="w-1.5 h-1.5 rounded-full bg-black/80" />}
                  <span className="w-1.5 h-1.5 rounded-full bg-black/80" />
                  {!t.rotated && <span className="w-1.5 h-1.5 rounded-full bg-black/80" />}
                  <span className="w-1.5 h-1.5" />
                  {!t.rotated && <span className="w-1.5 h-1.5 rounded-full bg-black/80" />}
                  <span className="w-1.5 h-1.5 rounded-full bg-black/80" />
                  {t.rotated && <span className="w-1.5 h-1.5 rounded-full bg-black/80" />}
                  <span className="w-1.5 h-1.5 rounded-full bg-black/80" />
                </div>

                {/* Bottom Action buttons */}
                <div className="flex gap-1 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  <button
                    onPointerDown={(e) => {
                      e.stopPropagation()
                      toggleRotate(t.id)
                    }}
                    title="Xoay 90°"
                    className="w-4.5 h-4.5 rounded bg-black/60 hover:bg-black text-[9px] font-bold text-white flex items-center justify-center cursor-pointer pointer-events-auto"
                  >
                    ⟳
                  </button>
                  <button
                    onPointerDown={(e) => {
                      e.stopPropagation()
                      handleRemoveTable(t.id)
                    }}
                    title="Xóa bàn"
                    className="w-4.5 h-4.5 rounded bg-red-600 hover:bg-red-700 text-[9px] font-bold text-white flex items-center justify-center cursor-pointer pointer-events-auto"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Blueprint Legend Map */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] text-muted border-t border-line/60 pt-4">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-4.5 h-2.5 rounded bg-slate-950 border border-gold" />
          Khoảng cách đạt chuẩn (&gt;1.4m)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-4.5 h-2.5 rounded bg-amber-500/20 border border-amber-400" />
          Hơi sát tường/bàn khác
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-4.5 h-2.5 rounded bg-red-500/25 border border-red-500" />
          Bàn bị đè lên nhau (Lỗi)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-6 h-3 rounded border border-dashed border-white/20 bg-transparent flex items-center justify-center text-[7px]">- - -</span>
          Vùng thụt cơ an toàn (1.4m)
        </span>
      </div>
    </div>
  )
}

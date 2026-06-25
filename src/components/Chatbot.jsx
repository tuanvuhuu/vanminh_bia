import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabaseClient'
import { brand as staticBrand } from '../data/content'

const fallbackSettings = {
  enabled: true,
  botName: 'Vikings Assistant',
  welcomeMessage: 'Xin chào! Vikings Billiards có thể hỗ trợ gì cho anh/chị ạ?',
  fallbackMessage: 'Dạ, câu hỏi này chatbot chưa được học. Anh/chị vui lòng nhập SĐT bên dưới hoặc gọi hotline để được tư vấn ngay lập tức ạ!'
}

const fallbackRules = [
  { question: 'Giá bán bàn Rise bao nhiêu?', answer: 'Chào anh/chị, bàn bi-a Vikings Rise cao cấp hiện có giá ưu đãi đặc biệt là 38.000.000đ (đã bao gồm đầy đủ phụ kiện chính hãng và bảo hành 2 năm). Anh/chị có cần tư vấn setup chi tiết không ạ?' },
  { question: 'Có giao hàng toàn quốc không?', answer: 'Dạ có, Vikings Billiards vận chuyển, lắp đặt và bàn giao kỹ thuật tận nhà trên toàn quốc. Đội ngũ thợ tay nghề cao đảm bảo cân chỉnh bàn chuẩn thi đấu cho anh/chị ạ!' },
  { question: 'Chính sách bảo hành thế nào?', answer: 'Tất cả bàn bi-a chính hãng Vikings đều được bảo hành 2 năm về mặt bàn, thành băng, kết cấu gỗ, và bảo trì trọn đời sản phẩm. Anh/chị hoàn toàn yên tâm sử dụng nhé!' },
  { question: 'Địa chỉ showroom ở đâu?', answer: 'Showroom của Vikings Billiards đặt tại: 89 P. Thành Trung, Trâu Quỳ, Gia Lâm, Hà Nội. Kính mời anh/chị ghé qua trải nghiệm trực tiếp bàn ạ!' }
]

function cleanStr(s) {
  if (!s) return ''
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
}

export default function Chatbot({ brand: propBrand, open, setOpen }) {
  const brand = propBrand || staticBrand
  const [settings, setSettings] = useState(fallbackSettings)
  const [rules, setRules] = useState(fallbackRules)
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [lastUserMsg, setLastUserMsg] = useState('')
  const [leadSent, setLeadSent] = useState(false)

  const messagesEndRef = useRef(null)

  // Tải cấu hình từ Supabase
  useEffect(() => {
    async function loadChatbot() {
      try {
        const { data: sData, error: sErr } = await supabase
          .from('chatbot_settings')
          .select('*')
          .eq('id', 1)
          .single()
        if (sData && !sErr) {
          setSettings({
            enabled: sData.enabled,
            botName: sData.bot_name || fallbackSettings.botName,
            welcomeMessage: sData.welcome_message || fallbackSettings.welcomeMessage,
            fallbackMessage: sData.fallback_message || fallbackSettings.fallbackMessage
          })
        }

        const { data: rData, error: rErr } = await supabase
          .from('chatbot_rules')
          .select('*')
          .order('sort_order', { ascending: true })
        if (rData && rData.length > 0 && !rErr) {
          setRules(rData)
        }
      } catch (err) {
        console.log('Không lấy được dữ liệu chatbot từ DB, dùng cấu hình tĩnh mặc định.')
      }
    }
    loadChatbot()
  }, [])

  // Khởi tạo tin nhắn chào mừng
  useEffect(() => {
    if (messages.length === 0 && settings.welcomeMessage) {
      setMessages([
        { sender: 'bot', text: settings.welcomeMessage, id: 'welcome' }
      ])
    }
  }, [settings.welcomeMessage, messages.length])

  // Tự động cuộn xuống dưới cùng khi có tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, typing, showLeadForm])

  if (!settings.enabled) return null

  const handleBotResponse = (userText) => {
    setTyping(true)
    setShowLeadForm(false)

    setTimeout(async () => {
      setTyping(false)
      const cleanUser = cleanStr(userText)

      // Tìm câu trả lời khớp từ khóa
      let matchedRule = null
      for (const r of rules) {
        const cleanQ = cleanStr(r.question)
        if (cleanUser.includes(cleanQ) || cleanQ.includes(cleanUser)) {
          matchedRule = r
          break
        }
      }

      if (matchedRule) {
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: matchedRule.answer, id: Date.now().toString() }
        ])
      } else {
        // Không khớp, trả về fallback và hiển thị Form đăng ký thông tin tư vấn
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: settings.fallbackMessage, id: Date.now().toString() }
        ])
        setLastUserMsg(userText)
        setShowLeadForm(true)
        setLeadSent(false)
      }
    }, 800)
  }

  const selectQuestion = (q, a) => {
    const userMsgId = Date.now().toString()
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: q, id: userMsgId }
    ])

    setTyping(true)
    setShowLeadForm(false)

    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: a, id: (Date.now() + 1).toString() }
      ])
    }, 700)
  }

  const handleSendCustom = (e) => {
    e.preventDefault()
    if (!inputVal.trim()) return

    const text = inputVal.trim()
    setInputVal('')

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text, id: Date.now().toString() }
    ])

    handleBotResponse(text)
  }

  const submitLead = async (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const phone = form.phone.value

    try {
      await supabase.from('consultations').insert([
        {
          name,
          phone,
          message: `[Chatbot Tư Vấn] Câu hỏi chưa trả lời được: "${lastUserMsg}"`
        }
      ])
      setLeadSent(true)
      setTimeout(() => {
        setShowLeadForm(false)
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: 'Dạ, thông tin của anh/chị đã được ghi nhận. Đội ngũ Vikings Billiards sẽ liên hệ lại ngay lập tức ạ!', id: Date.now().toString() }
        ])
      }, 1500)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {/* Hộp thoại Chatbot */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[520px] w-[350px] flex-col rounded-2xl border border-line/60 bg-surface/95 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] sm:right-20 sm:w-[380px] overflow-hidden animate-chatbot">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line/50 bg-gradient-to-r from-gold-500 via-amber-400 to-gold-400 px-4 py-3.5 text-black shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-black/10">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500 border border-white dark:border-ink-900"></span>
                </span>
              </div>
              <div>
                <p className="font-bold leading-tight text-sm">{settings.botName}</p>
                <p className="text-[10px] opacity-75 font-semibold uppercase tracking-wider">Trợ lý Vikings ảo</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1 transition hover:bg-black/10"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Khu vực tin nhắn */}
          <div className="relative flex-1 overflow-y-auto p-4 space-y-4 bg-bg/50">
            {/* Hiệu ứng nền mờ sang trọng giống Contact */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[60px] pointer-events-none" />
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-tr from-gold-600 to-amber-400 text-black font-medium rounded-tr-none shadow-sm shadow-gold/15'
                      : 'bg-surface border border-line/60 text-content rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}

            {/* Hiệu ứng đang gõ */}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-surface border border-line/60 rounded-2xl rounded-tl-none px-4 py-2.5">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted/60"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted/60 [animation-delay:0.2s]"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted/60 [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}

            {/* Form đăng ký nhận tư vấn trực tiếp */}
            {showLeadForm && (
              <div className="flex justify-start">
                <div className="w-[85%] bg-surface border border-line/60 rounded-2xl rounded-tl-none p-4 space-y-3.5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">Đăng ký nhận tư vấn trực tiếp:</p>
                  {leadSent ? (
                    <p className="text-xs text-green-600 font-medium">✓ Đã gửi yêu cầu thành công!</p>
                  ) : (
                    <form onSubmit={submitLead} className="space-y-2">
                      <input
                        type="text"
                        name="name"
                        placeholder="Họ và tên"
                        required
                        className="w-full rounded-lg border border-line bg-bg px-3 py-2 text-xs text-content outline-none focus:border-gold focus:ring-4 focus:ring-gold/15 transition-all"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Số điện thoại"
                        required
                        className="w-full rounded-lg border border-line bg-bg px-3 py-2 text-xs text-content outline-none focus:border-gold focus:ring-4 focus:ring-gold/15 transition-all"
                      />
                      <button
                        type="submit"
                        className="w-full rounded-lg bg-gold py-2 text-xs font-bold text-black transition hover:bg-gold-400 shadow-md shadow-gold/10 hover:scale-[1.02] active:scale-[0.98] duration-200"
                      >
                        Gửi thông tin liên hệ
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Gợi ý các câu hỏi nhanh */}
          <div className="border-t border-line/50 bg-surface-2/40 backdrop-blur p-3">
            <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Gợi ý câu hỏi nhanh:</p>
            <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto pb-1">
              {rules.map((r, idx) => (
                <button
                  key={r.id || idx}
                  onClick={() => selectQuestion(r.question, r.answer)}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-content transition-all hover:border-gold hover:bg-gold/10 hover:shadow-sm"
                >
                  {r.question}
                </button>
              ))}
            </div>
          </div>

          {/* Form nhập văn bản */}
          <form onSubmit={handleSendCustom} className="flex border-t border-line/50 bg-surface p-2.5 items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              className="flex-1 bg-bg border border-line focus:border-gold rounded-full px-4.5 py-2 text-xs text-content outline-none placeholder-muted/50 focus:ring-4 focus:ring-gold/15 transition-all"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="rounded-full bg-gold hover:bg-gold-400 p-2 text-black transition-all hover:scale-105 active:scale-95 disabled:opacity-40 shadow-sm"
            >
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

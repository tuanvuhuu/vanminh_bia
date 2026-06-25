import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gluinssafzxccctueseq.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdWluc3NhZnp4Y2NjdHVlc2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMDgxOTQsImV4cCI6MjA5Nzg4NDE5NH0.cKvWtK6fzCGMpeJOfA9TGH0zrHUldfnqVkf94_DgBco'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const logInteraction = async (actionType, source) => {
  try {
    await supabase.from('consultations').insert([
      {
        name: `Khách click ${actionType}`,
        phone: 'Liên kết nhanh',
        address: source,
        message: `Khách hàng bấm liên kết trực tiếp để kết nối qua ${actionType}.`,
        status: 'Chờ liên hệ',
      }
    ])
  } catch (err) {
    console.error('Lỗi khi ghi nhận click:', err)
  }
}

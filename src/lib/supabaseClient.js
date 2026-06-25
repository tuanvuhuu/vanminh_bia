import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials in .env.local')
}

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

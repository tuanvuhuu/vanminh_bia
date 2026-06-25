import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import ws from 'ws'

if (!globalThis.WebSocket) globalThis.WebSocket = ws

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Thiếu thông tin kết nối Supabase trong file .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
  console.log('🔄 Đang cập nhật nhãn "Sản phẩm HOT" cho sản phẩm VK25...')
  try {
    const { data, error } = await supabase
      .from('products')
      .update({ badge: 'Sản phẩm HOT' })
      .eq('code', 'VK25')
      .select()

    if (error) {
      throw error
    }

    console.log('✅ Cập nhật thành công! Kết quả:', data)
  } catch (err) {
    console.error('❌ Lỗi khi cập nhật:', err.message)
    process.exit(1)
  }
}

run()

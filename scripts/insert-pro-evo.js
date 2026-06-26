import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import ws from 'ws'

if (!globalThis.WebSocket) globalThis.WebSocket = ws
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials in .env.local')
}

const supabase = createClient(supabaseUrl, supabaseKey)

const evoProduct = {
  name: 'Vikings Pro-Evo',
  code: 'VK-PRO-EVO',
  badge: 'Khuyến mãi',
  price: '60.000.000đ',
  old_price: '70.000.000đ',
  frame: 'Khung gỗ Plywood liền yếm 50mm',
  specs: ['Băng Uylin K55', 'Nỉ CPBA Competition', 'Bóng Dyna Rhodium', 'Gậy Dragon chuyên dụng'],
  size: 'Phủ bì 290×165×82cm · Sử dụng 254×127cm',
  image: '/images/sales/evo re.jpg',
  gallery: ['/images/sales/evo re.jpg']
}

async function insertProduct() {
  try {
    // Check if product already exists
    const { data: existing, error: fetchErr } = await supabase
      .from('products')
      .select('id')
      .eq('code', evoProduct.code)
      .maybeSingle()

    if (fetchErr) throw fetchErr

    if (existing) {
      console.log('Product VK-PRO-EVO already exists. Updating details...')
      const { error: updateErr } = await supabase
        .from('products')
        .update({ ...evoProduct, updated_at: new Date() })
        .eq('id', existing.id)
      
      if (updateErr) throw updateErr
      console.log('✓ Product VK-PRO-EVO updated successfully!')
    } else {
      console.log('Inserting new product VK-PRO-EVO...')
      const { error: insertErr } = await supabase
        .from('products')
        .insert([evoProduct])
      
      if (insertErr) throw insertErr
      console.log('✓ Product VK-PRO-EVO inserted successfully!')
    }
  } catch (err) {
    console.error('✗ Error:', err.message)
    process.exit(1)
  }
}

insertProduct()

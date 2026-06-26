import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import ws from 'ws'

if (!globalThis.WebSocket) globalThis.WebSocket = ws
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function check() {
  const { data, error } = await supabase.from('fake_orders').select('*').limit(1)
  if (error) {
    console.log('Table fake_orders does not exist or has error:', error.message)
  } else {
    console.log('Table fake_orders exists! Sample record:', data)
  }
}
check()

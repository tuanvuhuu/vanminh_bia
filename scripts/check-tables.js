import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import ws from 'ws'

if (!globalThis.WebSocket) globalThis.WebSocket = ws
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function check() {
  const tables = ['consultations', 'leads', 'registrations', 'contacts']
  for (const t of tables) {
    try {
      const { data, error } = await supabase.from(t).select('*').limit(1)
      if (error) {
        console.log(`Table ${t}: Error - ${error.message}`)
      } else {
        console.log(`Table ${t}: Success (exists!)`)
      }
    } catch (err) {
      console.log(`Table ${t}: Exception - ${err.message}`)
    }
  }
}

check()

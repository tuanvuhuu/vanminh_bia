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

async function addAdmin(email, password) {
  try {
    const { error } = await supabase.from('admins').insert([{ email, password_hash: password }])

    if (error) throw error

    console.log('✓ Admin account created:')
    console.log(`  Email: ${email}`)
    console.log(`  Password: ${password}`)
    console.log('\nNote: Passwords stored as plaintext (for demo). Use bcrypt in production.')
  } catch (err) {
    console.error('✗ Error:', err.message)
    process.exit(1)
  }
}

// Default admin account
const adminEmail = 'admin@vikingsbilliards.com'
const adminPassword = 'admin123456'

addAdmin(adminEmail, adminPassword)

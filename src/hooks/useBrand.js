import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { brand as fallbackBrand } from '../data/content'

// Lấy thông tin thương hiệu (singleton, id = 1)
export function useBrand(refreshTrigger) {
  const [brand, setBrand] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    supabase
      .from('brand_info')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) throw error
        if (!active) return
        if (data) {
          setBrand({
            ...fallbackBrand,
            ...data,
            phoneSales: data.phone_sales || fallbackBrand.phoneSales,
            phoneTech: data.phone_tech || fallbackBrand.phoneTech,
            logoDark: data.logo_dark || fallbackBrand.logoDark,
            logoGold: data.logo_gold || fallbackBrand.logoGold,
          })
        } else {
          setBrand(null)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Lỗi khi tải thông tin thương hiệu:', err)
        if (active) {
          setLoading(false)
        }
      })
    return () => {
      active = false
    }
  }, [refreshTrigger])

  return { brand, loading }
}

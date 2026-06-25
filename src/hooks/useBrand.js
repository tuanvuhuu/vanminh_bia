import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { brand as fallbackBrand } from '../data/content'

// Lấy thông tin thương hiệu (singleton, id = 1)
export function useBrand() {
  const [brand, setBrand] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    supabase
      .from('brand_info')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data }) => {
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
    return () => {
      active = false
    }
  }, [])

  return { brand, loading }
}

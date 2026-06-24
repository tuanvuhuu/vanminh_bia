import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import SectionTitle from './SectionTitle'

// Tiêu đề mục lấy từ bảng section_meta theo key.
// eyebrow/title/desc truyền vào là giá trị fallback (hiện ngay, DB ghi đè khi tải xong).
export default function DBSectionTitle({ sectionKey, eyebrow, title, desc, center }) {
  const [meta, setMeta] = useState({ eyebrow, title, desc })

  useEffect(() => {
    let active = true
    supabase
      .from('section_meta')
      .select('eyebrow,title,description')
      .eq('key', sectionKey)
      .maybeSingle()
      .then(({ data }) => {
        if (active && data) {
          setMeta({
            eyebrow: data.eyebrow ?? eyebrow,
            title: data.title ?? title,
            desc: data.description ?? desc,
          })
        }
      })
    return () => {
      active = false
    }
  }, [sectionKey])

  return <SectionTitle eyebrow={meta.eyebrow} title={meta.title} desc={meta.desc} center={center} />
}

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useFetchTable(tableName, orderBy = 'created_at', ascending = false) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: result, error: err } = await supabase
          .from(tableName)
          .select('*')
          .order(orderBy, { ascending })
        if (err) throw err
        setData(result || [])
      } catch (err) {
        setError(err.message)
        console.error(`Error fetching ${tableName}:`, err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [tableName, orderBy, ascending])

  return { data, loading, error }
}

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Ong } from '../types'

export function useOngs(city?: string) {
  const [ongs, setOngs] = useState<Ong[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOngs() {
      try {
        setLoading(true)
        let query = supabase.from('ongs').select('*')
        
        if (city) {
          query = query.eq('city', city)
        }

        const { data, error: supabaseError } = await query
        
        if (supabaseError) throw supabaseError
        setOngs(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOngs()
  }, [city])

  return { ongs, loading, error }
}
'use client'
import { useState, useEffect } from 'react'
import api from '@/app/lib/api'

export function useSetores() {
  const [setores, setSetores] = useState([])

  useEffect(() => {
    api.get('/setores')
       .then(res => setSetores(res.data))
       .catch(err => console.error(err))
  }, [])

  return { setores }
}
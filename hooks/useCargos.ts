'use client'
import { useState, useEffect } from 'react'
import api from '@/app/lib/api'

export function useCargos() {
  const [cargos, setCargos] = useState([])

  useEffect(() => {
    api.get('/cargos')
       .then(res => setCargos(res.data))
       .catch(err => console.error(err))
  }, [])

  return { cargos }
}
'use client'
import { useState, useEffect } from 'react'
import api from '@/app/lib/api'

export function useAlertas() {
  const [alertas, setAlertas] = useState([])
  const [loading, setLoading] = useState(true)

  const carregarAlertas = async () => {
    try {
      setLoading(true)
      const res = await api.get('/alertas')
      setAlertas(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarAlertas()
  }, [])

  const enviarAlerta = async (dados: { assunto: string; id_pessoa: number }) => {
    const res = await api.post('/alertas', dados)
    await carregarAlertas()
    return res.data
  }

  return { alertas, loading, enviarAlerta, refetch: carregarAlertas }
}
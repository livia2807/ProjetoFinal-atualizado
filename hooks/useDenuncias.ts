'use client'
import { useState, useEffect } from 'react'
import api from '@/app/lib/api'

export function useDenuncias() {
  const [denuncias, setDenuncias] = useState([])
  const [loading, setLoading] = useState(true)

  const carregarDenuncias = async () => {
    try {
      setLoading(true)
      const res = await api.get('/denuncias')
      setDenuncias(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarDenuncias()
  }, [])

  const criarDenuncia = async (dados: { assunto: string; id_pessoa: number; id_setor: number }) => {
    const res = await api.post('/denuncias', dados)
    await carregarDenuncias()
    return res.data
  }

  const atualizarStatus = async (id: number, dados: any) => {
    await api.put(`/denuncias/${id}`, dados)
    await carregarDenuncias()
  }

  return { denuncias, loading, criarDenuncia, atualizarStatus }
}
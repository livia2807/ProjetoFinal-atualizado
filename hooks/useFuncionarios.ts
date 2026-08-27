'use client'
import { useState, useEffect } from 'react'
import api from '@/app/lib/api'

export function useFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const carregarFuncionarios = async () => {
    try {
      setLoading(true)
      const res = await api.get('/pessoas')
      setFuncionarios(res.data)
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar funcionários')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarFuncionarios()
  }, [])

  return { funcionarios, loading, error, refetch: carregarFuncionarios }
}
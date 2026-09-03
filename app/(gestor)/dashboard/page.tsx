'use client'
import { useEffect, useState } from 'react'
import EstatisticasDashboard from '@/components/gestor/EstatisticasDashboard'
import api from '@/app/lib/api'

export default function DashboardPage() {
  const [data, setData] = useState({
    totalFuncionarios: 0,
    totalDenuncias: 0,
    totalAlertas: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregar() {
      try {
        const [funcRes, denRes] = await Promise.all([
          api.get('/pessoas'),
          api.get('/denuncias')
        ])
        setData({
          totalFuncionarios: funcRes.data.length || 0,
          totalDenuncias: denRes.data.length || 0,
          totalAlertas: denRes.data.filter((d: any) => d.status === 'alerta').length || 0,
        })
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error)
      } finally {
        setLoading(false)
      }
    }
    carregar()
  }, [])

  if (loading) {
    return <p className="text-[#777777]">Carregando...</p>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-[#444444] mb-1">Visão Geral</h2>
        <p className="text-[#777777] text-sm">Monitoramento em tempo real da empresa</p>
      </div>
      <EstatisticasDashboard 
        totalFuncionarios={data.totalFuncionarios} 
        totalDenuncias={data.totalDenuncias} 
        totalAlertas={data.totalAlertas}
      />
    </div>
  )
}

/*import api from '@/app/lib/api'
import EstatisticasDashboard from '@/components/gestor/EstatisticasDashboard'

// Função que roda no servidor do Next.js
async function getDashboardData() {
  // Chamadas paralelas para otimizar o tempo de resposta
  const [funcRes, denRes] = await Promise.all([
    api.get('/pessoas'),
    api.get('/denuncias')
  ])
  return {
    totalFuncionarios: funcRes.data.length,
    totalDenuncias: denRes.data.length
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-[#444444] mb-1">Visão Geral</h2>
        <p className="text-[#777777] text-sm">Monitoramento em tempo real da empresa</p>
      </div>
      <EstatisticasDashboard 
        totalFuncionarios={data.totalFuncionarios} 
        totalDenuncias={data.totalDenuncias} 
      />
    </div>
  )
}*/
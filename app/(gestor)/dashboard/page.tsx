'use client'
import { useEffect, useState } from 'react'
import EstatisticasDashboard from '@/components/gestor/EstatisticasDashboard'
import GraficoPizza from '@/components/gestor/GraficoPizza'
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
        const [funcRes, denRes, alertasRes] = await Promise.all([
          api.get('/pessoas'),
          api.get('/denuncias'),
          api.get('/alertas'),
        ])

        const funcionarios = Array.isArray(funcRes.data) ? funcRes.data : []
        const denuncias = Array.isArray(denRes.data) ? denRes.data : []
        const alertas = Array.isArray(alertasRes.data) ? alertasRes.data : []

        console.log('ALERTAS DA API:', alertas) // ← veja no console do navegador (F12)

        setData({
          totalFuncionarios: funcionarios.length,
          totalDenuncias: denuncias.length,
          totalAlertas: alertas.length,
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
      <GraficoPizza
        totalFuncionarios={data.totalFuncionarios}
        totalDenuncias={data.totalDenuncias}
        totalAlertas={data.totalAlertas}
      />
    </div>
  )
}
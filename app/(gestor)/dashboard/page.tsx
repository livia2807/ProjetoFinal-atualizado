import api from '@/app/lib/api'
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
}
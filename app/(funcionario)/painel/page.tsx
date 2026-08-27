'use client'
import Link from 'next/link'
import { useAlertas } from '@/hooks/useAlertas'

export default function FuncionarioPainelPage() {
  const { alertas, loading } = useAlertas()
  
  // Mock de sessão: filtrando alertas para o id_pessoa 1 (substitua pelo contexto de auth real)
  const meusAlertas = alertas.filter((a: any) => a.id_pessoa === 1)

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl text-[#444444] mb-1">Painel do Funcionário</h2>
        <p className="text-[#777777] text-sm">Acompanhe seus avisos e registre riscos</p>
      </div>

      {!loading && meusAlertas.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
          <h3 className="font-700 text-amber-800 text-sm mb-2">Alertas Recebidos da Gestão:</h3>
          {meusAlertas.map((a: any) => (
            <div key={a.id} className="text-amber-900 text-sm mb-1 flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
              {a.assunto}
            </div>
          ))}
        </div>
      )}

      <Link 
        href="/denuncias/nova"
        className="block w-full bg-[#777777] hover:bg-[#555555] text-white rounded-2xl p-5 transition-colors group"
      >
        <div className="font-700 text-sm">Registrar Nova Denúncia</div>
        <div className="text-white/70 text-xs mt-0.5">Reportar área ou situação de risco identificada</div>
      </Link>
    </div>
  )
}
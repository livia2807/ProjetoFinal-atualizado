'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAlertas } from '@/hooks/useAlertas'

export default function FuncionarioPainelPage() {
  const router = useRouter()
  const { alertas, loading } = useAlertas()
  const [idPessoa, setIdPessoa] = useState<number | null>(null)

  useEffect(() => {
    const idSalvo = localStorage.getItem('funcionarioId')
    if (idSalvo) {
      setIdPessoa(Number(idSalvo))
    } else {
      router.push('/')
    }
  }, [router])

  const meusAlertas = alertas.filter(
    (a: any) => Number(a.id_pessoa) === Number(idPessoa)
  )

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl text-[#1a3c2a] mb-1">Painel do Funcionário</h2>
        <p className="text-[#5a6b5f] text-sm">Acompanhe seus avisos e registre riscos</p>
      </div>

      {!loading && meusAlertas.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
          <h3 className="font-700 text-amber-800 text-sm mb-2">Alertas recebidos da gestão</h3>
          {meusAlertas.map((a: any) => (
            <div key={a.id} className="text-amber-900 text-sm mb-1 flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
              {a.assunto}
            </div>
          ))}
        </div>
      )}

      {!loading && meusAlertas.length === 0 && (
        <div className="bg-white border border-[#d8e5dc] rounded-2xl p-4 text-sm text-[#5a6b5f]">
          Nenhum alerta no momento.
        </div>
      )}

      <Link
        href="/denuncias/nova"
        className="block w-full bg-[#777777] hover:bg-[#555555]text-white rounded-2xl p-5 transition-colors"
      >
        <div className="font-700 text-sm">Registrar nova denúncia</div>
        <div className="text-white/70 text-xs mt-0.5"> Reportar área ou situação de risco identificada   </div>
      </Link>
    </div>
  )
}
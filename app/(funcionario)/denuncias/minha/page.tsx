'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/lib/api'

export default function MinhasDenunciasPage() {
  const router = useRouter()
  const [lista, setLista] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = localStorage.getItem('funcionarioId')
    if (!id) {
      router.push('/entrar')
      return
    }
    api
      .get('/denuncias')
      .then((res) => {
        const minhas = (res.data || []).filter(
          (d: any) => Number(d.id_pessoa) === Number(id)
        )
        setLista(minhas)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [router])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl text-[#1a1a1a]">Minhas Denúncias</h1>
        <p className="text-sm text-[#6b6b6b] mt-0.5">
          {loading ? 'Carregando...' : `${lista.length} registro${lista.length !== 1 ? 's' : ''} encontrado${lista.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-[#9a9a9a]">Carregando...</p>
      ) : lista.length === 0 ? (
        <div className="rs-panel p-8 text-center text-sm text-[#9a9a9a]">
          Você ainda não enviou denúncias.
        </div>
      ) : (
        <div className="space-y-3">
          {lista.map((d) => (
            <div key={d.id} className="rs-panel p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-600 text-[#1a1a1a]">
                    {d.setor?.nome || 'Setor'} — Denúncia #{d.id}
                  </div>
                  <p className="text-xs text-[#6b6b6b] mt-1 leading-relaxed">{d.assunto}</p>
                </div>
                <span className="rs-badge rs-badge-analise shrink-0">Em análise</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
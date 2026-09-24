'use client'

import { useEffect, useState } from 'react'
import { useDenuncias } from '@/hooks/useDenuncias'

type StatusKanban = 'a_fazer' | 'em_andamento' | 'concluido' | 'validacao'

interface CardKanban {
  id: number
  assunto: string
  pessoa?: { nome?: string }
  setor?: { nome?: string }
  status: StatusKanban
}

const COLUNAS: { id: StatusKanban; titulo: string; cor: string }[] = [
  { id: 'a_fazer', titulo: 'A fazer', cor: 'bg-slate-100 border-slate-300' },
  { id: 'em_andamento', titulo: 'Em andamento', cor: 'bg-amber-50 border-amber-300' },
  { id: 'concluido', titulo: 'Concluído', cor: 'bg-emerald-50 border-emerald-300' },
  { id: 'validacao', titulo: 'Validação', cor: 'bg-blue-50 border-blue-300' },
]

const STORAGE_KEY = 'kanban-statuses'

export default function KanbanPage() {
  const { denuncias, loading } = useDenuncias()
  const [cards, setCards] = useState<CardKanban[]>([])

  // Carrega os status salvos do localStorage
  const getSavedStatuses = (): Record<number, StatusKanban> => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  }

  // Salva os status no localStorage
  const saveStatuses = (cardsToSave: CardKanban[]) => {
    const statuses: Record<number, StatusKanban> = {}
    cardsToSave.forEach((c) => {
      statuses[c.id] = c.status
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses))
  }

  useEffect(() => {
    if (denuncias.length > 0) {
      const savedStatuses = getSavedStatuses()

      setCards(
        denuncias.map((d: any) => ({
          id: d.id,
          assunto: d.assunto,
          pessoa: d.pessoa,
          setor: d.setor,
          // Prioriza o status salvo no localStorage, senão usa o do backend
          status: savedStatuses[d.id] || (d.status as StatusKanban) || 'a_fazer',
        }))
      )
    }
  }, [denuncias])

  const moverCard = (id: number, novoStatus: StatusKanban) => {
    setCards((prev) => {
      const updated = prev.map((c) =>
        c.id === id ? { ...c, status: novoStatus } : c
      )
      saveStatuses(updated) // Persiste imediatamente
      return updated
    })
  }

  const cardsPorColuna = (status: StatusKanban) =>
    cards.filter((c) => c.status === status)

  if (loading) {
    return <p className="text-[#777777]">Carregando quadro Kanban...</p>
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl text-[#444444] mb-1">Quadro Kanban</h2>
        <p className="text-[#777777] text-sm">
          Acompanhe e organize as denúncias de risco em etapas
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1">
        {COLUNAS.map((coluna) => {
          const itens = cardsPorColuna(coluna.id)
          return (
            <div
              key={coluna.id}
              className={`flex-shrink-0 w-64 rounded-2xl border ${coluna.cor} p-3 flex flex-col max-h-[70vh]`}
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="font-700 text-sm text-[#444444]">{coluna.titulo}</h3>
                <span className="text-xs font-600 bg-white/80 text-[#777777] rounded-full px-2 py-0.5">
                  {itens.length}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2">
                {itens.length === 0 && (
                  <p className="text-xs text-[#999999] text-center py-6">
                    Nenhum item
                  </p>
                )}

                {itens.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white rounded-xl border border-[#e0e0e0] p-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <p className="font-700 text-sm text-[#444444] mb-1 leading-snug">
                      {card.assunto}
                    </p>
                    <p className="text-xs text-[#777777] mb-3">
                      {card.pessoa?.nome || 'Funcionário'} · {card.setor?.nome || 'Setor'}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {COLUNAS.filter((c) => c.id !== card.status).map((destino) => (
                        <button
                          key={destino.id}
                          onClick={() => moverCard(card.id, destino.id)}
                          className="text-[10px] font-600 px-2 py-1 rounded-lg bg-[#f5f5f5] text-[#555555] hover:bg-[#e8e8e8] transition-colors"
                          title={`Mover para ${destino.titulo}`}
                        >
                          → {destino.titulo}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-[#999999]">
        Os status são gerenciados visualmente nesta página e salvos localmente.
      </p>
    </div>
  )
}
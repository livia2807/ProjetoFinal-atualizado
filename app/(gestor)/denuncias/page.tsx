'use client'
import { useDenuncias } from '@/hooks/useDenuncias'

export default function GestorDenunciasPage() {
  const { denuncias, loading } = useDenuncias()

  if (loading) return <div className="text-[#777777]">Carregando denúncias...</div>

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl text-[#444444] mb-1">Denúncias de Risco</h2>
        <p className="text-[#777777] text-sm">{denuncias.length} registros no total</p>
      </div>
      <div className="space-y-3">
        {denuncias.map((d: any) => (
          <div key={d.id} className="bg-white rounded-2xl border border-[#e0e0e0] p-4">
            <div className="font-700 text-[#444444] text-sm mb-1">{d.assunto}</div>
            <div className="text-xs text-[#777777] mb-2">
              Por: {d.pessoa?.nome || 'Desconhecido'} &middot; Setor: {d.setor?.nome || 'N/A'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
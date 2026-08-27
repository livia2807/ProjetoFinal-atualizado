'use client'
import { useState } from 'react'
import { useAlertas } from '@/hooks/useAlertas'
import { useFuncionarios } from '@/hooks/useFuncionarios'

export default function GestorAlertasPage() {
  const { alertas, loading, enviarAlerta } = useAlertas()
  const { funcionarios } = useFuncionarios()
  const [assunto, setAssunto] = useState('')
  const [idPessoa, setIdPessoa] = useState('')

  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!assunto || !idPessoa) return
    await enviarAlerta({ assunto, id_pessoa: Number(idPessoa) })
    setAssunto('')
    setIdPessoa('')
  }

  if (loading) return <div className="text-[#777777]">Carregando alertas...</div>

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-[#444444] mb-1">Alertas Enviados</h2>
        <p className="text-[#777777] text-sm">Histórico e envio de novos alertas</p>
      </div>

      <form onSubmit={handleEnviar} className="bg-white rounded-2xl border border-[#e0e0e0] p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-700 text-[#777777] uppercase mb-2">Funcionário</label>
            <select
              value={idPessoa}
              onChange={e => setIdPessoa(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#e0e0e0] text-sm bg-[#fafafa]"
              required
            >
              <option value="">Selecione...</option>
              {funcionarios.map((f: any) => (
                <option key={f.id} value={f.id}>{f.nome}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-700 text-[#777777] uppercase mb-2">Mensagem</label>
            <input
              type="text"
              value={assunto}
              onChange={e => setAssunto(e.target.value)}
              placeholder="Ex: Risco na área de colheita"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#e0e0e0] text-sm bg-[#fafafa]"
              required
            />
          </div>
        </div>
        <button type="submit" className="w-full py-3 rounded-xl bg-amber-500 text-white font-700 hover:bg-amber-600">
          Disparar Alerta
        </button>
      </form>

      <div className="space-y-3">
        {alertas.map((a: any) => (
          <div key={a.id} className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="font-700 text-[#444444] text-sm">Para: {a.pessoa?.nome || 'Desconhecido'}</div>
            <p className="text-amber-900 text-sm mt-1">{a.assunto}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
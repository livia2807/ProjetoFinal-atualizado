'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/lib/api'
import Swal from 'sweetalert2'

const CATEGORIAS = [
  'Elétrico',
  'Via irregular',
  'Derramamento',
  'Estrutural',
  'Sinalização',
  'Armazenamento',
  'Equipamento',
  'Outro',
]

export default function FormularioDenuncia() {
  const router = useRouter()
  const [local, setLocal] = useState('')
  const [categoria, setCategoria] = useState('')
  const [grau, setGrau] = useState('')
  const [assunto, setAssunto] = useState('')
  const [submetendo, setSubmetendo] = useState(false)
  const [idPessoa, setIdPessoa] = useState<number | null>(null)
  const [historico, setHistorico] = useState<any[]>([])
  const [carregandoHistorico, setCarregandoHistorico] = useState(true)

  useEffect(() => {
    const idSalvo = localStorage.getItem('funcionarioId')
    if (idSalvo) {
      setIdPessoa(Number(idSalvo))
    } else {
      router.push('/entrar')
    }
  }, [router])

  const carregarHistorico = async (id: number) => {
    try {
      setCarregandoHistorico(true)
      const res = await api.get('/denuncias')
      const minhas = (res.data || []).filter(
        (d: any) => Number(d.id_pessoa) === Number(id)
      )
      setHistorico(minhas)
    } catch (error) {
      console.error('Erro ao carregar histórico:', error)
    } finally {
      setCarregandoHistorico(false)
    }
  }

  useEffect(() => {
    if (idPessoa) carregarHistorico(idPessoa)
  }, [idPessoa])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!idPessoa) return
    setSubmetendo(true)
    try {
      const descricao = [
        local && `Local: ${local}`,
        categoria && `Categoria: ${categoria}`,
        grau && `Grau: ${grau}`,
        assunto && `Descrição: ${assunto}`,
      ]
        .filter(Boolean)
        .join(' | ')

      await api.post('/denuncias', {
        assunto: descricao || assunto,
        id_pessoa: idPessoa,
        id_setor: 1,
      })

      await Swal.fire({
        icon: 'success',
        title: 'Denúncia enviada!',
        timer: 1800,
        showConfirmButton: false,
      })

      setLocal('')
      setCategoria('')
      setGrau('')
      setAssunto('')
      await carregarHistorico(idPessoa)
    } catch (error: any) {
      Swal.fire('Erro', error.response?.data?.erro || 'Falha ao enviar', 'error')
    } finally {
      setSubmetendo(false)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="rs-panel p-6 space-y-5">
        <div>
          <label className="rs-label">
            Local / Área de Risco <span className="text-[#e85d5d]">*</span>
          </label>
          <input
            className="rs-input"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder="Ex: Setor A - Próximo ao galpão"
            required
          />
        </div>

        <div>
          <label className="rs-label">
            Categoria <span className="text-[#e85d5d]">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIAS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategoria(c)}
                className={`rs-chip ${categoria === c ? 'rs-chip-active' : ''}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="rs-label">
            Grau de Risco <span className="text-[#e85d5d]">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { v: 'Baixo', cls: 'rs-risk-baixo' },
              { v: 'Médio', cls: 'rs-risk-medio' },
              { v: 'Alto', cls: 'rs-risk-alto' },
            ].map((g) => (
              <button
                key={g.v}
                type="button"
                onClick={() => setGrau(g.v)}
                className={`rs-risk ${g.cls} ${grau === g.v ? 'rs-risk-active' : ''}`}
              >
                {g.v}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="rs-label">
            Descrição <span className="text-[#e85d5d]">*</span>
          </label>
          <textarea
            className="rs-input min-h-[100px] resize-none"
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            placeholder="Descreva com detalhes a situação de risco observada..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={!local || !categoria || !grau || !assunto || submetendo}
          className="rs-btn rs-btn-green w-full py-3"
        >
          {submetendo ? 'Enviando...' : 'Enviar denúncia'}
        </button>
      </form>

      {/* Histórico*/}
      <div className="bg-white rounded-2xl border border-[#e0e0e0] p-5">
        <h3 className="font-bold text-[#444444] text-sm mb-4">
          Minhas denúncias enviadas
        </h3>

        {carregandoHistorico ? (
          <p className="text-[#777777] text-sm">Carregando histórico...</p>
        ) : historico.length === 0 ? (
          <p className="text-[#777777] text-sm">
            Você ainda não enviou nenhuma denúncia.
          </p>
        ) : (
          <div className="space-y-3">
            {historico.map((denuncia: any) => (
              <div
                key={denuncia.id}
                className="border border-[#e0e0e0] rounded-xl p-4 bg-[#fafafa]"
              >
                <span className="text-xs font-bold text-[#777777]">
                  Denúncia {denuncia.id}
                </span>
                <p className="text-sm text-[#444444] mt-1">{denuncia.assunto}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/lib/api'
import Swal from 'sweetalert2'

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
    // Pega o funcionário que fez login
    const idSalvo = localStorage.getItem('funcionarioId')
    if (idSalvo) {
      setIdPessoa(Number(idSalvo))
    } else {
      // Se não tiver logado, volta para o login
      router.push('/')
    }
  }, [router])

  // Carrega o histórico de denúncias do funcionário
  const carregarHistorico = async (id: number) => {
    try {
      setCarregandoHistorico(true)
      const res = await api.get('/denuncias')
      // Filtra só as denúncias deste funcionário
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
    if (idPessoa) {
      carregarHistorico(idPessoa)
    }
  }, [idPessoa])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!idPessoa) {
      Swal.fire('Erro', 'Funcionário não identificado. Faça login novamente.', 'error')
      return
    }

    setSubmetendo(true)

    try {
      await api.post('/denuncias', {
        assunto,
        id_pessoa: idPessoa,
        id_setor: 1 
      })

      await Swal.fire({
        icon: 'success',
        title: 'Denúncia enviada!',
        text: 'Sua denúncia foi registrada com sucesso.',
        timer: 2000,
        showConfirmButton: false
      })

 setAssunto('') // limpa o campo
      await carregarHistorico(idPessoa) // atualiza o histórico
    } catch (error: any) {
      console.error(error)
      const mensagem = error.response?.data?.erro || 'Não foi possível enviar a denúncia.'
      Swal.fire('Erro', mensagem, 'error')
    } finally {
      setSubmetendo(false)
    }
  }

  return (
    <div className="space-y-4">

      {/* Formulário */}
      {/*local*/}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-[#e0e0e0] p-5 space-y-4"
      >
        <div>
          <label className="block text-xs font-bold text-[#777777] uppercase tracking-widest mb-2">
            LOCAL / ÁREA DE RISCO
          </label>

          <textarea
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            placeholder="Ex: Setor A - Próximo ao galpão"
            rows={4}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-[#e0e0e0] focus:border-[#777777] text-sm bg-[#fafafa] outline-none transition-colors resize-none"
          />
        </div>
        {/*categoria*/}
        <div>
          <label className="block text-xs font-bold text-[#777777] uppercase tracking-widest mb-2">
            CATEGORIA
          </label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-[#e0e0e0] focus:border-[#777777] text-sm bg-[#fafafa] outline-none transition-colors"
          >
            <option value="">Selecione uma categoria</option>
            <option value="Elétrico">Elétrico</option>
            <option value="Armazenamento">Armazenamento</option>
            <option value="Equipamentos">Equipamentos</option>
            <option value="Estrutural">Estrutural</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        
        {/*grau*/}
        <div>
          <label className="block text-xs font-bold text-[#777777] uppercase tracking-widest mb-2">
            GRAU DE RISCO
          </label>
          <select
            value={grau}
            onChange={(e) => setGrau(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-[#e0e0e0] focus:border-[#777777] text-sm bg-[#fafafa] outline-none transition-colors"
          >
            <option value="">Selecione o grau de risco</option>
            <option value="Baixo">Baixo</option>
            <option value="Médio">Médio</option>
            <option value="Alto">Alto</option>
          </select>
        </div>
      {/*descrição*/}
        <div>
          <label className="block text-xs font-bold text-[#777777] uppercase tracking-widest mb-2">
            DESCRIÇÃO
          </label>

          <textarea
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            placeholder="Descreva a situação de risco identificada, incluindo detalhes relevantes."
            rows={4}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-[#e0e0e0] focus:border-[#777777] text-sm bg-[#fafafa] outline-none transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={!assunto || submetendo || !idPessoa}
          className="w-full py-3.5 rounded-xl bg-[#777777] text-white font-bold text-sm disabled:opacity-40 hover:bg-[#555555] transition-colors"
        >
          {submetendo ? 'Enviando...' : 'Enviar Denúncia'}
        </button>
      </form>

      {/* Histórico */}
      <div className="bg-white rounded-2xl border border-[#e0e0e0] p-5">
        <h3 className="font-bold text-[#444444] text-sm mb-4">
          Minhas denúncias enviadas
        </h3>

        {carregandoHistorico ? (
          <p className="text-[#777777] text-sm">
            Carregando histórico...
          </p>
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
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#777777]">
                    Denúncia {denuncia.id}
                  </span>
                </div>

                <p className="text-sm text-[#444444]">
                  {denuncia.assunto}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
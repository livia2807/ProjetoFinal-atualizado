'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/lib/api'
import Swal from 'sweetalert2'

export default function FormularioDenuncia() {
  const router = useRouter()
  const [assunto, setAssunto] = useState('')
  const [submetendo, setSubmetendo] = useState(false)
  const [idPessoa, setIdPessoa] = useState<number | null>(null) 
  

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

      router.push('/painel')
    } catch (error: any) {
      console.error(error)
      const mensagem = error.response?.data?.erro || 'Não foi possível enviar a denúncia.'
      Swal.fire('Erro', mensagem, 'error')
    } finally {
      setSubmetendo(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#e0e0e0] p-5 space-y-4">
      <div>
        <label className="block text-xs font-700 text-[#777777] uppercase tracking-widest mb-2">
          Relato / Assunto *
        </label>
        <textarea
          value={assunto}
          onChange={e => setAssunto(e.target.value)}
          placeholder="Descreva com detalhes a situação observada..."
          rows={4}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-[#e0e0e0] focus:border-[#777777] text-sm bg-[#fafafa] outline-none transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={!assunto || submetendo || !idPessoa}
        className="w-full py-3.5 rounded-xl bg-[#777777] text-white font-700 text-sm disabled:opacity-40 hover:bg-[#555555] transition-colors"
      >
        {submetendo ? 'Enviando...' : 'Enviar Denúncia'}
      </button>
    </form>
  )
}
//código antigo, caso queira voltar a versão anterior
  /*const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmetendo(true)
    try {
      await api.post('/denuncias', { 
        assunto, 
        id_pessoa: 1, // Mock temporário para contexto de usuário
        id_setor: 1 
      })
      router.push('/painel')
    } catch (error) {
      console.error(error)
    } finally {
      setSubmetendo(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#e0e0e0] p-5 space-y-4">
      <div>
        <label className="block text-xs font-700 text-[#777777] uppercase tracking-widest mb-2">
          Relato / Assunto *
        </label>
        <textarea
          value={assunto}
          onChange={e => setAssunto(e.target.value)}
          placeholder="Descreva com detalhes a situação observada..."
          rows={4}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-[#e0e0e0] focus:border-[#777777] text-sm bg-[#fafafa] outline-none transition-colors resize-none font-body"
        />
      </div>
      <button
        type="submit"
        disabled={!assunto || submetendo}
        className="w-full py-3.5 rounded-xl bg-[#777777] text-white font-700 text-sm disabled:opacity-40 hover:bg-[#555555] transition-colors"
      >
        {submetendo ? 'Enviando...' : 'Enviar Denúncia'}
      </button>
    </form>
  )
}*/
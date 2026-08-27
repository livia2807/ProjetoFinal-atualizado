'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/lib/api'

export default function FormularioDenuncia() {
  const router = useRouter()
  const [assunto, setAssunto] = useState('')
  const [submetendo, setSubmetendo] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
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
}
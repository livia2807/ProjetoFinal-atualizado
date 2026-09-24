'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import api from '@/app/lib/api'
import Swal from 'sweetalert2'

export default function CadastroGestorPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  })
  const [salvando, setSalvando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSalvando(true)

    try {
      if (form.nome.trim().length < 2) {
        throw new Error('O nome deve ter no mínimo 2 caracteres.')
      }
      if (!form.email.includes('@')) {
        throw new Error('Informe um e-mail válido.')
      }
      if (form.senha.length < 4) {
        throw new Error('A senha deve ter no mínimo 4 caracteres.')
      }
      if (form.senha !== form.confirmarSenha) {
        throw new Error('As senhas não coincidem.')
      }

      await api.post('/gestores', {
        nome: form.nome.trim(),
        email: form.email.trim().toLowerCase(),
        senha: form.senha,
      })

      await Swal.fire({
        icon: 'success',
        title: 'Gestor cadastrado!',
        text: 'Agora você pode entrar com seu e-mail e senha.',
        timer: 2000,
        showConfirmButton: false,
      })

      router.push('/entrar')
    } catch (err: any) {
      const msg =
        err.response?.data?.erro ||
        err.message ||
        'Erro ao cadastrar gestor'
      Swal.fire('Erro', msg, 'error')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#252525]">
      <header className="h-[74px] border-b border-[#e5e5e5] flex items-center justify-center">
        <Link href="/" className="font-serif text-[20px] font-medium tracking-tight">
          RotaSegura
        </Link>
      </header>

      <section className="flex justify-center px-5 py-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[480px] bg-[#f5f5f5] border border-[#dedede] rounded-[15px] px-10 py-9 shadow-sm"
        >
          <Link
            href="/"
            className="inline-flex items-center text-[#777] text-[16px] mb-8 transition hover:text-[#333]"
          >
            <span className="mr-1 text-[20px]">‹</span> Voltar
          </Link>

          <div className="mb-7">
            <p className="text-[#888] text-[13px] uppercase tracking-[0.08em] mb-2">
              Cadastro de gestor
            </p>
            <h1 className="font-serif text-[30px] leading-tight font-medium text-[#252525]">
              Novo gestor
            </h1>
            <p className="text-[#999] text-[14px] mt-2">
              Preencha os dados para criar o acesso de supervisor
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-[14px] font-medium text-[#555] mb-2">
                Nome completo
              </label>
              <input
                required
                type="text"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full h-[48px] px-4 rounded-[12px] bg-white border border-[#dedede] outline-none text-[14px] text-[#333] transition focus:border-[#999] focus:ring-1 focus:ring-[#ccc]"
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#555] mb-2">
                E-mail
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full h-[48px] px-4 rounded-[12px] bg-white border border-[#dedede] outline-none text-[14px] text-[#333] transition focus:border-[#999] focus:ring-1 focus:ring-[#ccc]"
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#555] mb-2">
                Senha
              </label>
              <input
                required
                type="password"
                value={form.senha}
                onChange={(e) => setForm({ ...form, senha: e.target.value })}
                placeholder="Mínimo 4 caracteres"
                className="w-full h-[48px] px-4 rounded-[12px] bg-white border border-[#dedede] outline-none text-[14px] text-[#333] transition focus:border-[#999] focus:ring-1 focus:ring-[#ccc]"
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#555] mb-2">
                Confirmar senha
              </label>
              <input
                required
                type="password"
                value={form.confirmarSenha}
                onChange={(e) =>
                  setForm({ ...form, confirmarSenha: e.target.value })
                }
                className="w-full h-[48px] px-4 rounded-[12px] bg-white border border-[#dedede] outline-none text-[14px] text-[#333] transition focus:border-[#999] focus:ring-1 focus:ring-[#ccc]"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Link
              href="/"
              className="flex-1 h-[48px] rounded-[12px] bg-[#e4e4e4] text-[#555] flex items-center justify-center text-[14px] font-medium transition hover:bg-[#d9d9d9]"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={salvando}
              className="flex-1 h-[48px] rounded-[12px] bg-[#6b6b6b] text-white text-[14px] font-semibold transition hover:bg-[#4a4a4a] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {salvando ? 'Salvando...' : 'Cadastrar →'}
            </button>
          </div>

          <p className="text-center text-[13px] text-[#999] mt-6">
            Já tem conta?{' '}
            <Link href="/entrar" className="text-[#555] underline hover:text-[#1a1a1a]">
              Entrar
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}
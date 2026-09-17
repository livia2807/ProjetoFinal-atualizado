'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import api from '@/app/lib/api'
import { useSetores } from '@/hooks/useSetores'
import Swal from 'sweetalert2'

export default function CadastroPage() {
  const router = useRouter()
  const { setores } = useSetores()

  const [form, setForm] = useState({
    nome: '',
    contato: '',
    email: '',
    admissao: '',
    id_setor: '',
    cargo: ''
  })

  const [salvando, setSalvando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSalvando(true)

    try {
      // 1. Cria o cargo digitado (ou pega se já existir)
      let cargoId: number

      try {
        const resCargo = await api.post('/cargos', {
          nome: form.cargo
        })

        cargoId = resCargo.data.id
      } catch {
        const resCargos = await api.get('/cargos')

        const cargoExistente = resCargos.data.find(
          (c: any) =>
            c.nome.toLowerCase() === form.cargo.toLowerCase()
        )

        if (!cargoExistente) {
          throw new Error(
            'Não foi possível criar/encontrar o cargo'
          )
        }

        cargoId = cargoExistente.id
      }

      // 2. Cadastra o funcionário
      await api.post('/pessoas', {
        nome: form.nome,
        contato: form.contato,
        email: form.email,
        admissao: new Date(form.admissao).toISOString(),
        id_cargo: cargoId,
        id_setor: Number(form.id_setor)
      })

      await Swal.fire({
        icon: 'success',
        title: 'Funcionário cadastrado!',
        timer: 1800,
        showConfirmButton: false
      })

      router.push('/funcionarios')

    } catch (err: any) {
      console.error(err)

      const msg =
        err.response?.data?.erro ||
        'Erro ao cadastrar funcionário'

      Swal.fire('Erro', msg, 'error')

    } finally {
      setSalvando(false)
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#252525]">

      {/* TOPO */}
      <header className="h-[74px] border-b border-[#e5e5e5] flex items-center justify-center">
        <div className="font-serif text-[20px] font-medium tracking-tight">
          RotaSegura
        </div>
      </header>

      {/* CONTEÚDO */}
      <section className="flex justify-center px-5 py-16">

        {/* CARD */}
        <form
          onSubmit={handleSubmit}
          className="
            w-full
            max-w-[480px]
            bg-[#f5f5f5]
            border
            border-[#dedede]
            rounded-[15px]
            px-10
            py-9
            shadow-sm
          "
        >

          {/* VOLTAR */}
          <Link
            href="/funcionarios"
            className="
              inline-flex
              items-center
              text-[#777]
              text-[16px]
              mb-8
              transition
              hover:text-[#333]
            "
          >
            <span className="mr-1 text-[20px]">‹</span>        Voltar  </Link>

          {/* TÍTULO */}
          <div className="mb-7">

            <p className="
              text-[#888]
              text-[13px]
              uppercase
              tracking-[0.08em]
              mb-2
            ">
              Cadastro de funcionário
            </p>

            <h1 className="
              font-serif
              text-[30px]
              leading-tight
              font-medium
              text-[#252525]
            ">
              Novo cadastro
            </h1>

            <p className="
              text-[#999]
              text-[14px]
              mt-2
            ">
              Preencha os dados para registrar o acesso
            </p>

          </div>

          {/* FORMULÁRIO */}
          <div className="space-y-5">

            {/* NOME */}
            <div>
              <label className="block text-[14px] font-medium text-[#555] mb-2">
                Nome completo
              </label>

              <input
                required
                className="
                  w-full
                  h-[48px]
                  px-4
                  rounded-[12px]
                  bg-white
                  border
                  border-[#dedede]
                  outline-none
                  text-[14px]
                  text-[#333]
                  transition
                  focus:border-[#999]
                  focus:ring-1
                  focus:ring-[#ccc]
                "
                type="text"
                value={form.nome}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nome: e.target.value
                  })
                }
              />
            </div>

            {/* CONTATO */}
            <div>
              <label className="block text-[14px] font-medium text-[#555] mb-2">
                Contato
              </label>

              <input
                required
                className="
                  w-full
                  h-[48px]
                  px-4
                  rounded-[12px]
                  bg-white
                  border
                  border-[#dedede]
                  outline-none
                  text-[14px]
                  text-[#333]
                  transition
                  focus:border-[#999]
                  focus:ring-1
                  focus:ring-[#ccc]
                "
                type="text"
                value={form.contato}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contato: e.target.value
                  })
                }
                placeholder="(XX) XXXXX-XXXX"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-[14px] font-medium text-[#555] mb-2">
                E-mail
              </label>

              <input
                required
                className="
                  w-full
                  h-[48px]
                  px-4
                  rounded-[12px]
                  bg-white
                  border
                  border-[#dedede]
                  outline-none
                  text-[14px]
                  text-[#333]
                  transition
                  focus:border-[#999]
                  focus:ring-1
                  focus:ring-[#ccc]
                "
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value
                  })
                }
              />
            </div>

            {/* DATA */}
            <div>
              <label className="block text-[14px] font-medium text-[#555] mb-2">
                Data de admissão
              </label>

              <input
                required
                className="
                  w-full
                  h-[48px]
                  px-4
                  rounded-[12px]
                  bg-white
                  border
                  border-[#dedede]
                  outline-none
                  text-[14px]
                  text-[#333]
                  transition
                  focus:border-[#999]
                  focus:ring-1
                  focus:ring-[#ccc]
                "
                type="date"
                value={form.admissao}
                onChange={(e) =>
                  setForm({
                    ...form,
                    admissao: e.target.value
                  })
                }
              />
            </div>

            {/* CARGO */}
            <div>
              <label className="block text-[14px] font-medium text-[#555] mb-2">
                Cargo
              </label>

              <input
                required
                className="
                  w-full
                  h-[48px]
                  px-4
                  rounded-[12px]
                  bg-white
                  border
                  border-[#dedede]
                  outline-none
                  text-[14px]
                  text-[#333]
                  transition
                  focus:border-[#999]
                  focus:ring-1
                  focus:ring-[#ccc]
                "
                type="text"
                value={form.cargo}
                onChange={(e) =>
                  setForm({
                    ...form,
                    cargo: e.target.value
                  })
                }
                placeholder="Ex: Operador, Supervisor..."
              />
            </div>

            {/* SETOR */}
            <div>
              <label className="block text-[14px] font-medium text-[#555] mb-2">
                Setor
              </label>

              <select
                required
                className="
                  w-full
                  h-[48px]
                  px-4
                  rounded-[12px]
                  bg-white
                  border
                  border-[#dedede]
                  outline-none
                  text-[14px]
                  text-[#555]
                  transition
                  focus:border-[#999]
                  focus:ring-1
                  focus:ring-[#ccc]
                  cursor-pointer
                "
                value={form.id_setor}
                onChange={(e) =>
                  setForm({
                    ...form,
                    id_setor: e.target.value
                  })
                }
              >
                <option value="">
                  Selecione...
                </option>

                {setores.map((s: any) => (
                  <option
                    key={s.id}
                    value={s.id}
                  >
                    {s.nome}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* BOTÕES */}
          <div className="
            flex
            gap-3
            mt-8
          ">

            <Link
              href="/funcionarios"
              className="
                flex-1
                h-[48px]
                rounded-[12px]
                bg-[#e4e4e4]
                text-[#555]
                flex
                items-center
                justify-center
                text-[14px]
                font-medium
                transition
                hover:bg-[#d9d9d9]
              "
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={salvando}
              className="
                flex-1
                h-[48px]
                rounded-[12px]
                bg-[#b5b5b5]
                text-white
                text-[14px]
                font-semibold
                transition
                hover:bg-[#999]
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {salvando
                ? 'Salvando...'
                : 'Salvar →'}
            </button>

          </div>

        </form>

      </section>

    </main>
  )
}

/*'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import api from '@/app/lib/api'
import { useSetores } from '@/hooks/useSetores'
import { useCargos } from '@/hooks/useCargos'
import Swal from 'sweetalert2'

export default function CadastroPage() {
  const router = useRouter()
  const { setores } = useSetores()
  const [form, setForm] = useState({
    nome: '', 
    contato: '', 
    email: '', 
    admissao: '', 
    id_setor: '', 
    cargo: ''
  })
  const [salvando, setSalvando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSalvando(true)

    try {
      // 1. Cria o cargo digitado (ou pega se já existir)
      let cargoId: number
      try {
        const resCargo = await api.post('/cargos', { nome: form.cargo })
        cargoId = resCargo.data.id
      } catch {
        const resCargos = await api.get('/cargos')
        const cargoExistente = resCargos.data.find(
          (c: any) => c.nome.toLowerCase() === form.cargo.toLowerCase()
        )
        if (!cargoExistente) throw new Error('Não foi possível criar/encontrar o cargo')
        cargoId = cargoExistente.id
      }

      // 2. Cadastra o funcionário
      await api.post('/pessoas', {
        nome: form.nome,
        contato: form.contato,
        email: form.email,
        admissao: new Date(form.admissao).toISOString(),
        id_cargo: cargoId,
        id_setor: Number(form.id_setor)
      })

      await Swal.fire({
        icon: 'success',
        title: 'Funcionário cadastrado!',
        timer: 1800,
        showConfirmButton: false
      })

      router.push('/funcionarios')
    } catch (err: any) {
      console.error(err)
      const msg = err.response?.data?.erro || 'Erro ao cadastrar funcionário'
      Swal.fire('Erro', msg, 'error')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <main className="rs-page">
      <header className="rs-topbar">
        <div className="rs-brand">RotaSegura</div>
      </header>
      <section className="rs-content">
        <form onSubmit={handleSubmit} className="rs-card rs-form-card">
          <p className="rs-eyebrow">Cadastro de funcionário</p>
          <h1 className="rs-title">Novo cadastro</h1>
          <p className="rs-subtitle">Preencha os dados para registrar o acesso</p>
          
          <div className="rs-form-grid">
            <div className="rs-field rs-field-full">
              <label className="rs-label">Nome completo</label>
              <input required className="rs-input" type="text" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} />
            </div>

            <div className="rs-field">
              <label className="rs-label">Contato</label>
              <input required className="rs-input" type="text" value={form.contato} onChange={e => setForm({...form, contato: e.target.value})} placeholder="(XX) XXXXX-XXXX" />
            </div>

            <div className="rs-field rs-field-full">
              <label className="rs-label">E-mail</label>
              <input required className="rs-input" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>

            <div className="rs-field">
              <label className="rs-label">Data de admissão</label>
              <input required className="rs-input" type="date" value={form.admissao} onChange={e => setForm({...form, admissao: e.target.value})} />
            </div>

            {/* Cargo agora é input de texto */
            /*<div className="rs-field">
              <label className="rs-label">Cargo</label>
              <input required className="rs-input" type="text" value={form.cargo}  onChange={e => setForm({ ...form, cargo: e.target.value })} placeholder="Ex: Operador, Supervisor..."/>
            </div>

            <div className="rs-field">
              <label className="rs-label">Setor</label>
              <select required className="rs-input" value={form.id_setor} onChange={e => setForm({ ...form, id_setor: e.target.value })}>
                <option value="">Selecione...</option>
                {setores.map((s: any) => (
                  <option key={s.id} value={s.id}>{s.nome}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="rs-form-actions flex items-center gap-3 mt-7">
            <Link href="/funcionarios" className="px-8 py-3 rounded-xl bg-amber-500 text-white font-700 hover:bg-amber-600">Voltar</Link>
            <button type="submit" className="px-8 py-3 rounded-xl bg-amber-500 text-white font-700 hover:bg-amber-600" disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}*/
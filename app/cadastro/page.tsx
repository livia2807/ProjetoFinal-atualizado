'use client'
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
    nome: '', contato: '', email: '', admissao: '', id_setor: '', cargo: ''
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

            {/* Cargo agora é input de texto */}
            <div className="rs-field">
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

          <div className="rs-form-actions">
            <Link href="/funcionarios" className="rs-link-back">Voltar</Link>
            <button type="submit" className="rs-btn-primary" disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar'}
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

export default function CadastroPage() {
  const router = useRouter()
  const { setores } = useSetores()
  const { cargos } = useCargos()
  const [form, setForm] = useState({
    nome: '', contato: '', email: '', admissao: '', id_setor: '', id_cargo: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/pessoas', {
        ...form,
        id_setor: Number(form.id_setor),
        id_cargo: Number(form.id_cargo),
        admissao: new Date(form.admissao).toISOString()
      })
      router.push('/')
    } catch (err) {
      console.error(err)
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
              <input required className="rs-input" type="text" value={form.contato} onChange={e => setForm({...form, contato: e.target.value})} />
            </div>
            <div className="rs-field rs-field-full">
              <label className="rs-label">E-mail</label>
              <input required className="rs-input" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div className="rs-field">
              <label className="rs-label">Data de admissão</label>
              <input required className="rs-input" type="date" value={form.admissao} onChange={e => setForm({...form, admissao: e.target.value})} />
            </div>
            <div className="rs-field">
              <label className="rs-label">Cargo</label>
              <select required className="rs-select" value={form.id_cargo} onChange={e => setForm({...form, id_cargo: e.target.value})}>
                <option value="" disabled>Selecione...</option>
                {cargos.map((c: any) => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
            <div className="rs-field">
              <label className="rs-label">Setor</label>
              <select required className="rs-select" value={form.id_setor} onChange={e => setForm({...form, id_setor: e.target.value})}>
                <option value="" disabled>Selecione...</option>
                {setores.map((s: any) => <option key={s.id} value={s.id}>{s.nome}</option>)}
              </select>
            </div>
          </div>
          
          <div className="rs-actions">
            <Link href="/" className="rs-back">Voltar</Link>
            <button type="submit" className="rs-primary">Salvar</button>
          </div>
        </form>
      </section>
    </main>
  )
}*/
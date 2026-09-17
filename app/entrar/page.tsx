'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useFuncionarios } from '@/hooks/useFuncionarios'

type View = 'choose' | 'employee' | 'employer'

export default function EntrarPage() {
  const router = useRouter()
  const { funcionarios } = useFuncionarios()
  const [view, setView] = useState<View>('choose')
  const [selectedWorker, setSelectedWorker] = useState('')
  const [empPass, setEmpPass] = useState('')
  const [passErr, setPassErr] = useState(false)

  const handleEmployerLogin = () => {
    if (empPass === '1234') {
      localStorage.setItem('tipoUsuario', 'gestor')
      router.push('/dashboard')
    } else {
      setPassErr(true)
      setTimeout(() => setPassErr(false), 2000)
    }
  }

  const handleEmployeeLogin = () => {
    if (selectedWorker) {
      localStorage.setItem('funcionarioId', selectedWorker)
      localStorage.setItem('tipoUsuario', 'funcionario')
      const f = funcionarios.find((x: any) => x.id.toString() === selectedWorker)
      if (f) localStorage.setItem('funcionarioNome', f.nome)
      router.push('/painel')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center justify-center py-5 border-b border-[#e5e5e5]">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-[15px] text-[#1a1a1a]">RotaSegura</span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">

          {/* Escolher tipo */}
          {view === 'choose' && (
            <div className="rs-panel p-8">
              <h1 className="font-display text-2xl text-[#1a1a1a] text-center mb-1">Bem-vindo</h1>
              <p className="text-xs text-[#9a9a9a] text-center mb-6">
                Selecione seu tipo de acesso para continuar
              </p>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setView('employer')}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-[#e5e5e5] bg-white hover:bg-[#f9f9f9] transition-colors text-left"
                >
                  <span className="text-sm font-600 text-[#1a1a1a]">👔 Gestor/Supervisor</span>
                  <span className="text-[#9a9a9a]">›</span>
                </button>
                <button
                  type="button"
                  onClick={() => setView('employee')}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-[#e5e5e5] bg-white hover:bg-[#f9f9f9] transition-colors text-left"
                >
                  <span className="text-sm font-600 text-[#1a1a1a]">👷 Trabalhador</span>
                  <span className="text-[#9a9a9a]">›</span>
                </button>
              </div>
            </div>
          )}

          {/* Acesso funcionário */}
          {view === 'employee' && (
            <div className="rs-panel p-8">
              <button
                type="button"
                onClick={() => setView('choose')}
                className="text-xs text-[#6b6b6b] mb-4 hover:text-[#1a1a1a]"> ‹ Voltar</button>
              <h2 className="font-display text-xl text-[#1a1a1a] mb-1">Acesso Funcionário</h2>
              <p className="text-xs text-[#9a9a9a] mb-5">Selecione seu nome na lista</p>

              <div className="space-y-2 mb-5 max-h-52 overflow-y-auto">
                {funcionarios.map((w: any) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setSelectedWorker(w.id.toString())}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-colors ${
                      selectedWorker === w.id.toString()
                        ? 'border-[#6b6b6b] bg-[#f0f0f0]'
                        : 'border-[#e5e5e5] bg-white hover:bg-[#f9f9f9]'
                    }`}
                  >
                    <span className="text-sm font-600 text-[#1a1a1a]">{w.nome}</span>
                    <span className="text-[#9a9a9a]">›</span>
                  </button>
                ))}
                {funcionarios.length === 0 && (
                  <p className="text-xs text-[#9a9a9a] text-center py-4">Nenhum funcionário cadastrado</p>
                )}
              </div>

              <button
                type="button"
                onClick={handleEmployeeLogin}
                disabled={!selectedWorker}
                className="rs-btn rs-btn-dark w-full"
              >
                Entrar →
              </button>
            </div>
          )}

          {/* Acesso gestor */}
          {view === 'employer' && (
            <div className="rs-panel p-8">
              <button
                type="button"
                onClick={() => setView('choose')}
                className="text-xs text-[#6b6b6b] mb-4 hover:text-[#1a1a1a]">  ‹   Voltar</button>
              <h2 className="font-display text-xl text-[#1a1a1a] mb-1">Acesso Gestor</h2>
              <p className="text-xs text-[#9a9a9a] mb-5">Digite sua senha de acesso</p>

              <label className="rs-label">Senha</label>
              <input
                type="password"
                value={empPass}
                onChange={(e) => setEmpPass(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEmployerLogin()}
                placeholder="tente 1234"
                className="rs-input mb-3"
              />
              {passErr && <p className="text-xs text-[#e85d5d] mb-3">Senha incorreta</p>}

              <button type="button" onClick={handleEmployerLogin} className="rs-btn rs-btn-dark w-full">
                Entrar →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
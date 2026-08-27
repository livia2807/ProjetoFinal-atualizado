'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useFuncionarios } from '@/hooks/useFuncionarios'

export default function LoginScreen() {
  const router = useRouter()
  const { funcionarios } = useFuncionarios()
  const [selectedWorker, setSelectedWorker] = useState('')
  const [view, setView] = useState<'choose' | 'employee' | 'employer'>('choose')
  const [empPass, setEmpPass] = useState('')
  const [passErr, setPassErr] = useState(false)

  const handleEmployerLogin = () => {
    if (empPass === '1234') {
      router.push('/dashboard')
    } else {
      setPassErr(true)
      setTimeout(() => setPassErr(false), 2000)
    }
  }

  const handleEmployeeLogin = () => {
    if (selectedWorker) {
      // Aqui você salvaria o ID do funcionário em um Context/LocalStorage
      router.push('/painel')
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <div className="bg-[#777777] px-6 py-4 flex items-center gap-3">
        <span className="font-display text-xl text-white tracking-wide">RotaSegura</span>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-[#e0e0e0] overflow-hidden">
            
            {view === 'choose' && (
              <div className="p-8">
                <div className="mb-8 text-center">
                  <h1 className="font-display text-3xl text-[#444444] mb-2">Bem-vindo</h1>
                  <p className="text-[#777777] text-sm">Selecione seu tipo de acesso</p>
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={() => setView('employee')} className="p-4 rounded-xl border-2 border-[#e0e0e0] hover:border-[#777777] transition-all text-left">
                    <div className="font-700 text-[#444444] text-sm">Sou Funcionário</div>
                  </button>
                  <button onClick={() => setView('employer')} className="p-4 rounded-xl border-2 border-[#e0e0e0] hover:border-[#777777] transition-all text-left">
                    <div className="font-700 text-[#444444] text-sm">Sou Gestor</div>
                  </button>
                </div>
                <Link href="/cadastro" className="block mt-6 text-[#777777] text-sm font-600 text-center hover:underline">
                  Cadastrar novo funcionário
                </Link>
              </div>
            )}

            {view === 'employee' && (
              <div className="p-8">
                <button onClick={() => setView('choose')} className="text-sm text-[#777777] mb-6">Voltar</button>
                <h2 className="font-display text-2xl text-[#444444] mb-4">Acesso Funcionário</h2>
                <div className="flex flex-col gap-2 mb-6 max-h-60 overflow-y-auto">
                  {funcionarios.map((w: any) => (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWorker(w.id.toString())}
                      className={`p-3 rounded-xl border-2 text-left ${selectedWorker === w.id.toString() ? 'border-[#777777] bg-[#f0f0f0]' : 'border-[#e0e0e0]'}`}
                    >
                      <div className="font-600 text-[#444444] text-sm">{w.nome}</div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleEmployeeLogin}
                  disabled={!selectedWorker}
                  className="w-full py-3 rounded-xl bg-[#777777] text-white font-700 disabled:opacity-40"
                >
                  Entrar
                </button>
              </div>
            )}

            {view === 'employer' && (
              <div className="p-8">
                <button onClick={() => setView('choose')} className="text-sm text-[#777777] mb-6">Voltar</button>
                <h2 className="font-display text-2xl text-[#444444] mb-4">Acesso Gestor</h2>
                <input
                  type="password"
                  value={empPass}
                  onChange={e => setEmpPass(e.target.value)}
                  placeholder="Senha (1234)"
                  className="w-full px-4 py-3 mb-4 rounded-xl border-2 border-[#e0e0e0] outline-none"
                />
                <button
                  onClick={handleEmployerLogin}
                  className="w-full py-3 rounded-xl bg-[#777777] text-white font-700"
                >
                  Entrar
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
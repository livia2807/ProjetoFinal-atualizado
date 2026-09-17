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

    await enviarAlerta({
      assunto,
      id_pessoa: Number(idPessoa)
    })

    setAssunto('')
    setIdPessoa('')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-[#252525]">

        <header className="h-[74px] border-b border-[#e5e5e5] flex items-center justify-center">
          <div className="font-serif text-[20px] font-medium tracking-tight">
            RotaSegura
          </div>
        </header>

        <section className="flex justify-center px-5 py-16">
          <div className="text-[#777] text-sm">
            Carregando alertas...
          </div>
        </section>

      </main>
    )
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

        {/* CARD PRINCIPAL */}
        <div
          className="
            w-full
            max-w-[900px]
            bg-[#f5f5f5]
            border
            border-[#dedede]
            rounded-[15px]
            px-10
            py-9
            shadow-sm
          "
        >

          {/* TÍTULO */}
          <div className="mb-8">

            <p
              className="
                text-[#888]
                text-[13px]
                uppercase
                tracking-[0.08em]
                mb-2
              "
            >
              Gestão de alertas
            </p>

            <h1
              className="
                font-serif
                text-[30px]
                leading-tight
                font-medium
                text-[#252525]
              "
            >
              Alertas enviados
            </h1>

            <p className="text-[#999] text-[14px] mt-2">
              Envie alertas e consulte o histórico de notificações
            </p>

          </div>

          {/* FORMULÁRIO */}
          <form
            onSubmit={handleEnviar}
            className="space-y-5"
          >

            {/* FUNCIONÁRIO */}
            <div>

              <label
                className="
                  block
                  text-[14px]
                  font-medium
                  text-[#555]
                  mb-2
                "
              >
                Funcionário
              </label>

              <select
                value={idPessoa}
                onChange={(e) => setIdPessoa(e.target.value)}
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
                required
              >

                <option value="">
                  Selecione...
                </option>

                {funcionarios.map((f: any) => (
                  <option
                    key={f.id}
                    value={f.id}
                  >
                    {f.nome}
                  </option>
                ))}

              </select>

            </div>

            {/* MENSAGEM */}
            <div>

              <label
                className="
                  block
                  text-[14px]
                  font-medium
                  text-[#555]
                  mb-2
                "
              >
                Mensagem
              </label>

              <input
                type="text"
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                placeholder="Ex: Risco na área de colheita"
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
                required
              />

            </div>

            {/* BOTÃO */}
            <button
              type="submit"
              className="
                w-full
                h-[48px]
                rounded-[12px]
                bg-[#b5b5b5]
                text-white
                text-[14px]
                font-semibold
                transition
                hover:bg-[#999]
              "
            >
              Disparar Alerta →
            </button>

          </form>

          {/* HISTÓRICO */}
          <div className="mt-9">

            <div className="mb-4">

              <p
                className="
                  text-[#888]
                  text-[13px]
                  uppercase
                  tracking-[0.08em]
                "
              >
                Histórico
              </p>

              <h2
                className="
                  font-serif
                  text-[21px]
                  text-[#333]
                  mt-1
                "
              >
                Alertas recentes
              </h2>

            </div>

            <div className="space-y-3">

              {alertas.length === 0 ? (

                <div
                  className="
                    bg-white
                    border
                    border-[#dedede]
                    rounded-[12px]
                    p-4
                    text-center
                    text-[#999]
                    text-[14px]
                  "
                >
                  Nenhum alerta enviado.
                </div>

              ) : (

                alertas.map((a: any) => (

                  <div
                    key={a.id}
                    className="
                      bg-white
                      border
                      border-[#dedede]
                      rounded-[12px]
                      p-4
                    "
                  >

                    <div className="flex items-center justify-between gap-3">

                      <div className="font-medium text-[#444] text-[14px]">
                        Para: {a.pessoa?.nome || 'Funcionário'}
                      </div>

                    </div>

                    <p className="text-[#777] text-[14px] mt-2">
                      {a.assunto}
                    </p>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}

/*'use client'
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
            <div className="font-700 text-[#444444] text-sm">Para: {a.pessoa?.nome || 'Funcionário'}</div>
            <p className="text-amber-900 text-sm mt-1">{a.assunto}</p>
          </div>
        ))}
      </div>
    </div>
  )
}*/
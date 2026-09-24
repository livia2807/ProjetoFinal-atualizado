'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAlertas } from '@/hooks/useAlertas'

export default function FuncionarioPainelPage() {
  const router = useRouter()
  const { alertas, loading } = useAlertas()
  const [idPessoa, setIdPessoa] = useState<number | null>(null)

  useEffect(() => {
    const idSalvo = localStorage.getItem('funcionarioId')
    if (idSalvo) {
      setIdPessoa(Number(idSalvo))
    } else {
      router.push('/')
    }
  }, [router])

  const meusAlertas = alertas.filter(
    (a: any) => Number(a.id_pessoa) === Number(idPessoa)
  )

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl text-[#1a3c2a] mb-1">
          Painel do Funcionário
        </h2>
        <p className="text-[#5a6b5f] text-sm">
          Acompanhe seus avisos e registre riscos
        </p>
      </div>

      {!loading && meusAlertas.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
          <h3 className="font-700 text-amber-800 text-sm mb-2">
            Alertas recebidos da gestão
          </h3>
          {meusAlertas.map((a: any) => (
            <div
              key={a.id}
              className="text-amber-900 text-sm mb-1 flex items-start gap-2"
            >
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
              {a.assunto}
            </div>
          ))}
        </div>
      )}

      {!loading && meusAlertas.length === 0 && (
        <div className="bg-white border border-[#d8e5dc] rounded-2xl p-4 text-sm text-[#5a6b5f]">
          Nenhum alerta no momento.
        </div>
      )}

      <Link
        href="/denuncias/nova"
        className="block w-full bg-[#888888] hover:bg-[#444444] text-white rounded-2xl px-6 py-5 transition-colors shadow-sm"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="text-left">
            <p className="font-display text-lg font-700 leading-tight">
              Registrar nova denúncia
            </p>
            <p className="text-sm text-white/80 mt-0.5">
              Reportar área ou situação de risco identificada
            </p>
          </div>

          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </div>
      </Link>

      <div className="mt-8 space-y-6">
        <div>
          <h3 className="font-display text-xl text-[#333333] mb-1">
            Direitos Trabalhistas
          </h3>
          <p className="text-sm text-[#666666]">
            Conheça alguns dos principais direitos garantidos pela CLT e pela
            Constituição Federal
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Card 1 */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 shadow-sm">
            <p className="font-display font-700 text-[#333333] mb-1">
              Registro em Carteira
            </p>
            <p className="text-sm text-[#666666] leading-relaxed">
              Todo trabalhador tem direito à anotação na CTPS desde o primeiro
              dia de serviço, garantindo acesso a FGTS, INSS e demais
              benefícios.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 shadow-sm">
            <p className="font-display font-700 text-[#333333] mb-1">
              Jornada de Trabalho
            </p>
            <p className="text-sm text-[#666666] leading-relaxed">
              Limitada a 8 horas diárias e 44 horas semanais, com direito a
              descanso semanal remunerado, preferencialmente aos domingos.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 shadow-sm">
            <p className="font-display font-700 text-[#333333] mb-1">
              Férias Remuneradas
            </p>
            <p className="text-sm text-[#666666] leading-relaxed">
              Após 12 meses de trabalho, o empregado tem direito a 30 dias de
              férias com adicional de 1/3 do salário (terço constitucional).
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 shadow-sm">
            <p className="font-display font-700 text-[#333333] mb-1">
              FGTS e 13º Salário
            </p>
            <p className="text-sm text-[#666666] leading-relaxed">
              Depósito mensal de 8% do salário no FGTS e pagamento do 13º
              salário em até duas parcelas, conforme previsto em lei.
            </p>
          </div>
        </div>

        <p className="text-xs text-[#888888] text-center pt-2">
          Fonte: Consolidação das Leis do Trabalho (CLT) e Ministério do
          Trabalho e Emprego
        </p>
      </div>
    </div>
  )
}
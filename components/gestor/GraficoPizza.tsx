'use client'

interface GraficoPizzaProps {
  totalFuncionarios: number
  totalDenuncias: number
  totalAlertas: number
}

const CORES = {
  funcionarios: '#777777',
  denuncias: '#c0392b',
  alertas: '#f39c12',
}

export default function GraficoPizza({
  totalFuncionarios,
  totalDenuncias,
  totalAlertas,
}: GraficoPizzaProps) {
  const total = totalFuncionarios + totalDenuncias + totalAlertas

  // Se não houver dados, mostra estado vazio
  if (total === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#e0e0e0] p-6 flex flex-col items-center justify-center min-h-[280px]">
        <p className="text-[#999999] text-sm">Sem dados para exibir o gráfico</p>
      </div>
    )
  }

  const dados = [
    { label: 'Funcionários', valor: totalFuncionarios, cor: CORES.funcionarios },
    { label: 'Denúncias', valor: totalDenuncias, cor: CORES.denuncias },
    { label: 'Alertas', valor: totalAlertas, cor: CORES.alertas },
  ].filter((d) => d.valor > 0)

  // Calcula os ângulos (fatias) do gráfico
  let anguloAcumulado = -90 // começa no topo
  const fatias = dados.map((d) => {
    const porcentagem = d.valor / total
    const angulo = porcentagem * 360
    const inicio = anguloAcumulado
    const fim = anguloAcumulado + angulo
    anguloAcumulado = fim

    // Converte ângulos para coordenadas SVG (círculo de raio 80, centro 100,100)
    const r = 80
    const cx = 100
    const cy = 100

    const inicioRad = (inicio * Math.PI) / 180
    const fimRad = (fim * Math.PI) / 180

    const x1 = cx + r * Math.cos(inicioRad)
    const y1 = cy + r * Math.sin(inicioRad)
    const x2 = cx + r * Math.cos(fimRad)
    const y2 = cy + r * Math.sin(fimRad)

    // large-arc-flag: 1 se a fatia for maior que 180°
    const largeArc = angulo > 180 ? 1 : 0

    // path SVG de fatia de pizza
    const path =
      angulo >= 359.9
        ? // círculo completo (caso só tenha 1 dado)
          `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`
        : `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`

    return {
      ...d,
      path,
      porcentagem: Math.round(porcentagem * 100),
    }
  })

  return (
    <div className="bg-white rounded-2xl border border-[#e0e0e0] p-5">
      <h3 className="font-700 text-sm text-[#444444] mb-4">Distribuição Geral</h3>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Gráfico SVG */}
        <svg
          viewBox="0 0 200 200"
          className="w-44 h-44 flex-shrink-0"
          aria-label="Gráfico de pizza com distribuição de funcionários, denúncias e alertas"
        >
          {fatias.map((f) => (
            <path
              key={f.label}
              d={f.path}
              fill={f.cor}
              stroke="#fff"
              strokeWidth="2"
              className="transition-opacity hover:opacity-80"
            />
          ))}
          {/* Círculo central (estilo donut) */}
          <circle cx="100" cy="100" r="42" fill="white" />
          <text
            x="100"
            y="96"
            textAnchor="middle"
            className="fill-[#444444]"
            style={{ fontSize: '18px', fontWeight: 700 }}
          >
            {total}
          </text>
          <text
            x="100"
            y="112"
            textAnchor="middle"
            className="fill-[#999999]"
            style={{ fontSize: '9px' }}
          >
            total
          </text>
        </svg>

        {/* Legenda */}
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          {fatias.map((f) => (
            <div key={f.label} className="flex items-center gap-2.5">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: f.cor }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-600 text-[#444444]">{f.label}</div>
                <div className="text-[11px] text-[#777777]">
                  {f.valor} ({f.porcentagem}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
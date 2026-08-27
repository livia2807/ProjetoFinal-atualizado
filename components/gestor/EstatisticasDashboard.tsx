export default function EstatisticasDashboard({ totalFuncionarios, totalDenuncias }: { totalFuncionarios: number, totalDenuncias: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="bg-white rounded-2xl border border-[#e0e0e0] p-4">
        <div className="text-3xl font-display mb-1 text-[#777777]">{totalFuncionarios}</div>
        <div className="text-xs text-[#777777] font-600 leading-tight">Funcionários Cadastrados</div>
      </div>
      <div className="bg-red-50 rounded-2xl border border-red-100 p-4">
        <div className="text-3xl font-display mb-1 text-[#c0392b]">{totalDenuncias}</div>
        <div className="text-xs text-red-700 font-600 leading-tight">Denúncias Abertas</div>
      </div>
    </div>
  )
}
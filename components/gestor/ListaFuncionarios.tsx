export default function ListaFuncionarios({ funcionarios }: { funcionarios: any[] }) {
  return (
    <div className="space-y-3">
      {funcionarios.map((w) => (
        <div key={w.id} className="bg-white rounded-2xl border border-[#e0e0e0] p-5">
          <div className="font-700 text-[#444444]">{w.nome}</div>
          <div className="text-sm text-[#777777] mb-3">
            {w.cargo?.nome} &middot; {w.setor?.nome}
          </div>
          <div className="text-xs text-[#777777]">
            Contato: <span className="font-600">{w.contato}</span>
          </div>
          <div className="text-xs text-[#777777]">
            Admissão: <span className="font-600">
              {new Date(w.admissao).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
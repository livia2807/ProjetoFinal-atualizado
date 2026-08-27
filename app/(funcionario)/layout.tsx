import Link from 'next/link'

export default function FuncionarioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <div className="bg-[#777777] px-5 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="text-white font-700 text-sm leading-none">Área do Funcionário</div>
          <Link href="/" className="text-white/70 hover:text-white text-xs">Sair</Link>
        </div>
      </div>
      <div className="bg-white border-b border-[#e0e0e0] px-5 max-w-2xl mx-auto w-full flex gap-4">
        <Link href="/painel" className="px-2 py-3 text-sm font-600 text-[#777777]">Início</Link>
        <Link href="/denuncias/nova" className="px-2 py-3 text-sm font-600 text-[#777777]">Nova Denúncia</Link>
      </div>
      <div className="flex-1 max-w-2xl mx-auto w-full px-5 py-6">
        {children}
      </div>
    </div>
  )
}
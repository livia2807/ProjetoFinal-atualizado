import NavegacaoGestor from '@/components/layout/NavegacaoPrincipal'

export default function GestorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <div className="bg-[#555555] px-5 py-4">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="font-display text-white text-lg leading-none">RotaSegura</div>
            <div className="text-white/50 text-xs">Painel do Gestor</div>
          </div>
        </div>
      </div>
      <NavegacaoGestor />
      <div className="flex-1 max-w-5xl mx-auto w-full px-5 py-6">
        {children}
      </div>
    </div>
  )
}
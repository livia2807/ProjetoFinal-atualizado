'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavegacaoPrincipal() {
  const pathname = usePathname()
  const tabs = [
    { href: '/dashboard', label: 'Painel' },
    { href: '/funcionarios', label: 'Funcionários' },
    { href: '/denuncias', label: 'Denúncias' },
    { href: '/alertas', label: 'Alertas' },
  ]
  return (
    <div className="bg-white border-b border-[#e0e0e0] px-5">
      <div className="flex gap-0 max-w-5xl mx-auto overflow-x-auto">
        {tabs.map(t => {
          const ativo = pathname.startsWith(t.href)
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`px-4 py-3 text-sm font-600 border-b-2 transition-colors whitespace-nowrap ${
                ativo 
                  ? 'border-[#777777] text-[#777777]' 
                  : 'border-transparent text-[#777777] hover:text-[#444444]'
              }`}
            >
              {t.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
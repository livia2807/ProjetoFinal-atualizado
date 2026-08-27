import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RotaSegura',
  description: 'Segurança no campo é prioridade',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

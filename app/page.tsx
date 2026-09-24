'use client'

import Link from 'next/link'

const quemPodeUsar = [
  {
    icon: '👔',
    title: 'Gestor/Supervisor',
    text: 'Gestão de denúncias, estatísticas e painel administrativo',
  },
  {
    icon: '👷',
    title: 'Trabalhador',
    text: 'Pode denunciar e obter info. segurança',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 border-b border-[#e5e5e5]">
        <span className="font-display text-[15px] text-[#1a1a1a]">RotaSegura</span>

        <nav className="flex items-center gap-3">
          <a href="#sobre" className="text-sm text-[#6b6b6b] hover:text-[#1a1a1a]">
            Sobre
          </a>
          <Link
            href="/entrar"
            className="text-sm px-4 py-1.5 rounded-full border border-[#e5e5e5] text-[#1a1a1a] hover:bg-[#f5f5f5]"
          >
            Entrar
          </Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto w-full px-8 py-16">
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block text-[10px] font-700 tracking-widest uppercase text-[#6b6b6b] bg-[#f0f0f0] px-3 py-1 rounded-full mb-5">
              Plataforma pública · Brasil
            </span>

            <h1 className="font-display text-4xl md:text-[42px] leading-[1.15] text-[#1a1a1a] mb-4">
              Trabalho digno<br />na indústria<br />começa aqui.
            </h1>

            <p className="text-sm text-[#6b6b6b] leading-relaxed mb-8 max-w-md">
              Denuncie irregularidades, conheça seus direitos, acesse guias de segurança e
              ajude a construir um ambiente de trabalho industrial mais justo e seguro para todos.
            </p>

            <Link
              href="/cadastro-gestor"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6b6b6b] text-white text-sm font-600 hover:bg-[#4a4a4a] transition-colors"
            >
              Comece aqui →
            </Link>
          </div>

          <div className="w-[88%] max-w-[440px] mx-auto overflow-hidden rounded-[42px]">
            <img
              src="/foto.png"
              alt="Ilustração da plataforma RotaSegura"
              className="h-full w-full object-cover rounded-[42px]"
            />
          </div>
        </section>

        <section id="sobre" className="border-t border-[#e5e5e5] bg-[#fafafa] mt-16">
          <div className="max-w-5xl mx-auto w-full px-8 py-16 grid md:grid-cols-2 gap-10 items-start">
            <div>
              <span className="text-[10px] font-700 tracking-widest uppercase text-[#9a9a9a]">
                Sobre o projeto
              </span>

              <h2 className="font-display text-3xl text-[#1a1a1a] mt-3 mb-4 leading-tight">
                Construindo pontes<br />entre o campo e os<br />direitos.
              </h2>

              <p className="text-sm text-[#6b6b6b] leading-relaxed max-w-md">
                Denuncie irregularidades, conheça seus direitos, acesse guias de segurança e
                ajude a construir um ambiente de trabalho industrial mais justo e seguro para todos.
              </p>
            </div>

            <div className="rs-panel p-6">
              <h3 className="font-600 text-sm text-[#1a1a1a] mb-4">Quem pode usar?</h3>

              <div className="space-y-4">
                {quemPodeUsar.map(({ icon, title, text }) => (
                  <div key={title} className="flex gap-3">
                    <span className="text-base">{icon}</span>
                    <div>
                      <div className="text-sm font-600 text-[#1a1a1a]">{title}</div>
                      <div className="text-xs text-[#6b6b6b]">{text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 text-center text-[#c0c0c0] text-xs border-t border-[#e5e5e5]">
        RotaSegura
      </footer>
    </div>
  )
}

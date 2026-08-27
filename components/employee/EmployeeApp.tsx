'use client'

import { useState } from 'react'
import type { Alert, HazardReport, Worker } from '@/interfaces/types'
import { reportCategories } from '@/data/mock-data'
import { SeverityBadge, StatusBadge } from '@/components/ui/StatusBadges'

export default function EmployeeApp({
  worker,
  reports,
  alerts,
  onNewReport,
  onLogout,
}: {
  worker: Worker
  reports: HazardReport[]
  alerts: Alert[]
  onNewReport: (r: Omit<HazardReport, 'id' | 'workerId' | 'workerName' | 'date' | 'status'>) => void
  onLogout: () => void
}) {
  const [tab, setTab] = useState<'home' | 'report' | 'myreports'>('home')
  const [form, setForm] = useState({ location: '', description: '', severity: 'medium' as HazardReport['severity'], category: '' })
  const [submitted, setSubmitted] = useState(false)

  const myReports = reports.filter(r => r.workerId === worker.id)
  const myAlerts = alerts.filter(a => a.workerId === worker.id)
  const hasAlert = myAlerts.length > 0

  const handleSubmit = () => {
    if (!form.location || !form.description || !form.category) return
    onNewReport({ location: form.location, description: form.description, severity: form.severity, category: form.category })
    setForm({ location: '', description: '', severity: 'medium', category: '' })
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setTab('myreports') }, 1800)
  }

  const categories = reportCategories

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      {/* Header */}
      <div className="bg-[#777777] px-5 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-700 text-xs">
              {worker.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div className="text-white/70 text-xs">Olá,</div>
              <div className="text-white font-700 text-sm leading-none">{worker.name.split(' ')[0]}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {hasAlert && (
              <div className="flex items-center gap-1.5 bg-amber-500 px-3 py-1 rounded-full">
                <span className="text-white text-xs font-700">⚠ Alerta ativo</span>
              </div>
            )}
            <button onClick={onLogout} className="text-white/70 hover:text-white text-xs transition-colors">Sair</button>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {hasAlert && (
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 max-w-2xl mx-auto w-full">
          {myAlerts.map(a => (
            <div key={a.id} className="flex items-start gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2} className="w-5 h-5 flex-shrink-0 mt-0.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div>
                <div className="text-amber-800 font-700 text-xs uppercase tracking-widest mb-0.5">Alerta do Gestor</div>
                <p className="text-amber-900 text-sm">{a.message}</p>
                <p className="text-amber-600 text-xs mt-1">{a.sentAt}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nav Tabs */}
      <div className="bg-white border-b border-[#e0e0e0] px-5 max-w-2xl mx-auto w-full">
        <div className="flex gap-0">
          {([['home', 'Início'], ['report', 'Nova Denúncia'], ['myreports', 'Minhas Denúncias']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-3 text-sm font-600 border-b-2 transition-colors ${
                tab === key
                  ? 'border-[#777777] text-[#777777]'
                  : 'border-transparent text-[#777777] hover:text-[#444444]'
              }`}
            >
              {label}
              {key === 'myreports' && myReports.length > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#f0f0f0] text-[#777777] text-xs font-700">
                  {myReports.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-5 py-6">

        {/* Home Tab */}
        {tab === 'home' && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-2xl text-[#444444] mb-1">Painel do Funcionário</h2>
              <p className="text-[#777777] text-sm">{worker.area}</p>
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-2xl border border-[#e0e0e0] p-5">
              <div className="text-xs font-700 uppercase tracking-widest text-[#777777] mb-4">Seus Dados</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-[#777777]">Cargo</div>
                  <div className="text-sm font-600 text-[#444444] mt-0.5">{worker.role}</div>
                </div>
                <div>
                  <div className="text-xs text-[#777777]">Área de atuação</div>
                  <div className="text-sm font-600 text-[#444444] mt-0.5">{worker.area}</div>
                </div>
                <div>
                  <div className="text-xs text-[#777777]">Contato</div>
                  <div className="text-sm font-600 text-[#444444] mt-0.5">{worker.phone}</div>
                </div>
                <div>
                  <div className="text-xs text-[#777777]">Admissão</div>
                  <div className="text-sm font-600 text-[#444444] mt-0.5">
                    {new Date(worker.hireDate).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl border border-[#e0e0e0] p-4 text-center">
                <div className="text-3xl font-display text-[#777777]">{myReports.length}</div>
                <div className="text-xs text-[#777777] mt-1 font-600">Denúncias feitas</div>
              </div>
              <div className={`rounded-2xl border p-4 text-center ${hasAlert ? 'bg-amber-50 border-amber-200' : 'bg-[#f0f0f0] border-[#dddddd]'}`}>
                <div className={`text-3xl font-display ${hasAlert ? 'text-amber-600' : 'text-[#777777]'}`}>{myAlerts.length}</div>
                <div className="text-xs text-[#777777] mt-1 font-600">Alertas recebidos</div>
              </div>
            </div>

            {/* Quick Action */}
            <button
              onClick={() => setTab('report')}
              className="w-full bg-[#777777] hover:bg-[#555555] text-white rounded-2xl p-5 flex items-center gap-4 transition-colors group"
            >
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-700 text-sm">Registrar Nova Denúncia</div>
                <div className="text-white/70 text-xs mt-0.5">Reportar área ou situação de risco</div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-4 h-4 ml-auto opacity-70">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Safety Reminder */}
            <div className="bg-[#f0f0f0] border border-[#dddddd] rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="#777777" strokeWidth={1.8} className="w-5 h-5 flex-shrink-0 mt-0.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <div>
                  <div className="font-700 text-[#777777] text-sm mb-1">Lembrete de Segurança</div>
                  <p className="text-[#888888] text-xs leading-relaxed">
                    Ao identificar qualquer risco, faça a denúncia imediatamente. Sua segurança e a de seus colegas é a prioridade número 1.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Tab */}
        {tab === 'report' && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-2xl text-[#444444] mb-1">Nova Denúncia</h2>
              <p className="text-[#777777] text-sm">Descreva o local ou situação de risco identificada</p>
            </div>

            {submitted ? (
              <div className="bg-[#f0f0f0] border border-[#dddddd] rounded-2xl p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[#777777] flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-7 h-7">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="font-display text-xl text-[#777777] mb-1">Denúncia Registrada!</div>
                <p className="text-[#777777] text-sm">O gestor foi notificado e irá analisar o caso.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#e0e0e0] p-5 space-y-4">
                <div>
                  <label className="block text-xs font-700 text-[#777777] uppercase tracking-widest mb-2">Local / Área de Risco *</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                    placeholder="Ex: Setor A - Próximo ao galpão"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e0e0e0] focus:border-[#777777] text-sm bg-[#fafafa] outline-none transition-colors font-body"
                  />
                </div>

                <div>
                  <label className="block text-xs font-700 text-[#777777] uppercase tracking-widest mb-2">Categoria *</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(c => (
                      <button
                        key={c}
                        onClick={() => setForm(f => ({ ...f, category: c }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-700 border-2 transition-all ${
                          form.category === c
                            ? 'border-[#777777] bg-[#f0f0f0] text-[#777777]'
                            : 'border-[#e0e0e0] text-[#777777] hover:border-[#bbbbbb]'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-700 text-[#777777] uppercase tracking-widest mb-2">Grau de Risco *</label>
                  <div className="flex gap-2">
                    {([['low', 'Baixo', 'text-[#777777] border-[#bbbbbb] bg-[#f0f0f0]', 'border-[#777777] bg-[#dddddd]'],
                       ['medium', 'Médio', 'text-amber-700 border-amber-200 bg-amber-50', 'border-amber-500 bg-amber-100'],
                       ['high', 'Alto', 'text-red-700 border-red-200 bg-red-50', 'border-red-500 bg-red-100']] as const).map(([val, label, base, active]) => (
                      <button
                        key={val}
                        onClick={() => setForm(f => ({ ...f, severity: val as HazardReport['severity'] }))}
                        className={`flex-1 py-2.5 rounded-xl border-2 text-xs font-700 transition-all ${form.severity === val ? active : base}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-700 text-[#777777] uppercase tracking-widest mb-2">Descrição *</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Descreva com detalhes a situação de risco observada..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e0e0e0] focus:border-[#777777] text-sm bg-[#fafafa] outline-none transition-colors resize-none font-body"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!form.location || !form.description || !form.category}
                  className="w-full py-3.5 rounded-xl bg-[#777777] text-white font-700 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#555555] transition-colors"
                >
                  Enviar Denúncia
                </button>
              </div>
            )}
          </div>
        )}

        {/* My Reports Tab */}
        {tab === 'myreports' && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-2xl text-[#444444] mb-1">Minhas Denúncias</h2>
              <p className="text-[#777777] text-sm">{myReports.length} registro{myReports.length !== 1 ? 's' : ''} encontrado{myReports.length !== 1 ? 's' : ''}</p>
            </div>
            {myReports.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#e0e0e0] p-10 text-center">
                <div className="text-4xl mb-3">📋</div>
                <div className="font-600 text-[#444444] mb-1">Nenhuma denúncia ainda</div>
                <p className="text-[#777777] text-sm">Suas denúncias registradas aparecerão aqui.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {myReports.map(r => (
                  <div key={r.id} className="bg-white rounded-2xl border border-[#e0e0e0] p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="font-700 text-[#444444] text-sm">{r.location}</div>
                        <div className="text-[#777777] text-xs mt-0.5">{r.category} &middot; {new Date(r.date).toLocaleDateString('pt-BR')}</div>
                      </div>
                      <SeverityBadge severity={r.severity} />
                    </div>
                    <p className="text-[#777777] text-xs leading-relaxed mb-3">{r.description}</p>
                    <div className="flex items-center justify-between">
                      <StatusBadge status={r.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

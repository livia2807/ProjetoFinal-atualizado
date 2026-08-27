'use client'

import { useState } from 'react'
import type { Alert, HazardReport, Worker } from '@/interfaces/types'
import { SeverityBadge, StatusBadge, WorkerStatusDot } from '@/components/ui/StatusBadges'

export default function EmployerApp({
  workers,
  reports,
  alerts,
  onSendAlert,
  onUpdateReportStatus,
  onLogout,
}: {
  workers: Worker[]
  reports: HazardReport[]
  alerts: Alert[]
  onSendAlert: (workerId: string, message: string, area: string) => void
  onUpdateReportStatus: (id: string, status: HazardReport['status']) => void
  onLogout: () => void
}) {
  const [tab, setTab] = useState<'dashboard' | 'workers' | 'reports' | 'alerts'>('dashboard')
  const [alertModal, setAlertModal] = useState<{ workerId: string; area: string } | null>(null)
  const [alertMsg, setAlertMsg] = useState('')

  const openReports = reports.filter(r => r.status !== 'resolved')
  const highRisk = reports.filter(r => r.severity === 'high' && r.status !== 'resolved')

  const sendAlert = () => {
    if (!alertModal || !alertMsg.trim()) return
    onSendAlert(alertModal.workerId, alertMsg, alertModal.area)
    setAlertModal(null)
    setAlertMsg('')
  }

  const tabs = [
    { key: 'dashboard', label: 'Painel' },
    { key: 'workers', label: 'Funcionários' },
    { key: 'reports', label: 'Denúncias', badge: openReports.length },
    { key: 'alerts', label: 'Alertas', badge: alerts.length },
    { key: 'Cargo', label: 'Cadastrar Cargo', badge: alerts.length },

  ] as const

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      {/* Header */}
      <div className="bg-[#555555] px-5 py-4">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#777777] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-4 h-4">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </div>
            <div>
              <div className="font-display text-white text-lg leading-none">RotaSegura</div>
              <div className="text-white/50 text-xs">Painel do Gestor</div>
            </div>
          </div>
          {highRisk.length > 0 && (
            <div className="flex items-center gap-1.5 bg-red-500/20 border border-red-400/30 px-3 py-1 rounded-full">
              <span className="text-red-300 text-xs font-700">⚠ {highRisk.length} risco{highRisk.length > 1 ? 's' : ''} alto{highRisk.length > 1 ? 's' : ''}</span>
            </div>
          )}
          <button onClick={onLogout} className="text-white/60 hover:text-white text-xs transition-colors">Sair</button>
        </div>
      </div>

      {/* Nav */}
      <div className="bg-white border-b border-[#e0e0e0] px-5">
        <div className="flex gap-0 max-w-5xl mx-auto overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-3 text-sm font-600 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                tab === t.key ? 'border-[#777777] text-[#777777]' : 'border-transparent text-[#777777] hover:text-[#444444]'
              }`}
            >
              {t.label}
              {'badge' in t && t.badge > 0 && (
                <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-xs font-700 ${
                  t.key === 'reports' && highRisk.length > 0 ? 'bg-red-100 text-red-700' : 'bg-[#f0f0f0] text-[#777777]'
                }`}>{t.badge}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full px-5 py-6">

        {/* Dashboard */}
        {tab === 'dashboard' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl text-[#444444] mb-1">Visão Geral</h2>
              <p className="text-[#777777] text-sm">Monitoramento em tempo real da fazenda</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Funcionários Ativos', value: workers.filter(w => w.status === 'active').length, color: '#777777', bg: '#f0f0f0' },
                { label: 'Em Alerta', value: workers.filter(w => w.status === 'alert').length, color: '#d97706', bg: 'rgb(255,251,235)' },
                { label: 'Denúncias Abertas', value: openReports.length, color: '#c0392b', bg: 'rgb(254,242,242)' },
                { label: 'Alertas Enviados', value: alerts.length, color: '#555555', bg: '#dddddd' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl border border-[#e0e0e0] p-4">
                  <div className="text-3xl font-display mb-1" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-[#777777] font-600 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            {/* High risk reports */}
            {highRisk.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth={2} className="w-4 h-4">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <span className="text-sm font-700 text-[#444444]">Riscos Críticos — Ação Necessária</span>
                </div>
                <div className="space-y-2">
                  {highRisk.map(r => {
                    const w = workers.find(w => w.id === r.workerId)
                    return (
                      <div key={r.id} className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <SeverityBadge severity={r.severity} />
                            <span className="text-xs text-[#777777]">{r.category}</span>
                          </div>
                          <div className="font-700 text-[#444444] text-sm">{r.location}</div>
                          <div className="text-[#777777] text-xs mt-0.5">Denunciado por {r.workerName}</div>
                        </div>
                        <button
                          onClick={() => setAlertModal({ workerId: r.workerId, area: r.location })}
                          className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-700 hover:bg-amber-600 transition-colors"
                        >
                          Enviar Alerta
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Worker areas */}
            <div>
              <div className="text-sm font-700 text-[#444444] mb-3">Localização dos Funcionários</div>
              <div className="grid md:grid-cols-2 gap-3">
                {workers.map(w => (
                  <div key={w.id} className="bg-white rounded-xl border border-[#e0e0e0] p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#dddddd] flex items-center justify-center text-[#777777] font-700 text-xs flex-shrink-0">
                      {w.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-600 text-[#444444] text-sm truncate">{w.name}</div>
                      <div className="text-[#777777] text-xs truncate">{w.area}</div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <WorkerStatusDot status={w.status} />
                      <span className="text-xs text-[#777777] capitalize">
                        {w.status === 'active' ? 'Ativo' : w.status === 'alert' ? 'Alerta' : 'Offline'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Workers Tab */}
        {tab === 'workers' && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-2xl text-[#444444] mb-1">Registros dos Funcionários</h2>
              <p className="text-[#777777] text-sm">{workers.length} funcionários cadastrados</p>
            </div>
            <div className="space-y-3">
              {workers.map(w => {
                const workerReports = reports.filter(r => r.workerId === w.id)
                const hasAlert = alerts.some(a => a.workerId === w.id)
                return (
                  <div key={w.id} className="bg-white rounded-2xl border border-[#e0e0e0] p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#dddddd] flex items-center justify-center text-[#777777] font-display text-lg flex-shrink-0">
                        {w.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <div className="font-700 text-[#444444]">{w.name}</div>
                          <div className="flex items-center gap-1">
                            <WorkerStatusDot status={w.status} />
                            <span className="text-xs text-[#777777]">
                              {w.status === 'active' ? 'Ativo' : w.status === 'alert' ? 'Em alerta' : 'Offline'}
                            </span>
                          </div>
                          {hasAlert && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-700">⚠ Alerta enviado</span>}
                        </div>
                        <div className="text-sm text-[#777777] mb-3">{w.role} &middot; {w.area}</div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <div className="text-xs text-[#777777]">Contato</div>
                            <div className="text-xs font-600 text-[#444444] mt-0.5">{w.phone}</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#777777]">Admissão</div>
                            <div className="text-xs font-600 text-[#444444] mt-0.5">{new Date(w.hireDate).toLocaleDateString('pt-BR')}</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#777777]">Denúncias</div>
                            <div className="text-xs font-600 text-[#444444] mt-0.5">{workerReports.length} registros</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#777777]">Alertas</div>
                            <div className="text-xs font-600 text-[#444444] mt-0.5">{alerts.filter(a => a.workerId === w.id).length} enviados</div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setAlertModal({ workerId: w.id, area: w.area })}
                        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs font-700 hover:bg-amber-100 transition-colors"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                        </svg>
                        Alertar
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {tab === 'reports' && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-2xl text-[#444444] mb-1">Denúncias de Risco</h2>
              <p className="text-[#777777] text-sm">{reports.length} denúncias no total &middot; {openReports.length} abertas</p>
            </div>

            {/* Filter chips */}
            <div className="flex gap-2 flex-wrap">
              {['Todas', 'Alto Risco', 'Em Análise', 'Abertas', 'Resolvidas'].map(f => (
                <button key={f} className="px-3 py-1.5 rounded-full text-xs font-700 border-2 border-[#e0e0e0] text-[#777777] hover:border-[#777777] hover:text-[#777777] transition-colors">
                  {f}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {reports.map(r => (
                <div key={r.id} className={`bg-white rounded-2xl border p-4 ${r.severity === 'high' && r.status !== 'resolved' ? 'border-red-200' : 'border-[#e0e0e0]'}`}>
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <SeverityBadge severity={r.severity} />
                        <StatusBadge status={r.status} />
                        <span className="text-xs text-[#777777] bg-[#f5f5f5] px-2 py-0.5 rounded-full">{r.category}</span>
                      </div>
                      <div className="font-700 text-[#444444] text-sm mb-0.5">{r.location}</div>
                      <div className="text-xs text-[#777777] mb-2">Por {r.workerName} &middot; {new Date(r.date).toLocaleDateString('pt-BR')}</div>
                      <p className="text-[#777777] text-xs leading-relaxed">{r.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#e0e0e0]">
                    {r.status !== 'resolved' && (
                      <button
                        onClick={() => setAlertModal({ workerId: r.workerId, area: r.location })}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs font-700 hover:bg-amber-100 transition-colors"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
                          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        </svg>
                        Enviar Alerta
                      </button>
                    )}
                    {r.status === 'open' && (
                      <button
                        onClick={() => onUpdateReportStatus(r.id, 'investigating')}
                        className="px-3 py-1.5 rounded-lg bg-[#f0f0f0] border border-[#dddddd] text-[#777777] text-xs font-700 hover:bg-[#dddddd] transition-colors"
                      >
                        Iniciar análise
                      </button>
                    )}
                    {r.status === 'investigating' && (
                      <button
                        onClick={() => onUpdateReportStatus(r.id, 'resolved')}
                        className="px-3 py-1.5 rounded-lg bg-[#f0f0f0] border border-[#dddddd] text-[#777777] text-xs font-700 hover:bg-[#dddddd] transition-colors"
                      >
                        Marcar como Resolvido
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {tab === 'alerts' && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-2xl text-[#444444] mb-1">Alertas Enviados</h2>
              <p className="text-[#777777] text-sm">{alerts.length} alerta{alerts.length !== 1 ? 's' : ''} no histórico</p>
            </div>
            {alerts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#e0e0e0] p-10 text-center">
                <div className="text-4xl mb-3">🔔</div>
                <div className="font-600 text-[#444444] mb-1">Nenhum alerta enviado</div>
                <p className="text-[#777777] text-sm">Alertas enviados a funcionários aparecerão aqui.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {alerts.map(a => (
                  <div key={a.id} className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2} className="w-4 h-4">
                          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-700 text-[#444444] text-sm">Para: {a.workerName}</span>
                          <span className="text-xs text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full font-600">{a.area}</span>
                        </div>
                        <p className="text-amber-900 text-sm leading-relaxed mb-1">{a.message}</p>
                        <div className="text-amber-600 text-xs">Enviado em {a.sentAt}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Alert Modal */}
      {alertModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2} className="w-5 h-5">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                </svg>
              </div>
              <div>
                <div className="font-700 text-[#444444]">Enviar Alerta de Risco</div>
                <div className="text-xs text-[#777777]">
                  Para: {workers.find(w => w.id === alertModal.workerId)?.name}
                </div>
              </div>
            </div>
            <div className="mb-1">
              <label className="block text-xs font-700 text-[#777777] uppercase tracking-widest mb-2">Área de Risco</label>
              <div className="px-3 py-2.5 rounded-xl bg-[#f5f5f5] border border-[#e0e0e0] text-sm text-[#444444]">
                {alertModal.area}
              </div>
            </div>
            <div className="mb-5 mt-3">
              <label className="block text-xs font-700 text-[#777777] uppercase tracking-widest mb-2">Mensagem do Alerta *</label>
              <textarea
                value={alertMsg}
                onChange={e => setAlertMsg(e.target.value)}
                placeholder="Ex: ATENÇÃO: Afaste-se imediatamente da área. Risco identificado de..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#e0e0e0] focus:border-amber-400 text-sm bg-[#fafafa] outline-none transition-colors resize-none font-body"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setAlertModal(null); setAlertMsg('') }}
                className="flex-1 py-3 rounded-xl border-2 border-[#e0e0e0] text-[#777777] text-sm font-700 hover:border-[#bbbbbb] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={sendAlert}
                disabled={!alertMsg.trim()}
                className="flex-1 py-3 rounded-xl bg-amber-500 text-white text-sm font-700 disabled:opacity-40 hover:bg-amber-600 transition-colors"
              >
                Enviar Alerta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

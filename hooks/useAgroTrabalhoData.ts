'use client'

import { useCallback, useState } from 'react'
import { initialAlerts, initialReports, initialWorkers } from '@/data/mock-data'
import type { Alert, HazardReport, NewReportData, Role, Session, Worker } from '@/interfaces/types'

export function useAgroTrabalhoData() {
  const [session, setSession] = useState<Session | null>(null)
  const [workers] = useState<Worker[]>(initialWorkers)
  const [reports, setReports] = useState<HazardReport[]>(initialReports)
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)

  const handleLogin = useCallback((role: Role, workerId?: string) => setSession({ role, workerId }), [])
  const handleLogout = useCallback(() => setSession(null), [])

  const handleNewReport = useCallback((data: NewReportData) => {
    if (!session?.workerId) return
    const worker = workers.find(w => w.id === session.workerId)
    if (!worker) return
    setReports(prev => [{
      id: `r${Date.now()}`,
      workerId: worker.id,
      workerName: worker.name,
      date: new Date().toISOString().split('T')[0],
      status: 'open',
      ...data,
    }, ...prev])
  }, [session?.workerId, workers])

  const handleSendAlert = useCallback((workerId: string, message: string, area: string) => {
    const worker = workers.find(w => w.id === workerId)
    if (!worker) return
    setAlerts(prev => [{
      id: `a${Date.now()}`,
      workerId,
      workerName: worker.name,
      message,
      area,
      sentAt: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
      read: false,
    }, ...prev])
  }, [workers])

  const handleUpdateReportStatus = useCallback((id: string, status: HazardReport['status']) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r))
  }, [])

  return { session, workers, reports, alerts, handleLogin, handleLogout, handleNewReport, handleSendAlert, handleUpdateReportStatus }
}

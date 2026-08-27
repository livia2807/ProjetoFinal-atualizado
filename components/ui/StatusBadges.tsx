'use client'

import type { HazardReport, Worker } from '@/interfaces/types'

export const SeverityBadge = ({ severity }: { severity: HazardReport['severity'] }) => {
  const map = {
    low: { label: 'Baixo', bg: 'bg-[#f0f0f0]', text: 'text-[#777777]', border: 'border-[#bbbbbb]' },
    medium: { label: 'Médio', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    high: { label: 'Alto', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  }
  const s = map[severity]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-700 border ${s.bg} ${s.text} ${s.border}`}>
      {severity === 'high' && <span className="mr-1">⚠</span>}
      {s.label}
    </span>
  )
}

export const StatusBadge = ({ status }: { status: HazardReport['status'] }) => {
  const map = {
    open: { label: 'Aberto', bg: 'bg-red-50', text: 'text-red-700' },
    investigating: { label: 'Em análise', bg: 'bg-amber-50', text: 'text-amber-700' },
    resolved: { label: 'Resolvido', bg: 'bg-[#f0f0f0]', text: 'text-[#777777]' },
  }
  const s = map[status]
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-600 ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  )
}

export const WorkerStatusDot = ({ status }: { status: Worker['status'] }) => {
  const map = {
    active: 'bg-[#888888]',
    alert: 'bg-amber-500',
    offline: 'bg-gray-300',
  }
  return <span className={`inline-block w-2 h-2 rounded-full ${map[status]}`} />
}

export type Role = 'employee' | 'employer'

export interface Worker {
  id: string
  name: string
  role: string
  area: string
  status: 'active' | 'alert' | 'offline'
  phone: string
  hireDate: string
}

export interface HazardReport {
  id: string
  workerId: string
  workerName: string
  location: string
  description: string
  severity: 'low' | 'medium' | 'high'
  date: string
  status: 'open' | 'investigating' | 'resolved'
  category: string
}

export interface Alert {
  id: string
  workerId: string
  workerName: string
  message: string
  area: string
  sentAt: string
  read: boolean
}

export type Session = { role: Role; workerId?: string }
export type NewReportData = Omit<HazardReport, 'id' | 'workerId' | 'workerName' | 'date' | 'status'>

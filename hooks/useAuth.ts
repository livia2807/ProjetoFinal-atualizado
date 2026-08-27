'use client'

import { useAgroTrabalhoData } from './useAgroTrabalhoData'

export function useAuth() {
  const { session, handleLogin, handleLogout } = useAgroTrabalhoData()
  return { session, login: handleLogin, logout: handleLogout }
}

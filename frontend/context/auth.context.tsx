'use client'

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { authService, AuthUser, SignupPayload, LoginPayload } from '@/services/auth.service'
import { getErrorMessage } from '@/lib/api'
import { toast } from 'sonner'

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  isHydrating: boolean
  isAuthenticated: boolean
  signup: (payload: SignupPayload) => Promise<void>
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isHydrating, setIsHydrating] = useState(true)

  const hydrateUser = useCallback(async () => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      setIsHydrating(false)
      return
    }
    try {
      const me = await authService.getMe()
      setUser(me)
    } catch {
      localStorage.removeItem('access_token')
    } finally {
      setIsHydrating(false)
    }
  }, [])

  useEffect(() => {
    hydrateUser()
  }, [hydrateUser])

  const signup = async (payload: SignupPayload) => {
    setIsLoading(true)
    try {
      await authService.signup(payload)
    } catch (error) {
      toast.error(getErrorMessage(error))
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (payload: LoginPayload) => {
    setIsLoading(true)
    try {
      const result = await authService.login(payload)
      localStorage.setItem('access_token', result.accessToken)
      setUser(result.user)
      toast.success(`Welcome back, ${result.user.firstName}!`)
      router.push('/dashboard')
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    setUser(null)
    toast.success('You have been logged out.')
    router.push('/login')
  }

  const forgotPassword = async (email: string) => {
    setIsLoading(true)
    try {
      const result = await authService.forgotPassword(email)
      toast.success(result.message)
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true)
    try {
      const result = await authService.resetPassword(token, password)
      toast.success(result.message)
      router.push('/login')
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isHydrating,
        isAuthenticated: !!user,
        signup,
        login,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return context
}

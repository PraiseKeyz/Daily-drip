import { api } from '@/lib/api'

export interface AuthUser {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  isEmailVerified: boolean
  wallet?: {
    id: string
    tier: 'unverified' | 'verified'
    availableBalance: string
    currency: string
  }
}

export interface AuthResponse {
  success: boolean
  data: {
    accessToken: string
    user: AuthUser
  }
}

export interface SignupPayload {
  firstName: string
  lastName?: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export const authService = {
  async signup(payload: SignupPayload): Promise<AuthResponse['data']> {
    const { data } = await api.post<AuthResponse>('/auth/signup', payload)
    return data.data
  },

  async login(payload: LoginPayload): Promise<AuthResponse['data']> {
    const { data } = await api.post<AuthResponse>('/auth/login', payload)
    return data.data
  },

  async verifyEmail(token: string): Promise<{ message: string }> {
    const { data } = await api.post('/auth/verify-email', { token })
    return data.data
  },

  async resendVerification(email: string): Promise<{ message: string }> {
    const { data } = await api.post('/auth/resend-verification', { email })
    return data.data
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    const { data } = await api.post('/auth/forgot-password', { email })
    return data.data
  },

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    const { data } = await api.post('/auth/reset-password', { token, password })
    return data.data
  },

  async getMe(): Promise<AuthUser> {
    const { data } = await api.get('/auth/me')
    return data.data
  },
}

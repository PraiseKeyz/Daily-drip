import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// ── Request Interceptor ─────────────────────────────────────────
// Attach the JWT token to every request automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response Interceptor ────────────────────────────────────────
// Handle errors globally — 401 auto-logout, 422 validation, 500 server errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status
    const message = error.response?.data?.message || 'Something went wrong'

    if (status === 401) {
      localStorage.removeItem('access_token')
      window.location.href = '/login'
    } else if (status === 403) {
      toast.error('You do not have permission to do that')
    } else if (status === 500) {
      toast.error('Server error. Please try again later.')
    }

    return Promise.reject(error)
  }
)

export interface ApiErrorResponse {
  success: false
  statusCode: number
  message: string | string[]
  error: unknown
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorResponse | undefined
    if (typeof data?.message === 'string') return data.message
    if (Array.isArray(data?.message)) return data.message[0]
  }
  return 'An unexpected error occurred'
}

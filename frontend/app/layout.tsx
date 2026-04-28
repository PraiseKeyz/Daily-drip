import type { Metadata, Viewport } from 'next'
import { DM_Sans, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/context/auth.context'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'DailyDrip - Smart Budget Disbursement',
  description: 'Take control of your spending with daily micro-disbursements. Lock your money, drip it daily, build better habits.',
  keywords: ['budgeting', 'personal finance', 'envelope budgeting', 'daily allowance', 'spending discipline'],
}

export const viewport: Viewport = {
  themeColor: '#22c55e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              style: { fontFamily: 'var(--font-dm-sans)' },
            }}
          />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}

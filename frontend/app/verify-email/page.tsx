"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Droplet, CheckCircle, XCircle, Loader2, MailOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { authService } from "@/services/auth.service"
import { getErrorMessage } from "@/lib/api"

type Status = "loading" | "success" | "error"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""
  const [status, setStatus] = useState<Status>(token ? "loading" : "error")
  const [message, setMessage] = useState("")
  const [resendEmail, setResendEmail] = useState("")
  const [resendSent, setResendSent] = useState(false)

  useEffect(() => {
    if (!token) { setMessage("No verification token found in this link."); return }

    const verify = async () => {
      try {
        const result = await authService.verifyEmail(token)
        setMessage(result.message)
        setStatus("success")
      } catch (error) {
        setMessage(getErrorMessage(error))
        setStatus("error")
      }
    }

    verify()
  }, [token])

  const handleResend = async () => {
    if (!resendEmail) return
    try {
      await authService.resendVerification(resendEmail)
      setResendSent(true)
    } catch {
      setResendSent(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-12">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Droplet className="h-6 w-6 text-primary-foreground" />
        </div>
        <span className="text-2xl font-bold tracking-tight">DailyDrip</span>
      </Link>

      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-sm">

          {/* Loading */}
          {status === "loading" && (
            <>
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Verifying your email</h1>
              <p className="text-muted-foreground">Please wait a moment...</p>
            </>
          )}

          {/* Success */}
          {status === "success" && (
            <>
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Email verified! 🎉</h1>
              <p className="text-muted-foreground mb-8">{message}</p>
              <Link href="/login">
                <Button className="w-full" size="lg">Log in to DailyDrip</Button>
              </Link>
            </>
          )}

          {/* Error */}
          {status === "error" && (
            <>
              <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Verification failed</h1>
              <p className="text-muted-foreground mb-8">{message}</p>

              {!resendSent ? (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-left">Resend a new link to your email:</p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={resendEmail}
                      onChange={(e) => setResendEmail(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <Button onClick={handleResend} disabled={!resendEmail}>
                      <MailOpen className="h-4 w-4 mr-1.5" />
                      Resend
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="text-sm text-primary font-medium">
                    ✅ If that email is registered, a new link has been sent.
                  </p>
                </div>
              )}

              <Link href="/login" className="block mt-6">
                <Button variant="ghost" className="w-full">Back to log in</Button>
              </Link>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

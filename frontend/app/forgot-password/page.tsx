"use client"

import { useState } from "react"
import Link from "next/link"
import { Droplet, ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/context/auth.context"
import { AuthSidePanel } from "@/components/auth/auth-side-panel"

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) { setError("Email is required"); return }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Enter a valid email address"); return }
    setError("")
    await forgotPassword(email)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side — Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Droplet className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight">DailyDrip</span>
          </Link>

          {!submitted ? (
            <>
              <h1 className="text-center text-2xl font-bold tracking-tight">
                Forgot your password?
              </h1>
              <p className="mt-2 text-center text-muted-foreground">
                No worries — enter your email and we'll send you a reset link.
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="text-center text-2xl font-bold tracking-tight">
                Check your inbox
              </h1>
              <p className="mt-2 text-center text-muted-foreground">
                We sent a reset link to <strong>{email}</strong>.
                The link expires in 1 hour.
              </p>
            </>
          )}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Field>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError("") }}
                  />
                </div>
                {error && <FieldError>{error}</FieldError>}
              </Field>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? <Spinner className="mr-2" /> : null}
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => { setSubmitted(false); setEmail("") }}
              >
                Try a different email
              </Button>
            </div>
          )}

          <p className="mt-8 text-center text-sm text-muted-foreground">
            <Link href="/login" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to log in
            </Link>
          </p>
        </div>
      </div>

      <AuthSidePanel variant="security" />
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Droplet, ArrowLeft, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/context/auth.context"
import { AuthSidePanel } from "@/components/auth/auth-side-panel"

export default function ResetPasswordPage() {
  const { resetPassword, isLoading } = useAuth()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [formData, setFormData] = useState({ password: "", confirm: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.password) errs.password = "Password is required"
    else if (formData.password.length < 8) errs.password = "Password must be at least 8 characters"
    if (!formData.confirm) errs.confirm = "Please confirm your password"
    else if (formData.password !== formData.confirm) errs.confirm = "Passwords do not match"
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    await resetPassword(token, formData.password)
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-xl font-bold mb-2">Invalid reset link</h1>
          <p className="text-muted-foreground mb-6">
            This password reset link is invalid or has expired.
          </p>
          <Link href="/forgot-password">
            <Button className="w-full">Request a new link</Button>
          </Link>
        </div>
      </div>
    )
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

          <h1 className="text-center text-2xl font-bold tracking-tight">
            Set a new password
          </h1>
          <p className="mt-2 text-center text-muted-foreground">
            Choose a strong password you haven't used before.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">New password</FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <FieldError>{errors.password}</FieldError>}
              </Field>

              <Field>
                <FieldLabel htmlFor="confirm">Confirm new password</FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirm"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter your password"
                    className="pl-10 pr-10"
                    value={formData.confirm}
                    onChange={(e) => setFormData({ ...formData, confirm: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirm && <FieldError>{errors.confirm}</FieldError>}
              </Field>
            </FieldGroup>

            {/* Password strength hint */}
            <div className="rounded-lg bg-muted p-3 space-y-1">
              {[
                { label: "At least 8 characters", met: formData.password.length >= 8 },
                { label: "Passwords match", met: formData.password === formData.confirm && formData.confirm.length > 0 },
              ].map(({ label, met }) => (
                <div key={label} className="flex items-center gap-2 text-sm">
                  <div className={`h-1.5 w-1.5 rounded-full ${met ? "bg-primary" : "bg-muted-foreground/40"}`} />
                  <span className={met ? "text-primary font-medium" : "text-muted-foreground"}>{label}</span>
                </div>
              ))}
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? <Spinner className="mr-2" /> : null}
              {isLoading ? "Resetting..." : "Reset password"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            <Link href="/login" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to log in
            </Link>
          </p>
        </div>
      </div>

      <AuthSidePanel variant="reset" />
    </div>
  )
}

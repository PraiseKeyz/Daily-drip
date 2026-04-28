"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth.context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"

export function SignupForm({ onSuccess }: { onSuccess?: (email: string) => void }) {
  const { signup, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.firstName) errs.firstName = "First name is required"
    if (!formData.email) errs.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Enter a valid email"
    if (!formData.password) errs.password = "Password is required"
    else if (formData.password.length < 8) errs.password = "Password must be at least 8 characters"
    if (!formData.agreeToTerms) errs.agreeToTerms = "You must agree to the terms"
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    try {
      await signup({
        firstName: formData.firstName,
        lastName: formData.lastName || undefined,
        email: formData.email,
        password: formData.password,
      })
      onSuccess?.(formData.email)
    } catch (error) {
      // Error is already handled/toasted by AuthContext
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="firstName">First name</FieldLabel>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                className="pl-10"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            {errors.firstName && <FieldError>{errors.firstName}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="lastName">Last name</FieldLabel>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email address</FieldLabel>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="pl-10"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          {errors.email && <FieldError>{errors.email}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
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
      </FieldGroup>

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <Checkbox
            id="terms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
            I agree to the{" "}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </label>
        </div>
        {errors.agreeToTerms && <FieldError>{errors.agreeToTerms}</FieldError>}
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? <Spinner className="mr-2" /> : null}
        {isLoading ? "Creating account..." : "Create account"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Button type="button" variant="outline" className="w-full" size="lg">
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
      </Button>
    </form>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Droplet, CheckCircle } from "lucide-react"
import { SignupForm } from "@/components/auth/signup-form"
import { AuthSidePanel } from "@/components/auth/auth-side-panel"

export default function SignupPage() {
  const [submittedEmail, setSubmittedEmail] = useState("")

  return (
    <div className="min-h-screen flex">
      <AuthSidePanel variant="default" />

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Droplet className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight">DailyDrip</span>
          </Link>

          {!submittedEmail ? (
            <>
              <h1 className="text-center text-2xl font-bold tracking-tight">
                Create your account
              </h1>
              <p className="mt-2 text-center text-muted-foreground">
                Start your journey to financial discipline
              </p>
            </>
          ) : (
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight mb-2">Check your email</h1>
              <p className="text-muted-foreground">
                We've sent a verification link to <span className="font-semibold text-foreground">{submittedEmail}</span>.
                Please click the link to verify your account and log in.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          {!submittedEmail && <SignupForm onSuccess={(email) => setSubmittedEmail(email)} />}

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {!submittedEmail ? "Already have an account? " : "Verified your account? "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

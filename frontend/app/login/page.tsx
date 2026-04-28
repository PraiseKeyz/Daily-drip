import Link from "next/link"
import { Droplet } from "lucide-react"
import { LoginForm } from "@/components/auth/login-form"
import { AuthSidePanel } from "@/components/auth/auth-side-panel"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Droplet className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight">DailyDrip</span>
          </Link>

          <h1 className="text-center text-2xl font-bold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-center text-muted-foreground">
            Log in to manage your daily budgets
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <LoginForm />

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Do not have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      <AuthSidePanel />
    </div>
  )
}

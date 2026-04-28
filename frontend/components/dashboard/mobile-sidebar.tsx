"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Droplet, 
  LayoutDashboard, 
  Wallet, 
  FolderOpen, 
  History, 
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react"

const mainNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Envelopes", href: "/dashboard/envelopes", icon: FolderOpen },
  { name: "Transactions", href: "/dashboard/transactions", icon: History },
  { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
]

const bottomNavItems = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help", href: "/dashboard/help", icon: HelpCircle },
]

export function MobileSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-1 flex-col bg-card h-full">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Droplet className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold tracking-tight">DailyDrip</span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="flex flex-col gap-1">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-border px-4 py-4">
        <ul className="flex flex-col gap-1">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-muted text-foreground" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            )
          })}
          <li>
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Log out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

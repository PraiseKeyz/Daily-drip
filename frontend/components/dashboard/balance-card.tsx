import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Lock, TrendingUp, ArrowUpRight } from "lucide-react"

interface BalanceCardProps {
  className?: string
}

export function BalanceCard({ className }: BalanceCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Available Balance */}
          <div className="flex-1 bg-primary p-6 text-primary-foreground">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-5 w-5 opacity-80" />
              <span className="text-sm opacity-80">Available Balance</span>
            </div>
            <p className="text-4xl font-bold mb-4">₦5,500</p>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 bg-primary-foreground/20 rounded-full px-2 py-0.5">
                <ArrowUpRight className="h-3 w-3" />
                <span>+₦3,000 today</span>
              </div>
            </div>
          </div>

          {/* Locked Balance */}
          <div className="flex-1 bg-muted p-6">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Locked Balance</span>
            </div>
            <p className="text-4xl font-bold mb-4">₦89,500</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-1" />
                <span className="text-muted-foreground">3 envelopes</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">27 days left</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

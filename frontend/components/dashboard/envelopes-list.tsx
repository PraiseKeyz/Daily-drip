import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Car, Utensils, Tv, MoreHorizontal, Plus } from "lucide-react"

interface EnvelopesListProps {
  className?: string
}

const envelopes = [
  {
    id: 1,
    name: "Transport",
    icon: Car,
    color: "bg-chart-1",
    iconBg: "bg-chart-1/10",
    iconColor: "text-chart-1",
    total: 30000,
    released: 3500,
    dailyAmount: 1000,
    daysLeft: 27,
  },
  {
    id: 2,
    name: "Food",
    icon: Utensils,
    color: "bg-chart-5",
    iconBg: "bg-chart-5/10",
    iconColor: "text-chart-5",
    total: 60000,
    released: 6000,
    dailyAmount: 2000,
    daysLeft: 27,
  },
  {
    id: 3,
    name: "Entertainment",
    icon: Tv,
    color: "bg-chart-3",
    iconBg: "bg-chart-3/10",
    iconColor: "text-chart-3",
    total: 15000,
    released: 500,
    dailyAmount: 500,
    daysLeft: 29,
  },
]

export function EnvelopesList({ className }: EnvelopesListProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">Your Envelopes</CardTitle>
        <Button variant="ghost" size="sm" className="gap-1 text-primary">
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {envelopes.map((envelope) => {
          const progressPercentage = (envelope.released / envelope.total) * 100
          const lockedAmount = envelope.total - envelope.released

          return (
            <div
              key={envelope.id}
              className="group relative rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", envelope.iconBg)}>
                  <envelope.icon className={cn("h-6 w-6", envelope.iconColor)} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{envelope.name}</h3>
                    <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-muted-foreground">
                      ₦{envelope.dailyAmount.toLocaleString()}/day
                    </span>
                    <span className="font-medium">
                      ₦{envelope.released.toLocaleString()} <span className="text-muted-foreground font-normal">of ₦{envelope.total.toLocaleString()}</span>
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full transition-all duration-500", envelope.color)}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{progressPercentage.toFixed(0)}% released</span>
                      <span>₦{lockedAmount.toLocaleString()} locked</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

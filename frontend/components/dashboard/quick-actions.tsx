import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ArrowRightLeft, History, PiggyBank } from "lucide-react"

const actions = [
  {
    icon: Plus,
    label: "New Envelope",
    description: "Create a budget category",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: ArrowRightLeft,
    label: "Transfer",
    description: "Move between envelopes",
    color: "bg-chart-2/10 text-chart-2",
  },
  {
    icon: History,
    label: "Log Spending",
    description: "Record a transaction",
    color: "bg-chart-5/10 text-chart-5",
  },
  {
    icon: PiggyBank,
    label: "Add Funds",
    description: "Top up your budget",
    color: "bg-chart-4/10 text-chart-4",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto flex-col items-start gap-2 p-4 text-left hover:bg-muted/50"
            >
              <div className={`h-9 w-9 rounded-lg ${action.color} flex items-center justify-center`}>
                <action.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-sm">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

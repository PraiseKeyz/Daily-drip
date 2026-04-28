import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, Droplets } from "lucide-react"
import { cn } from "@/lib/utils"

const transactions = [
  {
    id: 1,
    type: "drip",
    description: "Daily drip - Transport",
    amount: 1000,
    time: "Today, 12:00 AM",
    positive: true,
  },
  {
    id: 2,
    type: "drip",
    description: "Daily drip - Food",
    amount: 2000,
    time: "Today, 12:00 AM",
    positive: true,
  },
  {
    id: 3,
    type: "spend",
    description: "Bolt ride",
    amount: 850,
    time: "Yesterday, 3:45 PM",
    positive: false,
  },
  {
    id: 4,
    type: "spend",
    description: "Lunch at Kilimanjaro",
    amount: 1500,
    time: "Yesterday, 1:20 PM",
    positive: false,
  },
  {
    id: 5,
    type: "drip",
    description: "Daily drip - Transport",
    amount: 1000,
    time: "Yesterday, 12:00 AM",
    positive: true,
  },
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center gap-3">
              {/* Icon */}
              <div className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                transaction.type === "drip" 
                  ? "bg-primary/10" 
                  : "bg-muted"
              )}>
                {transaction.type === "drip" ? (
                  <Droplets className="h-4 w-4 text-primary" />
                ) : transaction.positive ? (
                  <ArrowDownLeft className="h-4 w-4 text-primary" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">{transaction.time}</p>
              </div>

              {/* Amount */}
              <span className={cn(
                "text-sm font-medium flex-shrink-0",
                transaction.positive ? "text-primary" : "text-foreground"
              )}>
                {transaction.positive ? "+" : "-"}₦{transaction.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

import { BalanceCard } from "@/components/dashboard/balance-card"
import { DripNotification } from "@/components/dashboard/drip-notification"
import { EnvelopesList } from "@/components/dashboard/envelopes-list"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Daily Drip Notification */}
      <DripNotification />
      
      {/* Balance and Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BalanceCard className="lg:col-span-2" />
        <QuickActions />
      </div>

      {/* Envelopes and Transactions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <EnvelopesList className="lg:col-span-2" />
        <RecentTransactions />
      </div>
    </div>
  )
}

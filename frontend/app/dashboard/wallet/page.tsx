"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { 
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Building2,
  CreditCard,
  Smartphone,
  Lock,
  Unlock,
  TrendingUp,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  CheckCircle2,
  Droplets,
  AlertCircle
} from "lucide-react"

export default function WalletPage() {
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false)
  const [showBalance, setShowBalance] = useState(true)
  const [addAmount, setAddAmount] = useState("")

  const availableBalance = 12350
  const lockedBalance = 117650
  const totalBalance = availableBalance + lockedBalance

  const quickAmounts = [5000, 10000, 20000, 50000]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Wallet</h1>
          <p className="text-muted-foreground">
            Manage your funds and track your balance
          </p>
        </div>
        <Dialog open={isAddFundsOpen} onOpenChange={setIsAddFundsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Funds
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Funds to Wallet</DialogTitle>
              <DialogDescription>
                Choose an amount to add to your spendable wallet.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="amount">Amount (NGN)</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder="Enter amount"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAddAmount(amount.toString())}
                    className={cn(
                      addAmount === amount.toString() && "border-primary bg-primary/5"
                    )}
                  >
                    NGN {amount.toLocaleString()}
                  </Button>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Payment Method</Label>
                <Select defaultValue="card">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Debit Card
                      </div>
                    </SelectItem>
                    <SelectItem value="bank">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Bank Transfer
                      </div>
                    </SelectItem>
                    <SelectItem value="ussd">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        USSD
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-lg bg-muted p-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Funds added directly to your wallet are immediately spendable. To lock funds, create an envelope.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddFundsOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddFundsOpen(false)} disabled={!addAmount}>
                Add NGN {addAmount ? parseInt(addAmount).toLocaleString() : "0"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Balance Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 sm:p-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-primary-foreground/80 text-sm font-medium">Total Balance</p>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-3xl sm:text-4xl font-bold">
                  {showBalance ? `NGN ${totalBalance.toLocaleString()}` : "NGN ********"}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <Wallet className="h-6 w-6" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-primary-foreground/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <Unlock className="h-4 w-4" />
                Available
              </div>
              <p className="text-xl font-bold mt-1">
                {showBalance ? `NGN ${availableBalance.toLocaleString()}` : "********"}
              </p>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <Lock className="h-4 w-4" />
                Locked
              </div>
              <p className="text-xl font-bold mt-1">
                {showBalance ? `NGN ${lockedBalance.toLocaleString()}` : "********"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Add Funds</p>
                <p className="text-xs text-muted-foreground">Top up wallet</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-chart-1/10 flex items-center justify-center">
                <ArrowUpRight className="h-6 w-6 text-chart-1" />
              </div>
              <div>
                <p className="font-medium">Transfer</p>
                <p className="text-xs text-muted-foreground">Move money</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-chart-3/10 flex items-center justify-center">
                <Droplets className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <p className="font-medium">Allocate</p>
                <p className="text-xs text-muted-foreground">To envelope</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                <RefreshCw className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">History</p>
                <p className="text-xs text-muted-foreground">View all</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Linked Accounts & Stats */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Linked Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Linked Accounts</CardTitle>
            <CardDescription>Bank accounts connected to DailyDrip</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-4 rounded-xl border bg-card">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-chart-1 flex items-center justify-center text-white font-bold text-sm">
                  GT
                </div>
                <div>
                  <p className="font-medium">GTBank</p>
                  <p className="text-sm text-muted-foreground">****4521</p>
                </div>
              </div>
              <Badge>Primary</Badge>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border bg-card">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-chart-5 flex items-center justify-center text-white font-bold text-sm">
                  FB
                </div>
                <div>
                  <p className="font-medium">First Bank</p>
                  <p className="text-sm text-muted-foreground">****7832</p>
                </div>
              </div>
              <Badge variant="outline">Secondary</Badge>
            </div>
            <Button variant="outline" className="gap-2 mt-2">
              <Plus className="h-4 w-4" />
              Link New Account
            </Button>
          </CardContent>
        </Card>

        {/* Monthly Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">This Month</CardTitle>
            <CardDescription>Your spending summary for March 2026</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Droplets className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Total Drips Received</p>
                  <p className="text-sm text-muted-foreground">24 drips this month</p>
                </div>
              </div>
              <p className="font-semibold text-primary">+NGN 85,000</p>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <ArrowUpRight className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="font-medium">Total Spent</p>
                  <p className="text-sm text-muted-foreground">47 transactions</p>
                </div>
              </div>
              <p className="font-semibold">-NGN 72,650</p>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-chart-1/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <p className="font-medium">Net Savings</p>
                  <p className="text-sm text-muted-foreground">14.5% saved</p>
                </div>
              </div>
              <p className="font-semibold text-chart-1">+NGN 12,350</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Virtual Account Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Virtual Account Details</CardTitle>
          <CardDescription>Use this account to receive funds directly into DailyDrip</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-sm text-muted-foreground">Bank Name</p>
              <p className="font-medium mt-1">Providus Bank</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-sm text-muted-foreground">Account Number</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="font-medium font-mono">1234567890</p>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-sm text-muted-foreground">Account Name</p>
              <p className="font-medium mt-1">DailyDrip/John Doe</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

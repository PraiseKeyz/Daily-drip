"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Plus, 
  Car, 
  Utensils, 
  Tv, 
  ShoppingBag,
  Zap,
  HeartPulse,
  GraduationCap,
  Plane,
  MoreHorizontal,
  Calendar,
  TrendingUp,
  Lock,
  Unlock,
  Droplets
} from "lucide-react"

const categoryIcons: Record<string, { icon: typeof Car; color: string; bg: string }> = {
  transport: { icon: Car, color: "text-chart-1", bg: "bg-chart-1/10" },
  food: { icon: Utensils, color: "text-chart-5", bg: "bg-chart-5/10" },
  entertainment: { icon: Tv, color: "text-chart-3", bg: "bg-chart-3/10" },
  shopping: { icon: ShoppingBag, color: "text-chart-2", bg: "bg-chart-2/10" },
  utilities: { icon: Zap, color: "text-chart-4", bg: "bg-chart-4/10" },
  health: { icon: HeartPulse, color: "text-primary", bg: "bg-primary/10" },
  education: { icon: GraduationCap, color: "text-chart-1", bg: "bg-chart-1/10" },
  travel: { icon: Plane, color: "text-chart-2", bg: "bg-chart-2/10" },
}

const envelopes = [
  {
    id: 1,
    name: "Transport",
    category: "transport",
    total: 30000,
    released: 3500,
    spent: 2150,
    dailyAmount: 1000,
    daysLeft: 27,
    frequency: "daily",
    status: "active",
    createdAt: "Mar 1, 2026",
  },
  {
    id: 2,
    name: "Food & Groceries",
    category: "food",
    total: 60000,
    released: 6000,
    spent: 4500,
    dailyAmount: 2000,
    daysLeft: 27,
    frequency: "daily",
    status: "active",
    createdAt: "Mar 1, 2026",
  },
  {
    id: 3,
    name: "Entertainment",
    category: "entertainment",
    total: 15000,
    released: 500,
    spent: 0,
    dailyAmount: 500,
    daysLeft: 29,
    frequency: "daily",
    status: "active",
    createdAt: "Mar 1, 2026",
  },
  {
    id: 4,
    name: "Shopping",
    category: "shopping",
    total: 25000,
    released: 0,
    spent: 0,
    dailyAmount: 0,
    daysLeft: 30,
    frequency: "weekly",
    status: "paused",
    createdAt: "Mar 1, 2026",
  },
]

export default function EnvelopesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("active")

  const activeEnvelopes = envelopes.filter(e => e.status === "active")
  const pausedEnvelopes = envelopes.filter(e => e.status === "paused")

  const totalBudget = envelopes.reduce((acc, env) => acc + env.total, 0)
  const totalReleased = envelopes.reduce((acc, env) => acc + env.released, 0)
  const totalLocked = totalBudget - totalReleased

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Envelopes</h1>
          <p className="text-muted-foreground">
            Manage your budget envelopes and track daily drips
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Envelope
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Envelope</DialogTitle>
              <DialogDescription>
                Set up a new budget envelope with daily or weekly drips.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Envelope Name</Label>
                <Input id="name" placeholder="e.g., Transport" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="food">Food & Groceries</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="amount">Total Amount (NGN)</Label>
                <Input id="amount" type="number" placeholder="30000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="frequency">Drip Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="period">Budget Period</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">1 Week</SelectItem>
                      <SelectItem value="biweekly">2 Weeks</SelectItem>
                      <SelectItem value="monthly">1 Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm text-muted-foreground">
                  Daily drip amount: <span className="font-semibold text-foreground">NGN 1,000</span>
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsCreateOpen(false)}>Create Envelope</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold">NGN {totalBudget.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-chart-1/10 flex items-center justify-center">
                <Unlock className="h-6 w-6 text-chart-1" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Released</p>
                <p className="text-2xl font-bold">NGN {totalReleased.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                <Lock className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Locked</p>
                <p className="text-2xl font-bold">NGN {totalLocked.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Envelopes List */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">
            Active ({activeEnvelopes.length})
          </TabsTrigger>
          <TabsTrigger value="paused">
            Paused ({pausedEnvelopes.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {activeEnvelopes.map((envelope) => (
              <EnvelopeCard key={envelope.id} envelope={envelope} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="paused" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {pausedEnvelopes.map((envelope) => (
              <EnvelopeCard key={envelope.id} envelope={envelope} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function EnvelopeCard({ envelope }: { envelope: typeof envelopes[0] }) {
  const category = categoryIcons[envelope.category] || categoryIcons.transport
  const Icon = category.icon
  const progressPercentage = (envelope.released / envelope.total) * 100
  const lockedAmount = envelope.total - envelope.released
  const availableBalance = envelope.released - envelope.spent

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center", category.bg)}>
              <Icon className={cn("h-5 w-5", category.color)} />
            </div>
            <div>
              <CardTitle className="text-base">{envelope.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                {envelope.createdAt}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={envelope.status === "active" ? "default" : "secondary"}>
              {envelope.status}
            </Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-muted/50 p-2">
            <p className="text-xs text-muted-foreground">Budget</p>
            <p className="text-sm font-semibold">NGN {envelope.total.toLocaleString()}</p>
          </div>
          <div className="rounded-lg bg-primary/5 p-2">
            <p className="text-xs text-muted-foreground">Available</p>
            <p className="text-sm font-semibold text-primary">NGN {availableBalance.toLocaleString()}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-2">
            <p className="text-xs text-muted-foreground">Locked</p>
            <p className="text-sm font-semibold">NGN {lockedAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Droplets className="h-3 w-3" />
              NGN {envelope.dailyAmount.toLocaleString()}/{envelope.frequency === "daily" ? "day" : "week"}
            </span>
            <span className="font-medium">{progressPercentage.toFixed(0)}% released</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {envelope.daysLeft} days remaining in this period
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Log Spending
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

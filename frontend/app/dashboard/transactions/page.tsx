"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { 
  Search, 
  Filter,
  Download,
  Droplets,
  ArrowUpRight,
  ArrowDownLeft,
  Car,
  Utensils,
  Tv,
  Plus,
  Calendar
} from "lucide-react"

const transactions = [
  {
    id: "TXN001",
    type: "drip",
    description: "Daily drip - Transport",
    envelope: "Transport",
    amount: 1000,
    balance: 12350,
    date: "Mar 24, 2026",
    time: "12:00 AM",
  },
  {
    id: "TXN002",
    type: "drip",
    description: "Daily drip - Food",
    envelope: "Food",
    amount: 2000,
    balance: 11350,
    date: "Mar 24, 2026",
    time: "12:00 AM",
  },
  {
    id: "TXN003",
    type: "spend",
    description: "Bolt ride to work",
    envelope: "Transport",
    amount: 850,
    balance: 9350,
    date: "Mar 23, 2026",
    time: "3:45 PM",
  },
  {
    id: "TXN004",
    type: "spend",
    description: "Lunch at Kilimanjaro",
    envelope: "Food",
    amount: 1500,
    balance: 10500,
    date: "Mar 23, 2026",
    time: "1:20 PM",
  },
  {
    id: "TXN005",
    type: "drip",
    description: "Daily drip - Transport",
    envelope: "Transport",
    amount: 1000,
    balance: 12000,
    date: "Mar 23, 2026",
    time: "12:00 AM",
  },
  {
    id: "TXN006",
    type: "drip",
    description: "Daily drip - Food",
    envelope: "Food",
    amount: 2000,
    balance: 11000,
    date: "Mar 23, 2026",
    time: "12:00 AM",
  },
  {
    id: "TXN007",
    type: "spend",
    description: "Uber ride",
    envelope: "Transport",
    amount: 1200,
    balance: 9000,
    date: "Mar 22, 2026",
    time: "7:30 PM",
  },
  {
    id: "TXN008",
    type: "spend",
    description: "Netflix subscription",
    envelope: "Entertainment",
    amount: 2500,
    balance: 10200,
    date: "Mar 22, 2026",
    time: "2:00 PM",
  },
  {
    id: "TXN009",
    type: "fund",
    description: "Added funds to wallet",
    envelope: null,
    amount: 50000,
    balance: 12700,
    date: "Mar 21, 2026",
    time: "10:00 AM",
  },
  {
    id: "TXN010",
    type: "drip",
    description: "Daily drip - Transport",
    envelope: "Transport",
    amount: 1000,
    balance: 11000,
    date: "Mar 22, 2026",
    time: "12:00 AM",
  },
]

const envelopeIcons: Record<string, typeof Car> = {
  Transport: Car,
  Food: Utensils,
  Entertainment: Tv,
}

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || txn.type === activeTab
    return matchesSearch && matchesTab
  })

  const totalDrips = transactions.filter(t => t.type === "drip").reduce((acc, t) => acc + t.amount, 0)
  const totalSpent = transactions.filter(t => t.type === "spend").reduce((acc, t) => acc + t.amount, 0)
  const totalFunds = transactions.filter(t => t.type === "fund").reduce((acc, t) => acc + t.amount, 0)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            View your complete transaction history
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Log Spending
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Droplets className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Drips</p>
                <p className="text-2xl font-bold text-primary">+NGN {totalDrips.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <ArrowUpRight className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">-NGN {totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-chart-1/10 flex items-center justify-center">
                <ArrowDownLeft className="h-6 w-6 text-chart-1" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Funded</p>
                <p className="text-2xl font-bold text-chart-1">+NGN {totalFunds.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">Transaction History</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-9 w-[200px] sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select defaultValue="all-time">
                <SelectTrigger className="w-[140px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="all-time">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="drip">Drips</TabsTrigger>
              <TabsTrigger value="spend">Spending</TabsTrigger>
              <TabsTrigger value="fund">Funds</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="m-0">
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction</TableHead>
                      <TableHead className="hidden sm:table-cell">Envelope</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((txn) => {
                      const Icon = txn.envelope ? envelopeIcons[txn.envelope] || Droplets : ArrowDownLeft
                      const isPositive = txn.type === "drip" || txn.type === "fund"
                      
                      return (
                        <TableRow key={txn.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                                txn.type === "drip" && "bg-primary/10",
                                txn.type === "spend" && "bg-muted",
                                txn.type === "fund" && "bg-chart-1/10"
                              )}>
                                {txn.type === "drip" ? (
                                  <Droplets className="h-4 w-4 text-primary" />
                                ) : txn.type === "fund" ? (
                                  <ArrowDownLeft className="h-4 w-4 text-chart-1" />
                                ) : (
                                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{txn.description}</p>
                                <p className="text-xs text-muted-foreground sm:hidden">
                                  {txn.envelope || "Wallet"} · {txn.date}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {txn.envelope ? (
                              <Badge variant="secondary" className="font-normal">
                                {txn.envelope}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div>
                              <p className="text-sm">{txn.date}</p>
                              <p className="text-xs text-muted-foreground">{txn.time}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className={cn(
                              "font-semibold",
                              isPositive ? "text-primary" : "text-foreground"
                            )}>
                              {isPositive ? "+" : "-"}NGN {txn.amount.toLocaleString()}
                            </span>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination hint */}
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredTransactions.length} of {transactions.length} transactions
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

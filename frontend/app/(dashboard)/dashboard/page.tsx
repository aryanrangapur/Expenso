"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, TrendingUp, TrendingDown, Calendar, Plus, Info } from "lucide-react"
import { ResponsiveContainer, XAxis, YAxis, Area, AreaChart, Pie, PieChart, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Alert, AlertDescription } from "@/components/ui/alert"
import api from "@/lib/api"
import Link from "next/link"

interface Expense {
  id: number
  amount: string
  category: string
  transaction_date: string
}

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState("")

  useEffect(() => {
    loadExpenses()
    const storedUsername = localStorage.getItem("username")
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

  const loadExpenses = async () => {
    try {
      const response = await api.get("expenses/")
      setExpenses(response.data)
    } catch (error) {
      console.error("Failed to load expenses:", error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate statistics
  const totalExpenses = expenses.reduce((sum, exp) => sum + Number.parseFloat(exp.amount), 0)
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()
  const monthlyExpenses = expenses.filter((exp) => {
    const date = new Date(exp.transaction_date)
    return date.getMonth() === thisMonth && date.getFullYear() === thisYear
  })
  const monthlyTotal = monthlyExpenses.reduce((sum, exp) => sum + Number.parseFloat(exp.amount), 0)

  // Dummy data for demonstration
  const dummyTrendData = [
    { date: 'Jan 1', amount: 1200 },
    { date: 'Jan 2', amount: 1800 },
    { date: 'Jan 3', amount: 900 },
    { date: 'Jan 4', amount: 2200 },
    { date: 'Jan 5', amount: 1500 },
    { date: 'Jan 6', amount: 1900 },
    { date: 'Jan 7', amount: 1400 },
  ]

  const dummyCategoryData = [
    { category: "Food & Dining", amount: 4500 },
    { category: "Transportation", amount: 2800 },
    { category: "Shopping", amount: 3200 },
    { category: "Entertainment", amount: 1200 },
    { category: "Utilities", amount: 800 },
  ]

  const dummyRecentExpenses = [
    { id: 1, category: "Food & Dining", amount: "1250.00", transaction_date: "2024-01-07" },
    { id: 2, category: "Transportation", amount: "850.00", transaction_date: "2024-01-06" },
    { id: 3, category: "Shopping", amount: "2200.00", transaction_date: "2024-01-05" },
    { id: 4, category: "Entertainment", amount: "650.00", transaction_date: "2024-01-04" },
    { id: 5, category: "Utilities", amount: "450.00", transaction_date: "2024-01-03" },
  ]

  // Use real data if available, otherwise use dummy data
  const hasRealData = expenses.length > 0
  const trendData = hasRealData ? 
    Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      const dateStr = date.toISOString().split("T")[0]
      const dayExpenses = expenses.filter((exp) => exp.transaction_date === dateStr)
      const total = dayExpenses.reduce((sum, exp) => sum + Number.parseFloat(exp.amount), 0)
      return {
        date: new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        amount: total,
      }
    }) : dummyTrendData

  const categoryData = hasRealData ? 
    expenses.reduce(
      (acc, exp) => {
        const existing = acc.find((item) => item.category === exp.category)
        if (existing) {
          existing.amount += Number.parseFloat(exp.amount)
        } else {
          acc.push({ category: exp.category, amount: Number.parseFloat(exp.amount) })
        }
        return acc
      },
      [] as { category: string; amount: number }[],
    ) : dummyCategoryData

  const recentExpenses = hasRealData ? 
    [...expenses]
      .sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime())
      .slice(0, 5) : dummyRecentExpenses

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#ef4444"]

  if (loading) {
    return <div className="text-muted-foreground">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Expense Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            "Overview of your expenses"
          </p>
        </div>
        
        <Button asChild className="sm:w-auto w-full">
          <Link href="/expenses">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Link>
        </Button>
      </div>

      {/* Demo Data Alert */}
      {!hasRealData && (
        <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription className="text-blue-800 dark:text-blue-300">
            This dashboard is showing demo data. Add your first expense to see your actual spending patterns!
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{hasRealData ? totalExpenses.toFixed(2) : "12,550.00"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {hasRealData ? "All time" : "Demo total"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{hasRealData ? monthlyTotal.toFixed(2) : "9,850.00"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {hasRealData ? `${monthlyExpenses.length} transactions` : "25 demo transactions"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {hasRealData ? categoryData.length : "5"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {hasRealData ? "Active categories" : "Demo categories"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg per Day</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{hasRealData ? (expenses.length > 0 ? (totalExpenses / 30).toFixed(2) : "0.00") : "418.33"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {hasRealData ? "Last 30 days estimate" : "Demo daily average"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Spending Trend
              {!hasRealData && (
                <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded-full">
                  Demo Data
                </span>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {hasRealData ? "Last 7 days" : "Sample weekly trend"}
            </p>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                amount: {
                  label: "Amount",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorAmount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Category Breakdown
              {!hasRealData && (
                <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded-full">
                  Demo Data
                </span>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {hasRealData ? "Expense distribution" : "Sample category distribution"}
            </p>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                amount: {
                  label: "Amount",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Expenses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Recent Expenses
            {!hasRealData && (
              <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded-full">
                Demo Data
              </span>
            )}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {hasRealData ? "Your latest transactions" : "Sample recent transactions"}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{expense.category}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(expense.transaction_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-lg font-semibold">₹{Number.parseFloat(expense.amount).toFixed(2)}</div>
              </div>
            ))}
            {hasRealData && recentExpenses.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No expenses yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LayoutDashboard, Receipt, BarChart3, LogOut, Wallet, User, Calendar, TrendingUp } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import api from "@/lib/api"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Receipt, label: "Expenses", href: "/expenses" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
]

interface QuickStats {
  totalExpenses: number
  monthlyExpenses: number
  expenseCount: number
}

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [quickStats, setQuickStats] = useState<QuickStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    if (storedUsername) {
      setUsername(storedUsername)
    }
    fetchQuickStats()
  }, [])

  const fetchQuickStats = async () => {
    try {
      const response = await api.get("/expenses/")
      const expenses = response.data
      
      const totalExpenses = expenses.reduce((sum: number, expense: any) => sum + parseFloat(expense.amount), 0)
      
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      const monthlyExpenses = expenses
        .filter((expense: any) => {
          const expenseDate = new Date(expense.transaction_date)
          return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
        })
        .reduce((sum: number, expense: any) => sum + parseFloat(expense.amount), 0)

      setQuickStats({
        totalExpenses,
        monthlyExpenses,
        expenseCount: expenses.length
      })
    } catch (error) {
      console.error("Failed to fetch quick stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    router.push("/login")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <Wallet className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">
            <span className="text-primary">E</span>xpenso
          </span>
        </div>
        
        {/* User Info */}
        <div className="flex items-center gap-2 p-2 rounded-lg bg-sidebar-accent/50">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium truncate">
            {username || "User"}
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col">
        {/* Navigation Menu */}
        <SidebarMenu className="flex-1">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* Quick Stats */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>Quick Stats</span>
            </div>
            
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : quickStats ? (
              <Card className="card-shine">
                <CardContent className="p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">This Month</span>
                    <span className="text-xs font-semibold">
                      {formatCurrency(quickStats.monthlyExpenses)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Total</span>
                    <span className="text-xs font-semibold">
                      {formatCurrency(quickStats.totalExpenses)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Expenses</span>
                    <span className="text-xs font-semibold">
                      {quickStats.expenseCount}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-4">
                <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">No expenses yet</p>
                <p className="text-xs text-muted-foreground">Add your first expense!</p>
              </div>
            )}
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="space-y-3">
          {/* Built by credit */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Built by{" "}
              <span className="font-medium text-primary">Aryan Rangapur</span>
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              For Your Expenses
            </p>
          </div>

          {/* Logout Button */}
          <Button 
            variant="ghost" 
            className="w-full justify-start" 
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
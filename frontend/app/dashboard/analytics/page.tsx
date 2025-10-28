"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Statistics {
  [year: string]: {
    yearly: number
    monthly: { [month: string]: number }
    weekly: { [week: string]: number }
  }
}

// Month names for reference
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Statistics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStatistics()
  }, [])

  const loadStatistics = async () => {
    try {
      // Using dummy data for now
      setTimeout(() => {
        setStats({
          "2024": {
            yearly: 12550,
            monthly: {
              "January": 9850,
              "February": 2700
            },
            weekly: {
              "Week 1 of January": 3200,
              "Week 2 of January": 4200,
              "Week 3 of January": 2450
            }
          }
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Failed to load statistics:", error)
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-muted-foreground">Loading analytics...</div>
  }

  if (!stats || Object.keys(stats).length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Detailed expense analytics and trends</p>
        </div>
        <Card>
          <CardContent className="py-12">
            <p className="text-center text-muted-foreground">
              No data available. Start adding expenses to see analytics.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const years = Object.keys(stats).sort().reverse()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Detailed expense analytics and trends</p>
      </div>

      <Tabs defaultValue={years[0]} className="space-y-4">
        <TabsList>
          {years.map((year) => (
            <TabsTrigger key={year} value={year}>
              {year}
            </TabsTrigger>
          ))}
        </TabsList>

        {years.map((year) => {
          const yearData = stats[year]
          
          const monthlyData = Object.entries(yearData.monthly || {})
            .map(([monthName, total]) => ({
              month: monthName,
              amount: total,
            }))
            .sort((a, b) => monthNames.indexOf(a.month) - monthNames.indexOf(b.month))

          const weeklyData = Object.entries(yearData.weekly || {})
            .map(([week, total]) => ({
              week: week.replace("Week ", "W").replace(" of ", " "),
              amount: total,
            }))
            .sort((a, b) => {
              const weekNumA = parseInt(a.week.match(/\d+/)?.[0] || "0")
              const weekNumB = parseInt(b.week.match(/\d+/)?.[0] || "0")
              return weekNumA - weekNumB
            })

          return (
            <TabsContent key={year} value={year} className="space-y-4">
              {/* Yearly Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Yearly Summary - {year}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-primary">₹{yearData.yearly?.toFixed(2) || "0.00"}</div>
                  <p className="text-sm text-muted-foreground mt-2">Total expenses for {year}</p>
                </CardContent>
              </Card>

              {/* Monthly Chart */}
              {monthlyData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Breakdown</CardTitle>
                    <p className="text-sm text-muted-foreground">Expenses by month in {year}</p>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        amount: {
                          label: "Amount",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[400px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                          <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `₹${value}`}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}

              {/* Weekly Chart */}
              {weeklyData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Breakdown</CardTitle>
                    <p className="text-sm text-muted-foreground">Expenses by week in {year}</p>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        amount: {
                          label: "Amount",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="h-[400px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weeklyData}>
                          <XAxis 
                            dataKey="week" 
                            stroke="#888888" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false} 
                            angle={-45}
                            textAnchor="end"
                            height={80}
                          />
                          <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `₹${value}`}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={{ fill: "#10b981", r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}

              {/* Show message if no data available */}
              {monthlyData.length === 0 && weeklyData.length === 0 && (
                <Card>
                  <CardContent className="py-8">
                    <p className="text-center text-muted-foreground">
                      No monthly or weekly data available for {year}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
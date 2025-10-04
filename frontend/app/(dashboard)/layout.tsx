"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [username, setUsername] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("username")

    if (!token) {
      router.push("/login")
    } else {
      setUsername(user || "")
    }
  }, [router])

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="border-b border-border bg-card">
            <div className="flex h-14 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1" />
              <div className="text-sm text-muted-foreground">
                Hi, <span className="text-foreground font-medium">{username}</span>
              </div>
            </div>
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}

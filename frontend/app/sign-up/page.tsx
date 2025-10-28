"use client"

import { SignUp, SignedIn, SignedOut } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignUpPage() {
  const router = useRouter()

  return (
    <>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-foreground">Expenso</h1>
              </div>
              <p className="text-muted-foreground">Create your account</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
              <SignUp 
                routing="hash"
                signInUrl="/"
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "shadow-none bg-transparent",
                    headerTitle: "text-card-foreground",
                    headerSubtitle: "text-muted-foreground",
                    socialButtonsBlockButton: "border-border bg-background hover:bg-accent",
                    formFieldLabel: "text-card-foreground",
                    formFieldInput: "bg-background border-border text-card-foreground",
                    footerActionLink: "text-primary hover:text-primary/80",
                  }
                }}
              />
            </div>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <DashboardRedirect />
      </SignedIn>
    </>
  )
}

function DashboardRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    router.push("/dashboard")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting to dashboard...</p>
      </div>
    </div>
  )
}
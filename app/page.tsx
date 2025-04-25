"use client"

import type React from "react"
import { useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Navigation from "@/components/navigation"
import { Providers } from "./providers"

function SocketInitializer() {
  useEffect(() => {
    // Initialize Socket.IO server
    fetch("/api/socket/init")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Socket.IO server initialized")
        } else {
          console.error("Failed to initialize Socket.IO server:", data.message)
        }
      })
      .catch((error) => {
        console.error("Error initializing Socket.IO server:", error)
      })
  }, [])

  return null
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <SocketInitializer />
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}

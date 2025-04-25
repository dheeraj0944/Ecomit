import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Navigation from "@/components/navigation"
import SocketInitializer from "@/components/socket-initializer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EcoMit - Eco-Conscious Shopping Companion",
  description: "Make sustainable shopping choices with EcoMit",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <SocketInitializer />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}

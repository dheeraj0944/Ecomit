import type React from "react"
import type { Metadata } from "next/metadata"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./page"

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
    <html lang="en" className={inter.className}>
      <ClientLayout children={children} />
    </html>
  )
}

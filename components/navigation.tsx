"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Leaf, Menu, ShoppingCart, BarChart3, User, LogOut, Loader2, Trophy, Gift, Camera, Recycle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItem {
  href: string;
  icon: any;
  name?: string;
  label?: string;
}

export default function Navigation() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  const routes: NavItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
    },
    {
      name: "Cart",
      href: "/cart",
      icon: ShoppingCart,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ]

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  // Don't render navigation until client-side hydration is complete
  if (!mounted) return null

  const navItems: NavItem[] = [
    ...routes,
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/vouchers", label: "Vouchers", icon: Gift },
    { href: "/greenscan", label: "GreenScan", icon: Camera },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-green-600 rounded-full flex items-center justify-center">
                <Recycle className="h-5 w-5 text-white animate-spin-slow" />
              </div>
              <div className="absolute inset-0 border-2 border-green-600 rounded-full animate-pulse"></div>
            </div>
            <span className="hidden font-bold sm:inline-block text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              EcoMit
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    isActive ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.name || item.label}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add your search component here if needed */}
          </div>
          <nav className="flex items-center">
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : session ? (
              <>
                <ThemeToggle />
                <Link href="/cart">
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </Link>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarFallback>
                            {session.user?.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{session.user?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {session.user?.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {navItems.map((item) => {
                          const Icon = item.icon;
                          const isActive = pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                                isActive ? "bg-accent" : "transparent"
                              )}
                            >
                              <Icon className="h-4 w-4" />
                              {item.name || item.label}
                            </Link>
                          );
                        })}
                        <Button
                          variant="ghost"
                          className="flex items-center gap-2"
                          onClick={() => signOut()}
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </>
            ) : (
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

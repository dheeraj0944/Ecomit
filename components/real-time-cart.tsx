"use client"

import { useEffect, useState } from "react"
import { useSocket } from "@/hooks/use-socket"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, AlertTriangle, Wifi, WifiOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface CartUpdate {
  source: string
  timestamp: string
}

export function RealTimeCart() {
  const { socket, isConnected, error } = useSocket()
  const [cartUpdates, setCartUpdates] = useState<CartUpdate[]>([])

  useEffect(() => {
    if (!socket) return

    // Listen for cart updates
    socket.on("cart:updated", (data: CartUpdate) => {
      setCartUpdates((prev) => [data, ...prev].slice(0, 5))
    })

    return () => {
      socket.off("cart:updated")
    }
  }, [socket])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Real-Time Cart Updates
            </CardTitle>
            <CardDescription>See cart changes across all your devices</CardDescription>
          </div>
          <Badge
            variant={isConnected ? "default" : "outline"}
            className={cn("flex items-center gap-1", isConnected ? "bg-green-600 hover:bg-green-700" : "text-red-500")}
          >
            {isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800 border border-red-200">
            <div className="flex gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium">Connection Error</p>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {cartUpdates.length > 0 ? (
          <div className="space-y-3">
            {cartUpdates.map((update, index) => (
              <div
                key={index}
                className="rounded-md border p-3 text-sm animate-in fade-in slide-in-from-top-5 duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex justify-between items-center">
                  <div className="font-medium">Cart updated from {update.source}</div>
                  <div className="text-xs text-muted-foreground">{new Date(update.timestamp).toLocaleTimeString()}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <ShoppingCart className="h-12 w-12 mb-3 opacity-20" />
            <p>No recent cart updates</p>
            <p className="text-xs mt-1">
              Updates will appear here when your cart changes from the browser extension or website
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

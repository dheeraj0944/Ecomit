"use client"

import { useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"
import { useSession } from "next-auth/react"

export function useSocket() {
  const { data: session } = useSession()
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only attempt to connect if user is authenticated
    if (!session?.user) {
      if (socket) {
        socket.disconnect()
        setSocket(null)
        setIsConnected(false)
      }
      return
    }

    // Initialize socket connection
    const socketInstance = io({
      path: "/api/socketio",
      auth: {
        token: document.cookie
          .split("; ")
          .find((row) => row.startsWith("next-auth.session-token="))
          ?.split("=")[1],
      },
      autoConnect: true,
    })

    // Connection events
    socketInstance.on("connect", () => {
      console.log("Socket connected")
      setIsConnected(true)
      setError(null)
    })

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected")
      setIsConnected(false)
    })

    socketInstance.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message)
      setError(err.message)
      setIsConnected(false)
    })

    // Error handling
    socketInstance.on("error", (data) => {
      console.error("Socket error:", data.message)
      setError(data.message)
    })

    setSocket(socketInstance)

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect()
    }
  }, [session])

  return { socket, isConnected, error }
}

"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { io, Socket } from "socket.io-client"

let socket: Socket | null = null

export default function SocketInitializer() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      console.log("Initializing Socket.IO client...")

      // Initialize Socket.IO client
      socket = io(process.env.NEXTAUTH_URL || "http://localhost:3000", {
        path: "/api/socket",
        auth: {
          token: session.user.id,
        },
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      })

      socket.on("connect", () => {
        console.log("Socket.IO client connected")
      })

      socket.on("disconnect", () => {
        console.log("Socket.IO client disconnected")
      })

      socket.on("error", (error) => {
        console.error("Socket.IO error:", error)
      })

      socket.on("connect_error", (error) => {
        console.error("Socket.IO connection error:", error)
      })

      return () => {
        if (socket) {
          socket.disconnect()
          socket = null
        }
      }
    }
  }, [status, session])

  return null
}

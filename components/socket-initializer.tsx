"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"

export default function SocketInitializer() {
  const { status } = useSession()

  useEffect(() => {
    // Only initialize Socket.IO if the user is authenticated
    if (status === "authenticated") {
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
    }
  }, [status])

  return null
}

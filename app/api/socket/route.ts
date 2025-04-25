import { type NextRequest, NextResponse } from "next/server"
import { Server as ServerIO } from "socket.io"
import { getToken } from "next-auth/jwt"

// Global variable to store the Socket.IO server instance
let io: ServerIO | undefined

export async function GET(req: NextRequest) {
  try {
    // If Socket.IO server is already initialized, return success
    if (io) {
      return NextResponse.json({ success: true, message: "Socket.IO server is running" })
    }

    // Get the server instance from the request
    const res = NextResponse.next()
    const server = (res as any).socket?.server

    if (!server) {
      return NextResponse.json({ success: false, message: "Failed to get server instance" }, { status: 500 })
    }

    // Initialize Socket.IO server
    io = new ServerIO(server, {
      path: "/api/socketio",
      addTrailingSlash: false,
      cors: {
        origin: process.env.NEXTAUTH_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
    })

    // Authentication middleware
    io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token

        if (!token) {
          return next(new Error("Authentication error: Token missing"))
        }

        // Verify token using NextAuth
        const user = await getToken({
          req: { cookies: { "next-auth.session-token": token } } as any,
          secret: process.env.NEXTAUTH_SECRET,
        })

        if (!user) {
          return next(new Error("Authentication error: Invalid token"))
        }

        // Attach user data to socket
        socket.data.user = user
        next()
      } catch (error) {
        console.error("Socket authentication error:", error)
        next(new Error("Authentication error"))
      }
    })

    // Connection handler
    io.on("connection", (socket) => {
      console.log(`Socket connected: ${socket.id}`)

      // Join user-specific room for targeted messages
      const userId = socket.data.user.id
      socket.join(`user:${userId}`)

      // Cart update event
      socket.on("cart:update", async (data) => {
        try {
          // Process cart update
          console.log(`Cart update from ${userId}:`, data)

          // Broadcast to all user's devices
          io.to(`user:${userId}`).emit("cart:updated", {
            source: data.source,
            timestamp: new Date().toISOString(),
          })
        } catch (error) {
          console.error("Error processing cart update:", error)
          socket.emit("error", { message: "Failed to update cart" })
        }
      })

      // Product impact request
      socket.on("product:impact", async (data) => {
        try {
          console.log(`Impact request for product:`, data)

          // Mock response with impact data
          socket.emit("product:impact:result", {
            productId: data.productId,
            impact: {
              carbon: Math.random() * 10,
              plastic: Math.random() * 0.5,
              water: Math.random() * 1000,
              deforestation: Math.random() * 0.2,
            },
            ecoScore: Math.floor(Math.random() * 100),
            alternatives: [],
          })
        } catch (error) {
          console.error("Error processing impact request:", error)
          socket.emit("error", { message: "Failed to calculate impact" })
        }
      })

      // Disconnect handler
      socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`)
      })
    })

    return NextResponse.json({ success: true, message: "Socket.IO server initialized" })
  } catch (error) {
    console.error("Error initializing Socket.IO server:", error)
    return NextResponse.json({ success: false, message: "Failed to initialize Socket.IO server" }, { status: 500 })
  }
}

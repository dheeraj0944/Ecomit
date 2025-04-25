import { NextRequest, NextResponse } from "next/server"
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
      path: "/api/socket",
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
          req: { headers: { cookie: `next-auth.session-token=${token}` } } as any,
          secret: process.env.NEXTAUTH_SECRET,
        })

        if (!user) {
          return next(new Error("Authentication error: Invalid token"))
        }

        // Attach user to socket
        socket.data.user = user
        next()
      } catch (error) {
        next(new Error("Authentication error: " + error))
      }
    })

    // Handle connections
    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id)

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id)
      })
    })

    return NextResponse.json({ success: true, message: "Socket.IO server initialized" })
  } catch (error) {
    console.error("Error initializing Socket.IO server:", error)
    return NextResponse.json({ success: false, message: "Failed to initialize Socket.IO server" }, { status: 500 })
  }
}

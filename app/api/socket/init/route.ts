import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Call the socket initialization endpoint
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/socket`, {
      method: "GET",
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error initializing Socket.IO server:", error)
    return NextResponse.json({ success: false, message: "Failed to initialize Socket.IO server" }, { status: 500 })
  }
}

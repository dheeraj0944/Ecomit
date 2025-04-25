import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function GET(req: Request) {
  try {
    // Get the session token from cookies
    const cookieStore = cookies()
    const sessionToken = cookieStore.get("next-auth.session-token")?.value

    console.log("Session token from cookies:", sessionToken ? "Present" : "Not present")

    // Try to get the session using getServerSession
    const session = await getServerSession(authOptions)
    console.log("Session from getServerSession:", session ? "Present" : "Not present")
    
    // If we have a session, return it
    if (session) {
      return NextResponse.json({ session })
    }

    // If no session, try to get the token from the request
    const token = await getToken({
      req: req as any,
      secret: process.env.NEXTAUTH_SECRET,
    })
    console.log("Token from getToken:", token ? "Present" : "Not present")

    if (token) {
      // If we have a token, create a session object
      const session = {
        user: {
          id: token.id,
          name: token.name,
          email: token.email,
          ecoLevel: token.ecoLevel,
          joinDate: token.joinDate,
          impactStats: token.impactStats,
        },
        expires: token.exp,
      }
      return NextResponse.json({ session })
    }

    // If no session or token, return null
    return NextResponse.json({ session: null })
  } catch (error) {
    console.error("Session check error:", error)
    return NextResponse.json({ error: "Failed to check session" }, { status: 500 })
  }
} 
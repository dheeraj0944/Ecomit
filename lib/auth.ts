import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/user"
import type { IUser } from "@/models/user"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Attempting to authorize user:", credentials?.email)
        
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials")
          throw new Error("Email and password are required")
        }

        try {
          await connectToDatabase()
          console.log("Database connected successfully")

          // Find user by email
          const user = await User.findOne({ email: credentials.email })
          console.log("User found:", user ? "Yes" : "No")

          if (!user) {
            throw new Error("No user found with this email")
          }

          // Check if password matches
          const isPasswordValid = await user.comparePassword(credentials.password)
          console.log("Password valid:", isPasswordValid)

          if (!isPasswordValid) {
            throw new Error("Invalid password")
          }

          // Return user object without password
          const userData = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            ecoLevel: user.ecoLevel,
            joinDate: user.joinDate,
            impactStats: user.impactStats,
          }
          console.log("User authorized successfully:", userData.email)
          return userData
        } catch (error) {
          console.error("Authorization error:", error)
          throw error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback - User:", user ? "Present" : "Not present")
      if (user) {
        token.id = user.id
        token.ecoLevel = user.ecoLevel
        token.joinDate = user.joinDate
        token.impactStats = user.impactStats
      }
      return token
    },
    async session({ session, token }) {
      console.log("Session callback - Token:", token ? "Present" : "Not present")
      if (token) {
        session.user.id = token.id as string
        session.user.ecoLevel = token.ecoLevel as string
        session.user.joinDate = token.joinDate as Date
        session.user.impactStats = token.impactStats as IUser["impactStats"]
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug mode
  events: {
    async signIn({ user }) {
      console.log("Sign in successful for user:", user.email)
    },
    async session({ session }) {
      console.log("Session created/updated:", session.user?.email)
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  }
}

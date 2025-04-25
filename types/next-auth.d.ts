import type { DefaultSession } from "next-auth"
import type { IUser } from "@/models/user"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      ecoLevel: string
      joinDate: Date
      impactStats: IUser["impactStats"]
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    ecoLevel: string
    joinDate: Date
    impactStats: IUser["impactStats"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    ecoLevel: string
    joinDate: Date
    impactStats: IUser["impactStats"]
  }
}

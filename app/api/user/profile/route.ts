import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/user"

// Get user profile
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    console.log("Session in GET /api/user/profile:", session)

    if (!session?.user?.email) {
      console.log("No session or email found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    console.log("Connected to database")

    // Find user by email and exclude password
    const user = await User.findOne({ email: session.user.email }).select("-password")
    console.log("Found user:", user ? "Yes" : "No")

    if (!user) {
      console.log("User not found in database")
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Convert MongoDB document to plain object
    const userData = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      ecoLevel: user.ecoLevel,
      joinDate: user.joinDate,
      impactStats: user.impactStats,
      badges: user.badges,
    }

    console.log("Returning user data:", userData)
    return NextResponse.json(userData)
  } catch (error: any) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch user profile" }, { status: 500 })
  }
}

// Update user profile
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    console.log("Session in PUT /api/user/profile:", session)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updateData = await req.json()
    console.log("Update data:", updateData)

    // Fields that are allowed to be updated
    const allowedFields = ["name", "ecoPreferences", "notificationSettings"]

    // Filter out fields that are not allowed to be updated
    const filteredData: Record<string, any> = {}
    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        filteredData[field] = updateData[field]
      }
    }

    if (Object.keys(filteredData).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 })
    }

    await connectToDatabase()

    // Update user by email
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: filteredData },
      { new: true, runValidators: true },
    ).select("-password")

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    console.log("User updated successfully")
    return NextResponse.json(updatedUser)
  } catch (error: any) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ error: error.message || "Failed to update user profile" }, { status: 500 })
  }
}

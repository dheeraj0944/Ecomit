import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/user"

// Get user badges
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    await connectToDatabase()

    // Find user and get badges
    const user = await User.findById(userId).select("badges")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ badges: user.badges })
  } catch (error: any) {
    console.error("Error fetching user badges:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch user badges" }, { status: 500 })
  }
}

// Check and award new badges
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    await connectToDatabase()

    // Find user
    const user = await User.findById(userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check for new badges based on user's impact stats
    const newBadges = []
    const existingBadgeNames = new Set(user.badges.map((badge) => badge.name))

    // Carbon Reducer badge
    if (user.impactStats.carbonSaved >= 100 && !existingBadgeNames.has("Carbon Reducer")) {
      newBadges.push({
        name: "Carbon Reducer",
        description: "Reduced carbon footprint by 100kg",
        dateEarned: new Date(),
      })
    }

    // Plastic Fighter badge
    if (user.impactStats.plasticReduced >= 5 && !existingBadgeNames.has("Plastic Fighter")) {
      newBadges.push({
        name: "Plastic Fighter",
        description: "Reduced plastic waste by 5kg",
        dateEarned: new Date(),
      })
    }

    // Water Saver badge
    if (user.impactStats.waterSaved >= 1000 && !existingBadgeNames.has("Water Saver")) {
      newBadges.push({
        name: "Water Saver",
        description: "Saved 1000+ liters of water",
        dateEarned: new Date(),
      })
    }

    // Eco Enthusiast badge
    if (user.impactStats.ecoChoices >= 10 && !existingBadgeNames.has("Eco Enthusiast")) {
      newBadges.push({
        name: "Eco Enthusiast",
        description: "Made 10+ eco-friendly choices",
        dateEarned: new Date(),
      })
    }

    // If new badges were earned, add them to the user
    if (newBadges.length > 0) {
      user.badges.push(...newBadges)

      // Update eco level based on total badges
      if (user.badges.length >= 10) {
        user.ecoLevel = "Eco Master"
      } else if (user.badges.length >= 5) {
        user.ecoLevel = "Eco Champion"
      } else if (user.badges.length >= 3) {
        user.ecoLevel = "Eco Enthusiast"
      }

      await user.save()

      return NextResponse.json({
        success: true,
        newBadges,
        totalBadges: user.badges.length,
        ecoLevel: user.ecoLevel,
      })
    }

    return NextResponse.json({
      success: true,
      newBadges: [],
      totalBadges: user.badges.length,
      ecoLevel: user.ecoLevel,
    })
  } catch (error: any) {
    console.error("Error checking badges:", error)
    return NextResponse.json({ error: error.message || "Failed to check badges" }, { status: 500 })
  }
}

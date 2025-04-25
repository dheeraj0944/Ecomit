import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import connectToDatabase from "@/lib/mongodb"
import Cart from "@/models/cart"
import Product from "@/models/product"
import User from "@/models/user"

// Get user's cart
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const source = req.nextUrl.searchParams.get("source") || "ecomit"

    await connectToDatabase()

    // Find cart and populate product details
    const cart = await Cart.findOne({ user: userId, source }).populate({
      path: "items.product",
      model: Product,
    })

    if (!cart) {
      return NextResponse.json({ items: [], totalImpact: { carbon: 0, plastic: 0, water: 0, deforestation: 0 } })
    }

    return NextResponse.json(cart)
  } catch (error: any) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch cart" }, { status: 500 })
  }
}

// Update or create cart
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const { items, source = "ecomit" } = await req.json()

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid cart items" }, { status: 400 })
    }

    await connectToDatabase()

    // Calculate total impact
    const totalImpact = {
      carbon: 0,
      plastic: 0,
      water: 0,
      deforestation: 0,
    }

    // Validate and process items
    const validItems = []
    for (const item of items) {
      if (!item.productId || !item.quantity) continue

      const product = await Product.findById(item.productId)
      if (!product) continue

      validItems.push({
        product: product._id,
        quantity: item.quantity,
        addedAt: new Date(),
      })

      // Add to total impact
      totalImpact.carbon += product.impact.carbon * item.quantity
      totalImpact.plastic += product.impact.plastic * item.quantity
      totalImpact.water += product.impact.water * item.quantity
      totalImpact.deforestation += product.impact.deforestation * item.quantity
    }

    // Update or create cart
    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId, source },
      {
        items: validItems,
        lastUpdated: new Date(),
        totalImpact,
      },
      { new: true, upsert: true },
    ).populate({
      path: "items.product",
      model: Product,
    })

    // Update user's impact stats
    await User.findByIdAndUpdate(userId, {
      $inc: {
        "impactStats.carbonSaved": totalImpact.carbon * 0.2, // Assuming 20% savings from awareness
        "impactStats.plasticReduced": totalImpact.plastic * 0.15,
        "impactStats.waterSaved": totalImpact.water * 0.1,
      },
    })

    // Emit WebSocket event if Socket.IO server is available
    try {
      const io = (req as any).socket?.server?.io
      if (io) {
        io.to(`user:${userId}`).emit("cart:updated", {
          source,
          timestamp: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.error("Error emitting WebSocket event:", error)
    }

    return NextResponse.json(updatedCart)
  } catch (error: any) {
    console.error("Error updating cart:", error)
    return NextResponse.json({ error: error.message || "Failed to update cart" }, { status: 500 })
  }
}

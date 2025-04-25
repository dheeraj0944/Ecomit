import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import connectToDatabase from "@/lib/mongodb"
import Cart from "@/models/cart"
import Product from "@/models/product"
import User from "@/models/user"

// Endpoint for browser extension to sync cart data
export async function POST(req: NextRequest) {
  try {
    // Authenticate user - either via session or API key
    const session = await getServerSession(authOptions)
    const authHeader = req.headers.get("Authorization")

    let userId

    // Check session first
    if (session && session.user) {
      userId = session.user.id
    }
    // Then check API key (for extension use)
    else if (authHeader && authHeader.startsWith("Bearer ")) {
      const apiKey = authHeader.substring(7)

      await connectToDatabase()
      const user = await User.findOne({ apiKey: apiKey })

      if (!user) {
        return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
      }

      userId = user._id
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const {
      products,
      source, // e.g., 'amazon', 'flipkart'
      replaceCart = false, // Whether to replace the entire cart or merge
    } = await req.json()

    if (!products || !Array.isArray(products) || !source) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    await connectToDatabase()

    // Process products from the extension
    const cartItems = []
    for (const productData of products) {
      // Check if product already exists in our database
      let product = await Product.findOne({
        source: source,
        sourceId: productData.sourceId,
      })

      // If not, create it with estimated environmental impact
      if (!product) {
        // Calculate estimated eco score and impact based on category and price
        const ecoScore = calculateEcoScore(productData.category, productData.price)
        const impact = estimateImpact(productData.category, productData.price)

        product = new Product({
          name: productData.name,
          description: productData.description || productData.name,
          price: productData.price,
          image: productData.image || "/placeholder.svg",
          ecoScore: ecoScore,
          category: productData.category,
          impact: impact,
          isEcoFriendly: ecoScore > 70,
          source: source,
          sourceId: productData.sourceId,
        })

        await product.save()

        // Find eco alternatives (simplified version)
        await findEcoAlternatives(product)
      }

      // Add to cart items
      cartItems.push({
        product: product._id,
        quantity: productData.quantity || 1,
        addedAt: new Date(),
      })
    }

    // Update or create cart
    let cart
    if (replaceCart) {
      // Replace entire cart
      cart = await Cart.findOneAndUpdate(
        { user: userId, source },
        {
          items: cartItems,
          lastUpdated: new Date(),
        },
        { new: true, upsert: true },
      )
    } else {
      // Get existing cart
      cart = await Cart.findOne({ user: userId, source })

      if (cart) {
        // Merge with existing cart
        const existingProductIds = new Set(cart.items.map((item) => item.product.toString()))

        // Add new items that don't exist in the cart
        for (const item of cartItems) {
          if (!existingProductIds.has(item.product.toString())) {
            cart.items.push(item)
          }
        }

        cart.lastUpdated = new Date()
        await cart.save()
      } else {
        // Create new cart
        cart = new Cart({
          user: userId,
          items: cartItems,
          source,
          lastUpdated: new Date(),
        })
        await cart.save()
      }
    }

    // Calculate total impact
    await updateCartImpact(cart._id)

    // Return updated cart
    const updatedCart = await Cart.findById(cart._id).populate({
      path: "items.product",
      model: Product,
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

    return NextResponse.json({
      success: true,
      cart: updatedCart,
    })
  } catch (error: any) {
    console.error("Extension sync error:", error)
    return NextResponse.json({ error: error.message || "Failed to sync cart data" }, { status: 500 })
  }
}

// Helper function to calculate eco score based on category and price
function calculateEcoScore(category: string, price: number): number {
  // This is a simplified version - in a real app, you'd have a more sophisticated algorithm
  const baseScores: Record<string, number> = {
    Electronics: 40,
    Clothing: 50,
    Food: 60,
    Household: 55,
    Beauty: 45,
    Books: 75,
    Toys: 35,
    Sports: 60,
    Automotive: 30,
    Garden: 70,
  }

  // Default score if category not found
  const baseScore = baseScores[category] || 50

  // Add some randomness to make it more realistic
  const randomFactor = Math.floor(Math.random() * 20) - 10 // -10 to +10

  // Price factor - assumption that higher priced items might be better quality/more sustainable
  // This is just an example logic - real logic would be more complex
  const priceFactor = Math.min(Math.log(price + 1) * 2, 10)

  return Math.min(Math.max(baseScore + randomFactor + priceFactor, 10), 95)
}

// Helper function to estimate environmental impact
function estimateImpact(category: string, price: number) {
  // This is a simplified version - in a real app, you'd have a more sophisticated algorithm
  const baseImpacts: Record<string, any> = {
    Electronics: { carbon: 15, plastic: 0.3, water: 100, deforestation: 0.1 },
    Clothing: { carbon: 5, plastic: 0.1, water: 2500, deforestation: 0.05 },
    Food: { carbon: 2, plastic: 0.2, water: 200, deforestation: 0.2 },
    Household: { carbon: 8, plastic: 0.5, water: 150, deforestation: 0.1 },
    Beauty: { carbon: 3, plastic: 0.4, water: 120, deforestation: 0.02 },
    Books: { carbon: 2, plastic: 0.05, water: 80, deforestation: 0.3 },
    Toys: { carbon: 6, plastic: 0.6, water: 90, deforestation: 0.05 },
    Sports: { carbon: 7, plastic: 0.3, water: 100, deforestation: 0.05 },
    Automotive: { carbon: 20, plastic: 0.4, water: 200, deforestation: 0.1 },
    Garden: { carbon: 4, plastic: 0.2, water: 300, deforestation: 0.15 },
  }

  // Default impact if category not found
  const baseImpact = baseImpacts[category] || { carbon: 5, plastic: 0.3, water: 150, deforestation: 0.1 }

  // Scale impact by price (simplified)
  const priceFactor = Math.sqrt(price) / 10

  return {
    carbon: baseImpact.carbon * (1 + priceFactor),
    plastic: baseImpact.plastic * (1 + priceFactor * 0.5),
    water: baseImpact.water * (1 + priceFactor * 0.3),
    deforestation: baseImpact.deforestation * (1 + priceFactor * 0.2),
  }
}

// Helper function to find eco alternatives for a product
async function findEcoAlternatives(product: any) {
  try {
    // Find products in the same category with better eco scores
    const alternatives = await Product.find({
      category: product.category,
      ecoScore: { $gt: product.ecoScore + 20 }, // At least 20 points better
      _id: { $ne: product._id },
    }).limit(3)

    if (alternatives.length > 0) {
      product.alternatives = alternatives.map((alt) => alt._id)
      await product.save()
    }
  } catch (error) {
    console.error("Error finding eco alternatives:", error)
  }
}

// Helper function to update cart's total impact
async function updateCartImpact(cartId: string) {
  try {
    const cart = await Cart.findById(cartId).populate({
      path: "items.product",
      model: Product,
    })

    if (!cart) return

    const totalImpact = {
      carbon: 0,
      plastic: 0,
      water: 0,
      deforestation: 0,
    }

    for (const item of cart.items) {
      const product = item.product as any
      const quantity = item.quantity

      totalImpact.carbon += product.impact.carbon * quantity
      totalImpact.plastic += product.impact.plastic * quantity
      totalImpact.water += product.impact.water * quantity
      totalImpact.deforestation += product.impact.deforestation * quantity
    }

    cart.totalImpact = totalImpact
    await cart.save()
  } catch (error) {
    console.error("Error updating cart impact:", error)
  }
}

import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Product from "@/models/product"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    await connectToDatabase()

    // Find the product
    const product = await Product.findById(productId)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Find eco alternatives
    let alternatives = []

    if (product.alternatives && product.alternatives.length > 0) {
      // If product already has alternatives, fetch them
      alternatives = await Product.find({
        _id: { $in: product.alternatives },
      })
    } else {
      // Otherwise, find products in the same category with better eco scores
      alternatives = await Product.find({
        category: product.category,
        ecoScore: { $gt: product.ecoScore + 20 }, // At least 20 points better
        _id: { $ne: product._id },
      }).limit(3)

      // Save alternatives for future use
      if (alternatives.length > 0) {
        product.alternatives = alternatives.map((alt) => alt._id)
        await product.save()
      }
    }

    // Calculate savings for each alternative
    const alternativesWithSavings = alternatives.map((alt) => {
      const savings = {
        carbon: calculatePercentageDifference(product.impact.carbon, alt.impact.carbon),
        plastic: calculatePercentageDifference(product.impact.plastic, alt.impact.plastic),
        water: calculatePercentageDifference(product.impact.water, alt.impact.water),
        deforestation: calculatePercentageDifference(product.impact.deforestation, alt.impact.deforestation),
      }

      return {
        id: alt._id,
        name: alt.name,
        description: alt.description,
        price: alt.price,
        image: alt.image,
        ecoScore: alt.ecoScore,
        impact: alt.impact,
        savings,
      }
    })

    return NextResponse.json({
      product: {
        id: product._id,
        name: product.name,
        price: product.price,
        ecoScore: product.ecoScore,
        impact: product.impact,
      },
      alternatives: alternativesWithSavings,
    })
  } catch (error: any) {
    console.error("Error fetching product alternatives:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch product alternatives" }, { status: 500 })
  }
}

// Helper function to calculate percentage difference
function calculatePercentageDifference(original: number, alternative: number): string {
  if (original === 0) return "0%"

  const difference = ((original - alternative) / original) * 100
  return `${Math.round(difference)}%`
}

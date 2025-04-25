import mongoose, { Schema, type Document } from "mongoose"

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  image: string
  ecoScore: number
  category: string
  impact: {
    carbon: number
    plastic: number
    water: number
    deforestation: number
  }
  alternatives: mongoose.Types.ObjectId[]
  isEcoFriendly: boolean
  source: string // e.g., 'amazon', 'flipkart'
  sourceId: string // original ID from the source
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "/placeholder.svg" },
    ecoScore: { type: Number, required: true },
    category: { type: String, required: true },
    impact: {
      carbon: { type: Number, required: true },
      plastic: { type: Number, required: true },
      water: { type: Number, required: true },
      deforestation: { type: Number, default: 0 },
    },
    alternatives: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    isEcoFriendly: { type: Boolean, default: false },
    source: { type: String, required: true },
    sourceId: { type: String, required: true },
  },
  { timestamps: true },
)

// Create a compound index to ensure uniqueness of products from the same source
ProductSchema.index({ source: 1, sourceId: 1 }, { unique: true })

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)

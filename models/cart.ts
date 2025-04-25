import mongoose, { Schema, type Document } from "mongoose"

export interface ICartItem {
  product: mongoose.Types.ObjectId
  quantity: number
  addedAt: Date
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId
  items: ICartItem[]
  source: string // e.g., 'amazon', 'flipkart', 'ecomit'
  lastUpdated: Date
  totalImpact: {
    carbon: number
    plastic: number
    water: number
    deforestation: number
  }
}

const CartSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    source: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now },
    totalImpact: {
      carbon: { type: Number, default: 0 },
      plastic: { type: Number, default: 0 },
      water: { type: Number, default: 0 },
      deforestation: { type: Number, default: 0 },
    },
  },
  { timestamps: true },
)

// Create a compound index to ensure a user has only one cart per source
CartSchema.index({ user: 1, source: 1 }, { unique: true })

export default mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema)

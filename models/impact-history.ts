import mongoose, { Schema, type Document } from "mongoose"

export interface IImpactHistory extends Document {
  user: mongoose.Types.ObjectId
  date: Date
  impact: {
    carbon: number
    plastic: number
    water: number
    deforestation: number
  }
  ecoChoices: number
}

const ImpactHistorySchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    impact: {
      carbon: { type: Number, default: 0 },
      plastic: { type: Number, default: 0 },
      water: { type: Number, default: 0 },
      deforestation: { type: Number, default: 0 },
    },
    ecoChoices: { type: Number, default: 0 },
  },
  { timestamps: true },
)

// Create an index for efficient querying by user and date
ImpactHistorySchema.index({ user: 1, date: 1 })

export default mongoose.models.ImpactHistory || mongoose.model<IImpactHistory>("ImpactHistory", ImpactHistorySchema)

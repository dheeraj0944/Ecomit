import mongoose, { Schema, type Document } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
  name: string
  email: string
  password: string
  ecoLevel: string
  joinDate: Date
  impactStats: {
    carbonSaved: number
    plasticReduced: number
    waterSaved: number
    ecoChoices: number
  }
  badges: Array<{
    name: string
    description: string
    dateEarned: Date
  }>
  ecoPreferences: {
    ecoMode: boolean
    impactAlerts: boolean
    pricePriority: boolean
    autoReplace: boolean
    weeklyReport: boolean
  }
  notificationSettings: {
    email: boolean
    browser: boolean
    marketing: boolean
  }
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ecoLevel: { type: String, default: "Eco Beginner" },
    joinDate: { type: Date, default: Date.now },
    impactStats: {
      carbonSaved: { type: Number, default: 0 },
      plasticReduced: { type: Number, default: 0 },
      waterSaved: { type: Number, default: 0 },
      ecoChoices: { type: Number, default: 0 },
    },
    badges: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        dateEarned: { type: Date, default: Date.now },
      },
    ],
    ecoPreferences: {
      ecoMode: { type: Boolean, default: true },
      impactAlerts: { type: Boolean, default: true },
      pricePriority: { type: Boolean, default: false },
      autoReplace: { type: Boolean, default: false },
      weeklyReport: { type: Boolean, default: true },
    },
    notificationSettings: {
      email: { type: Boolean, default: true },
      browser: { type: Boolean, default: true },
      marketing: { type: Boolean, default: false },
    },
  },
  { timestamps: true },
)

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Check if model exists before creating a new one (for Next.js hot reloading)
export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

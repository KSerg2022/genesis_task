import mongoose, { Document, Schema, Model } from "mongoose";

export enum Frequency {
  HOURLY = "hourly",
  DAILY = "daily",
}

export interface ISubscription extends Document {
  email: string;
  city: string;
  frequency: Frequency;

  confirmed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
const subscriptionSchema: Schema<ISubscription> = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    city: { type: String, ref: "City", required: true },
    frequency: { type: String, enum: Object.values(Frequency), required: true },
    confirmed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

export const Subscription: Model<ISubscription> = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema,
);

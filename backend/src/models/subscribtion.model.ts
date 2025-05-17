import mongoose, { Document, Schema, Model } from "mongoose";

export enum Frequency {
  HOURLY = "hourly",
  DAILY = "daily",
}

export interface ISubscription extends Document {
  city: mongoose.Types.ObjectId;
  frequency: Frequency;

  confirmed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
const subscriptionSchema: Schema<ISubscription> = new mongoose.Schema(
  {
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
    frequency: { type: String, enum: Object.values(Frequency), required: true },
    confirmed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

export const Subscription: Model<ISubscription> = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema,
);

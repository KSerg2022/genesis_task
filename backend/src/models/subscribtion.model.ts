import mongoose, { Document, Schema, Model } from "mongoose";

export enum Frequency {
  HOURLY = "hourly",
  DAILY = "daily",
}
export interface ICity {
  name: string;
  lat: number;
  lon: number;
}

export interface ISubscription extends Document {
  email: string;
  city: ICity;
  frequency: Frequency;

  confirmed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
const subscriptionSchema: Schema<ISubscription> = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    city: {
      name: { type: String, required: true },
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
    frequency: { type: String, enum: Object.values(Frequency), required: true },
    confirmed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

export const Subscription: Model<ISubscription> = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema,
);

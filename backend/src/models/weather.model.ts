import mongoose, { Document, Schema, Model } from "mongoose";

export enum Frequency {
  HOURLY = "hourly",
  DAILY = "daily",
}

export interface IWeather extends Document {
  temperature: number;
  humidity: number;
  description: string;
}
const subscriptionSchema: Schema<IWeather> = new mongoose.Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  description: { type: String, required: true },
});

export const Weather: Model<IWeather> = mongoose.model<IWeather>(
  "Weather",
  subscriptionSchema,
);

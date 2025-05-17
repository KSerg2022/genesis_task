import mongoose, { Document, Schema, Model } from "mongoose";

export interface ICity extends Document {
  city: string;
  location: {
    lat: number;
    lon: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const citySchema: Schema<ICity> = new mongoose.Schema(
  {
    city: { type: String, required: true, unique: true },
    location: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
  },
  { timestamps: true },
);

export const City: Model<ICity> = mongoose.model<ICity>("City", citySchema);

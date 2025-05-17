import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  subscription: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    subscription: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    ],
  },
  { timestamps: true },
);

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

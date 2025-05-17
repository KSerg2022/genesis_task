import { Router } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Frequency, Subscription } from "../models/subscribtion.model";
import { User } from "../models/user.model";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

router.get("/confirm", async (req, res) => {
  const { token } = req.query;
  if (!token || typeof token !== "string")
    return res.status(400).send("Token is required");
  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      email: string;
      cityId: mongoose.Types.ObjectId;
      frequency: Frequency;
    };

    const subscription = await Subscription.create({
      city: payload.cityId,
      frequency: payload.frequency,
      confirmed: true,
    });
    const subscriptionId = subscription._id;
    await User.create({
      subscription: [subscriptionId],
      email: payload.email,
    });

    res.send(`Email ${payload.email} confirmed successfully!`);
  } catch (err) {
    res.status(400).send(`Invalid or expired token: ${err}`);
  }
});

export default router;

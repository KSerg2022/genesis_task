import { Router } from "express";
import { Subscription } from "../models/subscribtion.model";
import { getToken, TPayload, verifyToken } from "../jwtService";
import { confirmEmail } from "../emailService";

const router = Router();

router.get("/confirm/:token", async (req, res) => {
  const { token } = req.params;

  if (!token || typeof token !== "string")
    return res.status(400).send("Token is required");
  try {
    const payload: TPayload = verifyToken(token) as TPayload;

    await Subscription.create({
      email: payload.email,
      city: payload.city,
      frequency: payload.frequency,
      confirmed: true,
    });

    const tokenUnSubscribe = getToken({
      email: payload.email,
      city: payload.city,
      frequency: payload.frequency,
    });

    await confirmEmail(payload.email, tokenUnSubscribe, payload);

    res.send(`Email ${payload.email} confirmed successfully!`);
  } catch (err) {
    res.status(400).send(`Invalid or expired token: ${err}`);
  }
});

export default router;

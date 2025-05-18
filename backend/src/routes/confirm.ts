import { Router } from "express";
import { Subscription } from "../models/subscribtion.model";
import { getToken, TPayload, verifyToken } from "../jwtService";
import { confirmEmail } from "../emailService";

const router = Router();

router.get("/confirm/:token", async (req, res) => {
  const { token } = req.params;

  if (!token || typeof token !== "string")
    return res.status(404).send("Token not found");
  try {
    const payload: TPayload = verifyToken(token) as TPayload;

    const tokenUnSubscribe = getToken({
      email: payload.email,
      city: payload.city,
      frequency: payload.frequency,
    });

    try {
      await Subscription.create({
        email: payload.email,
        city: payload.city,
        frequency: payload.frequency,
        confirmed: true,
        tokenUnSubscribe: tokenUnSubscribe,
      });
    } catch (err) {
      res.status(409).send(`Email already subscribed: ${err}`);
    }

    await confirmEmail(payload, tokenUnSubscribe);

    res.send(`Confirm email subscription (${payload.email}) successfully!`);
  } catch (err) {
    res.status(400).send(`Invalid token: ${err}`);
  }
});

export default router;

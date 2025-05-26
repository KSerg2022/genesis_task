import { Router } from "express";
import { checkInternetData } from "../utils/checkInternetData";
import { subscribeEmail } from "../emailService";
import { getToken } from "../jwtService";
import { Pool } from "pg";

export const subscribeRoutes = (pool: Pool) => {
  const router = Router();

  router.post("/subscribe", async (req, res) => {
    const { email, city, frequency } = req.body;

    const isInternetData = await checkInternetData(email, city, frequency);
    if (!isInternetData.internetData || !isInternetData.city)
      return res.status(500).json({
        message: "Invalid request data.",
        info: isInternetData.message
      });

    const payload = {
      email,
      city: isInternetData.city,
      frequency
    };
    const tokenSubscribe = getToken(payload, "1h");

    try {
      await subscribeEmail(payload, tokenSubscribe);

      return res.json({ message: `Confirmation email sent` });
    } catch (error) {
      return res.status(500).json({ message: "Failed to send email", error });
    }
  });

  return router;
};

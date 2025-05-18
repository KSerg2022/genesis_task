import { Router } from "express";
import { checkInternetData } from "../utils/checkInternetData";
import { subscribeEmail } from "../emailService";
import { getToken } from "../jwtService";

const router = Router();

router.post("/subscribe", async (req, res) => {
  const { email, city, frequency } = req.body;

  const isInternetData = await checkInternetData(email, city, frequency);
  if (!isInternetData.internetData || !isInternetData.city)
    return res.status(500).json({
      message: "Invalid request data.",
      info: isInternetData.message,
    });

  const tokenSubscribe = getToken(
    {
      email,
      city: isInternetData.city,
      frequency,
    },
    "1h",
  );

  try {
    await subscribeEmail(email, tokenSubscribe);

    return res.json({ message: `Confirmation email sent` });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send email", error });
  }
});

export default router;

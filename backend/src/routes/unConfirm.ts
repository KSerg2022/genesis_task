import { Router } from "express";
import { Subscription } from "../models/subscribtion.model";
import { TPayload, verifyToken } from "../jwtService";
import { Pool } from "pg";

export const unConfirmRoutes = (pool: Pool) => {
  const router = Router();

  router.get("/unconfirm/:token", async (req, res) => {
    const { token } = req.params;
    if (!token || typeof token !== "string")
      return res.status(404).send("Token not found");
    try {
      const payload = verifyToken(token) as TPayload;

      const isDeleted = await Subscription.deleteOne({
        email: payload.email
      });
      if (isDeleted.deletedCount > 0) {
        return res.send(
          `Subscription for email: "${payload.email}" successfully!`
        );
      }

      return res
        .status(400)
        .send(`Subscription for email: "${payload.email}" does not exist!`);
    } catch (err) {
      res.status(400).send(`Invalid token: ${err}`);
    }
  });

  return router;
};

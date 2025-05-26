import express from "express";
import { subscribeRoutes } from "./routes/subscribe";
import { confirmRoutes } from "./routes/confirm";
import { unConfirmRoutes } from "./routes/unConfirm";
import { weatherRoutes } from "./routes/weather";
import cors from "cors";
import { startAgenda } from "./agenda";
import pool from "./db/db";

const main = async () => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.use("/api/weather", weatherRoutes(pool));

  app.use("/api", subscribeRoutes(pool));
  app.use("/api", confirmRoutes(pool));
  app.use("/api", unConfirmRoutes(pool));

  console.log("start init db");
  try {
    await pool.connect();
    console.log("✅ PostgreSQL connected");

    await startAgenda(); // Если у тебя Agenda не зависит от Mongo

    console.log("✅ Agenda started");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ PostgreSQL connection error:", err);
  }
};

main().catch(e => console.error(e));

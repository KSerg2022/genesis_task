import express from "express";
import dotenv from "dotenv";
import subscribeRoutes from "./routes/subscribe";
import confirmRoutes from "./routes/confirm";
import weather from "./routes/weather";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const mongoUrl = process.env.MONGO_URI || "";
const PORT = process.env.PORT || 5000;

const main = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/api/weather", weather);

  app.use("/api", subscribeRoutes);
  app.use("/api", confirmRoutes);

  console.log("start init db");
  mongoose
    .connect(mongoUrl, {
      dbName: "genesis",
    })
    .then(() => {
      console.log("✅ MongoDB connected");
      app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
      });
    })
    .catch(err => {
      console.error("❌ MongoDB connection error:", err);
    });
};

main().catch(e => console.error(e));

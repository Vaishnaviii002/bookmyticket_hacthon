import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./modules/auth/auth.routes.js";
import seatsRoutes from "./modules/seats/seats.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/seats", seatsRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Server is running");
});

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Server error",
  });
});

export default app;
// import express from 'express'

// const app = express();

// app.use(express.json());

// export default app;

// import express from "express";
// import authRoutes from "./modules/auth/auth.routes.js";
// import userRoutes from "./modules/user/user.routes.js";
// import movieRoutes from "./modules/movie/movie.routes.js";
// import bookingRoutes from "./modules/booking/booking.routes.js";
// import { globalErrorHandler } from "./utils/api.error.js";

// const app = express();
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/movies", movieRoutes);
// app.use("/api/bookings", bookingRoutes);

// app.use(globalErrorHandler);

// export default app;


// import express from "express";
// import authRoutes  from "./modules/auth/auth.routes.js";
// import seatsRoutes from "./modules/seats/seats.routes.js";

// const app = express();
// app.use(express.json());

// app.use("/api/auth",  authRoutes);
// app.use("/api/seats", seatsRoutes);

// app.use((err, req, res, next) => {
//   const status = err.statusCode || 500;
//   res.status(status).json({ success: false, message: err.message || "Server error" });
// });

// export default app;


import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./modules/auth/auth.routes.js";
import seatsRoutes from "./modules/seats/seats.routes.js";

// ✅ load env variables
dotenv.config();

const app = express();

// ✅ middlewares
app.use(cors());
app.use(express.json());

// ✅ routes
app.use("/api/auth", authRoutes);
app.use("/api/seats", seatsRoutes);

// ✅ health check (VERY USEFUL)
app.get("/", (req, res) => {
  res.send("🚀 Server is running");
});

// ✅ global error handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err.message);

  const status = err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Server error",
  });
});

export default app;
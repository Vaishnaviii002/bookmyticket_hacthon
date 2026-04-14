// import { Router } from "express";
// import { getSeats, book, seed } from "./seats.controller.js";
// import { protect } from "../../middleware/auth.middleware.js";

// const router = Router();

// router.post("/seed", seed);          // dev only — remove before production
// router.get("/",      protect, getSeats);
// router.post("/book", protect, book);

// export default router;


import { Router } from "express";
import { getSeats, book, seed } from "./seats.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

// ⚠️ dev only
router.post("/seed", seed);

// 🔐 protected routes
router.get("/", authMiddleware, getSeats);
router.post("/book", authMiddleware, book);

export default router;
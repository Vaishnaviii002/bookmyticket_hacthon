import { Router } from "express";
import { getSeats, book, seed } from "./seats.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/seed", seed); // dev only

router.get("/", authMiddleware, getSeats);
router.post("/book", authMiddleware, book);

export default router;
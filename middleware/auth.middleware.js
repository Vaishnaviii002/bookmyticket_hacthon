import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token or invalid format" });
    }

    const token = header.split(" ")[1];
    const decoded = verifyToken(token);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
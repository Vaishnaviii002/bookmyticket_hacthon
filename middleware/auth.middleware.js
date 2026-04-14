import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).send("No token");
    }

    const token = header.split(" ")[1];
    const decoded = verifyToken(token);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};

export default authMiddleware;
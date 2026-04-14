// import jwt from "jsonwebtoken";

// export const signToken = (payload) =>
//   jwt.sign(payload, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN || "7d",
//   });

// export const verifyToken = (token) =>
//   jwt.verify(token, process.env.JWT_SECRET);



import jwt from "jsonwebtoken";

// ✅ Generate token
export const signToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// ✅ Verify token
export const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};
// import { registerUser, loginUser } from "./auth.service.js";

// const handleError = (err, res) => {
//   const status = err.statusCode || 500;
//   res.status(status).json({ success: false, message: err.message });
// };

// export const register = async (req, res) => {
//   try {
//     const data = await registerUser(req.body);
//     res.status(201).json({ success: true, message: "Registered successfully", data });
//   } catch (err) { handleError(err, res); }
// };

// export const login = async (req, res) => {
//   try {
//     const data = await loginUser(req.body);
//     res.status(200).json({ success: true, message: "Logged in successfully", data });
//   } catch (err) { handleError(err, res); }
// };

import { registerUser, loginUser } from "./auth.service.js";

// ✅ centralized error handler
const handleError = (err, res) => {
  console.error("Auth Error:", err.message);

  const status = err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};

// ✅ REGISTER
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ❌ basic validation (very important)
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const data = await registerUser({ email, password });

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      data,
    });
  } catch (err) {
    handleError(err, res);
  }
};

// ✅ LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ❌ validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const data = await loginUser({ email, password });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data,
    });
  } catch (err) {
    handleError(err, res);
  }
};
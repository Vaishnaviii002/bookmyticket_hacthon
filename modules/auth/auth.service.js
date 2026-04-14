// import User from "./auth.model.js";
// import { hashPassword, comparePassword } from "../../utils/hash.js";
// import { signToken } from "../../utils/jwt.js";

// export const registerUser = async ({ name, email, password, role }) => {
//   const existing = await User.findOne({ email });
//   if (existing) {
//     const err = new Error("Email already in use");
//     err.statusCode = 409;
//     throw err;
//   }

//   const hashed = await hashPassword(password);
//   const user = await User.create({ name, email, password: hashed, role });

//   const token = signToken({ id: user._id, role: user.role });
//   return {
//     token,
//     user: { id: user._id, name: user.name, email: user.email, role: user.role },
//   };
// };

// export const loginUser = async ({ email, password }) => {
//   const user = await User.findOne({ email }).select("+password");
//   if (!user || !(await comparePassword(password, user.password))) {
//     const err = new Error("Invalid email or password");
//     err.statusCode = 401;
//     throw err;
//   }

//   const token = signToken({ id: user._id, role: user.role });
//   return {
//     token,
//     user: { id: user._id, name: user.name, email: user.email, role: user.role },
//   };

//    const isMatch = await comparePassword(password, user.password);
//   if (!isMatch) {
//     throw new Error("Invalid credentials");
//   }

//   const gentoken = generateToken(user);
//   return gentoken;

// };




import { createUser, findUserByEmail } from "./auth.model.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { signToken } from "../../utils/jwt.js";

// ✅ REGISTER
export const registerUser = async ({ email, password }) => {
  // check existing user
  const existing = await findUserByEmail(email);
  if (existing) {
    throw { statusCode: 409, message: "Email already in use" };
  }

  // hash password
  const hashed = await hashPassword(password);

  // create user in DB
  const user = await createUser(email, hashed);

  // generate token
  const token = signToken({ id: user.id });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
};

// ✅ LOGIN
export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw { statusCode: 401, message: "Invalid email or password" };
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw { statusCode: 401, message: "Invalid email or password" };
  }

  // generate token
  const token = signToken({ id: user.id });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
};
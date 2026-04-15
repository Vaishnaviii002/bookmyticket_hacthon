import { createUser, findUserByEmail } from "./auth.model.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { signToken } from "../../utils/jwt.js";

export const registerUser = async ({ email, password }) => {
  const existing = await findUserByEmail(email);

  if (existing) {
    throw { statusCode: 409, message: "Email already in use" };
  }

  const hashed = await hashPassword(password);
  const user = await createUser(email, hashed);

  const token = signToken({ id: user.id, email: user.email });

  return {
    token,
    user,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw { statusCode: 401, message: "Invalid email or password" };
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw { statusCode: 401, message: "Invalid email or password" };
  }

  const token = signToken({ id: user.id, email: user.email });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
};
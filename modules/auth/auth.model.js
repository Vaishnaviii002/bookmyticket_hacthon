// import pool from "../../config/db.js";

// export const createUser = async (email, password) => {
//   const result = await pool.query(
//     "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
//     [email, password]
//   );
//   return result.rows[0];
// };

// export const findUserByEmail = async (email) => {
//   const result = await pool.query(
//     "SELECT * FROM users WHERE email = $1",
//     [email]
//   );
//   return result.rows[0];
// };

import { pool } from "../../config/db.js";

// ✅ create user
export const createUser = async (email, password) => {
  try {
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, password]
    );

    return result.rows[0];
  } catch (err) {
    // ❌ handle duplicate email error
    if (err.code === "23505") {
      throw { statusCode: 400, message: "User already exists" };
    }

    throw err;
  }
};

// ✅ find user
export const findUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    return result.rows[0];
  } catch (err) {
    throw err;
  }
};
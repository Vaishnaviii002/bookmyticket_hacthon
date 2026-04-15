import { pool } from "../../config/db.js";

// ✅ Get all seats
export const getAllSeats = async () => {
  const result = await pool.query("SELECT * FROM seats ORDER BY id");
  return result.rows;
};

// ✅ Book seat (transaction + duplicate prevention)
export const bookSeat = async (seatId, userId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // lock row
    const result = await client.query(
      "SELECT * FROM seats WHERE id = $1 AND isbooked = 0 FOR UPDATE",
      [seatId]
    );

    if (result.rowCount === 0) {
      throw { statusCode: 409, message: "Seat already booked or not found" };
    }

    // update seat
    const update = await client.query(
      "UPDATE seats SET isbooked = 1, user_id = $2 WHERE id = $1 RETURNING *",
      [seatId, userId]
    );

    await client.query("COMMIT");

    return update.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

// ✅ Seed seats
export const seedSeats = async () => {
  const result = await pool.query(`
    INSERT INTO seats (isbooked)
    SELECT 0 FROM generate_series(1, 30)
    RETURNING *
  `);

  return result.rows;
};
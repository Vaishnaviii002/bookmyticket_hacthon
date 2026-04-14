// import Seat from "./seats.model.js";

// export const getAllSeats = () => Seat.find().sort("seatNumber");

// export const bookSeat = async (seatNumber, userId) => {
//   const seat = await Seat.findOne({ seatNumber });

//   if (!seat) {
//     const err = new Error(`Seat ${seatNumber} does not exist`);
//     err.statusCode = 404;
//     throw err;
//   }
//   if (seat.isBooked) {
//     const err = new Error(`Seat ${seatNumber} is already booked`);
//     err.statusCode = 409;
//     throw err;
//   }

//   seat.isBooked = true;
//   seat.bookedBy = userId;
//   await seat.save();
//   return seat;
// };

// export const seedSeats = async () => {
//   await Seat.deleteMany({});
//   const seats = Array.from({ length: 30 }, (_, i) => ({
//     seatNumber: `S${String(i + 1).padStart(2, "0")}`,
//   }));
//   return Seat.insertMany(seats);
// };


import { pool } from "../../config/db.js";

// ✅ Get all seats
export const getAllSeats = async () => {
  const result = await pool.query("SELECT * FROM seats ORDER BY id");
  return result.rows;
};

// ✅ Book seat with transaction (IMPORTANT)
export const bookSeat = async (seatNumber, userId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // lock the seat row
    const result = await client.query(
      "SELECT * FROM seats WHERE id = $1 AND isbooked = 0 FOR UPDATE",
      [seatNumber]
    );

    if (result.rowCount === 0) {
      throw { statusCode: 409, message: "Seat already booked or not found" };
    }

    // update seat
    const update = await client.query(
      "UPDATE seats SET isbooked = 1, name = $2 WHERE id = $1 RETURNING *",
      [seatNumber, userId]
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
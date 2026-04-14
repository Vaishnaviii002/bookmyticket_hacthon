// import { getAllSeats, bookSeat, seedSeats } from "./seats.service.js";

// const handleError = (err, res) => {
//   const status = err.statusCode || 500;
//   res.status(status).json({ success: false, message: err.message });
// };

// export const getSeats = async (req, res) => {
//   try {
//     const seats = await getAllSeats();
//     res.json({ success: true, data: seats });
//   } catch (err) { handleError(err, res); }
// };

// export const book = async (req, res) => {
//   try {
//     const { seatNumber } = req.body;
//     if (!seatNumber) {
//       return res.status(400).json({ success: false, message: "seatNumber is required" });
//     }
//     const seat = await bookSeat(seatNumber, req.user.id);
//     res.status(200).json({ success: true, message: "Seat booked!", data: seat });
//   } catch (err) { handleError(err, res); }
// };

// export const seed = async (req, res) => {
//   try {
//     const seats = await seedSeats();
//     res.status(201).json({ success: true, message: `${seats.length} seats seeded`, data: seats });
//   } catch (err) { handleError(err, res); }
// };


import { getAllSeats, bookSeat, seedSeats } from "./seats.service.js";

// ✅ centralized error handler
const handleError = (err, res) => {
  console.error("Seats Error:", err.message);

  const status = err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};

// ✅ GET ALL SEATS
export const getSeats = async (req, res) => {
  try {
    const seats = await getAllSeats();

    res.status(200).json({
      success: true,
      data: seats,
    });
  } catch (err) {
    handleError(err, res);
  }
};

// ✅ BOOK SEAT
export const book = async (req, res) => {
  try {
    const { seatNumber } = req.body;

    // ❌ validation
    if (!seatNumber) {
      return res.status(400).json({
        success: false,
        message: "seatNumber is required",
      });
    }

    // ❌ make sure user exists (auth middleware)
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const seat = await bookSeat(seatNumber, req.user.id);

    res.status(200).json({
      success: true,
      message: "Seat booked successfully",
      data: seat,
    });
  } catch (err) {
    handleError(err, res);
  }
};

// ✅ SEED SEATS (for testing)
export const seed = async (req, res) => {
  try {
    const seats = await seedSeats();

    res.status(201).json({
      success: true,
      message: `${seats.length} seats seeded`,
      data: seats,
    });
  } catch (err) {
    handleError(err, res);
  }
};
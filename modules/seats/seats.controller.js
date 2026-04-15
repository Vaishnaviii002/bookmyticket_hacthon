import { getAllSeats, bookSeat, seedSeats } from "./seats.service.js";

const handleError = (err, res) => {
  const status = err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};

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

export const book = async (req, res) => {
  try {
    const { seatId } = req.body;

    if (!seatId) {
      return res.status(400).json({
        success: false,
        message: "seatId is required",
      });
    }

    const seat = await bookSeat(seatId, req.user.id);

    res.status(200).json({
      success: true,
      message: "Seat booked successfully",
      data: seat,
    });
  } catch (err) {
    handleError(err, res);
  }
};

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
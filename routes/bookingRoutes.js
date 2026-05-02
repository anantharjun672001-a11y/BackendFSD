import express from "express";
import Booking from "../models/Bookings.js";
import { verifyToken, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create booking (user)
router.post("/", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.create({
      userId: req.user.id,
      service: req.body.service,
      price: req.body.price,
      date: req.body.date,
    });

    res.json(booking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating booking" });
  }
});
// My bookings
router.get("/my", verifyToken, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id });
  res.json(bookings);
});

// Admin view all
router.get("/", verifyToken, allowRoles("admin"), async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// Admin update status
router.put("/:id", verifyToken, allowRoles("admin"), async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(booking);
});

// GET booked dates (approved bookings only)
router.get("/booked-dates", async (req, res) => {
  try {
    const bookings = await Booking.find({ status: "approved" });

    const dates = bookings.map(b => b.date);

    res.json(dates);
  } catch (err) {
    res.status(500).json({ message: "Error fetching dates" });
  }
});


export default router;
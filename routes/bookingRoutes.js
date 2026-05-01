import express from "express";
import Booking from "../models/Booking.js";
import { verifyToken, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create booking (user)
router.post("/", verifyToken, async (req, res) => {
  const booking = await Booking.create({
    userId: req.user.id,
    service: req.body.service,
    date: req.body.date,
  });

  res.json(booking);
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

export default router;
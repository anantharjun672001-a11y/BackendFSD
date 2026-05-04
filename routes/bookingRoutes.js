import express from "express";
import Booking from "../models/Bookings.js";
import User from "../models/User.js";
import { verifyToken, allowRoles } from "../middleware/authMiddleware.js";
import { sendMail } from "../utils/sendMail.js";

const router = express.Router();

// CREATE BOOKING
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
    res.status(500).json({ message: "Error creating booking" });
  }
});

// MY BOOKINGS
router.get("/my", verifyToken, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id });
  res.json(bookings);
});

// ADMIN VIEW
router.get("/", verifyToken, allowRoles("admin"), async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// 🔥 ADMIN UPDATE STATUS + MAIL
router.put("/:id", verifyToken, allowRoles("admin"), async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    const user = await User.findById(booking.userId);

    if (req.body.status === "approved") {
      await sendMail(
        user.email,
        "Booking Approved ",
        `Your booking for ${booking.service} is approved. Please complete payment.`
      );
    }

    if (req.body.status === "rejected") {
      await sendMail(
        user.email,
        "Booking Rejected ",
        `Your booking for ${booking.service} is rejected.`
      );
    }

    res.json(booking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update failed" });
  }
});

// BOOKED DATES
router.get("/booked-dates", async (req, res) => {
  const bookings = await Booking.find({ status: "approved" });
  const dates = bookings.map((b) => b.date);
  res.json(dates);
});

export default router;
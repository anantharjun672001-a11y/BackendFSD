import express from "express";
import Booking from "../models/Bookings.js";
import User from "../models/User.js";
import { verifyToken, allowRoles } from "../middleware/authMiddleware.js";
import { sendMail } from "../utils/sendMail.js";

const router = express.Router();

// CREATE BOOKING
router.post("/", verifyToken, async (req, res) => {
  try {
    const { service, price, date } = req.body;

    if (!service || !price || !date) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (price <= 0) {
      return res.status(400).json({ message: "Invalid price" });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      service,
      price,
      date,
    });

    res.json(booking);

  } catch (err) {
    res.status(500).json({ message: "Error creating booking" });
  }
});

// MY BOOKINGS

router.get("/my", verifyToken, async (req, res) => {
  const bookings = await Booking.find({
    userId: req.user.id,
    status: { $ne: "cancelled" }, 
  });

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


router.put("/payment/:id", verifyToken, async (req, res) => {
  console.log("PAYMENT ROUTE HIT");

  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { paymentStatus: "paid" },
    { new: true }
  );

  console.log("UPDATED BOOKING:", booking);

  const user = await User.findById(booking.userId);

  console.log("USER EMAIL:", user.email);

  await sendMail(
    user.email,
    "Payment Successful ",
    `Your payment for ${booking.service} is completed successfully.`
  );

  res.json(booking);
});


// CANCEL BOOKING (USER)
router.put("/cancel/:id", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // prevent cancelling paid booking
    if (booking.paymentStatus === "paid") {
      return res.status(400).json({ message: "Cannot cancel paid booking" });
    }

    //  prevent cancelling already rejected
    if (booking.status === "rejected") {
      return res.status(400).json({ message: "Already rejected" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cancel failed" });
  }
});

export default router;
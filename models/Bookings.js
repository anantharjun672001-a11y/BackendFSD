import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  service: {
    type: String,
  },
  date: {
    type: Date,
  },
  price: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "cancelled"],
    default: "pending", 
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending" ,
  },
});

export default mongoose.model("Booking", bookingSchema);
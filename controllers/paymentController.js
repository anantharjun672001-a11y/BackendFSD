import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create order
export const createOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // paise
    currency: "INR",
  };

  const order = await razorpay.orders.create(options);

  res.json(order);
};
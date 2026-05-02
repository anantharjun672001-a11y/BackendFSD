import Razorpay from "razorpay";

export const createOrder = async (req, res) => {
  try {
    
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    console.log("Payment error:", err);
    res.status(500).json({ message: "Error creating order" });
  }
};
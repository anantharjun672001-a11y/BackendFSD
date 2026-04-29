import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

//DB Connect
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
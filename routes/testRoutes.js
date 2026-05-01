import express from "express";
import { verifyToken,allowRoles } from "../middleware/authMiddleware.js";


const router = express.Router();

// Normal protected route
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "User profile data",
    user: req.user,
  });
});

// Admin only route
router.get("/admin", verifyToken, allowRoles("admin"), (req, res) => {
  res.json({
    message: "Admin data",
  });
});

export default router;
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

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
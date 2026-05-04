import express from "express";
import {
  createService,
  getServices,
  deleteService,
  updateService,
} from "../controllers/serviceController.js";
import { verifyToken, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, allowRoles("admin"), createService);
router.get("/", getServices);
router.put("/:id", verifyToken, allowRoles("admin"), updateService);
router.delete("/:id", verifyToken, allowRoles("admin"), deleteService);

export default router;
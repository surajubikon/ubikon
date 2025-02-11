import express from "express";
import {
  loginAdmin,
  registerAdmin,
  getAdminProfile,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login",protect, loginAdmin);
router.post("/register", registerAdmin);
router.get("/profile", protect, getAdminProfile);

export default router;

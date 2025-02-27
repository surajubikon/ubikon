import express from "express";
import {
  createActivity,
  getAllActivities,
  getAllActivitiesById,
  deleteActivity,
  updateActivity
} from "../controllers/activityController.js";
import upload from "../middleware/multer.js"; // ✅ File Upload Middleware

const router = express.Router();

router.post("/create", upload.array("image"), createActivity); // ✅ Create
router.get("/get", getAllActivities); // ✅ Get all
router.get("/get-activity/:subject", getAllActivitiesById); // ✅ Get by ID
router.delete("/:id", deleteActivity); // ✅ Delete
router.put("/:id", upload.single("image"), updateActivity);

export default router;

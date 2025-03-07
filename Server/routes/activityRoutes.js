import express from "express";
import multer from "multer";
import {
  createActivity,
  getAllActivities,
  getAllActivitiesById,
  deleteActivity,
  updateActivity
} from "../controllers/activityController.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "./public/uploads/activity");
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);

  }
});
const upload = multer({storage : storage});
const router = express.Router();

router.post("/create", upload.array("image"), createActivity); // ✅ Create
router.get("/get", getAllActivities); // ✅ Get all
router.get("/get-activity/:subject", getAllActivitiesById); // ✅ Get by ID
router.delete("/:id", deleteActivity); // ✅ Delete
router.put("/:id", upload.array("image"), updateActivity);

export default router;

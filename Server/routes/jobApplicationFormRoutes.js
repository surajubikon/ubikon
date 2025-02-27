// routes/jobCollectionRoutes.js
import express from "express";
import upload from "../middleware/multer.js";
import {
  createJobApplication,
  getJobApplications,
  getJobApplicationById,
  updateJobApplicationStatus,
  deleteJobApplication,
} from "../controllers/jobApplicationFormController.js";

const router = express.Router();

router.post("/create" , upload.single('resume'), createJobApplication);
router.get("/get", getJobApplications);
router.get("/:id", getJobApplicationById);
router.put("/:id", updateJobApplicationStatus);
router.delete("/:id", deleteJobApplication);

export default router;

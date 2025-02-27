// routes/jobCollectionRoutes.js
import express from "express";
import upload from "../middleware/multer.js";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobCollectionById,
} from "../controllers/jobCollectionController.js";

const router = express.Router();

router.post("/create" , upload.fields([{ name: 'thumbnail' }, { name: 'previewImage' }]), createJob);
router.get("/get", getAllJobs);
router.get("/get-jobcollection/:id", getJobCollectionById);
router.get("/:id", getJobById);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;

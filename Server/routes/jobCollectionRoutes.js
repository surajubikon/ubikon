// routes/jobCollectionRoutes.js
import express from "express";
import multer from "multer";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobCollectionById,
} from "../controllers/jobCollectionController.js";


const router = express.Router();

// ✅ Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/jobcollection");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });


router.post("/create" , upload.fields([{ name: 'thumbnail' }, { name: 'previewImage' }]), createJob);
router.get("/get", getAllJobs);
router.get("/get-jobcollection/:id", getJobCollectionById);
router.get("/:id", getJobById);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;

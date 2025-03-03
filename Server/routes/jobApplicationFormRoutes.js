// routes/jobCollectionRoutes.js
import express from "express";
import multer from "multer";
import {
  createJobApplication,
  getJobApplications,
  getJobApplicationById,
  updateJobApplicationStatus,
  deleteJobApplication,
  addRemarkApplication,
} from "../controllers/jobApplicationFormController.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "./public/uploads/resume");
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);

  }
});
const upload = multer({storage : storage});
const router = express.Router();

router.post("/create" , upload.single('resume'), createJobApplication);
router.get("/get", getJobApplications);
router.get("/:id", getJobApplicationById);
router.put("/update-remark/:id", addRemarkApplication); // ✅ Correct Route

router.put("/update/:id", updateJobApplicationStatus);
router.delete("/:id", deleteJobApplication);

export default router;



import express from "express";
import multer from "multer";
import { createProject, getProject , updateProject,deleteProject,getProjectById } from "../controllers/projectController.js";

const router = express.Router();

// 🟢 Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/project");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// 🟢 Routes
router.post("/create",upload.fields([{ name: "images", maxCount: 10 },{ name: "logo", maxCount: 1 },]),createProject);
 router.get("/get", getProject);
 router.put("/update/:id",upload.fields([{ name: "images", maxCount: 10 },{ name: "logo", maxCount: 1 },]),updateProject);
 router.delete("/delete/:id", deleteProject);
router.get("/get-project/:subject", getProjectById); // ✅ Get by ID
export default router;

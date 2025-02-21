
import express from "express";
import {
  jobCreateCategory,
  jobGetCategories,
  jobGetCategoryById,
  jobUpdateCategory,
  jobDeleteCategory,
} from "../controllers/jobCategoryController.js";

const router = express.Router();

router.post("/create-job", jobCreateCategory);
router.get("/get-job", jobGetCategories);
router.get("/:id", jobGetCategoryById);
router.put("/:id", jobUpdateCategory);
router.delete("/:id", jobDeleteCategory);

export default router;
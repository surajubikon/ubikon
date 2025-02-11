import express from "express";
import { createPost, getPosts, getPostBySlug, updatePost, deletePost } from "../controllers/postController.js";
import upload from "../middleware/multer.js"; // Middleware for file upload
const router = express.Router();
import  { protect }from "../middleware/authMiddleware.js";
router.post("/create", protect, upload.single("image"), createPost);
router.get("/create", getPosts);
router.get("/create/:slug", getPostBySlug);
router.put("/update/:id", protect, upload.single("image"), updatePost);
router.delete("/delete/:id",protect, deletePost);

export default router;
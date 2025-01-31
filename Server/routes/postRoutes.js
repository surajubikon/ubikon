import express from "express";
import { createPost, getPosts, getPostBySlug, updatePost, deletePost } from "../controllers/postController.js";
import upload from "../middleware/multer.js"; // Middleware for file upload
const router = express.Router();

router.post("/create", upload.single("image"), createPost);
router.get("/create", getPosts);
router.get("/create/:slug", getPostBySlug);
router.put("/update/:id", upload.single("image"), updatePost);
router.delete("/delete/:id", deletePost);

export default router;
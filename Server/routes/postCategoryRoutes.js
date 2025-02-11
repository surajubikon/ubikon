import express from 'express';
import upload from "../middleware/multer.js";
import { 
  createBlogPost, 
  getBlogPosts, 
  getBlogPostById, 
  updateBlogPost, 
  deleteBlogPost 
} from '../controllers/postCategoryController.js';
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/create',protect, upload.fields([{ name: 'thumbnail' }, { name: 'coverImage' }]), createBlogPost);
  // ✅ Create blog post
router.get('/all', getBlogPosts);       // ✅ Get all blog posts
router.get('/:id', getBlogPostById);    // ✅ Get single blog post by ID
router.put('/update/:id',  protect, upload.fields ([{ name: 'thumbnail' }, { name: 'coverImage' }]),  updateBlogPost); // ✅ Update blog post
router.delete('/delete/:id',protect,  deleteBlogPost); // ✅ Delete blog post

export default router;

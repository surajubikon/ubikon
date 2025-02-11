import express from 'express';
import upload from "../middleware/multer.js";
import { 
  createBlogPost, 
  getBlogPosts, 
  getBlogPostById, 
  updateBlogPost, 
  deleteBlogPost 
} from '../controllers/postCategoryController.js';

const router = express.Router();

router.post('/create', upload.fields([{ name: 'thumbnail' }, { name: 'coverImage' }]), createBlogPost);
  // ✅ Create blog post
router.get('/all', getBlogPosts);       // ✅ Get all blog posts
router.get('/:id', getBlogPostById);    // ✅ Get single blog post by ID
router.put('/update/:id', upload.fields ([{ name: 'thumbnail' }, { name: 'coverImage' }]),  updateBlogPost); // ✅ Update blog post
router.delete('/delete/:id',  deleteBlogPost); // ✅ Delete blog post

export default router;

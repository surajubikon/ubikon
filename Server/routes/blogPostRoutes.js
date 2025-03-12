import express from 'express';
import multer from "multer";
import { 
  createBlogPost, 
  getBlogPosts, 
  getBlogPostById, 
  getBlogPostBySlug,
  updateBlogPost, 
  deleteBlogPost 
} from '../controllers/blogPostController.js';

const router = express.Router();

// ✅ Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/blogpost");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });


router.post('/create', upload.fields([{ name: 'thumbnail' }, { name: 'coverImage' }, { name: 'previewImage' }]), createBlogPost);
router.get('/all', getBlogPosts);       
router.get('/:id', getBlogPostById);
router.get('/:slug', getBlogPostBySlug);  // Changed from :id to :slug

router.put('/update/:id', upload.fields ([{ name: 'thumbnail' }, { name: 'coverImage'}, {name: 'previewImage' }]),  updateBlogPost); // ✅ Update blog post
router.delete('/delete/:id',  deleteBlogPost); 

export default router;

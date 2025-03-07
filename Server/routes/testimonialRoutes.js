import express from 'express';
import multer from 'multer';
import { 
  createTestimonial, 
  getTestimonial, 
  getTestimonialById, 
  getTestimonialBySlug,
  updateTestimonial, 
  deleteTestimonial 
} from '../controllers/testimonialController.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "./public/uploads/testimonial");
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);

  }
});
const upload = multer({storage : storage});
const router = express.Router();

router.post('/create-testimonial', upload.single( 'image' ), createTestimonial);
router.get('/all', getTestimonial);       
router.get('/:id', getTestimonialById);
router.get('/slug/:slug', getTestimonialBySlug);
// Changed from :id to :slug

router.put('/update/:id', upload.single ('image'),  updateTestimonial); // ✅ Update blog post
router.delete('/delete/:id',  deleteTestimonial); 

export default router;

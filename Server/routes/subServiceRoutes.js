import express from 'express';
import upload from "../middleware/multer.js";
import { 
  createSubService, 
  getSubService,
  getSubServiceBySlug,
  updateSubService, 
  deleteSubService 
} from '../controllers/subServiceControllers.js';

const router = express.Router();

router.post('/create', upload.fields([{ name: 'thumbnail' }]), createSubService);
router.get('/all', getSubService);       
router.get('/:slug', getSubServiceBySlug);  // Changed from :id to :slug

router.put('/update/:id', upload.fields ([{ name: 'thumbnail' }]),  updateSubService); // ✅ Update blog post
router.delete('/delete/:id',  deleteSubService); 

export default router;

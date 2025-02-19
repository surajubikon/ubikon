import express from 'express';
import upload from "../middleware/multer.js";
import { 
  createService, 
  getService, 
  getServiceById, 
  getServiceBySlug,
  updateService, 
  deleteService 
} from '../controllers/serviceController.js';

const router = express.Router();

router.post('/create', upload.fields([{ name: 'thumbnail' }, { name: 'coverImage' }, { name: 'previewImage' }]), createService);
router.get('/all', getService);       
router.get('/:id', getServiceById);
router.get('/slug/:slug', getServiceBySlug);
// Changed from :id to :slug

router.put('/update/:id', upload.fields ([{ name: 'thumbnail' }, { name: 'coverImage' }, { name: 'previewImage' }]),  updateService); // ✅ Update blog post
router.delete('/delete/:id',  deleteService); 

export default router;

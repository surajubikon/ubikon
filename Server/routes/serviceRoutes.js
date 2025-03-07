import express from 'express';
import multer from 'multer';
import { 
  createService, 
  getService, 
  getServiceById, 
  getServiceBySlug,
  updateService, 
  deleteService 
} from '../controllers/serviceController.js';

const router = express.Router();

// ✅ Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/service");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// ✅ Routes with Correct Multer Usage
router.post('/create', upload.fields([
  { name: 'thumbnail', maxCount: 1 }, 
  { name: 'coverImage', maxCount: 1 }, 
  { name: 'previewImage', maxCount: 1 }
]), createService);

router.get('/all', getService);       
router.get('/:id', getServiceById);
router.get('/slug/:slug', getServiceBySlug);

router.put('/update/:id', upload.fields([
  { name: 'thumbnail', maxCount: 1 }, 
  { name: 'coverImage', maxCount: 1 }, 
  { name: 'previewImage', maxCount: 1 }
]), updateService);

router.delete('/delete/:id', deleteService);

export default router;

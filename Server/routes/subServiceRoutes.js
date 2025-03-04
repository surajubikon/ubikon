import express from 'express';
import multer from 'multer';
import { 
  createSubService, 
  getSubService,
  getSubServiceBySlug,
  updateSubService, 
  deleteSubService 
} from '../controllers/subServiceControllers.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "./public/uploads/subservice");
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);

  }
});
const upload = multer({storage : storage});
const router = express.Router();

router.post('/create', upload.array('thumbnail',5 ), createSubService);
router.get('/all', getSubService);       
router.get('/:slug', getSubServiceBySlug);  // Changed from :id to :slug

router.put('/update/:id', upload.array ('thumbnail',5),  updateSubService); // ✅ Update blog post
router.delete('/delete/:id',  deleteSubService); 

export default router;

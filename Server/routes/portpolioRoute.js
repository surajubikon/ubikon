import express from 'express';
import upload from "../middleware/multer.js";
import { 
createPortfolio, 
  getAllPortfolios,
  updatePortfolio,
  getportfolioBySlug,
  deletePortfolio, 
  
} from '../controllers/portfolioController.js';

const router = express.Router();

router.post('/create', upload.fields([{ name: "image", maxCount: 1 }]), createPortfolio);
router.get('/get-all', getAllPortfolios);       
router.get('/:slug', getportfolioBySlug);  // Changed from :id to :slug

router.put('/update/:id', upload.fields ([{ name: 'image',maxCount: 1  }]),  updatePortfolio); // ✅ Update blog post
router.delete('/delete/:id',  deletePortfolio); 

export default router;
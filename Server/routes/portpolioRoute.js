import express from 'express';
import multer from 'multer';
import { 
createPortfolio, 
  getAllPortfolios,
  updatePortfolio,
  getportfolioBySlug,
  deletePortfolio, 
  
} from '../controllers/portfolioController.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "./public/uploads/portfolio");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);

  }
});
const upload = multer({storage : storage});
const router = express.Router();

router.post('/create', upload.array("image", 5), createPortfolio);
router.get('/get-all', getAllPortfolios);       
router.get('/:slug', getportfolioBySlug);  // Changed from :id to :slug

router.put('/update/:id', upload.array("image", 5),  updatePortfolio); // ✅ Update blog post
router.delete('/delete/:id',  deletePortfolio); 

export default router;
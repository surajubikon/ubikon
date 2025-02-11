import express from 'express';
import { createContact , getContacts} from '../controllers/contactController.js';
import  { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/create',protect, createContact);
router.get('/create', getContacts);

export default router;

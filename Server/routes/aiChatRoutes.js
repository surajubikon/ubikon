import express from 'express';
import { aiChatRoutes,
     getAssistant 
    } from '../controllers/aiChatController.js';

// Create an Express router
const router = express.Router();

// Route for handling chatbot messages
router.post('/bot',aiChatRoutes);
router.get('/get',getAssistant);
export default router;

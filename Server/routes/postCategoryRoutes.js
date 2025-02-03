import express from 'express';
import { createPostCategory, getPostCategories, updatePostCategory, deletePostCategory } from '../controllers/postCategoryController.js';

const router = express.Router();

router.post('/create', createPostCategory); // Create category
router.get('/create', getPostCategories); // Get all categories
router.put('/update/:id', updatePostCategory); // Update category
router.delete('/delete/:id', deletePostCategory); // Delete category

export default router;

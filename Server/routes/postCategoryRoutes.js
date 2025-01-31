import express from 'express';
import { createPostCategory, getPostCategories, updatePostCategory, deletePostCategory } from '../controllers/postCategoryController.js';

const router = express.Router();

router.post('/categories', createPostCategory); // Create category
router.get('/categories', getPostCategories); // Get all categories
router.put('/categories/:id', updatePostCategory); // Update category
router.delete('/categories/:id', deletePostCategory); // Delete category

export default router;

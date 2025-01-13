import express from 'express';
import { posts, getPost, getPosts, createPost, deletePost, updatePost } from '../controllers/postController';

const router = express.Router();
// Get all posts
router.get('/', getPosts);
// Get single post
router.get('/:id', getPost);
// Create new post
router.post('/', createPost);
// Update post
router.put('/:id', updatePost);
// Delete post
router.delete('/:id', deletePost);

export default router;
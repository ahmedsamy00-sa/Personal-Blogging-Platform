import express from 'express';
import { authMiddleware, authorizeRoles } from '../middlewares/authMiddleware.js';
import { addPost, getPosts, deletePost, updatePost } from '../controllers/postController.js';
import { updatePostValidator, deletePostValidator, addPostValidator } from './../utils/validators/postValidator.js';

const router = express.Router();

router.route('/').get(authMiddleware, authorizeRoles("user", "admin"), getPosts);
router.post('/add', authMiddleware,authorizeRoles("user"), addPostValidator, addPost);
router.route('/:id')
.put(authMiddleware, authorizeRoles("user"), updatePostValidator, updatePost)
.delete(authMiddleware, authorizeRoles("user"), deletePostValidator, deletePost);

export default router
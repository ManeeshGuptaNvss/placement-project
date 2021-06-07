import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from '../controllers/postControllers.js'

import express from 'express'
import { protectStudent } from '../middleware/authMiddleware.js'
const router = express.Router()
router.route('/').post(protectStudent, createPost).get(protectStudent, getPosts)
router
  .route('/:id')
  .get(protectStudent, getPostById)
  .put(protectStudent, updatePost)
  .delete(protectStudent, deletePost)

export default router

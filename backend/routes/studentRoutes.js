import express from 'express'
import {
  authStudent,
  registerStudent,
  getStudentProfile,
  updateStudentProfile,
} from '../controllers/studentControllers.js'
import { protectStudent } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerStudent).get(authStudent)
router
  .route('/profile')
  .get(protectStudent, getStudentProfile)
  .put(protectStudent, updateStudentProfile)
export default router

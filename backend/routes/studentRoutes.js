import express from 'express'
import {
  getStudentProfile,
  updateStudentProfile,
  getStudents,
  getStudentById,
  updateStudent,
} from '../controllers/studentControllers.js'
import {
  forgotPassword,
  resetPassword,
  authStudent,
  registerStudent,
} from '../controllers/authControllers.js'
import { protectStudent, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protectStudent, admin, getStudents)

router.post('/register', registerStudent)
router.post('/login', authStudent)
router.post('/forgotpassword', forgotPassword)
router.patch('/resetpassword/:token', resetPassword)

router
  .route('/profile')
  .get(protectStudent, getStudentProfile)
  .put(protectStudent, updateStudentProfile)
router
  .route('/:id')
  .get(protectStudent, admin, getStudentById)
  .put(protectStudent, admin, updateStudent)
export default router

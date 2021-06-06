import express from 'express'
import {
  authStudent,
  registerStudent,
  getStudentProfile,
  updateStudentProfile,
  getStudents,
  getStudentById,
  updateStudent,
  forgotPassword,
  resetPassword,
} from '../controllers/studentControllers.js'
import { protectStudent, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerStudent).get(protectStudent, admin, getStudents)

router.post('/register', registerStudent)
router.post('/login', authStudent)
router.post('/forgotpassword', forgotPassword)
router.patch('/resetpassword/:token', resetPassword)

router
  .route('/profile')
  .get(protectStudent, getStudentProfile)
  .put(protectStudent, updateStudentProfile)
router.route('/:id').get(protectStudent, admin, getStudentById).put(protectStudent,admin,updateStudent)
export default router

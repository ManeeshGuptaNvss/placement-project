import express from 'express'
import {
  createApplication,
    editApplication,
  getApplications,
  selectApplication,
  validateApplication,
} from '../controllers/applicationControllers.js'
import { admin, protectStudent } from '../middleware/authMiddleware.js'

const router = express.Router()
router
  .route('/')
  .post(protectStudent, createApplication)
    .get(protectStudent, admin, getApplications)
  
router.route('/:id').put(protectStudent, editApplication)
router.route('/:id/validate').put(protectStudent,admin,validateApplication)
router.route('/:id/select').put(protectStudent,admin,selectApplication)

export default router

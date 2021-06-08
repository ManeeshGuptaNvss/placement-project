import express from 'express'
import {
  createApplication,
  editApplication,
  getApplications,
  selectApplication,
  validateApplication,
  getReports,
  filterApplications,
} from '../controllers/applicationControllers.js'
import { admin, protectStudent } from '../middleware/authMiddleware.js'

const router = express.Router()
router
  .route('/')
  .post(protectStudent, createApplication)
  .get(protectStudent, admin, getApplications)
router.route('/filter').get(protectStudent,admin,filterApplications)
router.route('/reports').get(getReports)
router.route('/:id').put(protectStudent, editApplication)
router.route('/:id/validate').put(protectStudent, admin, validateApplication)
router.route('/:id/select').put(protectStudent, admin, selectApplication)

export default router

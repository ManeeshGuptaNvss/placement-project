import express from 'express'

import {
  createApplication,
  editApplication,
  getApplications,
  selectApplication,
  validateApplication,
  getReports,
  filterApplications,
  getYearlyStats,
  uploadResume,
} from '../controllers/applicationControllers.js'
import { admin, protectStudent } from '../middleware/authMiddleware.js'


const router = express.Router()
router
  .route('/')
  .post(protectStudent,uploadResume, createApplication)
  .get(protectStudent, admin, getApplications)
router.route('/filter').get(protectStudent,admin,filterApplications)
router.route('/reports').get(getReports)
router.route('/stats/:year').get(getYearlyStats)
router.route('/:id').put(protectStudent,uploadResume, editApplication)
router.route('/:id/validate').put(protectStudent, admin, validateApplication)
router.route('/:id/select').put(protectStudent, admin, selectApplication)

export default router

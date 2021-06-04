import express from 'express'
import {authStudent, registerStudent} from '../controllers/studentControllers.js'
const router = express.Router()

router.route('/').post(registerStudent).get(authStudent)
export default router
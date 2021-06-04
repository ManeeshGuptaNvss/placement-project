import express from 'express'
import {registerStudent} from '../controllers/studentControllers.js'
const router = express.Router()

router.route('/').post(registerStudent)
export default router
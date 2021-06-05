import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Student from '../models/studentModel.js'
const protectStudent = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Checking whether it is a bearer token or not
      //
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log("decoded",decoded)
      req.student = await Student.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized,token failed')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = asyncHandler(async (req, res,next) => {
  if (req.student && req.student.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error("Not authorized as an admin")
  }
})
export { protectStudent,admin }

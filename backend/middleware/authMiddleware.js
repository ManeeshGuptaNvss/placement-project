import jwt from 'jsonwebtoken'
import AppError from '../utils/appError.js'
import { promisify } from 'util'
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
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // console.log("decoded",decoded)
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

  /*
  // 1) Getting token and check of it's there
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // 3) Check if user still exists
  const currentStudent = await Student.findById(decoded.id)
  if (!currentStudent) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    )
  }

  // 4) Check if user changed password after the token was issued
  if (currentStudent.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    )
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.student = currentStudent
  next()*/
})

const admin = asyncHandler(async (req, res,next) => {
  if (req.student && req.student.isAdmin) {
    next()
  } else {
    res.status(403)
    throw new Error("Not authorized as an admin")
  }
})
export { protectStudent,admin }

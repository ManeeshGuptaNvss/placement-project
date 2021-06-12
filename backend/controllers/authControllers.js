import expressAsyncHandler from 'express-async-handler'
import Student from '../models/studentModel.js'
import AppError from '../utils/appError.js'
import sendEmail from '../utils/email.js'
import crypto from 'crypto'
import { createSendToken, generateToken } from '../utils/generateToken.js'

// @desc Register a new students
// @route POST /api/v1/students/register
// @access Public

const registerStudent = expressAsyncHandler(async (req, res) => {
  // 1) Avoiding multiple users with the same email
  const { name, email, password, passwordConfirm } = req.body
  const existingStudent = await Student.findOne({
    email,
  })
  if (existingStudent) {
    throw new AppError('User with this email already exists ', 400)
  }
  // 2)Creating a new user
  const student = await Student.create({
    name,
    email,
    password,
    passwordConfirm,
  })
  if (student) {
    res.status(201).json({
      token: generateToken(student._id),
      name: student.name,
      _id: student._id,
      isAdmin: student.isAdmin,
      email:student.email
    })
    // createSendToken(student, 201, res)
  } else {
    res.status(400)
    throw new Error('Invalid student data')
  }
})

// @desc Authenticate Student (Login)
// @route POST /api/v1/students/login
// @access Public

const authStudent = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  // 1) Check if email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password ', 400))
  }
  // 2) Check if student is exits && password is correct
  const student = await Student.findOne({ email })

  if (!student || !(await student.matchPassword(password))) {
    return next(new AppError('Incorrect Email or Password ', 401))
  }
  // 3) If everything is ok, send token to client
  // createSendToken(student, 200, res)
  res.status(200).json({
    _id:student._id,
    name: student.name,
    token: generateToken(student._id),
    email: student.email,
    isAdmin:student.isAdmin
  })
})

// @desc Forgot Password
// @route PUT /api/v1/students/forgotpassword
// @access Public
const forgotPassword = expressAsyncHandler(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const student = await Student.findOne({ email: req.body.email })
  if (!student) {
    return next(new AppError('There is no student with email address.', 404))
  }

  // 2) Generate the random reset token
  const resetToken = student.createPasswordResetToken()
  await student.save({ validateBeforeSave: false })

  // 3) Send it to student's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/students/resetpassword/${resetToken}`

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`

  try {
    await sendEmail({
      email: student.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    })

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    })
  } catch (err) {
    student.passwordResetToken = undefined
    student.passwordResetExpires = undefined
    await student.save({ validateBeforeSave: false })

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    )
  }
})

const resetPassword = expressAsyncHandler(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const student = await Student.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  })

  // 2) If token has not expired, and there is student, set the new password
  if (!student) {
    return next(new AppError('Token is invalid or has expired', 400))
  }
  student.password = req.body.password
  student.passwordConfirm = req.body.passwordConfirm
  student.passwordResetToken = undefined
  student.passwordResetExpires = undefined
  await student.save()

  // 3) Update changedPasswordAt property for the student
  // 4) Log the student in, send JWT
  createSendToken(student, 200, res)
  /*
  const token = generateToken(student._id)
  res.status(200).json({
    status: "sucess",
    token
  })*/
})

export { forgotPassword, resetPassword, registerStudent, authStudent }

import crypto from 'crypto'

import Student from './../models/studentModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from './../utils/generateToken.js'
import AppError from '../utils/appError.js'
import sendEmail from '../utils/email.js'


const createSendToken = (student, statusCode, res) => {
  const token = generateToken(student._id)
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

  res.cookie('jwt', token, cookieOptions)

  // Remove password from output
  student.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      student,
    },
  })
}

// @desc Register a new students
// @route POST /api/v1/students
// @access Public

const registerStudent = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    passwordConfirm,
    roll,
    yearOfJoining,
    department,
    gender,
    cgpa,
    githubHandle,
    tenthMarks,
    interMarks,
    diplomaMarks,
    mobile,
  } = req.body
  // const studentExists = await Student.findOne({ roll })
  // if (studentExists) {
  //   res.status(400)
  //   throw new Error('student already exists')
  // }
  const student = await Student.create({
    name,
    email,
    password,
    passwordConfirm,
    gender,
    roll,
    yearOfJoining,
    department,
    cgpa,
    githubHandle,
    tenthMarks,
    interMarks,
    diplomaMarks,
    mobile,
  })
  if (student) {
    createSendToken(student,201,res)
    /*
    res.status(201).json({
      
      _id: student._id,
      name: student.name,
      roll: student.roll,
      yearOfJoining: student.yearOfJoining,
      cgpa: student.cgpa,
      gender: student.gender,
      githubHandle: student.githubHandle,
      tenthMarks: student.tenthMarks,
      interMarks: student.interMarks,
      diplomaMarks: student.diplomaMarks,
      email: student.email,
      mobile: student.mobile,
      isAdmin: student.isAdmin,
      isScrutinised: student.isScrutinised,
      token: generateToken(student._id),
    }
    )*/
  } else {
    res.status(400)
    throw new Error('Invalid student data')
  }
})

// @desc Authenticate Student (Login)
// @route POST /api/v1/students/login
// @access Public

const authStudent = asyncHandler(async (req, res, next) => {
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
  createSendToken(student, 200, res)
  // res.status(200).json({
  //   status: 'success login',
  //   token: generateToken(student._id),
  // })
})

// @desc Get user profile
// @route GET /api/v1/students/profile
// @access Private

const getStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.student._id)

  if (student) {
    res.json({
      _id: student._id,
      name: student.name,
      roll: student.roll,
      email: student.email,
      mobile: student.mobile,
      isAdmin: student.isAdmin,
      isScrutinised: student.isScrutinised,
    })
  } else {
    res.status(401)
    throw new Error('Student not found')
  }
})

// @desc Update student Profile
// @route PUT /api/v1/students/profile
// @access Private
const updateStudentProfile = asyncHandler(async (req, res) => {
  console.log(req.student)
  const student = await Student.findById(req.student._id)

  if (student) {
    student.name = req.body.name || student.name
    student.department = req.body.department || student.department
    student.email = req.body.email || student.email
    student.gender = req.body.gender || student.gender
    student.mobile = req.body.mobile || student.mobile
    student.githubHandle = req.body.githubHandle || student.githubHandle
    student.tenthMarks = req.body.tenthMarks || student.tenthMarks
    student.interMarks = req.body.interMarks || student.interMarks
    student.diplomaMarks = req.body.diplomaMarks || student.diplomaMarks
    student.yearOfJoining = req.body.yearOfJoining || student.yearOfJoining
    student.cgpa = req.body.cgpa || student.cgpa
    student.roll = req.body.roll || student.roll
    if (req.body.password) {
      student.password = req.body.password
      student.passwordConfirm = req.body.passwordConfirm
    }
    const updatedStudent = await student.save()
    createSendToken(updatedStudent, 204, res)
    /*
    res.json({
      _id: updatedStudent._id,
      name: updatedStudent.name,
      roll: updatedStudent.roll,
      email: updatedStudent.email,
      password: updatedStudent.password,
      mobile: updatedStudent.mobile,
      isAdmin: updatedStudent.isAdmin,
      isScrutinised: updatedStudent.isScrutinised,
      token: generateToken(updatedStudent._id),
    })*/
  } else {
    res.status(404)
    throw new Error('Student not found')
  }
})

// @desc Get all students
// @route GET /api/v1/students
// @access Private/Admin
const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({}).select('-password')
  res.json(students)
})

// @desc Get all students
// @route GET /api/v1/students/:id
// @access Private/Admin
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id).select('-password')
  if (student) {
    res.json(student)
  } else {
    throw new Error('Student not found')
  }
})

// @desc Update student
// @route PUT /api/v1/students/:id
// @access Private/Admin
const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id).select('-password')
  if (student) {
    student.isAdmin = req.body.isAdmin
    const updatedStudent = await student.save()
    res.json({
      name: updatedStudent.name,
      isAdmin: updatedStudent.isAdmin,
      roll: updatedStudent.roll,
    })
  } else {
    res.status(404)
    throw new Error('Student not found')
  }
})

// @desc Forgot Password
// @route PUT /api/v1/students/forgotpassword
// @access Public

const forgotPassword = asyncHandler(async (req, res, next) => {
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

const resetPassword = asyncHandler(async (req, res, next) => {
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

export {
  registerStudent,
  authStudent,
  getStudentProfile,
  updateStudentProfile,
  getStudents,
  getStudentById,
  updateStudent,
  forgotPassword,
  resetPassword,
}

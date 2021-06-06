import Student from './../models/studentModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from './../utils/generateToken.js'
import AppError from '../utils/appError.js'

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
    })
  } else {
    res.status(400)
    throw new Error('Invalid student data')
  }
})

// @desc Authenticate Student (Login)
// @route POST /api/v1/students/login
// @access Public

const authStudent = asyncHandler(async (req, res,next) => {
  const { email, password } = req.body
  
  // 1) Check if email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password ',400))
  }
  // 2) Check if user is exits && password is correct
  const student = await Student.findOne({ email })

  if (!student || !(await student.matchPassword(password))) {
    return next(new AppError('Incorrect Email or Password ', 401))
  }
  // 3) If everything is ok, send token to client
  res.status(200).json({
    status:'success login',
    token: generateToken(student._id),
  })
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
      student.passwordConfirm=req.body.passwordConfirm
    }
    const updatedStudent = await student.save()
    res.json({
      _id: updatedStudent._id,
      name: updatedStudent.name,
      roll: updatedStudent.roll,
      email: updatedStudent.email,
      password:updatedStudent.password,
      mobile: updatedStudent.mobile,
      isAdmin: updatedStudent.isAdmin,
      isScrutinised: updatedStudent.isScrutinised,
      token: generateToken(updatedStudent._id),
    })
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

export {
  registerStudent,
  authStudent,
  getStudentProfile,
  updateStudentProfile,
  getStudents,
  getStudentById,
  updateStudent,
}

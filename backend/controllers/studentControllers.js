import asyncHandler from 'express-async-handler'
import Student from './../models/studentModel.js'
import { generateToken, createSendToken } from './../utils/generateToken.js'
import AppError from '../utils/appError.js'





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

export {
 
  getStudentProfile,
  updateStudentProfile,
  getStudents,
  getStudentById,
  updateStudent,
}

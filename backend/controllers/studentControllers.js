import Student from './../models/studentModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from './../utils/generateToken.js'


// @desc Register a new students
// @route POST /api/v1/students
// @access Public

const registerStudent = asyncHandler(async (req, res) => {
    const {
      name,
      email,
      password,
      roll,
      yearOfJoining,
      department,
      cgpa,
      githubHandle,
      tenthMarks,
      interMarks,
      diplomaMarks,
        mobile } = req.body
    const studentExists = await Student.findOne({ roll })
    if (studentExists) {
        res.status(400)
        throw new Error('student already exists')
    }
    const student = await Student.create({
      name,
      email,
      password,
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
            name: student.name,
            roll: student.roll,
            yearOfJoining: student.yearOfJoining,
            cgpa: student.cgpa,
            githubHandle: student.githubHandle,
            tenthMarks: student.tenthMarks,
            interMarks: student.interMarks,
            diplomaMarks:student.diplomaMarks,
            email: student.email,
            mobile: student.mobile,
            isAdmin: student.isAdmin,
            isScrutinised:student.isScrutinised,
            token:generateToken(student.roll)
        })
    } else {
        res.status(400)
        throw new Error('Invalid student data')
    }
})

export default registerStudent
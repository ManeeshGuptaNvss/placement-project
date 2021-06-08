import AppError from '../utils/appError.js'
import asyncHandler from 'express-async-handler'
import Application from '../models/applicationModel.js'

// @desc Create Application
// @route POST api/v1/applications
// @access Private

const createApplication = asyncHandler(async (req, res) => {
  // Avoiding user to send multiple applications
  const existingApplication = await Application.findOne({
    student: req.student._id,
  })
  // console.log(req.student,existingApplication)
  if (existingApplication) {
    throw new AppError('User already submitted an Application', 400)
  }
  const {
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
    resume,
  } = req.body
  const application = await Application.create({
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
    resume,
    student: req.student._id,
    email: req.student.email,
  })
  if (application) {
    res.status(201).json({
      message: 'success',
      data: application,
    })
  } else {
    res.status(400)
    throw new Error('Invalid application data')
  }
})

// @desc Get All Applications
// @route GET api/v1/applications
// @access Private/Admin

const getApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({})
  if (applications) {
    res.json({
      message: 'success',
      data: applications,
    })
  }
})

// @desc Edit Application
// @route PUT api/v1/applications/:id
// @access Private
const editApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id)
  application.roll = req.body.roll || application.roll
  application.yearOfJoining =
    req.body.yearOfJoining || application.yearOfJoining
  application.department = req.body.department || application.department
  application.gender = req.body.gender || application.gender
  application.cgpa = req.body.cgpa || application.cgpa
  application.githubHandle = req.body.githubHandle || application.githubHandle
  application.tenthMarks = req.body.tenthMarks || application.tenthMarks
  application.interMarks = req.body.interMarks || application.interMarks
  application.diplomaMarks = req.body.diplomaMarks || application.diplomaMarks
  application.mobile = req.body.mobile || application.mobile
  application.resume = req.body.resume || application.resume

  const updatedApplication = await application.save()
  res.json({
    message: 'success',

    updatedApplication,
  })
})
// @desc Validate Application
// @route PUT api/v1/applications/:id/validate
// @access Private(admin)

const validateApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id)
  application.isValidated = req.body.isValidated || application.isValidated
  const updatedApplication = await application.save()
  res.json({
    message: 'Validated successfully',
    updatedApplication,
  })
})
// @desc Validate Application
// @route PUT api/v1/applications/filter?querystring
// @access Private(admin)
const filterApplications = asyncHandler(async (req, res) => {
  const queryObj = { ...req.query }
  const excludedFields = ['page', 'sort', 'limit', 'fields']
  excludedFields.forEach(el => delete queryObj[el])
  
  let queryStr = JSON.stringify(queryObj)
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
  console.log(req.query, JSON.parse(queryStr))
  const query = Application.find(JSON.parse(queryStr))
  const filteredApplications = await query
  res.json({
    message: "success",
    count:filteredApplications.length,
    filteredApplications
  })
})

// @desc Validate Application
// @route PUT api/v1/applications/:id/select
// @access Private(admin)
const selectApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id)

  application.isSelected = req.body.isSelected
  application.selectedFor = req.body.selectedFor
  const updatedApplication = await application.save()
  res.json({
    message: 'success',
    updatedApplication,
  })
})

// @desc Reports of selected students
// @route GET api/v1/applications/reports
// @access Public
const getReports = asyncHandler(async (req, res) => {
  const applications = await Application.find({ isSelected: true }).populate(
    'student'
  )
  if (applications) {
    res.json(applications)
  }
})
export {
  getApplications,
  createApplication,
  editApplication,
  validateApplication,
  selectApplication,
  getReports,
  filterApplications
}

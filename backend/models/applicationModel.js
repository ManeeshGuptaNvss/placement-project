import mongoose from 'mongoose'
import validator from 'validator'
const applicationSchema = new mongoose.Schema(
  {
    roll: {
      type: String,
      unique: true,
    },
    gender: String,
    mobile: {
      type: String,
      required: [true, 'A student must have mobile number'],
      unique: true,
    },
    yearOfJoining: {
      type: String,
    },
    department: {
      type: String,
      require: [true, 'Please provide a valid department'],
    },
    cgpa: {
      type: String,
      required: [true, 'Please add a valid cgpa'],
    },
    githubHandle: {
      type: String,
    },
    tenthMarks: {
      type: String,
      required: [true, 'Please provide valid tenthMarks'],
    },
    interMarks: {
      type: String,
      //   required: [true, 'Please add a valid interMarks'],
    },
    diplomaMarks: {
      type: String,
      //   required: [true, 'Please add a valid dilpomaMarks'],
    },
    resume: {
      type: String,
      //   required: [true,"Please upload your resume"],
    },
    isValidated: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'A student must have email id'],
      lowercase: [true, 'An email should be completely in lowercase'],
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Student',
    },
    selectedFor: [
      {
        company: {
          type: String,
          //   required: [true, 'A valid company name is needed'],
        },
        package: {
          type: String,
          //   required: [true, 'A valid package should be added'],
        },
        selectedOn: String,
        role: String,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Application = mongoose.model('Application', applicationSchema)
export default Application
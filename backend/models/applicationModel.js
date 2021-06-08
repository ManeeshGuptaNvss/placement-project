import mongoose from 'mongoose'
const applicationSchema = new mongoose.Schema(
  {
    roll: {
      type: Number,
      unique: true,
    },
    gender: String,
    mobile: {
      type: Number,
      required: [true, 'A student must have mobile number'],
    },
    yearOfJoining: {
      type: String,
    },
    department: {
      type: String,
      require: [true, 'Please provide a valid department'],
    },
    cgpa: {
      type: Number,
      required: [true, 'Please add a valid cgpa'],
    },
    githubHandle: {
      type: String,
    },
    tenthMarks: {
      type: Number,
      required: [true, 'Please provide valid tenthMarks'],
    },
    interMarks: {
      type: Number,
      //   required: [true, 'Please add a valid interMarks'],
    },
    diplomaMarks: {
      type: Number,
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

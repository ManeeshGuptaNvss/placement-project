import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A name is required'],
    },
    roll: {
      type: String,
      required: [true, 'A student must have roll number'],
      unique: true,
    },
    yearOfJoining: {
      type: String,
    },
    department: String,
    cgpa: String,
    githubHandle: String,
    tenthMarks: String,
    interMarks: String,
    diplomaMarks: String,
    mobile: {
      type: String,
      required: [true, 'A student must have mobile number'],
    },
    email: {
      type: String,
      required: [true, 'A student must have email number'],
    },
    gender: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isScrutinised: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (el) {
          return el === this.password
        },
        message: 'Passwords are not the same!',
      },
    },
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  }
)
studentSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    )

    return JWTTimestamp < changedTimestamp
  }

  // False means NOT changed
  return false
}
studentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}
studentSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  // console.log('Pre middleware')

  // Delete passwordConfirm field
  this.passwordConfirm = undefined
  next()
})
studentSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next()

  this.passwordChangedAt = Date.now() - 1000
  next()
})

const Student = mongoose.model('Student', studentSchema)

export default Student
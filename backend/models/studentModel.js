import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import validator from 'validator'
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A name is required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'A student must have email id'],
      lowercase: [true, 'An email should be completely in lowercase'],
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'A password should be of min 6 caharacters'],
      select: false,
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
    passwordResetToken: String,
    passwordResetExpires: Date,
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
  return await bcrypt.compare(enteredPassword, this.password)
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

// This will check the uniqueness of the data

// studentSchema.post('save', function (error, doc, next) {
//   if (error.name === 'MongoError' && error.code === 11000) {
//     next(new Error('email must be unique'))
//   } else {
//     next(error)
//   }
// })
studentSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next()

  this.passwordChangedAt = Date.now() - 1000
  next()
})

studentSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  console.log({ resetToken }, this.passwordResetToken)

  this.passwordResetExpires = Date.now() + 100 * 60 * 1000

  return resetToken
}

const Student = mongoose.model('Student', studentSchema)

export default Student

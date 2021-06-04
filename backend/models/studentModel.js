import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A name is required'], 
    },
    roll: {
        type: String,
        required: [true, 'A student must have roll number'],
        unique:true
    },
    yearOfJoining: {
        type:String
    },
    department: String,
    cgpa: String,
    githubHandle: String,
    tenthMarks: String,
    interMarks: String,
    diplomaMarks: String,
    mobile:{
        type: String,
        required: [true, 'A student must have mobile number'],
     
    } ,
    email: {
        type: String,
        required: [true, 'A student must have email number'],
        
    },
    isAdmin: {
        type: Boolean,
    default:false},
    isScrutinised:{
        type: Boolean,
    default:false},
    password: {
        type: String,
        required:true
    }   
}, {
    timestamps: true,
    
})
studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    console.log('Pre middleware')
})

const Student = mongoose.model('Student', studentSchema)

export default Student
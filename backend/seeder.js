import mongoose from 'mongoose'
import dotenv from 'dotenv'
// import colors from 'colors'
import students from './data/students.js'
import Student from './models/studentModel.js'

import connectDB from './databaseConnection.js'
dotenv.config()
connectDB()
const importData = async () => {
  try {
    await Student.deleteMany()
      const createStudents = await Student.insertMany(students)
      console.log("Data Imported!!")
      process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

importData()
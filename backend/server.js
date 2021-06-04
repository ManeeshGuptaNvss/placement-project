import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './databaseConnection.js'
import students from './data/students.js'
import Student from './models/studentModel.js'
import studentRoutes from './routes/studentRoutes.js'
dotenv.config()

connectDB()


const app = express()
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running..!')
})
app.use('/api/v1/students',studentRoutes)



const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port number ${PORT} `))

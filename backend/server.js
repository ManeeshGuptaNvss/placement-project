import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import students from './data/students.js'
import Student from './models/studentModel.js'


const app = express()
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json())
app.get('/', (req, res) => {
  res.send('API is running..!')
})



app.get('/api/v1/students', (req, res) => {
  res.json(students)
})

app.get('/api/v1/students/:roll', (req, res) => {
  const student = students.find((s) => s.roll === Number(req.params.roll))
  // const student=students.find((p) => p.roll === 11706038)
  console.log(req.params)
  res.json(student)
})
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port number ${PORT} `))

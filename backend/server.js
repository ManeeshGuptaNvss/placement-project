import express from 'express'
import rateLimit from 'express-rate-limit'

import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './databaseConnection.js'

import studentRoutes from './routes/studentRoutes.js'
dotenv.config()

connectDB()

// GLOBAL MIDDLEWARES
const app = express()
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running..!')
})
app.use('/api/v1/students',studentRoutes)



const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port number ${PORT} `))

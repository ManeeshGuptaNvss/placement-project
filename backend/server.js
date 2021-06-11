import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import dotenv from 'dotenv'
import morgan from 'morgan'
import xss from 'xss-clean'
import connectDB from './databaseConnection.js'
import mongoSanitize from 'express-mongo-sanitize'
import studentRoutes from './routes/studentRoutes.js'
import postRoutes from './routes/postRoutes.js'
import applicationRoutes from './routes/applicationRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
dotenv.config()

connectDB()
const app = express()
// GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
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

// Body parser, reading data from body into req.body
app.use(express.json({limit:'10kb'}))


// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());


app.get('/', (req, res) => {
  res.send('API is running..!')
})

app.use('/api/v1/students', studentRoutes)
app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/applications',applicationRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port number ${PORT} `))

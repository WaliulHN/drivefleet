import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import carRoutes from './routes/cars.js'
import bookingRoutes from './routes/bookings.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/cars', carRoutes)
app.use('/api/bookings', bookingRoutes)

app.get('/', (req, res) => {
  res.send('DriveFleet API is running')
})

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal server error' })
})

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server active on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error('Database connection failed')
    process.exit(1)
  })
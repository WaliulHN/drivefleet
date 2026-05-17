import express from 'express'
import Booking from '../models/Booking.js'
import Car from '../models/Car.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/', verifyToken, async (req, res) => {
  try {
    const { carId, totalPrice } = req.body
    const car = await Car.findById(carId)
    
    if (!car) return res.status(404).json({ message: 'Car not found' })
    if (!car.available) return res.status(400).json({ message: 'Car is currently unavailable' })

    const booking = await Booking.create({
      car: carId,
      user: req.user._id,
      totalPrice
    })

    await Car.findByIdAndUpdate(carId, { $inc: { booking_count: 1 } })

    res.status(201).json({ message: 'Booking successful', booking })
  } catch (err) {
    res.status(500).json({ message: 'Booking failed' })
  }
})

router.get('/my-bookings', verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('car')
      .sort({ createdAt: -1 })
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' })
  }
})

export default router
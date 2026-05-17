import express from 'express'
import Car from '../models/Car.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { search, type } = req.query
    let query = {}
    
    if (search) {
      query.name = { $regex: search, $options: 'i' }
    }
    if (type && type !== 'all') {
      query.type = type
    }
    
    const cars = await Car.find(query).sort({ createdAt: -1 })
    res.json(cars)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cars' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    if (!car) return res.status(404).json({ message: 'Car not found' })
    res.json(car)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, price, type, image, seats, location, description, available } = req.body
    const car = new Car({
      name, price, type, image, seats, location, description, available,
      addedBy: req.user._id
    })
    await car.save()
    res.status(201).json({ message: 'Car added successfully', car })
  } catch (err) {
    res.status(500).json({ message: 'Failed to add car' })
  }
})

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    if (!car) return res.status(404).json({ message: 'Car not found' })
    if (car.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this car' })
    }
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ message: 'Car updated', car: updatedCar })
  } catch (err) {
    res.status(500).json({ message: 'Update failed' })
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    if (!car) return res.status(404).json({ message: 'Car not found' })
    if (car.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this car' })
    }
    await Car.findByIdAndDelete(req.params.id)
    res.json({ message: 'Car deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' })
  }
})

export default router
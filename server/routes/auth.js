import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, photo, password } = req.body
    const isValidPass = password && password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password)
    if (!isValidPass) return res.status(400).json({ message: 'Password requires 6+ characters, one uppercase and one lowercase' })
    
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already registered' })
    
    const hashed = await bcrypt.hash(password, 10)
    await User.create({ name, email, photo, password: hashed })
    res.status(201).json({ message: 'Account created successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    
    res.json({ user: { name: user.name, email: user.email, photo: user.photo } })
  } catch (err) {
    res.status(500).json({ message: 'Login failed' })
  }
})

router.post('/google', async (req, res) => {
  try {
    const { email, name, photo } = req.body
    let user = await User.findOne({ email })
    if (!user) {
      user = await User.create({ name, email, photo, password: null })
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    
    res.json({ user: { name: user.name, email: user.email, photo: user.photo } })
  } catch (err) {
    res.status(500).json({ message: 'Google login failed' })
  }
})

router.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out successfully' })
})

router.get('/me', async (req, res) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ message: 'Not authenticated' })
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ user })
  } catch (err) {
    res.status(401).json({ message: 'Session expired' })
  }
})

export default router
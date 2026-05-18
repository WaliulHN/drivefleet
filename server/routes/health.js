import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

router.get('/env-check', (req, res) => {
  const missing = ['MONGODB_URI', 'JWT_SECRET'].filter(key => !process.env[key])
  if (missing.length > 0) return res.status(500).json({ status: 'error', missing })
  res.json({ status: 'configured' })
})

export default router
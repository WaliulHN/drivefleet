import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingDate: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true }
}, { timestamps: true })

export default mongoose.model('Booking', bookingSchema)
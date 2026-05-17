import mongoose from 'mongoose'

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true },
  seats: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  available: { type: Boolean, default: true },
  booking_count: { type: Number, default: 0 },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

export default mongoose.model('Car', carSchema)
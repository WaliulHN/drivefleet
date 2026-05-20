import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Car from './models/Car.js'

dotenv.config()

const sampleCars = [
  {
    name: 'Mercedes AMG GT',
    price: 150,
    type: 'Sports',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
    seats: 2,
    location: 'New York, NY',
    description: 'High-performance luxury sports car with twin-turbo V8 engine. Perfect for those who want to make a statement.',
    available: true,
    owner: null
  },
  {
    name: 'BMW X5',
    price: 95,
    type: 'SUV',
    image: '/images/BMW_X5.jpg',  // Update this
    seats: 7,
    location: 'Los Angeles, CA',
    description: '...',
    available: true
  },
  {
    name: 'Tesla Model S',
    price: 120,
    type: 'Electric',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    seats: 5,
    location: 'San Francisco, CA',
    description: 'Cutting-edge electric sedan with autopilot and 400+ mile range. Zero emissions, maximum performance.',
    available: true,
    owner: null
  },
  {
     name: 'Porsche 911 Carrera',
    price: 180,
    type: 'Coupe',
    image: '/images/Porsche_911_Carrera.jpg',  // Update this
    seats: 4,
    location: 'Miami, FL',
    description: '...',
    available: true
  },
  {
    name: 'Range Rover Vogue',
    price: 130,
    type: 'Luxury',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800',
    seats: 5,
    location: 'Chicago, IL',
    description: 'Premium luxury SUV with unmatched comfort and capability. Travel in absolute elegance.',
    available: true,
    owner: null
  },
  {
    name: 'Mazda MX-5 Miata',
    price: 65,
    type: 'Convertible',
    image: '/images/Mazda_MX-5_Miata.jpg',  // Update this
    seats: 2,
    location: 'Seattle, WA',
    description: '...',
    available: true
  }
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    await Car.deleteMany()
    console.log('Cleared existing cars')

    const insertedCars = await Car.insertMany(sampleCars)
    console.log(`✅ Successfully added ${insertedCars.length} cars to the database`)

    insertedCars.forEach(car => {
      console.log(`  - ${car.name} (${car.type}) - $${car.price}/day`)
    })

    console.log('\n🎉 Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
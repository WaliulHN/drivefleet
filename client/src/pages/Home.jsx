import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/cars')
        const data = await res.json()
        setCars(data.slice(0, 6))
      } catch (err) {
        console.error('Failed to fetch cars')
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])

  return (
    <div>
      <div className="hero min-h-[70vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
          <h1 className="text-5xl font-bold">Premium Car Rental</h1>
          <p className="py-6 text-lg">Find your perfect ride with DriveFleet. Luxury, comfort, and reliability in every booking.</p>
          <Link to="/explore" className="btn btn-primary btn-lg">Explore Cars</Link>
          </div>
        </div>
      </div>

      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Vehicles</h2>
        {loading ? (
          <div className="flex justify-center"><span className="loading loading-spinner loading-lg"></span></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
            {cars.map(car => (
            <div key={car._id} className="card bg-base-100 shadow-xl">
                <figure><img src={car.image} alt={car.name} className="h-48 w-full object-cover" /></figure>
              <div className="card-body">
                  <h2 className="card-title">{car.name}</h2>
                  <p className="text-sm">{car.type} • {car.seats} Seats</p>
                <div className="card-actions justify-between items-center mt-4">
                  <span className="text-xl font-bold text-primary">${car.price}/day</span>
                  <Link to={`/car/${car._id}`} className="btn btn-sm btn-primary">View Details</Link>
                  </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </section>

      <section className="py-16 bg-base-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose DriveFleet?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">🛡️ Fully Insured</h3>
              <p className="text-base-content/70">Every vehicle comes with comprehensive insurance coverage.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">⚡ Instant Booking</h3>
              <p className="text-base-content/70">Reserve your car in seconds with our seamless checkout.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3"> 24/7 Support</h3>
              <p className="text-base-content/70">Roadside assistance and customer care anytime you need.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 mt-10">
            <div className="flex-1 p-4">
              <div className="text-4xl mb-3">1️⃣</div>
              <h3 className="font-semibold">Browse & Select</h3>
              <p className="text-sm mt-2">Choose from our premium fleet of vehicles.</p>
            </div>
            <div className="flex-1 p-4">
              <div className="text-4xl mb-3">2️⃣</div>
              <h3 className="font-semibold">Book Securely</h3>
              <p className="text-sm mt-2">Confirm your dates and pay online safely.</p>
            </div>
            <div className="flex-1 p-4">
            <div className="text-4xl mb-3">3️⃣</div>
            <h3 className="font-semibold">Hit the Road</h3>
            <p className="text-sm mt-2">Pick up your car and enjoy the journey.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
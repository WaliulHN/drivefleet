import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const CarDetails = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/cars/${id}`)
        const data = await res.json()
        setCar(data)
      } catch (err) {
        console.error('Failed to fetch car')
      } finally {
        setLoading(false)
      }
    }
    fetchCar()
  }, [id])

  const handleBooking = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    
    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ carId: car._id, totalPrice: car.price })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      alert('Booking successful!')
      setModalOpen(false)
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg"></span></div>
  if (!car) return <div className="text-center py-20 text-error">Car not found</div>

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl overflow-hidden">
          <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{car.name}</h1>
          <div className="flex gap-4 mb-6 text-lg">
            <span className="badge badge-outline">{car.type}</span>
            <span className="badge badge-outline">{car.seats} Seats</span>
            <span className="badge badge-outline">{car.location}</span>
          </div>
          <h2 className="text-3xl font-bold text-primary mb-6">${car.price}<span className="text-lg text-base-content/60">/day</span></h2>
          <p className="text-base-content/70 mb-8 leading-relaxed">{car.description}</p>
          
          {car.available ? (
            <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-lg w-full md:w-auto">
              Book Now
            </button>
          ) : (
            <button className="btn btn-disabled btn-lg w-full md:w-auto">Currently Unavailable</button>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
            <h3 className="text-2xl font-bold mb-4">Confirm Booking</h3>
            <p className="mb-2">Vehicle: <span className="font-semibold">{car.name}</span></p>
            <p className="mb-6">Total Price: <span className="font-semibold text-primary">${car.price}</span></p>
            <div className="flex gap-4">
              <button onClick={handleBooking} className="btn btn-primary flex-1">Confirm</button>
              <button onClick={() => setModalOpen(false)} className="btn btn-ghost flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CarDetails
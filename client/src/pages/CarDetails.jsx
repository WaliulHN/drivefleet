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
        if (res.ok) setCar(data)
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

  if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg text-orange-500"></span></div>
  if (!car) return <div className="text-center py-20 text-xl text-slate-600">Car not found <button onClick={() => navigate('/explore')} className="text-orange-500 underline ml-2">Go back</button></div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">
         
            <div className="relative h-80 sm:h-96 lg:h-auto bg-slate-200">
              <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6 bg-orange-500 text-white px-5 py-2 rounded-full font-bold text-lg shadow-lg">
                ${car.price}<span className="text-sm font-normal ml-1">/day</span>
              </div>
            </div>

        
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">{car.name}</h1>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-slate-100 text-slate-700 border border-slate-200">{car.type}</span>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-slate-100 text-slate-700 border border-slate-200">{car.seats} Seats</span>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-slate-100 text-slate-700 border border-slate-200">{car.location}</span>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Description</h3>
                <p className="text-slate-700 leading-relaxed text-lg">{car.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                {car.available ? (
                  <button onClick={() => setModalOpen(true)} className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1">
                    Book Now
                  </button>
                ) : (
                  <button disabled className="flex-1 bg-slate-200 text-slate-400 py-4 rounded-xl font-bold text-lg cursor-not-allowed">
                    Currently Unavailable
                  </button>
                )}
                <button onClick={() => navigate('/explore')} className="px-8 py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors">
                  Back to Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-3xl font-bold">×</button>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Confirm Booking</h3>
            <div className="bg-slate-50 p-5 rounded-xl mb-6 border border-slate-200">
              <p className="text-slate-600 mb-2 text-sm">Vehicle</p>
              <p className="font-bold text-slate-900 text-lg mb-4">{car.name}</p>
              <div className="flex justify-between items-center border-t border-slate-200 pt-3">
                <p className="text-slate-600">Total Price</p>
                <p className="font-bold text-orange-500 text-xl">${car.price}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={handleBooking} className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">Confirm</button>
              <button onClick={() => setModalOpen(false)} className="flex-1 border border-slate-300 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CarDetails
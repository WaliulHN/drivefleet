import { useEffect, useState } from 'react'

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/bookings/my-bookings', { credentials: 'include' })
        const data = await res.json()
        if (res.ok) setBookings(data)
      } catch (err) {
        console.error('Failed to fetch bookings')
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg text-orange-500"></span></div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">My Bookings</h1>
          <p className="text-lg text-slate-600 font-medium">Manage and track your car rental reservations</p>
        </div>
        
        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-16 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No bookings yet</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg">Start exploring our premium fleet and book your dream car today!</p>
            <a href="/explore" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-orange-500/30 transition-all hover:-translate-y-1">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              Explore Cars
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 overflow-hidden group">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-72 h-56 lg:h-auto bg-slate-100 flex-shrink-0 overflow-hidden">
                    {booking.car?.image ? (
                      <img src={booking.car.image} alt={booking.car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                        <svg className="w-20 h-20 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                      <div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-3">{booking.car?.name || 'Car Details Unavailable'}</h3>
                        <div className="flex flex-wrap items-center gap-5 text-base text-slate-600">
                          <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span className="font-medium">Booked:</span> {new Date(booking.bookingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            <span className="font-medium">{booking.car?.type || 'N/A'}</span>
                          </span>
                          <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span className="font-medium">{booking.car?.location || 'N/A'}</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 lg:flex-col lg:items-end">
                        <div className="text-right">
                          <div className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">${booking.totalPrice}</div>
                          <div className="text-sm text-slate-500 font-medium mt-1">total amount</div>
                        </div>
                        <span className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-green-400 to-green-500 text-white text-sm font-bold shadow-lg shadow-green-500/30">
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Confirmed
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-100">
                      <button className="inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all hover:shadow-lg">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                        View Details
                      </button>
                      <button className="inline-flex items-center px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                        </svg>
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBookings
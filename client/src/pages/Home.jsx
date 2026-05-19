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
        if (res.ok) setCars(data.slice(0, 6))
      } catch (err) {
        console.error('Failed to fetch cars')
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
            <span className="text-orange-400 text-sm font-semibold tracking-wide uppercase">Premium Car Rental</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Drive Your{' '}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Dream Car
            </span>{' '}
            Today
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Premium car rental service with 24/7 support. Luxury, comfort, and reliability at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/explore" 
              className="group relative px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10">Explore Cars</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </Link>
            <Link 
              to="/add-car" 
              className="px-8 py-4 border-2 border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
            >
              Add a Car
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-slate-400">Luxury Cars</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-slate-400">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">10k+</div>
              <div className="text-sm text-slate-400">Happy Clients</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-2">Featured Vehicles</h2>
              <p className="text-slate-600">Choose from our premium selection</p>
            </div>
            <Link to="/explore" className="hidden md:inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors">
              View All Cars
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-orange-500"></span></div>
          ) : cars.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-lg text-slate-600">No cars available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map(car => (
                <div key={car._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 overflow-hidden">
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg">${car.price}<span className="text-xs font-normal ml-1">/day</span></div>
                    <div className="absolute top-4 left-4 bg-slate-900/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase">{car.type}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{car.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 mb-4">
                      <span className="flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>{car.seats} Seats</span>
                      <span className="flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>{car.location}</span>
                    </div>
                    <Link to={`/car/${car._id}`} className="block w-full text-center py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-orange-600 transition-colors">View Details</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold text-white mb-3">Fully Insured</h3>
              <p className="text-slate-400 leading-relaxed">Every vehicle in our fleet is fully insured, giving you peace of mind on every journey.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-white mb-3">Instant Booking</h3>
              <p className="text-slate-400 leading-relaxed">Reserve your car in seconds with our streamlined, secure booking process.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
              <div className="text-5xl mb-4">📞</div>
              <h3 className="text-2xl font-bold text-white mb-3">24/7 Support</h3>
              <p className="text-slate-400 leading-relaxed">Our dedicated support team is available around the clock to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to hit the road?</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">Join thousands of satisfied customers and find your perfect ride today.</p>
          <Link to="/register" className="inline-block bg-white text-slate-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all shadow-2xl hover:shadow-white/20 hover:-translate-y-1">Get Started Free</Link>
        </div>
      </section>
    </div>
  )
}

export default Home
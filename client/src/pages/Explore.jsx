import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Explore = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (search) params.append('search', search)
        if (type !== 'all') params.append('type', type)
        const res = await fetch(`http://localhost:5000/api/cars?${params.toString()}`)
        const data = await res.json()
        setCars(data)
      } catch (err) {
        console.error('Failed to fetch cars')
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [search, type])

  const carTypes = ['SUV', 'Sedan', 'Coupe', 'Convertible', 'Electric', 'Luxury', 'Sports']

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Explore Our Fleet</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Find your perfect ride from our premium selection. Luxury, comfort, and reliability.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-12 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <input type="text" placeholder="Search by car name..." className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900 placeholder-slate-400" value={search} onChange={(e) => setSearch(e.target.value)} />
            <svg className="w-5 h-5 text-slate-400 absolute right-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <select className="w-full md:w-48 py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-700 font-medium cursor-pointer" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All Types</option>
            {carTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        {loading ? (
          <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-orange-500"></span></div>
        ) : cars.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="mb-4"><svg className="w-16 h-16 text-slate-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No cars found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your search or filters.</p>
            <button onClick={() => { setSearch(''); setType('all'); }} className="btn bg-orange-500 text-white border-none hover:bg-orange-600 rounded-xl px-8">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map(car => (
              <div key={car._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col">
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg">${car.price}<span className="text-xs font-normal ml-1">/day</span></div>
                  <div className="absolute top-4 left-4 bg-slate-900/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase">{car.type}</div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">{car.name}</h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>{car.seats} Seats</span>
                      <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>{car.location}</span>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <Link to={`/car/${car._id}`} className="block w-full text-center py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-orange-600 transition-colors">View Details</Link>
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

export default Explore
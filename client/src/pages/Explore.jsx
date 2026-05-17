import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../config/axios'

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
        
        const { data } = await api.get(`/cars?${params.toString()}`)
        setCars(data)
      } catch (err) {
        console.error('Failed to fetch cars')
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [search, type])

  const carTypes = ['SUV', 'Sedan', 'Coupe', 'Convertible', 'Electric', 'Luxury']

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Explore Our Fleet</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center">
        <input 
          type="text" 
          placeholder="Search by name..." 
          className="input input-bordered w-full md:w-96"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="select select-bordered w-full md:w-48"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">All Types</option>
          {carTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg"></span></div>
      ) : cars.length === 0 ? (
        <p className="text-center text-lg text-base-content/60">No cars found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(car => (
            <div key={car._id} className="card bg-base-100 shadow-xl">
              <figure><img src={car.image} alt={car.name} className="h-48 w-full object-cover" /></figure>
              <div className="card-body">
                <h2 className="card-title">{car.name}</h2>
                <p className="text-sm">{car.type} • {car.location}</p>
                <div className="card-actions justify-between items-center mt-4">
                  <span className="text-xl font-bold text-primary">${car.price}/day</span>
                  <Link to={`/car/${car._id}`} className="btn btn-sm btn-primary">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Explore
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const MyCars = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingCar, setEditingCar] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [carToDelete, setCarToDelete] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    type: '',
    image: '',
    seats: '',
    location: '',
    description: '',
    available: true
  })

  useEffect(() => {
    fetchMyCars()
  }, [])

  const fetchMyCars = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/cars/my-cars', { credentials: 'include' })
      const data = await res.json()
      if (res.ok) setCars(data)
    } catch (err) {
      console.error('Failed to fetch cars')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (car) => {
    setEditingCar(car)
    setFormData({
      name: car.name,
      price: car.price,
      type: car.type,
      image: car.image,
      seats: car.seats,
      location: car.location,
      description: car.description,
      available: car.available
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:5000/api/cars/${editingCar._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        fetchMyCars()
        setEditingCar(null)
      }
    } catch (err) {
      console.error('Update failed')
    }
  }

  const confirmDelete = (car) => {
    setCarToDelete(car)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    if (!carToDelete) return
    try {
      const res = await fetch(`http://localhost:5000/api/cars/${carToDelete._id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      if (res.ok) {
        setCars(cars.filter(car => car._id !== carToDelete._id))
        setShowDeleteModal(false)
        setCarToDelete(null)
      }
    } catch (err) {
      console.error('Delete failed')
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg text-orange-500"></span></div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col pt-28 px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-7xl mx-auto w-full flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16">
          <div className="text-center sm:text-left">
            <h1 className="text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">My Added Cars</h1>
            <p className="text-lg text-slate-600 font-medium">Manage and update your car listings</p>
          </div>
          <Link to="/add-car" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-0.5 whitespace-nowrap">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add New Car
          </Link>
        </div>

        <div className="flex-grow flex items-center justify-center">
          {cars.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-16 text-center w-full max-w-3xl">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-orange-500/30">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">You haven't added any cars yet</h3>
              <p className="text-lg text-slate-600 mb-10 max-w-md mx-auto leading-relaxed">List your first car and start reaching potential renters today!</p>
              <Link to="/add-car" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-orange-500/30 transition-all hover:-translate-y-1">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Your First Car
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {cars.map(car => (
                <div key={car._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 overflow-hidden group">
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg">${car.price}<span className="text-xs font-normal ml-1">/day</span></div>
                    <div className="absolute top-4 left-4 bg-slate-900/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-semibold">{car.type}</div>
                    {!car.available && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm">Unavailable</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">{car.name}</h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600 mb-4">
                      <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>{car.seats} Seats</span>
                      <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>{car.location}</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-6 line-clamp-2 leading-relaxed">{car.description}</p>
                    
                    <div className="flex gap-3">
                      <button onClick={() => handleEdit(car)} className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-blue-100 hover:text-blue-700 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Update
                      </button>
                      <button onClick={() => confirmDelete(car)} className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-red-100 hover:text-red-700 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {editingCar && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-slate-900">Update Car Details</h2>
                <button onClick={() => setEditingCar(null)} className="text-slate-400 hover:text-slate-600 text-3xl font-bold">&times;</button>
              </div>
              
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Vehicle Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Price per Day ($)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="1" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Vehicle Type</label>
                    <select name="type" value={formData.type} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900">
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Coupe">Coupe</option>
                      <option value="Convertible">Convertible</option>
                      <option value="Electric">Electric</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Seating Capacity</label>
                    <input type="number" name="seats" value={formData.seats} onChange={handleInputChange} required min="1" max="8" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Image URL</label>
                  <input type="url" name="image" value={formData.image} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900 resize-none"></textarea>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Available for Booking</label>
                    <p className="text-sm text-slate-600">Make this car visible to customers</p>
                  </div>
                  <input type="checkbox" name="available" checked={formData.available} onChange={handleInputChange} className="w-5 h-5 text-orange-500 rounded focus:ring-2 focus:ring-orange-200 cursor-pointer" />
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setEditingCar(null)} className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">Update Car</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && carToDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Delete Car?</h3>
              <p className="text-slate-600">Are you sure you want to delete <span className="font-semibold text-slate-900">{carToDelete.name}</span>? This action cannot be undone.</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => { setShowDeleteModal(false); setCarToDelete(null); }} className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">Delete Car</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyCars
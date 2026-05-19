import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AddCar = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    type: 'Sedan',
    seats: '',
    image: '',
    location: '',
    description: '',
    available: true
  })

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Car name is required'
    if (!formData.price || formData.price < 1) newErrors.price = 'Price must be at least $1'
    if (!formData.image.trim()) newErrors.image = 'Image URL is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.description.trim() || formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submitCar = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the form errors')
      return
    }
    
    setLoading(true)
    const toastId = toast.loading('Adding your car...')

    try {
      const response = await fetch('http://localhost:5000/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to add car')
      }

      toast.success('Car added successfully!', { id: toastId })
      navigate('/my-cars')
    } catch (error) {
      toast.error(error.message || 'Failed to add car', { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">List Your Vehicle</h1>
          <p className="text-lg text-slate-600 font-medium">Add your car to our premium fleet and start earning</p>
        </div>

        <form onSubmit={submitCar} className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Vehicle Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Mercedes-Benz C-Class"
                  value={formData.name}
                  onChange={handleInput}
                  required
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.name ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-200'
                  } bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900 placeholder-slate-400`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500 font-medium">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Daily Rate (USD) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="75"
                  value={formData.price}
                  onChange={handleInput}
                  required
                  min="1"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.price ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-200'
                  } bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900 placeholder-slate-400`}
                />
                {errors.price && <p className="mt-1 text-sm text-red-500 font-medium">{errors.price}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Vehicle Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInput}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900"
                >
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
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Seating Capacity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="seats"
                  placeholder="5"
                  value={formData.seats}
                  onChange={handleInput}
                  required
                  min="1"
                  max="8"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900 placeholder-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Cover Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="image"
                placeholder="https://images.unsplash.com/photo-example"
                value={formData.image}
                onChange={handleInput}
                required
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.image ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-200'
                } bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900 placeholder-slate-400`}
              />
              {errors.image && <p className="mt-1 text-sm text-red-500 font-medium">{errors.image}</p>}
              <p className="mt-2 text-xs text-slate-500">Use a high-quality image for better visibility</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Pickup Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Downtown Manhattan, New York"
                value={formData.location}
                onChange={handleInput}
                required
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.location ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-200'
                } bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900 placeholder-slate-400`}
              />
              {errors.location && <p className="mt-1 text-sm text-red-500 font-medium">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Vehicle Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Tell potential renters about your car's features, condition, mileage, and any special amenities..."
                value={formData.description}
                onChange={handleInput}
                required
                rows="4"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.description ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-200'
                } bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-slate-900 placeholder-slate-400 resize-none`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-500 font-medium">{errors.description}</p>}
              <p className="mt-2 text-xs text-slate-500">Minimum 20 characters</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Available for Booking</label>
                <p className="text-sm text-slate-600">Make this vehicle visible to customers immediately</p>
              </div>
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleInput}
                className="w-5 h-5 text-orange-500 rounded focus:ring-2 focus:ring-orange-200 cursor-pointer"
              />
            </div>
          </div>

          <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/my-cars')}
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/30 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Vehicle...
                </>
              ) : (
                'Add Vehicle to Fleet'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCar
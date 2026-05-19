import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCar = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
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
  }

  const submitCar = async (e) => {
    e.preventDefault()
    setLoading(true)

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

      navigate('/my-cars')
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      paddingTop: '120px', 
      paddingBottom: '60px',
      paddingLeft: '20px',
      paddingRight: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ 
            fontSize: '42px', 
            fontWeight: 'bold', 
            color: 'white',
            marginBottom: '12px',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            letterSpacing: '-0.5px'
          }}>
            List Your Vehicle
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: 'rgba(255,255,255,0.95)',
            fontWeight: '400'
          }}>
            Add your car to our premium fleet and start earning
          </p>
        </div>

        <form onSubmit={submitCar} style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#374151',
                fontSize: '14px'
              }}>
                Vehicle Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Mercedes-Benz C-Class"
                value={formData.name}
                onChange={handleInput}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #e5e7eb',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8b5cf6'
                  e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#374151',
                fontSize: '14px'
              }}>
                Daily Rate (USD) <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="75"
                value={formData.price}
                onChange={handleInput}
                required
                min="1"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #e5e7eb',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8b5cf6'
                  e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#374151',
                fontSize: '14px'
              }}>
                Vehicle Type <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInput}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #e5e7eb',
                  fontSize: '15px',
                  outline: 'none',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
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
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#374151',
                fontSize: '14px'
              }}>
                Seating Capacity <span style={{ color: '#ef4444' }}>*</span>
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
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #e5e7eb',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600', 
              color: '#374151',
              fontSize: '14px'
            }}>
              Cover Image URL <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="url"
              name="image"
              placeholder="https://images.unsplash.com/photo-example"
              value={formData.image}
              onChange={handleInput}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <p style={{ 
              fontSize: '12px', 
              color: '#6b7280', 
              marginTop: '6px' 
            }}>
              Use a high-quality image for better visibility
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600', 
              color: '#374151',
              fontSize: '14px'
            }}>
              Pickup Location <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Downtown Manhattan, New York"
              value={formData.location}
              onChange={handleInput}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600', 
              color: '#374151',
              fontSize: '14px'
            }}>
              Vehicle Description <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <textarea
              name="description"
              placeholder="Tell potential renters about your car's features, condition, mileage, and any special amenities..."
              value={formData.description}
              onChange={handleInput}
              required
              rows="4"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                fontSize: '15px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ 
            padding: '20px', 
            background: '#f9fafb', 
            borderRadius: '10px', 
            border: '1px solid #e5e7eb',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontWeight: '600', 
                color: '#374151',
                fontSize: '14px',
                marginBottom: '4px'
              }}>
                Available for Booking
              </label>
              <p style={{ 
                fontSize: '13px', 
                color: '#6b7280' 
              }}>
                Make this vehicle visible to customers immediately
              </p>
            </div>
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleInput}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                accentColor: '#8b5cf6'
              }}
            />
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '15px',
            paddingTop: '20px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <button
              type="button"
              onClick={() => navigate('/my-cars')}
              style={{
                padding: '14px 28px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                background: 'white',
                color: '#374151',
                fontWeight: '600',
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#f9fafb'}
              onMouseLeave={(e) => e.target.style.background = 'white'}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '14px 28px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: '600',
                fontSize: '15px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 6px 20px rgba(102,126,234,0.5)'
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 15px rgba(102,126,234,0.4)'
              }}
            >
              {loading ? 'Adding Vehicle...' : 'Add Vehicle to Fleet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCar
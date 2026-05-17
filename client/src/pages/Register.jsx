import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [photo, setPhoto] = useState('')
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await register(name, email, password)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10">
      <div className="card w-96 bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body">
          <h2 className="card-title justify-center text-2xl mb-4">Register</h2>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input 
              type="text" 
              placeholder="Enter name" 
              className="input input-bordered" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input 
              type="url" 
              placeholder="Enter photo URL" 
              className="input input-bordered" 
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input 
              type="email" 
              placeholder="Enter email" 
              className="input input-bordered" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input 
              type="password" 
              placeholder="Enter password" 
              className="input input-bordered" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label">
              <span className="label-text-alt text-warning">Min 6 chars, 1 uppercase, 1 lowercase</span>
            </label>
          </div>

          {error && <p className="text-error text-sm text-center">{error}</p>}

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>

          <div className="text-center mt-4">
            <span className="text-sm text-base-content/70">Already have an account? </span>
            <Link to="/login" className="link link-primary">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body">
          <h2 className="card-title justify-center text-2xl mb-4">Login</h2>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input 
              type="email" 
              placeholder="Enter email" 
              className="input input-bordered text-black" 
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
              className="input input-bordered text-black" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-error text-sm text-center">{error}</p>}

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>

          <div className="text-center mt-4">
            <span className="text-sm text-base-content/70">Don't have an account? </span>
            <Link to="/register" className="link link-primary">Register here</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
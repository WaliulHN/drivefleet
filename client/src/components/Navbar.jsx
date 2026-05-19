import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Explore', path: '/explore' },
    { label: 'Add Car', path: '/add-car' },
    { label: 'My Cars', path: '/my-cars' },
    { label: 'Bookings', path: '/bookings' }
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0A1128] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex items-center gap-3 group">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-500 group-hover:scale-105 transition-transform">
              <path d="M4 16C4 16 6 10 12 10H28C34 10 36 16 36 16V18H32V16H8V18H4V16ZM10 10C10 8.89543 10.8954 8 12 8H28C29.1046 8 30 8.89543 30 10M10 10H4L2 16H6L8 10M30 10H36L38 16H34L32 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="18" r="2" fill="currentColor"/>
              <circle cx="28" cy="18" r="2" fill="currentColor"/>
            </svg>
            <span className="text-xl font-bold tracking-widest uppercase">
              <span className="text-orange-500">Drive</span>
              <span className="text-white">Fleet</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl px-2 py-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 text-[15px] font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to="/my-cars" className="text-white/70 hover:text-white font-medium text-sm transition-colors">
                  {user.name}
                </Link>
                <button onClick={logout} className="bg-white text-[#0A1128] px-7 py-2.5 rounded-md font-semibold tracking-wide hover:bg-gray-100 transition-colors shadow-lg shadow-white/5">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white/70 hover:text-white font-medium text-sm transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-white text-[#0A1128] px-7 py-2.5 rounded-md font-semibold tracking-wide hover:bg-gray-100 transition-colors shadow-lg shadow-white/5">
                  Register
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0A1128] border-t border-white/5 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 mt-2">
            {user ? (
              <button onClick={() => { logout(); setMobileOpen(false); }} className="w-full bg-white text-[#0A1128] py-3 rounded-md font-semibold">
                Logout
              </button>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="flex-1 text-center py-3 border border-white/20 text-white rounded-md">Login</Link>
                <Link to="/register" className="flex-1 text-center py-3 bg-white text-[#0A1128] rounded-md font-semibold">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <div className="navbar bg-base-100 shadow-lg px-4 lg:px-8 sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary">
          DriveFleet
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/explore">Explore Cars</Link></li>
          {user ? (
            <>
              <li><Link to="/add-car">Add Car</Link></li>
              <li><Link to="/my-cars">My Cars</Link></li>
              <li><Link to="/bookings">Bookings</Link></li>
              <li>
                <button onClick={logout} className="btn btn-error btn-sm">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
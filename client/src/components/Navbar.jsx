import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg px-4 lg:px-8">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary">
          DriveFleet
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/explore">Explore Cars</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
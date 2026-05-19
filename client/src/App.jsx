import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Login from './pages/Login'
import Register from './pages/Register'
import CarDetails from './pages/CarDetails'
import AddCar from './pages/AddCar'
import MyCars from './pages/MyCars'
import MyBookings from './pages/MyBookings'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
     
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/car/:id" element={<CarDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/add-car" element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
              <Route path="/my-cars" element={<ProtectedRoute><MyCars /></ProtectedRoute>} />
              <Route path="/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
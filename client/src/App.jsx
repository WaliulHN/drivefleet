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
              
              {/* Private Routes */}
              <Route path="/add-car" element={<ProtectedRoute><h1 className="text-4xl text-center mt-10">Add Car (Next)</h1></ProtectedRoute>} />
              <Route path="/my-cars" element={<ProtectedRoute><h1 className="text-4xl text-center mt-10">My Cars (Next)</h1></ProtectedRoute>} />
              <Route path="/bookings" element={<ProtectedRoute><h1 className="text-4xl text-center mt-10">Bookings (Next)</h1></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
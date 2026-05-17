import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
          <Navbar />
          <main className="flex-grow container mx-auto px-4">
            <Routes>
              <Route path="/" element={<h1 className="text-4xl text-center mt-10">Home Page</h1>} />
              <Route path="/explore" element={<h1 className="text-4xl text-center mt-10">Explore Cars</h1>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
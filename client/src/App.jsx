import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<h1 className="text-4xl text-center mt-10">Home Page</h1>} />
            <Route path="/explore" element={<h1 className="text-4xl text-center mt-10">Explore Cars</h1>} />
            <Route path="/login" element={<h1 className="text-4xl text-center mt-10">Login</h1>} />
            <Route path="/register" element={<h1 className="text-4xl text-center mt-10">Register</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
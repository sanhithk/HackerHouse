import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Generator from './pages/Generator'

function App() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-green flex flex-col font-sans relative overflow-hidden">
      {/* Global Background Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generator />} />
      </Routes>
    </div>
  )
}

export default App

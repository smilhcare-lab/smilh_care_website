import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

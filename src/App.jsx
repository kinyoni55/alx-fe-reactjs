import React from 'react'
import Home from './pages/Home'
import Navbar from './pages/Navbar'
import { Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/navbar" element={<Navbar />} />
    </Routes>
  )
}

export default App
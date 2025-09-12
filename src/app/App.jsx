import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Components from './pages/Components'
import ComponentDetail from './pages/ComponentDetail'
import { useWebflowBits } from './hooks/useWebflowBits'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  const { initializeWebflowBits } = useWebflowBits()
  const location = useLocation()

  useEffect(() => {
    // Initialize WebflowBits when the app loads
    initializeWebflowBits()
  }, [])

  // Show footer only on home page
  const showFooter = location.pathname === '/'

  return (
    <ThemeProvider>
      <div className="app">
        <Navbar />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/components" element={<Components />} />
            <Route path="/components/:componentName" element={<ComponentDetail />} />
          </Routes>
        </main>
        {showFooter && <Footer />}
      </div>
    </ThemeProvider>
  )
}

export default App

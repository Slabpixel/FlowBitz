import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Components from './pages/Components'
import ComponentDetail from './pages/ComponentDetail'
import About from './pages/About'
import Support from './pages/Support'
import Showcase from './pages/Showcase'
import FAQ from './pages/FAQ'
import NotFound from './pages/NotFound'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  const location = useLocation()

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
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {showFooter && <Footer />}
      </div>
    </ThemeProvider>
  )
}

export default App

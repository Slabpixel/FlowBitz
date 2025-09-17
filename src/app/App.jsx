import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Components from './pages/Components'
import ComponentDetail from './pages/ComponentDetail'
import Installation from './pages/Installation'
import About from './pages/About'
import Support from './pages/Support'
import Showcase from './pages/Showcase'
import FAQ from './pages/FAQ'
import NotFound from './pages/NotFound'
import { ThemeProvider } from './contexts/ThemeContext'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  const location = useLocation()

  // Show footer only on home page
  const showFooter = location.pathname === '/'

  return (
    <HelmetProvider>
      <ThemeProvider>
        <div className="app">
          <ScrollToTop />
          <Navbar />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/components" element={<Components />} />
              <Route path="/components/:componentName" element={<ComponentDetail />} />
              <Route path="/installation" element={<Installation />} />
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
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  )
}

export default App

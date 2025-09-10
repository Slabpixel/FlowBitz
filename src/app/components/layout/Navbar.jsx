import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle'
import Logo from '../Logo'
import { Home, Layers, BookOpen, Github } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => {
    if (path === '/components') {
      return location.pathname === path || location.pathname.startsWith('/components/')
    }
    return location.pathname === path
  }

  return (
    <nav className="w-full fixed top-0 left-0 bg-background border-b border-border z-50 transition-all duration-200">
      <div className="mx-auto px-6 flex items-center justify-between h-16">
        <div className="nav-logo">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
          >
            <Logo className="w-[96px] h-auto" />
          </button>
        </div>
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''} hidden md:flex items-center gap-1`} id="nav-menu">
          <button 
            onClick={() => navigate('/')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
              isActive('/') 
                ? 'text-foreground bg-accent' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <button 
            onClick={() => navigate('/components')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
              isActive('/components') 
                ? 'text-foreground bg-accent' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <Layers className="w-4 h-4" />
            Components
          </button>
          <button 
            onClick={() => window.open('https://github.com/Slabpixel/Webflow-Bits', '_blank')}
            className="px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            GitHub
          </button>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div 
            className="md:hidden flex flex-col gap-1 p-2 rounded-md transition-colors duration-200 hover:bg-accent cursor-pointer" 
            id="nav-toggle" 
            onClick={toggleMenu}
          >
          <span className={`w-5 h-0.5 bg-foreground transition-all duration-200 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`w-5 h-0.5 bg-foreground transition-all duration-200 rounded-sm ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-5 h-0.5 bg-foreground transition-all duration-200 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-background transition-all duration-200 border-r border-border ${
        isMenuOpen ? 'left-0' : '-left-full'
      }`}>
        <div className="flex flex-col items-start justify-start pt-6 px-6 space-y-1">
          <button 
            onClick={() => {
              navigate('/')
              setIsMenuOpen(false)
            }}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
              isActive('/') 
                ? 'text-foreground bg-accent' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <Home className="w-5 h-5" />
            Home
          </button>
          <button 
            onClick={() => {
              navigate('/components')
              setIsMenuOpen(false)
            }}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
              isActive('/components') 
                ? 'text-foreground bg-accent' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <Layers className="w-5 h-5" />
            Components
          </button>
          <button 
            onClick={() => {
              window.open('#docs', '_blank')
              setIsMenuOpen(false)
            }}
            className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-3"
          >
            <BookOpen className="w-5 h-5" />
            Documentation
          </button>
          <button 
            onClick={() => {
              window.open('https://github.com', '_blank')
              setIsMenuOpen(false)
            }}
            className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-3"
          >
            <Github className="w-5 h-5" />
            GitHub
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

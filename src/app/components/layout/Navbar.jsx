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
    <nav className="w-full fixed top-0 left-0 bg-background/95 backdrop-blur-sm border-b border-border z-50 transition-all duration-200">
      <div className="mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <div className="nav-logo">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
          >
            <Logo className="w-[80px] h-auto" />
          </button>
        </div>
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''} hidden md:flex items-center gap-1`} id="nav-menu">
          <button 
            onClick={() => navigate('/')}
            className={`px-3 lg:px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
              isActive('/') 
                ? 'text-foreground bg-accent' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="hidden lg:inline">Home</span>
          </button>
          <button 
            onClick={() => navigate('/components')}
            className={`px-3 lg:px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
              isActive('/components') 
                ? 'text-foreground bg-accent' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="hidden lg:inline">Components</span>
          </button>
          <button 
            onClick={() => window.open('https://github.com/Slabpixel/Webflow-Bits', '_blank')}
            className="px-3 lg:px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span className="hidden lg:inline">GitHub</span>
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
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-16 left-0 w-80 h-[calc(100vh-4rem)] bg-background border-r border-border z-50 transition-transform duration-300 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col items-start justify-start pt-6 px-4 space-y-1 h-full overflow-y-auto">
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
              window.open('https://github.com/Slabpixel/Webflow-Bits', '_blank')
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

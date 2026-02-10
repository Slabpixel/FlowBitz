import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle'
import Logo from '../Logo'
import { Badge } from '../ui/badge.jsx'
import { Home, Layers, BookOpen, Github, Sparkles, HelpCircle, User, MessageSquare, Tag, Mail, FileText } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { theme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => {
    if (path === '/components' || path === '/blog') {
      return location.pathname === path || location.pathname.startsWith(`${path}/`)
    }
    return location.pathname === path
  }

  return (
    <nav id='navbar' className={`w-full fixed top-0 left-0 border-b z-[70] transition-all duration-200 
      ${isScrolled ? 'bg-background/50 backdrop-blur-md shadow-sm' : 'bg-transparent'}
      ${ theme === 'dark' ? 'border-white/10' : 'border-black/10' }
    `}>
      {/* Navbar Desktop Container */}
      <div className="mx-auto px-4 py-4 sm:px-6 lg:px-0 lg:max-w-[1200px] sm:gap-8 flex items-center justify-between sm:justify-normal">
        {/* Navbar Logo */}
        <div className="nav-logo">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
          >
            <Logo className="h-10 w-auto" />
          </button>
        </div>
        {/* End Navbar Logo */}

        {/* Navbar Menu Wrapper */}
        <div className="flex sm:w-full items-center justify-between">
          {/* Navbar Menu List */}
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''} hidden md:flex items-center`} id="nav-menu">
            <button 
              onClick={() => navigate('/components')}
              className={`px-3 lg:px-8 py-[10px] border-x text-foreground inter-med-16 transition-all duration-200 flex items-center gap-3 hover:text-foreground/50
                ${ theme === 'dark' ? 'border-white/10' : 'border-black/10' }
              `}
            >
              <FontAwesomeIcon icon={['far', 'code']} className='w-4 h-4 opacity-60'/>
              <span className="hidden lg:inline">Components</span>
            </button>

            <button 
              onClick={() => navigate('/showcase')}
              className={`px-3 lg:px-8 py-[10px] border-r inter-med-16 text-foreground transition-all duration-200 flex items-center gap-3 hover:text-foreground/50
                ${ theme === 'dark' ? 'border-white/10' : 'border-black/10' }
              `}
            >
              <FontAwesomeIcon icon={['far', 'sidebar']} className='w-4 h-4 opacity-60'/>
              <span className="hidden lg:inline">Showcase</span>
            </button>

            <button 
              onClick={() => navigate('/blog')}
              className={`px-3 lg:px-8 py-[10px] border-r inter-med-16 text-foreground transition-all duration-200 flex items-center gap-3 hover:text-foreground/50
                ${ theme === 'dark' ? 'border-white/10' : 'border-black/10' }
              `}
            >
              <FontAwesomeIcon icon={['far', 'file']} className='w-4 h-4 opacity-60'/>
              <span className="hidden lg:inline">Blog</span>
            </button>
          </div>
          {/* End Navbar Menu List */}

          {/* Navbar Theme Toggle and Github Btn */}
          <div className="flex items-center gap-2 lg:gap-6">
            <ThemeToggle />
            <a 
              href="https://github.com/Slabpixel/FlowBitz"
              target="_blank"
              rel="noopener noreferrer"
              className={`py-[10px] hidden sm:flex inter-med-16 text-foreground transition-all duration-200 items-center gap-2 hover:text-foreground/50`}
            >
              <FontAwesomeIcon icon={['fab', 'github']} className='w-4 h-4'/>
              <span className="hidden lg:inline">Github</span>
            </a>

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
          {/* End Navbar Theme Toggle and Github Btn */}
        </div>
        {/* End Navbar Menu Wrapper */}
      </div>
      {/* End Navbar Desktop Container */}
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-[55]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-16 left-0 w-80 h-[calc(100vh-4rem)] bg-background border-r border-border z-[65] transition-transform duration-300 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Main Navigation */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-2">
              {/* Primary Navigation */}
              <div className="space-y-1">
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
                    navigate('/blog')
                    setIsMenuOpen(false)
                  }}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
                    isActive('/blog') 
                      ? 'text-foreground bg-accent' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  Blog
                </button>
                <button 
                  onClick={() => {
                    navigate('/showcase')
                    setIsMenuOpen(false)
                  }}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
                    isActive('/showcase') 
                      ? 'text-foreground bg-accent' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Showcase</span>
                  <Badge variant="secondary" className="text-xs bg-primary text-white ml-auto">Soon</Badge>
                </button>
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-border"></div>

              {/* Support & Info */}
              <div className="space-y-1">
                <div className="px-4 py-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Support</h3>
                </div>
                <button 
                  onClick={() => {
                    navigate('/contact')
                    setIsMenuOpen(false)
                  }}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
                    isActive('/contact') 
                      ? 'text-foreground bg-accent' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                  Contact
                </button>
                <button 
                  onClick={() => {
                    navigate('/support')
                    setIsMenuOpen(false)
                  }}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
                    isActive('/support') 
                      ? 'text-foreground bg-accent' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <HelpCircle className="w-5 h-5" />
                  Support
                </button>
                <button 
                  onClick={() => {
                    navigate('/faq')
                    setIsMenuOpen(false)
                  }}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
                    isActive('/faq') 
                      ? 'text-foreground bg-accent' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  FAQ
                </button>
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-border"></div>

              {/* About & Legal */}
              <div className="space-y-1">
                <div className="px-4 py-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">About</h3>
                </div>
                <button 
                  onClick={() => {
                    navigate('/about')
                    setIsMenuOpen(false)
                  }}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
                    isActive('/about') 
                      ? 'text-foreground bg-accent' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <User className="w-5 h-5" />
                  About
                </button>
                <button 
                  onClick={() => {
                    navigate('/release')
                    setIsMenuOpen(false)
                  }}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
                    isActive('/release') 
                      ? 'text-foreground bg-accent' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Tag className="w-5 h-5" />
                  Release Notes
                </button>
                <button 
                  onClick={() => {
                    navigate('/license')
                    setIsMenuOpen(false)
                  }}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
                    isActive('/license') 
                      ? 'text-foreground bg-accent' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  License
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <button 
              onClick={() => {
                window.open('https://github.com/Slabpixel/FlowBitz', '_blank')
                setIsMenuOpen(false)
              }}
              className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-3"
            >
              <Github className="w-5 h-5" />
              GitHub Repository
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

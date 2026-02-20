import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle'
import Logo from '../Logo'
import { Badge } from '../ui/badge.jsx'
import { Home, Layers, BookOpen, Github, Sparkles, HelpCircle, User, MessageSquare, Tag, Mail, FileText } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sidebar from './Sidebar'

const Navbar = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [fullNav, setFullNav] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { theme } = useTheme();
  const SIDEBAR_PATHS = ['/components', '/installation', '/support', '/faq', '/about']

  useEffect(() => {
    const hasSidebar = SIDEBAR_PATHS.some(path =>
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    )
    setFullNav(hasSidebar)
    setIsMenuOpen(false)
  }, [location.pathname])

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
    <nav id='navbar' className={`w-full fixed top-0 left-0 border-b z-[70] transition-all duration-500 
      ${ isMenuOpen ? 'bg-background' : 'bg-transparent'}
      ${ theme === 'dark' ? 'border-white/10' : 'border-black/10' }
    `}>
      {/* Navbar Desktop Container */}
      <div className={`
        mx-auto px-4 py-4 sm:px-6 flex items-center justify-between lg:justify-normal transition-all duration-500 
        ${ fullNav ? 'lg:px-0' : 'lg:px-0 lg:max-w-[1200px] sm:gap-8' }
      `}>
        {/* Navbar Logo */}
        <div className={`nav-logo transition-all duration-200  ${fullNav ? 'lg:px-6 lg:w-full lg:max-w-[300px] lg:min-w-[300px] flex gap-2 items-end justify-start' : ''}`}>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
          >
            <Logo className="h-10 w-auto" />
          </button>

          { fullNav && (
            <p className='text-paragraph text-text-medium'>v{process.env.REACT_APP_VERSION || '1.0.0'}</p>
          ) }
        </div>
        {/* End Navbar Logo */}

        {/* Navbar Menu Wrapper */}
        <div className={`flex lg:w-full items-center justify-between transition-all duration-500  ${fullNav ? 'lg:pr-12' : ''}`}>
          {/* Navbar Menu List */}
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''} hidden lg:flex items-center`} id="nav-menu">
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
              className={`py-[10px] hidden lg:flex inter-med-16 text-foreground transition-all duration-200 items-center gap-2 hover:text-foreground/50`}
            >
              <FontAwesomeIcon icon={['fab', 'github']} className='w-4 h-4'/>
              <span className="hidden lg:inline">Github</span>
            </a>

            <div 
              className="lg:hidden flex flex-col gap-1 p-2 rounded-md transition-colors duration-200 hover:bg-accent cursor-pointer" 
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
          className="lg:hidden fixed top-18 left-0 right-0 bottom-0 bg-background/50 h-[calc(100svh-4.5rem)] backdrop-blur-sm z-[55]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* Mobile Menu */}
      <div className={`lg:hidden fixed w-full top-18 left-0 max-h-[calc(100svh-4.5rem)] overflow-y-auto bg-background border-r border-border z-[65] transition-transform duration-300 ease-in-out ${
        isMenuOpen ? 'translate-y-0' : '-translate-y-[135%]'
      }`}>
        <div className="flex flex-col h-full">
          {fullNav && (
            <div className="border-t border-foreground/10 pt-6">
              <Sidebar variant="mobile" onNavigate={() => setIsMenuOpen(false)} />
            </div>
          )}

          <div className="px-4">
            <button 
              onClick={() => {
                navigate('/components')
                setIsMenuOpen(false)
              }}
              className={`w-full py-4 px-2 inter-med-16 transition-all duration-200 flex items-center gap-2 border-b border-foreground/10 ${
                isActive('/components') 
                  ? 'text-foreground font-semibold' 
                  : 'text-foreground hover:text-foreground/50'
              }`}
            >
              <FontAwesomeIcon icon={['far', 'code']} className='w-4 h-4 opacity-60'/>
              Components
            </button>

            <button 
              onClick={() => {
                navigate('/showcase')
                setIsMenuOpen(false)
              }}
              className={`w-full py-4 px-2 inter-med-16 transition-all duration-200 flex items-center gap-2 border-b border-foreground/10 ${
                isActive('/showcase') 
                  ? 'text-foreground font-semibold' 
                  : 'text-foreground hover:text-foreground/50'
              }`}
            >
              <FontAwesomeIcon icon={['far', 'sidebar']} className='w-4 h-4 opacity-60'/>
              <span>Showcase</span>
            </button>

            <button 
              onClick={() => {
                navigate('/blog')
                setIsMenuOpen(false)
              }}
              className={`w-full py-4 px-2 inter-med-16 transition-all duration-200 flex items-center gap-2 border-b border-foreground/10 ${
                isActive('/blog') 
                  ? 'text-foreground font-semibold' 
                  : 'text-foreground hover:text-foreground/50'
              }`}
            >
              <FontAwesomeIcon icon={['far', 'file']} className='w-4 h-4 opacity-60'/>
              Blog
            </button>

            <button 
              onClick={() => {
                window.open('https://github.com/Slabpixel/FlowBitz', '_blank')
                setIsMenuOpen(false)
              }}
              className="w-full py-4 px-2 inter-med-16 transition-all duration-200 flex items-center gap-2 text-foreground hover:text-foreground/50"
            >
              <FontAwesomeIcon icon={['fab', 'github']} className='w-4 h-4 opacity-60'/>
              GitHub
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

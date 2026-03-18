import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Code, PanelLeft, BookHeart, Info, FileText } from 'lucide-react'
import Logo from '../Logo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sidebar from './LeftSidebar'

const Navbar = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const SIDEBAR_PATHS = ['/components', '/installation', '/support', '/faq', '/about']

  useEffect(() => {
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
      border-white/10
    `}>
      {/* Navbar Desktop Container */}
      <div className="w-full mx-auto px-4 py-4 sm:px-6 flex items-center justify-between lg:grid lg:grid-cols-3 lg:gap-4 transition-all duration-500">
        {/* Navbar Logo */}
        <div className="nav-logo flex gap-2 items-end justify-start">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
          >
            <Logo className="h-8 w-auto" />
          </button>
          <p className="text-paragraph text-text-medium">v{process.env.REACT_APP_VERSION || '1.0.0'}</p>
        </div>
        {/* End Navbar Logo */}

        {/* Navbar Menu - Centered */}
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''} hidden lg:flex items-center justify-center`} id="nav-menu">
            <button 
              onClick={() => navigate('/components')}
              className="px-3 lg:px-6 py-[10px] text-foreground inter-med-16 transition-all duration-200 flex items-center gap-2 hover:text-foreground/50"
            >
              <Code className='w-4 h-4 opacity-60'/>
              <span className="hidden lg:inline">Components</span>
            </button>

            <button 
              onClick={() => navigate('/showcase')}
              className="px-3 lg:px-6 py-[10px] inter-med-16 text-foreground transition-all duration-200 flex items-center gap-2 hover:text-foreground/50"
            >
              <PanelLeft className='w-4 h-4 opacity-60'/>
              <span className="hidden lg:inline">Showcase</span>
            </button>

            <button 
              onClick={() => navigate('/blog')}
              className="px-3 lg:px-6 py-[10px] inter-med-16 text-foreground transition-all duration-200 flex items-center gap-2 hover:text-foreground/50"
            >
              <BookHeart className='w-4 h-4 opacity-60'/>
              <span className="hidden lg:inline">Blog</span>
            </button>

            <button 
              onClick={() => navigate('/about')}
              className="px-3 lg:px-6 py-[10px] inter-med-16 text-foreground transition-all duration-200 flex items-center gap-2 hover:text-foreground/50"
            >
              <Info className='w-4 h-4 opacity-60'/>
              <span className="hidden lg:inline">About</span>
            </button>
          </div>
          {/* End Navbar Menu List */}

        {/* Navbar Right - Github + Mobile Toggle */}
        <div className="flex items-center gap-2 lg:gap-6 justify-end">
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
          {SIDEBAR_PATHS.some(path =>
            location.pathname === path || location.pathname.startsWith(`${path}/`)
          ) && (
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
              <Code className='w-4 h-4 opacity-60'/>
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
              <PanelLeft className='w-4 h-4 opacity-60'/>
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
              <FileText className='w-4 h-4 opacity-60'/>
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

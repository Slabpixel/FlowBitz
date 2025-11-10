import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Github, Heart, ExternalLink, Layers, HelpCircle, User, MessageSquare, Sparkles, Download, Bug, MessageCircle, Home, Tag, FileText } from 'lucide-react'
import { getFilteredComponentKeys } from '../../../library/data/componentsMetadata.js'
import Logo from '../Logo'

const Footer = () => {
  const componentCount = getFilteredComponentKeys().length
  const navigate = useNavigate()
  const location = useLocation()

  const scrollToTop = () => {
    document.getElementById('root').scrollTop = 0
  }

  const handleNavigation = (path) => {
    if (location.pathname === path) {
      // Same page - just scroll to top
      scrollToTop()
    } else {
      // Different page - navigate (global ScrollToTop will handle scrolling)
      navigate(path)
    }
  }
  const handleGitHub = () => {
    window.open('https://github.com/Slabpixel/FlowBitz', '_blank')
  }

  const handleSlabPixel = () => {
    window.open('https://slabpixel.com', '_blank')
  }

  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Logo className="h-6 w-auto mb-4" />
            <p className="text-muted-foreground leading-relaxed text-sm mb-4">
              Interactive components for Webflow. Create stunning animations and effects with our powerful library of {componentCount}+ components.
            </p>
            {/* Product Hunt Button - Fixed Bottom Right */}
            <div className="mb-4">
              <a href="https://www.producthunt.com/products/flowbitz-webflow-animation-library?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-flowbitz&#0045;2" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1020609&theme=light&t=1760584749748" 
                  alt="FlowBitz - Free Interactive Components for Webflow — No Code? | Product Hunt" 
                  style={{ width: '200px', height: '40px' }} 
                  width="200" 
                  height="40"
                  className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>by</span>
              <button 
                onClick={handleSlabPixel}
                className="text-primary hover:underline transition-colors duration-200"
              >
                SlabPixel
              </button>
            </div>
          </div>
          
          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleNavigation('/')}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/components')}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Layers className="w-4 h-4" />
                  Components
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/blog')}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/showcase')}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Showcase
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/about')}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  About
                </button>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleNavigation('/faq')}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/contact?tab=contact')}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/support')}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4" />
                  Support
                </button>
              </li>
              <li>
                <button 
                  onClick={handleGitHub}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleNavigation('/release')}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Tag className="w-4 h-4" />
                  Release Notes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/contact?tab=report')}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Bug className="w-4 h-4" />
                  Report Bug
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/contact?tab=feature')}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Feature Request
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/license')}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  License
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <p>&copy; 2025 FlowBitz. All rights reserved.</p>
            </div>
            <div className="flex sm:flex-row flex-col items-center gap-2 sm:gap-6 text-sm text-muted-foreground">
              <span>v{process.env.REACT_APP_VERSION || '1.0.0'}</span>
              <span className="hidden lg:block">•</span>
              <span>{componentCount} Components</span>
              <span className="hidden lg:block">•</span>
              <span>100% Free</span>
              <span className="hidden lg:block">•</span>
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

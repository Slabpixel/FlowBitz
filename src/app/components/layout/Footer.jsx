import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Heart, ExternalLink, Layers, HelpCircle, User, MessageSquare, Sparkles, Download, Bug, MessageCircle, FileText, Home } from 'lucide-react'
import { getFilteredComponentKeys } from '../../../library/data/componentsMetadata.js'

const Footer = () => {
  const componentCount = getFilteredComponentKeys().length

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
            <h3 className="text-xl font-bold mb-4 text-foreground">
              FlowBitz
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm mb-4">
              Interactive components for Webflow. Create stunning animations and effects with our powerful library of {componentCount}+ components.
            </p>
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
                <Link 
                  to="/" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/components" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Layers className="w-4 h-4" />
                  Components
                </Link>
              </li>
              <li>
                <Link 
                  to="/showcase" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Showcase
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  About
                </Link>
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
                <Link 
                  to="/faq" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/support" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4" />
                  Support
                </Link>
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
              <li>
                <button 
                  onClick={handleSlabPixel}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  SlabPixel
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
                <a 
                  href="https://github.com/Slabpixel/FlowBitz/releases" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Releases
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Slabpixel/FlowBitz/issues" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Bug className="w-4 h-4" />
                  Issues
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Slabpixel/FlowBitz/discussions" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Discussions
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Slabpixel/FlowBitz/blob/main/LICENSE" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  License
                </a>
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
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>v{process.env.REACT_APP_VERSION || '1.0.0'}</span>
              <span>•</span>
              <span>{componentCount} Components</span>
              <span>•</span>
              <span>100% Free</span>
              <span>•</span>
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

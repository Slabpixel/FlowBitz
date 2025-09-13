import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full flex justify-center bg-background border-t border-border py-8 sm:py-12">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="footer-section sm:col-span-2 lg:col-span-2">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">
              FlowBitz
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Interactive components for Webflow
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3 uppercase tracking-wide">
              Resources
            </h4>
            <ul className="list-none space-y-1 sm:space-y-2">
              <li>
                <Link 
                  to="/components" 
                  className="text-muted-foreground no-underline transition-colors duration-200 text-sm hover:text-foreground"
                >
                  Components
                </Link>
              </li>
              <li>
                <a 
                  href="#docs" 
                  className="text-muted-foreground no-underline transition-colors duration-200 text-sm hover:text-foreground"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="#examples" 
                  className="text-muted-foreground no-underline transition-colors duration-200 text-sm hover:text-foreground"
                >
                  Examples
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3 uppercase tracking-wide">
              Community
            </h4>
            <ul className="list-none space-y-1 sm:space-y-2">
              <li>
                <a 
                  href="https://github.com/Slabpixel/Webflow-Bits" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground no-underline transition-colors duration-200 text-sm hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="#discord" 
                  className="text-muted-foreground no-underline transition-colors duration-200 text-sm hover:text-foreground"
                >
                  Discord
                </a>
              </li>
              <li>
                <a 
                  href="#twitter" 
                  className="text-muted-foreground no-underline transition-colors duration-200 text-sm hover:text-foreground"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3 uppercase tracking-wide">
              Social Media
            </h4>
            <ul className="list-none space-y-1 sm:space-y-2">
              <li>
                <a 
                  href="#instagram" 
                  className="text-muted-foreground no-underline transition-colors duration-200 text-sm hover:text-foreground"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="#linkedin" 
                  className="text-muted-foreground no-underline transition-colors duration-200 text-sm hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="#facebook" 
                  className="text-muted-foreground no-underline transition-colors duration-200 text-sm hover:text-foreground"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center text-muted-foreground text-sm">
          <p className="text-muted-foreground leading-relaxed text-sm">
            &copy; 2025 FlowBitz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

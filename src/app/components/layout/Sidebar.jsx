import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getComponentsByCategory } from '../../../library/data/componentsMetadata.js'
import { ChevronDown, ChevronUp, HelpCircle, MessageSquare, Building2 } from 'lucide-react'

const Sidebar = ({ showBackLink = false }) => {
  const location = useLocation()
  const [isComponentsOpen, setIsComponentsOpen] = useState(false)
  const componentsByCategory = getComponentsByCategory()
  
  // Temporarily disabled components (same as in componentsMetadata.js)
  const disabledComponents = ['shape-blur', 'magnet-lines', 'text-cursor']
  
  // Filter out disabled components
  const textComponents = componentsByCategory.text?.filter(component => 
    !disabledComponents.includes(component.key)
  ) || []
  const buttonComponents = componentsByCategory.button?.filter(component => 
    !disabledComponents.includes(component.key)
  ) || []
  const effectComponents = componentsByCategory.effect?.filter(component => 
    !disabledComponents.includes(component.key)
  ) || []

  // Get current component name from URL
  const getCurrentComponentName = () => {
    const pathParts = location.pathname.split('/')
    if (pathParts.length >= 3 && pathParts[1] === 'components') {
      return pathParts[2]
    }
    return null
  }

  const currentComponentName = getCurrentComponentName()
  const currentLink = location.pathname

  const renderComponentLabel = (component, isActive) => (
    <span className="flex w-full items-center gap-2">
      <span>{component.name}</span>
      {component.newComponent && (
        <span
          className={`rounded-sm px-1 py-0 text-[9px] font-bold uppercase border transition-colors ${
            isActive
              ? 'bg-white/20 text-white border-white/40'
              : 'bg-primary/15 text-primary border-primary/30'
          }`}
        >
          New
        </span>
      )}
    </span>
  )

  return (
    <aside className="w-full lg:max-w-[240px] lg:min-w-[240px] bg-background border-r border-border lg:overflow-y-auto lg:sticky lg:top-16 lg:self-start h-auto lg:h-[calc(100vh-4rem)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-background hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30">
      <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 lg:h-[calc(100vh-4rem)]">        
        {/* Mobile Dropdown Toggle */}
        <button
          onClick={() => setIsComponentsOpen(!isComponentsOpen)}
          className="lg:hidden flex items-center justify-between w-full py-3 px-4 text-base font-semibold text-foreground bg-muted hover:bg-accent rounded-lg transition-all duration-200 border border-border"
        >
          <span>Navigations</span>
          {isComponentsOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {/* Mobile Dropdown Content */}
        <div className={`lg:block ${isComponentsOpen ? 'block' : 'hidden'}`}>
          <div className="sidebar-section mb-4">
            <h3 className="text-base sm:text-xl font-semibold mb-2 text-foreground">
              Get Started
            </h3>
            <ul className="list-none">
              <li className="mb-0.5">
                <Link 
                  to="/components" 
                  onClick={() => setIsComponentsOpen(false)}
                  className={`block px-0 py-2 text-black dark:text-white no-underline rounded-md transition-all duration-200 text-sm font-normal ${
                    currentLink !== '/components'
                      ? 'px-0 hover:px-3 hover:text-foreground hover:bg-accent' 
                      : 'px-3 hover:px-3 text-white bg-primary font-medium'
                  }`}>
                  Introduction
                </Link>
              </li>
              <li className="mb-0.5">
                <Link 
                  to="/installation" 
                  onClick={() => setIsComponentsOpen(false)}
                  className={`block px-0 py-2 text-black dark:text-white no-underline rounded-md transition-all duration-200 text-sm font-normal ${
                    currentLink !== '/installation'
                      ? 'px-0 hover:px-3 hover:text-foreground hover:bg-accent' 
                      : 'px-3 hover:px-3 text-white bg-primary font-medium'
                  }`}>
                  Installation
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">
              Components
            </h3>
            <div className="component-categories">
              <div className="category mb-4 sm:mb-6">
                <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">
                  Text Components ({textComponents.length})
                </h4>
                <ul className="list-none">
                  {textComponents.map((component) => (
                    <li key={component.key} className="mb-0.5">
                      <Link 
                        to={`/components/${component.key}`} 
                        onClick={() => setIsComponentsOpen(false)}
                        className={`block px-0 py-2 text-black dark:text-white no-underline rounded-md transition-all duration-200 text-sm font-normal ${
                          currentComponentName !== component.key 
                            ? 'px-0 hover:px-3 hover:text-foreground hover:bg-accent' 
                            : 'px-3 hover:px-3 text-white bg-primary font-medium'
                        }`}
                      >
                        {renderComponentLabel(component, currentComponentName === component.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="category mb-4 sm:mb-6">
                <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">
                  Effect Components ({effectComponents.length})
                </h4>
                <ul className="list-none">
                  {effectComponents.map((component) => (
                    <li key={component.key} className="mb-0.5">
                      <Link 
                        to={`/components/${component.key}`} 
                        onClick={() => setIsComponentsOpen(false)}
                        className={`block px-0 py-2 text-black dark:text-white no-underline rounded-md transition-all duration-200 text-sm font-normal ${
                          currentComponentName !== component.key 
                            ? 'px-0 hover:px-3 hover:text-foreground hover:bg-accent' 
                            : 'px-3 hover:px-3 text-white bg-primary font-medium'
                        }`}
                      >
                        {renderComponentLabel(component, currentComponentName === component.key)}
                      </Link>
                    </li>
                  ))}
                </ul>  
              </div>
              
              <div className="category mb-4 sm:mb-6">
                <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">
                  Button Components ({buttonComponents.length})
                </h4>
                <ul className="list-none">
                  {buttonComponents.map((component) => (
                    <li key={component.key} className="mb-0.5">
                      <Link 
                        to={`/components/${component.key}`} 
                        onClick={() => setIsComponentsOpen(false)}
                        className={`block px-0 py-2 text-black dark:text-white no-underline rounded-md transition-all duration-200 text-sm font-normal ${
                          currentComponentName !== component.key 
                            ? 'px-0 hover:px-3 hover:text-foreground hover:bg-accent' 
                            : 'px-3 hover:px-3 text-white bg-primary font-medium'
                        }`}
                      >
                        {renderComponentLabel(component, currentComponentName === component.key)}
                      </Link>
                    </li>
                  ))}
                </ul>  
              </div>
              <span className="flex items-center gap-2 text-muted-foreground text-sm mb-4 mt-6">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  New Components Soon!
                </span>
            </div>
          </div>

          <div className='sticky bottom-0'>
            <div className="h-[50px] mt-[-50px] bg-gradient-to-t from-background to-backgound/0 pointer-events-none"/>
            <div className="sidebar-section border-t border-border pt-2 pb-2 bg-background">
              <ul className="list-none">
                <li className="mb-0.5">
                  <Link s
                    to="/about" 
                    onClick={() => setIsComponentsOpen(false)}
                    className={`flex items-center gap-2 px-0 py-2 text-black dark:text-white no-underline rounded-md transition-all duration-200 text-sm font-normal ${
                      currentLink !== '/about'
                        ? 'px-0 hover:px-3 hover:text-foreground hover:bg-accent' 
                        : 'px-3 hover:px-3 text-white bg-primary font-medium'
                    }`}>
                    <Building2 className="w-4 h-4" />
                    About Us
                  </Link>
                </li>
                <li className="mb-0.5">
                  <Link 
                    to="/support" 
                    onClick={() => setIsComponentsOpen(false)}
                    className={`flex items-center gap-2 px-0 py-2 text-black dark:text-white no-underline rounded-md transition-all duration-200 text-sm font-normal ${
                      currentLink !== '/support'
                        ? 'px-0 hover:px-3 hover:text-foreground hover:bg-accent' 
                        : 'px-3 hover:px-3 text-white bg-primary font-medium'
                    }`}>
                    <HelpCircle className="w-4 h-4" />
                    Support
                  </Link>
                </li>
                <li className="mb-0.5">
                  <Link 
                    to="/faq" 
                    onClick={() => setIsComponentsOpen(false)}
                    className={`flex items-center gap-2 px-0 py-2 text-black dark:text-white no-underline rounded-md transition-all duration-200 text-sm font-normal ${
                      currentLink !== '/faq'
                        ? 'px-0 hover:px-3 hover:text-foreground hover:bg-accent' 
                        : 'px-3 hover:px-3 text-white bg-primary font-medium'
                    }`}>
                    <MessageSquare className="w-4 h-4" />
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getComponentsByCategory } from '../../../library/data/componentsMetadata.js'
import { ChevronDown, ChevronUp, HelpCircle, MessageSquare, Building2 } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";

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
          className={`rounded-sm p-1 text-xs font-semibold uppercase transition-colors ${
            isActive
              ? 'bg-primary text-white'
              : 'bg-white/20 text-white'
          }`}
        >
          New
        </span>
      )}
    </span>
  )

  return (
    <aside className="w-full relative lg:max-w-[300px] lg:min-w-[300px] bg-background border-r border-border lg:overflow-y-auto lg:sticky lg:top-18 lg:self-start h-auto lg:h-[calc(100vh-4.5rem)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-background hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30">
      <div className="flex flex-col flex-grow gap-4 sm:gap-6 p-4 sm:p-6 sm:pb-4 lg:h-[calc(100vh-4.5rem)]">        
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
        {/* End Mobile Dropdown Toggle */}
        
        {/* Mobile Dropdown Content */}
        <div className={`lg:flex lg:flex-col lg:flex-grow overflow-scroll ${isComponentsOpen ? 'block' : 'hidden'}`}>
          <div className="sidebar-section flex flex-col mb-4 pt-4 px-4">
            <h3 className="text-overline uppercase text-textLow">
              Get Started
            </h3>
            <ul className="list-none flex flex-col">
              <li>
                <Link 
                  to="/components" 
                  onClick={() => setIsComponentsOpen(false)}
                  className={`flex gap-2 py-[0.875rem] items-center justify-start text-foreground ${
                    currentLink !== '/components'
                      ? 'text-link font-medium hover:font-semibold' 
                      : 'text-link font-semibold'
                  }`}>
                  { currentLink !== '/components'
                      ? <FontAwesomeIcon icon={['far', 'hand']} className='w-4 h-4 opacity-60'/>
                      : <FontAwesomeIcon icon={['fas', 'hand']} className='w-4 h-4'/>
                  }
                  
                  Introduction
                </Link>
              </li>
              <li>
                <Link 
                  to="/installation" 
                  onClick={() => setIsComponentsOpen(false)}
                  className={`flex gap-2 py-[0.875rem] items-center justify-start text-foreground ${
                    currentLink !== '/installation'
                      ? 'text-link font-medium hover:font-semibold' 
                      : 'text-link font-semibold'
                  }`}>
                  { currentLink !== '/installation'
                      ? <FontAwesomeIcon icon={['far', 'code']} className='w-4 h-4 opacity-60'/>
                      : <FontAwesomeIcon icon={['fas', 'code']} className='w-4 h-4'/>
                  }
                  Installation
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="sidebar-section relative z-[1] flex flex-col px-4">
            <h3 className="text-overline uppercase text-textLow">
              Components
            </h3>
            <div className="flex flex-col">
              <Accordion type="single" collapsible defaultValue='item-1'>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <p className='text-link font-medium text-foreground'>
                      Text Components <span className='text-textLow'> • {textComponents.length}</span>
                    </p>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-none">
                      {textComponents.map((component) => (
                        <li key={component.key} className={`border-l pl-4 py-[0.875rem] transition-all duration-200 ${currentComponentName === component.key ? 'border-primary' : 'border-foreground/20'}`}>
                          <Link 
                            to={`/components/${component.key}`} 
                            onClick={() => setIsComponentsOpen(false)}
                            className={` transition-all duration-200 ${
                              currentComponentName !== component.key 
                                ? 'link font-medium text-textLow hover:text-foreground' 
                                : 'link font-semibold text-foreground'
                            }`}
                          >
                            {renderComponentLabel(component, currentComponentName === component.key)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <p className='text-link font-medium text-foreground'>
                      Effect Components <span className='text-textLow'> • {effectComponents.length}</span>
                    </p>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-none">
                      {effectComponents.map((component) => (
                        <li key={component.key} className={`border-l pl-4 py-[0.875rem] transition-all duration-200 ${currentComponentName === component.key ? 'border-primary' : 'border-foreground/20'}`}>
                          <Link 
                            to={`/components/${component.key}`} 
                            onClick={() => setIsComponentsOpen(false)}
                            className={` transition-all duration-200 ${
                              currentComponentName !== component.key 
                                ? 'link font-medium text-textLow hover:text-foreground' 
                                : 'link font-semibold text-foreground'
                            }`}
                          >
                            {renderComponentLabel(component, currentComponentName === component.key)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <p className='text-link font-medium text-foreground'>
                      Button Components <span className='text-textLow'> • {buttonComponents.length}</span>
                    </p>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-none">
                      {buttonComponents.map((component) => (
                        <li key={component.key} className={`border-l pl-4 py-[0.875rem] transition-all duration-200 ${currentComponentName === component.key ? 'border-primary' : 'border-foreground/20'}`}>
                          <Link 
                            to={`/components/${component.key}`} 
                            onClick={() => setIsComponentsOpen(false)}
                            className={` transition-all duration-200 ${
                              currentComponentName !== component.key 
                                ? 'link font-medium text-textLow hover:text-foreground' 
                                : 'link font-semibold text-foreground'
                            }`}
                          >
                            {renderComponentLabel(component, currentComponentName === component.key)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className='sticky bottom-0 z-[2]'>
            <div className="sidebar-section px-4 pt-4 bg-background">
              <ul className="list-none">
                <li>
                  <Link 
                    to="/support" 
                    onClick={() => setIsComponentsOpen(false)}
                    className={`flex gap-2 py-[0.875rem] items-center justify-start text-foreground ${
                      currentLink !== '/support'
                        ? 'text-link font-medium hover:font-semibold' 
                        : 'text-link font-semibold'
                    }`}>
                    { currentLink !== '/support'
                        ? <FontAwesomeIcon icon={['far', 'question']} className='w-4 h-4 opacity-60'/>
                        : <FontAwesomeIcon icon={['fas', 'question']} className='w-4 h-4'/>
                    }
                    
                    Support
                  </Link>
                </li>
                <li>
                  <Link 
                      to="/faq" 
                      onClick={() => setIsComponentsOpen(false)}
                      className={`flex gap-2 py-[0.875rem] items-center justify-start text-foreground ${
                        currentLink !== '/faq'
                          ? 'text-link font-medium hover:font-semibold' 
                          : 'text-link font-semibold'
                      }`}>
                      { currentLink !== '/faq'
                          ? <FontAwesomeIcon icon={['far', 'message']} className='w-4 h-4 opacity-60'/>
                          : <FontAwesomeIcon icon={['fas', 'message']} className='w-4 h-4'/>
                      }
                      
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

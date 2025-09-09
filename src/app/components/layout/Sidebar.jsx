import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getComponentsByCategory } from '../../../library/data/componentsMetadata.js'

const Sidebar = ({ showBackLink = false }) => {
  const location = useLocation()
  const componentsByCategory = getComponentsByCategory()
  const textComponents = componentsByCategory.text
  const interactiveComponents = componentsByCategory.interactive

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

  return (
    <aside className="w-full max-w-[240px] min-w-[240px] bg-background border-r border-border overflow-y-auto sticky top-16 h-[calc(100vh-4rem)]">
      <div className="flex flex-col gap-6 p-6">        
        <div className="sidebar-section">
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Get Started
          </h3>
          <ul className="list-none">
            <li>
              <Link to="/components" className={`block px-0 py-2 text-muted-foreground no-underline rounded-md transition-all duration-200 text-sm font-medium ${
                currentLink !== '/components'
                  ? 'px-0 hover:px-3 hover:text-foreground hover:bg-accent' 
                  : 'px-3 hover:px-3 text-foreground dark:text-white bg-accent font-medium'
              }`}>
                Introduction
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="sidebar-section">
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Components
          </h3>
          <div className="component-categories">
            <div className="category mb-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-2 text-xs">
                Text Components ({textComponents.length})
              </h4>
              <ul className="list-none">
                {textComponents.map((component) => (
                  <li key={component.key} className="mb-0.5">
                    <Link 
                      to={`/components/${component.key}`} 
                      className={`block px-0 py-2 text-muted-foreground no-underline rounded-md transition-all duration-200 text-sm font-medium ${
                        currentComponentName !== component.key 
                          ? 'px-0 hover:px-3 hover:text-foreground hover:bg-accent' 
                          : 'px-3 hover:px-3 text-foreground dark:text-white bg-accent font-medium'
                      }`}
                    >
                      {component.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="category">
              <h4 className="text-sm font-medium text-muted-foreground mb-2 text-xs">
                Interactive Components ({interactiveComponents.length})
              </h4>
              <ul className="list-none">
                {interactiveComponents.map((component) => (
                  <li key={component.key} className="mb-0.5">
                    <Link 
                      to={`/components/${component.key}`} 
                      className={`block px-0 py-2 text-muted-foreground no-underline rounded-md transition-all duration-200 text-sm font-medium ${
                        currentComponentName !== component.key 
                          ? 'px-0 hover:px-3 hover:text-foreground hover:bg-accent' 
                          : 'px-3 hover:px-3 text-foreground dark:text-white bg-accent font-medium'
                      }`}
                    >
                      {component.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import FilterNav from './FilterNav'
import ComponentCard from './ComponentCard'
import { componentsMetadata, getFilteredComponentKeys } from '../../../library/data/componentsMetadata'
import { useWebflowBits } from '../../hooks/useWebflowBits'

const MAX_ITEMS = 9

const GalleryContainer = () => {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('text')
  const [searchQuery, setSearchQuery] = useState('')
  const { reinitializeComponents } = useWebflowBits()

  // Get all filtered component keys and map to full data
  const allComponents = useMemo(() => {
    const keys = getFilteredComponentKeys()
    return keys.map(key => ({
      id: key,
      ...componentsMetadata[key]
    }))
  }, [])

  // Filter components based on active filter and search query
  const filteredComponents = useMemo(() => {
    let result = allComponents

    // Filter by category
    if (activeFilter !== 'all') {
      result = result.filter(component => component.category === activeFilter)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(component => 
        component.name.toLowerCase().includes(query) ||
        component.description.toLowerCase().includes(query) ||
        component.category.toLowerCase().includes(query)
      )
    }

    return result
  }, [allComponents, activeFilter, searchQuery])

  // Limit to MAX_ITEMS
  const displayedComponents = useMemo(() => {
    return filteredComponents.slice(0, MAX_ITEMS)
  }, [filteredComponents])

  // Reinitialize FlowBitz components after render or filter change
  useEffect(() => {
    const timer = setTimeout(() => {
      reinitializeComponents()
    }, 150)
    return () => clearTimeout(timer)
  }, [reinitializeComponents, displayedComponents])

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  // Handle search change
  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }

  // Handle card click - navigate to component detail
  const handleCardClick = (componentId) => {
    navigate(`/components/${componentId}`)
  }

  // Get category label for display
  const getCategoryLabel = (category) => {
    const labels = {
      text: 'Text Component',
      button: 'Button Component',
      effect: 'Effect Component'
    }
    return labels[category] || 'Component'
  }

  return (
    <section>
      <div className="max-w-[1200px] mx-auto">
        {/* Filter Navigation */}
        <FilterNav 
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {displayedComponents.map((component, index) => (
            <ComponentCard
              key={component.id}
              id={component.id}
              name={component.name}
              category={getCategoryLabel(component.category)}
              isNew={component.newComponent}
              exampleCode={component.example?.code || ''}
              hoverPreview={component.hoverPreview || false}
              onClick={() => handleCardClick(component.id)}
              index={index}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredComponents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center border-x border-b border-foreground/10">
            <p className="text-muted-foreground text-lg">No components found matching your criteria.</p>
            <button 
              onClick={() => {
                setActiveFilter('all')
                setSearchQuery('')
              }}
              className="mt-4 text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* See More Button */}
        {filteredComponents.length > 0 && (
          <div className="flex justify-center py-8 border-x border-b border-foreground/10">
            <button 
              onClick={() => navigate('/components')}
              className="flex items-center gap-2 px-6 py-3 border border-foreground/10 rounded text-foreground hover:text-foreground/70 transition-colors duration-200"
            >
              <span className="text-sm font-medium">See More</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default GalleryContainer

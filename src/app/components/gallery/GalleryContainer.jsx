import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import FilterNav from './FilterNav'
import ComponentCard from './ComponentCard'
import { componentsMetadata, getFilteredComponentKeys } from '../../../library/data/componentsMetadata'

const ITEMS_PER_PAGE = 9

const GalleryContainer = () => {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

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

  // Get visible components based on pagination
  const visibleComponents = useMemo(() => {
    return filteredComponents.slice(0, visibleCount)
  }, [filteredComponents, visibleCount])

  // Check if there are more items to load
  const hasMore = visibleCount < filteredComponents.length

  // Handle load more
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE)
  }

  // Reset pagination when filter changes
  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
    setVisibleCount(ITEMS_PER_PAGE)
  }

  // Reset pagination when search changes
  const handleSearchChange = (query) => {
    setSearchQuery(query)
    setVisibleCount(ITEMS_PER_PAGE)
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
      <div className="max-w-[1200px] mx-auto border-x-[1px] border-foreground/10">
        {/* Filter Navigation */}
        <FilterNav 
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {visibleComponents.map((component, index) => (
            <ComponentCard
              key={component.id}
              id={component.id}
              name={component.name}
              category={getCategoryLabel(component.category)}
              isNew={component.newComponent}
              onClick={() => handleCardClick(component.id)}
              index={index}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredComponents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
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

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button 
              onClick={handleLoadMore}
              className="flex items-center gap-2 px-6 py-3 border border-foreground/10 rounded text-foreground hover:text-foreground transition-colors duration-200"
            >
              <span className="text-sm font-medium">Load more</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default GalleryContainer

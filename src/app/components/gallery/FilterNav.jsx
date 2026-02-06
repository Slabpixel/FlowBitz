import React from 'react'
import { Search } from 'lucide-react'

const FilterNav = ({ activeFilter, onFilterChange, searchQuery, onSearchChange }) => {
  const filters = [
    { id: 'all', label: 'All Components' },
    { id: 'text', label: 'Text' },
    { id: 'button', label: 'Button' },
    { id: 'effect', label: 'Effects' }
  ]

  return (
    <div className="flex items-center justify-between p-8">
      {/* Navigation Links */}
      <nav className="flex items-center gap-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`inter-med-18 transition-colors duration-200 ${
              activeFilter === filter.id
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </nav>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-[200px] lg:w-[280px] px-4 py-2 pr-10 text-sm bg-foreground/5 border border-foreground/10 rounded-[2px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors duration-200"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  )
}

export default FilterNav

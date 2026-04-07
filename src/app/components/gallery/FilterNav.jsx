import React from "react";
import { Search } from "lucide-react";

const FilterNav = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  showAll = false,
  className,
}) => {
  const filters = [
    ...(showAll ? [{ id: "all", label: "All Components" }] : []),
    { id: "text", label: "Text" },
    { id: "button", label: "Button" },
    { id: "effect", label: "Effects" },
    { id: "background", label: "Background" },
  ];

  return (
    <div
      className={`flex flex-col md:flex-row items-stretch justify-between px-2 pt-2 pb-[2.375rem] ${className}`}
    >
      {/* Navigation Links */}
      <nav className="flex items-center justify-center lg:justify-start gap-4 lg:gap-6 py-[0.875rem] lg:py-0 order-2 lg:order-1">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() =>
              onFilterChange(
                showAll
                  ? filter.id
                  : activeFilter === filter.id
                    ? "all"
                    : filter.id,
              )
            }
            className={`inter-med-18 transition-colors duration-200 ${
              activeFilter === filter.id
                ? "text-foreground"
                : "text-foreground/50 hover:text-foreground"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </nav>

      {/* Search Bar */}
      <div className="relative order-1 lg:order-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full lg:w-[280px] px-4 py-2 pr-10 text-sm bg-foreground/5 rounded-[2px] text-foreground placeholder:text-foreground/60 focus:outline-none focus:border-foreground/80 transition-colors duration-200"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground" />
      </div>
    </div>
  );
};

export default FilterNav;

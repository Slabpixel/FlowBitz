import React from 'react'
import PreviewRenderer from './PreviewRenderer'

const ComponentCard = ({ id, name, category, isNew, onClick, index }) => {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer border border-foreground/10 transition-all duration-300 hover:border-foreground/30 hover:scale-[1.02] hover:z-10"
      style={{
        // Stagger animation delay based on index
        animationDelay: `${index * 50}ms`
      }}
    >
      {/* Preview Area */}
      <div className="h-[200px] bg-[#111111] flex items-center justify-center overflow-hidden">
        <PreviewRenderer componentId={id} componentName={name} />
      </div>

      {/* Metadata Area */}
      <div className="bg-transparent px-4 py-4 border-t border-foreground/10">
        <div className="flex items-center gap-2">
          <h3 className="text-foreground font-semibold text-sm">{name}</h3>
          {isNew && (
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-primary text-white rounded-full">
              NEW
            </span>
          )}
        </div>
        <p className="text-muted-foreground text-xs mt-1">{category}</p>
      </div>
    </div>
  )
}

export default ComponentCard

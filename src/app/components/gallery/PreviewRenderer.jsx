import React from 'react'

/**
 * PreviewRenderer - Renders placeholder previews for each component type
 * This can be extended later to render actual live component demos
 */
const PreviewRenderer = ({ componentId, componentName }) => {
  // Map component IDs to their preview styles
  const getPreviewContent = () => {
    switch (componentId) {
      case 'split-text':
        return (
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground">Split</span>
            <span className="text-3xl font-bold text-foreground/60">Text</span>
            <span className="text-3xl font-bold text-foreground/30">Effect</span>
          </div>
        )

      case 'gradient-text':
        return (
          <span className="text-3xl font-bold bg-gradient-to-r from-[#40ffaa] via-[#4079ff] to-[#40ffaa] bg-clip-text text-transparent">
            Gradient
          </span>
        )

      case 'text-type':
        return (
          <div className="flex items-center">
            <span className="text-2xl font-medium text-foreground">Typing text</span>
            <span className="w-0.5 h-8 bg-foreground ml-1 animate-pulse" />
          </div>
        )

      case 'blur-text':
        return (
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">Blur</span>
            <span className="text-lg text-muted-foreground">to</span>
            <span className="text-3xl font-bold text-foreground/40 blur-[2px]">Clear</span>
          </div>
        )

      case 'shiny-text':
        return (
          <span className="text-3xl font-bold text-primary relative overflow-hidden">
            Shiny Text
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </span>
        )

      case 'count-up':
        return (
          <span className="text-4xl font-bold text-foreground font-mono">1,248</span>
        )

      case 'decrypted-text':
        return (
          <span className="text-2xl font-mono text-foreground tracking-wider">D3CR¥PT€D</span>
        )

      case 'scramble-text':
        return (
          <span className="text-2xl font-mono text-foreground">Scr@mbl3</span>
        )

      case 'variable-proximity':
        return (
          <span className="text-3xl text-foreground" style={{ fontWeight: 300 }}>Variable</span>
        )

      case 'rotating-text':
        return (
          <div className="flex items-center gap-2">
            <span className="text-2xl text-foreground">I am</span>
            <span className="text-2xl font-bold text-primary bg-primary/10 px-2 py-1 rounded">Creative</span>
          </div>
        )

      case 'text-pressure':
        return (
          <span className="text-4xl font-black text-foreground tracking-tight">PRESSURE</span>
        )

      case 'shuffle':
        return (
          <span className="text-3xl font-bold text-foreground">Shuffle</span>
        )

      case 'tooltip-text':
        return (
          <div className="relative">
            <span className="text-2xl text-primary underline decoration-dotted">Hover me</span>
          </div>
        )

      case 'roll-text':
        return (
          <span className="text-2xl font-medium text-foreground">Roll Text</span>
        )

      case 'gradient-button':
        return (
          <button className="px-6 py-2 rounded-md text-white font-medium bg-gradient-to-r from-[#40ffaa] via-[#4079ff] to-[#40ffaa] bg-[length:200%_auto]">
            Gradient
          </button>
        )

      case 'ripple-button':
        return (
          <button className="px-6 py-2 rounded-md bg-primary text-white font-medium">
            Ripple
          </button>
        )

      case 'pulse-button':
        return (
          <button className="px-6 py-2 rounded-md bg-primary text-white font-medium animate-pulse">
            Pulse
          </button>
        )

      case 'magnetic-button':
        return (
          <button className="px-6 py-2 rounded-md bg-foreground text-background font-medium">
            Magnetic
          </button>
        )

      case 'shimmer-button':
        return (
          <button className="px-6 py-2 rounded-md bg-primary text-white font-medium relative overflow-hidden">
            Shimmer
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full" />
          </button>
        )

      case 'smart-animate':
        return (
          <div className="flex flex-col gap-2 p-4 bg-card/50 rounded-lg border border-border max-w-[200px]">
            <div className="text-sm font-semibold text-foreground">Lightning Fast</div>
            <div className="text-xs text-muted-foreground line-clamp-2">Experience blazing fast performance with our optimized components.</div>
            <div className="w-full h-6 bg-primary/20 rounded text-[10px] flex items-center justify-center text-primary">Get Started</div>
          </div>
        )

      case '3d-card-hover':
        return (
          <div className="w-[120px] h-[80px] bg-card rounded-lg border border-border flex items-center justify-center shadow-lg transform perspective-800">
            <span className="text-xs text-muted-foreground">3D Card</span>
          </div>
        )

      case 'outline-gradient':
        return (
          <div className="w-[140px] h-[80px] rounded-xl flex items-center justify-center relative" style={{
            background: 'linear-gradient(#111, #111) padding-box, linear-gradient(90deg, #833AB4, #FD1D1D, #FCB045) border-box',
            border: '2px solid transparent'
          }}>
            <span className="text-sm font-bold text-foreground">Gradient<br/>Border</span>
          </div>
        )

      case 'image-trail':
        return (
          <div className="text-sm text-muted-foreground">Image Trail Effect</div>
        )

      case 'hover-zoom':
        return (
          <div className="w-[140px] h-[90px] rounded overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop" 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
          </div>
        )

      default:
        return (
          <span className="text-2xl font-medium text-foreground">{componentName}</span>
        )
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {getPreviewContent()}
    </div>
  )
}

export default PreviewRenderer

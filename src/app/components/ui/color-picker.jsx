import * as React from "react"
import { cn } from "../../../shared/lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

// Helper functions for color conversion
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

const rgbToHsv = (r, g, b) => {
  r /= 255
  g /= 255
  b /= 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min
  
  let h = 0
  if (diff !== 0) {
    if (max === r) h = ((g - b) / diff) % 6
    else if (max === g) h = (b - r) / diff + 2
    else h = (r - g) / diff + 4
  }
  h = Math.round(h * 60)
  if (h < 0) h += 360
  
  const s = max === 0 ? 0 : diff / max
  const v = max
  
  return { h, s: Math.round(s * 100), v: Math.round(v * 100) }
}

const hsvToRgb = (h, s, v) => {
  s /= 100
  v /= 100
  
  const c = v * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = v - c
  
  let r, g, b
  if (h >= 0 && h < 60) [r, g, b] = [c, x, 0]
  else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0]
  else if (h >= 120 && h < 180) [r, g, b] = [0, c, x]
  else if (h >= 180 && h < 240) [r, g, b] = [0, x, c]
  else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  }
}

const ColorPicker = React.forwardRef(({ 
  className, 
  value, 
  onChange, 
  disabled = false,
  ...props 
}, ref) => {
  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState(() => {
    const rgb = hexToRgb(value || '#000000')
    return rgb ? rgbToHsv(rgb.r, rgb.g, rgb.b) : { h: 0, s: 0, v: 100 }
  })
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragType, setDragType] = React.useState(null)
  const colorAreaRef = React.useRef(null)
  const hueSliderRef = React.useRef(null)

  // Update color when value prop changes
  React.useEffect(() => {
    const rgb = hexToRgb(value || '#000000')
    if (rgb) {
      setColor(rgbToHsv(rgb.r, rgb.g, rgb.b))
    }
  }, [value])

  const updateColor = (newColor) => {
    setColor(newColor)
    const rgb = hsvToRgb(newColor.h, newColor.s, newColor.v)
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
    onChange?.(hex)
  }

  const handleColorAreaMouseDown = (e) => {
    if (disabled) return
    e.preventDefault() // Prevent text selection
    setIsDragging(true)
    setDragType('color')
    handleColorAreaMouseMove(e)
  }

  const handleColorAreaMouseMove = (e) => {
    if (!isDragging || dragType !== 'color' || !colorAreaRef.current) return
    
    e.preventDefault() // Prevent text selection during drag
    const rect = colorAreaRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    
    updateColor({
      ...color,
      s: Math.round(x * 100),
      v: Math.round((1 - y) * 100)
    })
  }

  const handleHueSliderMouseDown = (e) => {
    if (disabled) return
    e.preventDefault() // Prevent text selection
    setIsDragging(true)
    setDragType('hue')
    handleHueSliderMouseMove(e)
  }

  const handleHueSliderMouseMove = (e) => {
    if (!isDragging || dragType !== 'hue' || !hueSliderRef.current) return
    
    e.preventDefault() // Prevent text selection during drag
    const rect = hueSliderRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    
    updateColor({
      ...color,
      h: Math.round(x * 360)
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDragType(null)
  }

  const handleRgbChange = (component, value) => {
    if (disabled) return
    const numValue = Math.max(0, Math.min(255, parseInt(value) || 0))
    const rgb = hexToRgb(color.hex || '#000000')
    if (!rgb) return
    
    const newRgb = { ...rgb, [component]: numValue }
    const newHsv = rgbToHsv(newRgb.r, newRgb.g, newRgb.b)
    updateColor(newHsv)
  }

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', dragType === 'color' ? handleColorAreaMouseMove : handleHueSliderMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', dragType === 'color' ? handleColorAreaMouseMove : handleHueSliderMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragType])

  const currentRgb = hsvToRgb(color.h, color.s, color.v)
  const currentHex = rgbToHex(currentRgb.r, currentRgb.g, currentRgb.b)

  return (
    <div className={cn("flex items-center space-x-2", className)} ref={ref} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            disabled={disabled}
            className="w-10 h-8 p-0 border border-border rounded-md hover:bg-accent"
          >
            <div 
              className="w-full h-full rounded-sm"
              style={{ backgroundColor: currentHex }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-2 rounded-lg" align="start">
          <div className="space-y-4">
            {/* Color Area */}
            <div className="relative">
              <div
                ref={colorAreaRef}
                className="w-full h-48 rounded-md cursor-crosshair relative overflow-hidden select-none"
                style={{
                  background: `hsl(${color.h}, 100%, 50%)`
                }}
                onMouseDown={handleColorAreaMouseDown}
              >
                {/* White to transparent gradient (saturation) */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to right, white, transparent)'
                  }}
                />
                {/* Black to transparent gradient (brightness) */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, black, transparent)'
                  }}
                />
                <div
                  className="absolute w-3 h-3 border-2 border-white rounded-full shadow-lg pointer-events-none z-10"
                  style={{
                    left: `${color.s}%`,
                    top: `${100 - color.v}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </div>
            </div>

            {/* Hue Slider */}
            <div className="relative">
              <div
                ref={hueSliderRef}
                className="w-full h-4 rounded-md cursor-pointer relative select-none"
                style={{
                  background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
                }}
                onMouseDown={handleHueSliderMouseDown}
              >
                <div
                  className="absolute w-3 h-3 border-2 border-white rounded-full shadow-lg pointer-events-none top-1/2 transform -translate-y-1/2"
                  style={{
                    left: `${(color.h / 360) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </div>
            </div>

            {/* RGB Inputs */}
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground block mb-1">R</label>
                <Input
                  type="number"
                  value={currentRgb.r}
                  onChange={(e) => handleRgbChange('r', e.target.value)}
                  disabled={disabled}
                  className="h-8 text-xs"
                  min="0"
                  max="255"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground block mb-1">G</label>
                <Input
                  type="number"
                  value={currentRgb.g}
                  onChange={(e) => handleRgbChange('g', e.target.value)}
                  disabled={disabled}
                  className="h-8 text-xs"
                  min="0"
                  max="255"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground block mb-1">B</label>
                <Input
                  type="number"
                  value={currentRgb.b}
                  onChange={(e) => handleRgbChange('b', e.target.value)}
                  disabled={disabled}
                  className="h-8 text-xs"
                  min="0"
                  max="255"
                />
              </div>
            </div>

            {/* Hex Input */}
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Hex</label>
              <Input
                type="text"
                value={currentHex}
                onChange={(e) => {
                  if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                    const rgb = hexToRgb(e.target.value)
                    if (rgb) {
                      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
                      updateColor(hsv)
                    }
                  }
                }}
                disabled={disabled}
                className="h-8 text-xs font-mono"
                placeholder="#000000"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      <Input
        type="text"
        value={currentHex}
        onChange={(e) => {
          if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
            const rgb = hexToRgb(e.target.value)
            if (rgb) {
              const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
              updateColor(hsv)
            }
          }
        }}
        disabled={disabled}
        className="flex-1 h-8 text-xs font-mono"
        placeholder="#000000"
      />
    </div>
  )
})

ColorPicker.displayName = "ColorPicker"

export { ColorPicker }

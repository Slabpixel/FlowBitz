import React from 'react'
import { Label } from '../ui/label.jsx'
import { Switch } from '../ui/switch.jsx'
import { Slider } from '../ui/slider.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select.jsx'
import { Input } from '../ui/input.jsx'
import { Badge } from '../ui/badge.jsx'
import { ColorPicker } from '../ui/color-picker.jsx'
import { Info, HelpCircle } from 'lucide-react'

/* ═══════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════ */

/** Convert "wb-split-type" → "Split Type" */
const formatAttributeName = (attrName) => {
  return attrName
    .replace(/^wb-/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const getInputType = (attr) => attr.inputType || 'text'
const getDropdownOptions = (attr) => attr.options || [attr.default]
const getSliderConfig = (attr) => attr.sliderConfig || { min: 0, max: 100, step: 1 }

/* ═══════════════════════════════════════════════════════
   ConfigSidebar Component
   ═══════════════════════════════════════════════════════ */

const ConfigSidebar = ({
  component,
  activeAttributes,
  attributeValues,
  onToggleAttribute,
  onChangeValue,
}) => {
  if (!component) return null

  /* ─── Render individual input control ─── */
  const renderInputControl = (attr) => {
    const inputType = getInputType(attr)
    const currentValue = attributeValues[attr.name] || attr.default
    const isRequired = attr.required || attr.name === 'wb-component'
    const isActive = activeAttributes[attr.name] || false

    const handleValueChange = (newValue) => {
      onChangeValue(attr.name, newValue)
    }

    switch (inputType) {
      case 'toggle':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={currentValue === 'true' || currentValue === true}
              disabled={isRequired || !isActive}
              onCheckedChange={(checked) => handleValueChange(checked ? 'true' : 'false')}
            />
            <Label className="text-xs text-muted-foreground">
              {currentValue === 'true' || currentValue === true ? 'True' : 'False'}
            </Label>
          </div>
        )

      case 'color':
        return (
          <ColorPicker
            value={currentValue.replace(/['"]/g, '')}
            onChange={handleValueChange}
            disabled={isRequired || !isActive}
            supportsAlpha={attr.supportsAlpha || false}
            className="w-full"
          />
        )

      case 'slider': {
        const sliderConfig = getSliderConfig(attr)
        const sliderValue = [parseFloat(currentValue) || 0]

        return (
          <div className="flex items-center space-x-3">
            <Slider
              value={sliderValue}
              onValueChange={(value) => handleValueChange(value[0].toString())}
              min={sliderConfig.min}
              max={sliderConfig.max}
              step={sliderConfig.step}
              disabled={isRequired || !isActive}
              className="flex-1"
            />
            <Badge variant="secondary" className="font-mono min-w-[42px] text-center text-xs">
              {currentValue}
            </Badge>
          </div>
        )
      }

      case 'dropdown': {
        const options = getDropdownOptions(attr)
        return (
          <Select
            value={currentValue}
            onValueChange={handleValueChange}
            disabled={isRequired || !isActive}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      }

      case 'text':
      default:
        return (
          <Input
            type="text"
            value={currentValue}
            disabled={isRequired || !isActive}
            onChange={(e) => handleValueChange(e.target.value)}
            className="h-8 text-xs"
          />
        )
    }
  }

  return (
    <aside className="w-full lg:max-w-[330px] lg:min-w-[330px] bg-background lg:overflow-y-auto lg:h-[calc(100vh-4.5rem)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-background hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30">
      <div className="px-4 pb-4 flex flex-col gap-4">

        {/* ── Installation Notes ── */}
        {component.installationNotes && (
          <section>
            <h2 className="text-heading-small text-foreground flex items-center" style={{lineHeight: '240%'}}>
              Installation Notes
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {component.installationNotes}
            </p>
          </section>
        )}

        <div className="border-b border-foreground/10" />

        {/* ── Attribute Editor ── */}
        <section>
          <h2 className="text-heading-small text-foreground flex items-center" style={{lineHeight: '240%'}}>
            Attribute Editor
          </h2>

          <div className="flex flex-col gap-4">
            {component.attributes.map((attr, index) => {
              const isRequired = attr.required || attr.name === 'wb-component'
              const isActive = activeAttributes[attr.name] || false

              return (
                <div
                  key={index}
                  className={`rounded-lg border p-3 transition-all duration-200 ${
                    isRequired
                      ? 'border-primary/30 bg-primary/5'
                      : isActive
                        ? 'border-primary/20 bg-primary/5'
                        : 'border-border bg-background/50'
                  }`}
                >
                  {/* Label row: name + badge + toggle */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Label className="text-xs font-medium text-foreground truncate">
                        {formatAttributeName(attr.name)}
                      </Label>
                      {isRequired && (
                        <span className="shrink-0 text-white text-[10px] font-semibold rounded-sm px-1.5 py-0.5 bg-primary leading-none">
                          Required
                        </span>
                      )}
                      {/* Info tooltip via title */}
                      {attr.description && !isRequired && (
                        <HelpCircle
                          className="w-3 h-3 text-muted-foreground/50 shrink-0 cursor-help"
                          title={attr.description}
                        />
                      )}
                    </div>

                    {!isRequired && (
                      <Switch
                        checked={isActive}
                        onCheckedChange={(checked) => onToggleAttribute(attr.name, checked)}
                        className="shrink-0 ml-2"
                      />
                    )}
                  </div>

                  {/* Control */}
                  <div className={`transition-opacity duration-200 ${
                    !isActive ? 'opacity-40 pointer-events-none' : ''
                  }`}>
                    {renderInputControl(attr)}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <div className='flex flex-col gap-4 p-6 bg-base-medium rounded'>
          <h4 className='text-heading-small text-foreground'>Found an Issue or Have a Suggestion?</h4>

          <p className='text-paragraph text-foreground/60'>Help us improve this component by reporting bugs or requesting new features.</p>
        </div>
      </div>
    </aside>
  )
}

export default ConfigSidebar

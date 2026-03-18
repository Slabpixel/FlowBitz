import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Label } from '../ui/label.jsx'
import { Switch } from '../ui/switch.jsx'
import { Slider } from '../ui/slider.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select.jsx'
import { Input } from '../ui/input.jsx'
import { Badge } from '../ui/badge.jsx'
import { ColorControl } from '../ui/colorControl.jsx'
import { Button } from '../ui/button.jsx'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

/** Parse installationNotes: style HTML tag references as inline code */
const renderInstallationNotes = (text) => {
  const parts = text.split(/(<[a-zA-Z][a-zA-Z0-9]*(?:\s[^>]*)?>)/g)
  return parts.map((part, index) => {
    if (/^<[a-zA-Z][a-zA-Z0-9]*(?:\s[^>]*)?>$/.test(part)) {
      return (
        <code
          key={index}
          className="px-1 py-0.5 rounded bg-base-high text-foreground mono-med-12"
        >
          {part}
        </code>
      )
    }
    return part
  })
}

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

  const componentName = component.name.toLowerCase().replace(/ /g, '-');
  const navigate = useNavigate();

  const handleBugReport = () => {
    navigate(`/contact?tab=report&component=${componentName}`)
  }

  const handleFeatureRequest = () => {
    navigate(`/contact?tab=feature&component=${componentName}`)
  }

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
          <ColorControl
            value={currentValue.replace(/['"]/g, '')}
            onChange={handleValueChange}
            disabled={isRequired || !isActive}
            supportsAlpha={attr.supportsAlpha || false}
            multiple={attr.multiple || false}
          />
        )

      case 'slider': {
        const sliderConfig = getSliderConfig(attr)
        const sliderValue = [parseFloat(currentValue) || 0]
        const sliderUnit = attr.unit || '';

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
            <Badge variant="secondary" className="flex flex-col items-center justify-center text-link text-foreground min-w-[93px] text-center">
              {currentValue}{sliderUnit}
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
            <SelectTrigger>
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
            className="text-link text-text-medium"
          />
        )
    }
  }

  return (
    <aside className="lg:w-full mx-4 my-4 px-0 py-0 max-w-none w-auto lg:max-w-[300px] lg:min-w-[300px] bg-background lg:overflow-y-auto lg:h-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-background hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30">
      <div className="flex flex-col gap-4 px-0 py-0">

        {/* ── Installation Notes ── */}
        {component.installationNotes && (
          <>
            {/* Desktop */}
            <section className="hidden md:block">
              <h2 className="text-heading-small text-foreground flex items-center" style={{lineHeight: '240%'}}>
                Installation Notes
              </h2>
              <p className="text-paragraph text-foreground">
                {renderInstallationNotes(component.installationNotes)}
              </p>
            </section>

            {/* Mobile / Tablet */}
            <Accordion type="single" collapsible className="md:hidden">
              <AccordionItem value="installation-notes" className="px-2">
                <AccordionTrigger className='py-3'>
                  <h2 className="text-heading-small text-foreground">
                    Installation Notes
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="px-0">
                  <p className="text-paragraph text-foreground">
                    {renderInstallationNotes(component.installationNotes)}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}

        <div className="border-b border-foreground/10" />

        {/* ── Attribute Editor ── */}
        <section className='pb-6 px-2 md:px-0'>
          <h2 className="text-heading-small text-foreground flex items-center" style={{lineHeight: '240%'}}>
            Attribute Editor
          </h2>

          <div className="flex flex-col gap-2">
            {component.attributes.map((attr, index, {length}) => {
              const isRequired = attr.required || attr.name === 'wb-component'
              const isActive = activeAttributes[attr.name] || false
              const lastItem = length - 1 === index ? true : false;

              return (
                <>
                  <div
                    key={index}
                    className='pb-2'
                  >
                    {/* Label row: switch (left) + name + badge + info tooltip */}
                    <div className="flex items-center py-3 gap-2">
                      {!isRequired ? (
                        <Switch
                          checked={isActive}
                          onCheckedChange={(checked) => onToggleAttribute(attr.name, checked)}
                          className="shrink-0"
                        />
                      ) : null}
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Label className="text-link font-medium text-foreground">
                          {formatAttributeName(attr.name)}
                        </Label>
                        {isRequired && (
                          <span className="rounded px-[0.3125rem] py-[0.225rem] text-[9px] font-bold uppercase text-foreground flex items-center justify-center bg-primary">
                            Required
                          </span>
                        )}
                        {attr.description && !isRequired && (
                          <span className="relative group">
                            <FontAwesomeIcon icon={['fas', 'info-circle']} className="w-3 h-3 text-textLow cursor-pointer" />
                            <div className="absolute min-w-[200px] top-7 -left-6 transform mb-2 px-[0.625rem] py-2 text-tooltip text-background bg-foreground rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                              {attr.description}
                            </div>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Control */}
                    <div className={`transition-opacity duration-200 ${
                      !isActive ? 'opacity-40 pointer-events-none' : ''
                    }`}>
                      {renderInputControl(attr)}
                    </div>
                  </div>

                  {lastItem ? '' : (<div className='h-[1px] w-full bg-foreground/10' />)}
                </>
              )
            })}
          </div>
        </section>

        <div className='relative flex flex-col gap-4 px-4 py-6 md:p-6 bg-base-medium rounded overflow-hidden'>
          <h4 className='relative z-[2] text-heading-small text-foreground'>Found an Issue or Have a Suggestion?</h4>

          <p className='relative z-[2] text-paragraph text-foreground/60'>Help us improve this component by reporting bugs or requesting new features.</p>

          <div className='relative z-[2] flex md:flex-col gap-2 items-start justify-start'>
            <Button 
              onClick={handleBugReport}
              variant="custom"
              size="custom"
              className="flex items-center gap-2 px-3 py-[0.625rem] rounded-lg bg-background border border-foreground/10 text-link font-medium"
            >
              <FontAwesomeIcon icon={['far', 'bug']} className='w-4 h-4 opacity-60'/>
              Report Bug
            </Button>

            <Button 
              onClick={handleFeatureRequest}
              variant="custom"
              size="custom"
              className="flex items-center gap-2 px-3 py-[0.625rem] rounded-lg bg-background border border-foreground/10 text-link font-medium"
            >
              <FontAwesomeIcon icon={['far', 'sparkle']} className='w-4 h-4 opacity-60'/>
              Request Feature
            </Button>
          </div>

          <img 
            src="/images/component-report-gradient.webp"
            alt=""
            aria-hidden="true"
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] object-cover z-[1] pointer-events-none`}
            loading='lazy'
          />
        </div>
      </div>
    </aside>
  )
}

export default ConfigSidebar

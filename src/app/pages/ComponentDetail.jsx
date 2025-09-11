import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getComponent } from '../../library/data/componentsMetadata.js'
import Sidebar from '../components/layout/Sidebar.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.jsx'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Label } from '../components/ui/label.jsx'
import { Switch } from '../components/ui/switch.jsx'
import { Slider } from '../components/ui/slider.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx'
import { Input } from '../components/ui/input.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { ColorPicker } from '../components/ui/color-picker.jsx'
import { Eye, Code, Copy, RotateCcw, Settings, Palette, Sliders } from 'lucide-react'
import { useWebflowBits } from '../hooks/useWebflowBits'

// Syntax highlighting function
const highlightCode = (code) => {
  // First escape HTML entities to prevent rendering
  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
  
  // Use a single comprehensive regex to avoid conflicts
  highlighted = highlighted.replace(/(&lt;!--[\s\S]*?--&gt;)|(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)([\s\S]*?)(&gt;?)|(\s)([a-zA-Z-]+)(=)(&quot;[^&]*&quot;|&#39;[^&]*&#39;)|(\b(function|const|let|var|if|else|for|while|return|true|false|null|undefined|new|this|class|extends|import|export|from|default)\b)|(\/\/.*$|\/\*[\s\S]*?\*\/)|(\b\d+\.?\d*\b)/g, (match, comment, openTag, tagName, tagContent, closeTag, attrSpace, attrName, attrEquals, attrValue, keyword, jsComment, number) => {
    if (comment) {
      return `<span class="text-gray-500 italic">${comment}</span>`
    }
    if (openTag && tagName) {
      const highlightedContent = tagContent.replace(/(\s)([a-zA-Z-]+)(=)(&quot;[^&]*&quot;|&#39;[^&]*&#39;)/g, 
        '<span class="text-gray-300">&nbsp;</span><span class="text-yellow-300">$2</span><span class="text-gray-300">$3</span><span class="text-green-400">$4</span>')
      const closeTagSpan = closeTag ? `<span class="text-primary">${closeTag}</span>` : ''
      return `<span class="text-primary">${openTag}</span><span class="text-orange-400">${tagName}</span>${highlightedContent}${closeTagSpan}`
    }
    if (attrSpace && attrName && attrEquals && attrValue) {
      return `<span class="text-gray-300">&nbsp;</span><span class="text-yellow-300">${attrName}</span><span class="text-gray-300">${attrEquals}</span><span class="text-green-400">${attrValue}</span>`
    }
    if (keyword) {
      return `<span class="text-white">${keyword}</span>`
    }
    if (jsComment) {
      return `<span class="text-gray-500 italic">${jsComment}</span>`
    }
    if (number) {
      return `<span class="text-orange-300">${number}</span>`
    }
    return match
  })
  
  return highlighted
}

const ComponentDetail = () => {
  const { componentName } = useParams()
  const [activeTab, setActiveTab] = useState('preview')
  const [reloadKey, setReloadKey] = useState(0)
  const [copyStates, setCopyStates] = useState({})
  const [activeAttributes, setActiveAttributes] = useState({})
  const [attributeValues, setAttributeValues] = useState({})
  const { reinitializeComponents } = useWebflowBits()
  
  // Get component metadata
  const component = getComponent(componentName)
  
  // Initialize active attributes and values based on example code
  useEffect(() => {
    const initialAttributes = {}
    const initialValues = {}
    
    component.attributes.forEach(attr => {
      if (attr.name === 'wb-component') {
        initialAttributes[attr.name] = true
        initialValues[attr.name] = attr.default
      } else {
        const isInExample = component.example.code.includes(attr.name)
        initialAttributes[attr.name] = isInExample
        
        // Extract value from example code if present, otherwise use default
        if (isInExample) {
          const valueMatch = component.example.code.match(new RegExp(`${attr.name}="([^"]*)"`))
          initialValues[attr.name] = valueMatch ? valueMatch[1] : attr.default
        } else {
          initialValues[attr.name] = attr.default
        }
      }
    })
    
    setActiveAttributes(initialAttributes)
    setAttributeValues(initialValues)
  }, [component])

  // Refresh components when active attributes or values change
  useEffect(() => {
    if (Object.keys(activeAttributes).length > 0) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        reinitializeComponents()
      }, 100)
    }
  }, [activeAttributes, attributeValues, reinitializeComponents])

  const reloadPreview = () => {
    setReloadKey(prev => prev + 1)
    // Refresh components after reload
    setTimeout(() => {
      reinitializeComponents()
    }, 100)
  }

  // Generate updated HTML code based on active attributes and values
  const generateUpdatedCode = () => {
    const baseCode = component.example.code
    const tagMatch = baseCode.match(/<(\w+)([^>]*)>(.*?)<\/\1>/)
    
    if (!tagMatch) return baseCode
    
    const [, tagName, existingAttrs, content] = tagMatch
    const activeAttrList = []
    
    // Add active attributes with their current values
    component.attributes.forEach(attr => {
      if (activeAttributes[attr.name]) {
        const value = attributeValues[attr.name] || attr.default || 'true'
        activeAttrList.push(`${attr.name}="${value}"`)
      }
    })
    
    const attributesString = activeAttrList.length > 0 ? ' ' + activeAttrList.join(' ') : ''
    return `<${tagName}${attributesString}>${content}</${tagName}>`
  }

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyStates(prev => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopyStates(prev => ({ ...prev, [key]: false }))
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const copyCode = (button) => {
    const codeBlock = button.nextElementSibling
    const code = codeBlock.textContent || codeBlock.innerText
    
    navigator.clipboard.writeText(code).then(() => {
      const originalText = button.innerHTML
      button.innerHTML = '<Copy className="w-4 h-4" />Copied!'
      setTimeout(() => {
        button.innerHTML = originalText
      }, 2000)
    }).catch(err => {
      console.error('Failed to copy code: ', err)
    })
  }

  // Extract wb- attributes from HTML code
  const extractWbAttributes = (htmlCode) => {
    const wbAttributes = []
    const wbRegex = /wb-[\w-]+(?:="[^"]*")?/g
    let match
    
    while ((match = wbRegex.exec(htmlCode)) !== null) {
      const fullAttribute = match[0]
      const [name, value] = fullAttribute.split('=')
      wbAttributes.push({
        name: name,
        value: value ? value.replace(/"/g, '') : null
      })
    }
    
    return wbAttributes
  }

  // Get input type from metadata (with fallback to auto-detection)
  const getInputType = (attr) => {
    return attr.inputType || 'text'
  }

  // Get dropdown options from metadata
  const getDropdownOptions = (attr) => {
    return attr.options || [attr.default]
  }

  // Get slider configuration from metadata
  const getSliderConfig = (attr) => {
    return attr.sliderConfig || { min: 0, max: 100, step: 1 }
  }

  // Convert attribute name to display format
  const formatAttributeName = (attrName) => {
    // Remove 'wb-' prefix and convert kebab-case to Title Case
    return attrName
      .replace(/^wb-/, '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Render input control based on attribute type
  const renderInputControl = (attr) => {
    const inputType = getInputType(attr)
    const currentValue = attributeValues[attr.name] || attr.default
    const isRequired = attr.required || attr.name === 'wb-component'
    const isActive = activeAttributes[attr.name] || false

    const handleValueChange = (newValue) => {
      setAttributeValues(prev => ({
        ...prev,
        [attr.name]: newValue
      }))
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
            <Label className="text-sm text-muted-foreground">
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
            className="w-full"
          />
        )

      case 'slider':
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
            <Badge variant="secondary" className="font-mono min-w-[50px] text-center">
              {currentValue}
            </Badge>
          </div>
        )

      case 'dropdown':
        const options = getDropdownOptions(attr)
        return (
          <Select
            value={currentValue}
            onValueChange={handleValueChange}
            disabled={isRequired || !isActive}
          >
            <SelectTrigger className="h-8">
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

      case 'text':
      default:
        return (
          <Input
            type="text"
            value={currentValue}
            disabled={isRequired || !isActive}
            onChange={(e) => handleValueChange(e.target.value)}
            className="h-8"
          />
        )
    }
  }

  const renderPreviewContent = () => {
    const currentCode = generateUpdatedCode()
    const wbAttributes = extractWbAttributes(currentCode)
    
    return (
      <div className="space-y-4">
        {/* Preview */}
        <div className="relative bg-muted/50 rounded-lg p-12 overflow-hidden border border-border min-h-[470px] flex items-center justify-center">
          <Button 
            variant="outline" 
            size="sm"
            className="absolute top-4 right-4 bg-background border-border text-foreground hover:bg-accent z-10" 
            onClick={reloadPreview}
            title="Reload animation"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          {/* Attributes Pills - Bottom Left */}
          {wbAttributes.length > 0 && (
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-10">
              {wbAttributes.map((attr, attrIndex) => (
                <span
                  key={attrIndex}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-background/90 backdrop-blur-sm text-foreground border border-border/50 shadow-sm"
                >
                  {attr.name}
                  {attr.value && (
                    <span className="ml-1 text-muted-foreground">= {attr.value}</span>
                  )}
                </span>
              ))}
            </div>
          )}
          
          <div key={reloadKey} className="text-center [&_*]:text-6xl [&_*]:font-medium" dangerouslySetInnerHTML={{ __html: currentCode }} />
        </div>
        
        {/* Attribute Editor */}
        <Card className="!border-border">
          <CardHeader className="space-y-4">
            <CardTitle>Attribute Editor</CardTitle>
            <CardDescription>
              Toggle attributes on/off and adjust their values to see live updates in the preview above. The <code className="text-primary font-mono text-sm bg-accent/50 px-1 py-0.5 rounded">wb-component</code> attribute is required and cannot be disabled.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {component.attributes.map((attr, index) => {
                const isRequired = attr.required || attr.name === 'wb-component'
                const inputType = getInputType(attr)
                const isActive = activeAttributes[attr.name] || false
                
                return (
                  <div key={index} className={`flex items-center gap-4 p-3 rounded-lg border transition-all duration-200 ${
                    isRequired 
                      ? 'border-primary/30 bg-primary/5' 
                      : isActive 
                        ? 'border-primary/30 bg-primary/5' 
                        : 'border-border bg-background/50'
                  }`}>
                    {/* Toggle Switch */}
                    <div className="flex items-center gap-2 min-w-[40px]">
                      <Switch
                        checked={isActive}
                        disabled={isRequired}
                        onCheckedChange={(checked) => {
                          setActiveAttributes(prev => ({
                            ...prev,
                            [attr.name]: checked
                          }))
                        }}
                      />
                    </div>
                    
                    {/* Attribute Name */}
                    <div className={`w-full transition-opacity duration-200 ${!isActive ? 'opacity-50' : ''}`}>
                      <Label className="text-sm font-medium text-foreground">
                        {formatAttributeName(attr.name)}
                        {attr.required && <span className="text-white text-xs ml-1 rounded-sm px-[6px] py-[1px] bg-primary">Required</span>}
                      </Label>
                      <p className="text-xs text-muted-foreground">{attr.description}</p>
                    </div>
                    
                    {/* Input Control */}
                    <div className="flex-1 min-w-[320px]">
                      <div className={`space-y-1 transition-opacity duration-200 ${!isActive ? 'opacity-50 pointer-events-none' : ''}`}>
                        {renderInputControl(attr)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderInstallationContent = () => {
    return (
      <div className="space-y-4">
        <div>
          {/* Step 1: Add Script */}
          <div className="space-y-4 mb-4 p-8 card rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">1</div>
              <h4 className="text-xl font-medium text-foreground">Add FlowBits Script</h4>
            </div>
            <p className="text-muted-foreground ml-11">Add the WebflowBits script to your Webflow project's custom code section.</p>
            
            <div className="ml-11 space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Script Tag</label>
                  <div className="relative">
                    <div 
                      className="w-full bg-gray-800 dark:bg-background border border-border rounded-md px-3 py-2 pr-10 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[40px] flex items-center"
                      dangerouslySetInnerHTML={{ __html: highlightCode('<script src="https://webflow-bits.vercel.app/webflow-bits.umd.js"></script>') }}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-700" 
                      onClick={() => copyToClipboard('<script src="https://webflow-bits.vercel.app/webflow-bits.umd.js"></script>', 'scriptTag')}
                    >
                      {copyStates.scriptTag ? (
                        <span className="text-green-500 text-xs">✓</span>
                      ) : (
                        <Copy className="w-4 h-4 text-white" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="ml-11 bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-primary">
                <strong>💡 Pro Tip:</strong> Go to your Webflow project settings → Custom Code → Footer Code, and paste the script there.
              </p>
            </div>
          </div>

          {/* Step 2: Add Attributes */}
          <div className="space-y-4 mb-4 p-8 card rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">2</div>
              <h4 className="text-xl font-medium text-foreground">Add Component Attributes</h4>
            </div>
            <p className="text-muted-foreground ml-11">Add this attribute to any text element in your Webflow project.</p>
            
            <div className="ml-11 space-y-4">
              <div className="space-y-3 p-4 border border-border rounded-lg">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Attribute Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value="wb-component" 
                      readOnly 
                      className="w-full bg-background border border-border rounded-md px-3 py-2 pr-10 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent" 
                      onClick={() => copyToClipboard('wb-component', 'attributeName')}
                    >
                      {copyStates.attributeName ? (
                        <span className="text-green-500 text-xs">✓</span>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Attribute Value</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={componentName} 
                      readOnly 
                      className="w-full bg-background border border-border rounded-md px-3 py-2 pr-10 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent" 
                      onClick={() => copyToClipboard(componentName, 'attributeValue')}
                    >
                      {copyStates.attributeValue ? (
                        <span className="text-green-500 text-xs">✓</span>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="ml-11 bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-primary">
                <strong>📝 Note:</strong> In Webflow, you can add custom attributes by selecting your element, going to Element Settings → Custom Attributes, and adding the attribute name and value.
              </p>
            </div>
          </div>

          {/* Step 3: Available Attributes */}
          <div className="space-y-4 mb-4 p-8 card rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">3</div>
              <h4 className="text-xl font-medium text-foreground">Available Attributes</h4>
            </div>
            <p className="text-muted-foreground ml-11">Use these attributes to customize the animation behavior and appearance.</p>
            
            <div className="ml-11">
              <div className="overflow-hidden border border-border rounded-lg">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Attribute</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {component.attributes.map((attr, index) => (
                      <tr key={index} className="hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <code className="text-primary font-mono text-sm bg-accent px-2 py-1 rounded">{attr.name}</code>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{attr.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="ml-11 bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-primary">
                <strong>🎨 Customization:</strong> Add any of these attributes to your element to customize the animation behavior, timing, and appearance.
              </p>
            </div>
          </div>

          {/* Step 4: Publish */}
          <div className="space-y-4 mb-4 p-8 card rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">4</div>
              <h4 className="text-xl font-medium text-foreground">Publish Your Site</h4>
            </div>
            <p className="text-muted-foreground ml-11">Publish your Webflow site to see the animations in action.</p>
            
            <div className="ml-11 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>🚀 Ready to Go:</strong> Once published, your animations will work automatically. The script loads asynchronously and initializes all components on page load.
              </p>
            </div>
          </div>
        </div>

      </div>
    )
  }


  return (
    <div className="bg-background text-foreground mt-[64px]">
      <div className="flex">
        {/* Shared Sidebar */}
        <Sidebar showBackLink={false} />

        {/* Main Content */}
        <main className="flex flex-col p-16 w-full items-center">
          <div className="w-full max-w-[970px] mb-8">
            <h1 className="text-4xl font-bold mb-2 text-foreground">{component.name}</h1>
            <p className="text-muted-foreground text-lg">{component.description}</p>
          </div>

          {/* Tabs */}
          <div className="w-full max-w-[970px]">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex w-fit flex-row mb-4 bg-muted border border-border">
                <TabsTrigger value="preview" className="data-[state=active]:bg-background data-[state=active]:text-foreground flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="installation" className="data-[state=active]:bg-background data-[state=active]:text-foreground flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Installation Guide
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview">
                {renderPreviewContent()}
              </TabsContent>
              
              <TabsContent value="installation">
                {renderInstallationContent()}
              </TabsContent>
            </Tabs>
          </div>
          <div className="w-full max-w-[970px] text-center text-muted-foreground text-sm mt-12">
            Made with 💙 by <a href="https://slabpixel.com" target="_blank" rel="noopener noreferrer" className="text-primary">SlabPixel</a>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ComponentDetail

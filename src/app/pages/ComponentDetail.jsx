import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getComponent } from '../../library/data/ComponentsMetadata.js'
import Sidebar from '../components/layout/Sidebar.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.jsx'
import { Button } from '../components/ui/button.jsx'
import { Eye, Code, Copy, RotateCcw } from 'lucide-react'

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
        '<span class="text-gray-300">$1</span><span class="text-yellow-300">$2</span><span class="text-gray-300">$3</span><span class="text-green-400">$4</span>')
      const closeTagSpan = closeTag ? `<span class="text-blue-400">${closeTag}</span>` : ''
      return `<span class="text-blue-400">${openTag}</span><span class="text-orange-400">${tagName}</span>${highlightedContent}${closeTagSpan}`
    }
    if (attrSpace && attrName && attrEquals && attrValue) {
      return `<span class="text-gray-300">${attrSpace}</span><span class="text-yellow-300">${attrName}</span><span class="text-gray-300">${attrEquals}</span><span class="text-green-400">${attrValue}</span>`
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
  
  // Get component metadata
  const component = getComponent(componentName)

  const reloadPreview = () => {
    setReloadKey(prev => prev + 1)
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

  const renderPreviewContent = () => {
    return (
      <div className="space-y-8">
        {component.examples.map((example, index) => (
          <div key={index} className="space-y-6">
            {/* Title & Description */}
            <div className="space-y-2">
            <h3 className="text-3xl font-semibold text-foreground">{example.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{example.description}</p>
            </div>
            
            {/* Preview */}
            <div className="relative bg-muted/50 rounded-lg p-12 overflow-hidden border border-border min-h-[300px] flex items-center justify-center">
              <Button 
                variant="outline" 
                size="sm"
                className="absolute top-4 right-4 bg-background border-border text-foreground hover:bg-accent z-10" 
                onClick={reloadPreview}
                title="Reload animation"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <div key={reloadKey} className="text-center [&_*]:text-6xl [&_*]:font-medium" dangerouslySetInnerHTML={{ __html: example.code }} />
            </div>
            
          </div>
        ))}
      </div>
    )
  }

  const renderInstallationContent = () => {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-foreground">Installation Guide</h3>
          
          {/* Step 1: Add Script */}
          <div className="space-y-4 mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">1</div>
              <h4 className="text-xl font-medium text-foreground">Add WebflowBits Script</h4>
            </div>
            <p className="text-muted-foreground ml-11">Add the WebflowBits script to your Webflow project's custom code section.</p>
            
            <div className="ml-11 relative">
              <Button 
                variant="outline" 
                size="sm"
                className="absolute top-4 right-4 bg-background border-border text-foreground hover:bg-accent z-10" 
                onClick={(e) => copyCode(e.target)}
              >
                <Copy className="w-4 h-4" />
                Copy
              </Button>
              <pre className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6 overflow-x-auto whitespace-pre-wrap break-words border border-slate-700 dark:border-slate-600"><code className="text-slate-100 font-mono text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: highlightCode(`<!-- Add this to your Webflow project's custom code (before </body>) -->
<script src="https://webflow-bits.vercel.app/webflow-bits.umd.js"></script>
<script>
  // Initialize WebflowBits
  WebflowBits.init({
    debug: false, // Set to true for development
    autoInit: true
  });
</script>`) }}></code></pre>
            </div>
            
            <div className="ml-11 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>💡 Pro Tip:</strong> Go to your Webflow project settings → Custom Code → Footer Code, and paste the script there.
              </p>
            </div>
          </div>

          {/* Step 2: Add Attributes */}
          <div className="space-y-4 mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">2</div>
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
                      value="wb-text-animate" 
                      readOnly 
                      className="w-full bg-background border border-border rounded-md px-3 py-2 pr-10 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent" 
                      onClick={(e) => {
                        navigator.clipboard.writeText('wb-text-animate').then(() => {
                          const originalText = e.target.innerHTML
                          e.target.innerHTML = '✓'
                          setTimeout(() => {
                            e.target.innerHTML = originalText
                          }, 2000)
                        })
                      }}
                    >
                      <Copy className="w-4 h-4" />
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
                      onClick={(e) => {
                        navigator.clipboard.writeText(componentName).then(() => {
                          const originalText = e.target.innerHTML
                          e.target.innerHTML = '✓'
                          setTimeout(() => {
                            e.target.innerHTML = originalText
                          }, 2000)
                        })
                      }}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="ml-11 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>📝 Note:</strong> In Webflow, you can add custom attributes by selecting your element, going to Element Settings → Custom Attributes, and adding the attribute name and value.
              </p>
            </div>
          </div>

          {/* Step 3: Available Attributes */}
          <div className="space-y-4 mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">3</div>
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
            
            <div className="ml-11 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>🎨 Customization:</strong> Add any of these attributes to your element to customize the animation behavior, timing, and appearance.
              </p>
            </div>
          </div>

          {/* Step 4: Publish */}
          <div className="space-y-4 mb-8">
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
          <div className="max-w-6xl w-full mb-8">
            <h1 className="text-4xl font-bold mb-2 gradient-text">{component.name}</h1>
            <p className="text-muted-foreground text-lg">{component.description}</p>
          </div>

          {/* Tabs */}
          <div className="max-w-6xl w-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex w-fit flex-row mb-8 bg-muted border border-border">
                <TabsTrigger value="preview" className="data-[state=active]:bg-background data-[state=active]:text-foreground flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="installation" className="data-[state=active]:bg-background data-[state=active]:text-foreground flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Installation Guide
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="bg-card rounded-lg p-8 overflow-hidden border border-border">
                {renderPreviewContent()}
              </TabsContent>
              
              <TabsContent value="installation" className="bg-card rounded-lg p-8 overflow-hidden border border-border">
                {renderInstallationContent()}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ComponentDetail

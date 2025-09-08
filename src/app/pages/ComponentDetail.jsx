import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getComponent } from '../../library/data/ComponentsMetadata.js'
import Sidebar from '../components/layout/Sidebar.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.jsx'
import { Button } from '../components/ui/button.jsx'
import { Eye, Code, Copy } from 'lucide-react'

const ComponentDetail = () => {
  const { componentName } = useParams()
  const [activeTab, setActiveTab] = useState('preview')
  
  // Get component metadata
  const component = getComponent(componentName)

  const copyCode = (button) => {
    const codeBlock = button.nextElementSibling
    const code = codeBlock.textContent
    
    navigator.clipboard.writeText(code).then(() => {
      button.textContent = 'Copied!'
      setTimeout(() => {
        button.textContent = 'Copy'
      }, 2000)
    }).catch(err => {
      console.error('Failed to copy code: ', err)
    })
  }

  const renderPreviewContent = () => {
    return (
      <div className="space-y-8">
        {component.examples.map((example, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">{example.title}</h3>
            <div className="bg-muted/50 rounded-lg p-6 overflow-hidden border border-border">
              <div dangerouslySetInnerHTML={{ __html: example.code }} />
            </div>
            <p className="text-muted-foreground leading-relaxed">{example.description}</p>
          </div>
        ))}
      </div>
    )
  }

  const renderInstallationContent = () => {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-foreground">Basic Usage</h3>
          <div className="relative">
            <Button 
              variant="outline" 
              size="sm"
              className="absolute top-4 right-4 bg-background border-border text-foreground hover:bg-accent" 
              onClick={(e) => copyCode(e.target)}
            >
              <Copy className="w-4 h-4" />
              Copy
            </Button>
            <pre className="bg-muted rounded-lg p-6 overflow-x-auto whitespace-pre-wrap break-words border border-border"><code className="text-foreground font-mono text-sm">&lt;h1 wb-text-animate="{componentName}"&gt;Your Text Here&lt;/h1&gt;</code></pre>
          </div>
        </div>
        
        {component.examples.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Examples</h3>
            <div className="space-y-6">
              {component.examples.map((example, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="text-xl font-medium text-foreground">{example.title}</h4>
                  <div className="relative">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="absolute top-4 right-4 bg-background border-border text-foreground hover:bg-accent" 
                      onClick={(e) => copyCode(e.target)}
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                    <pre className="bg-muted rounded-lg p-6 overflow-x-auto whitespace-pre-wrap break-words border border-border"><code className="text-foreground font-mono text-sm">{example.code}</code></pre>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{example.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-foreground">Available Attributes</h3>
          <div className="space-y-3">
            {component.attributes.map((attr, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 bg-muted/30 rounded-lg overflow-hidden border border-border">
                <code className="text-primary font-mono text-sm bg-accent px-3 py-1 rounded whitespace-nowrap">{attr.name}</code>
                <span className="text-muted-foreground break-words">{attr.description}</span>
              </div>
            ))}
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
                  Installation
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

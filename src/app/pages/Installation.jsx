import React, { useState } from 'react'
import Sidebar from '../components/layout/Sidebar.jsx'
import SEO from '../components/SEO.jsx'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Copy, CheckCircle, Code, Settings, Upload, Rocket, ExternalLink, Zap, ChevronDown, ChevronUp } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useNavigate } from 'react-router-dom'

const Installation = () => {
  const [copyStates, setCopyStates] = useState({})
  const [openFAQItems, setOpenFAQItems] = useState({})
  const navigate = useNavigate()

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

  const toggleFAQItem = (index) => {
    setOpenFAQItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const installationFAQItems = [
    {
      question: "Do I need to install GSAP separately?",
      answer: "No! FlowBitz includes GSAP and all necessary plugins bundled in. Just add our single script tag and everything will work automatically."
    },
    {
      question: "Can I use FlowBitz with other frameworks besides Webflow?",
      answer: "FlowBitz is specifically designed for Webflow, but the core JavaScript can be adapted for other frameworks. However, we recommend using it with Webflow for the best experience."
    },
    {
      question: "My animations aren't working. What should I check?",
      answer: "1. Make sure the FlowBitz script is loaded\n2. Check that you have the correct wb-component attribute\n3. Verify the component name is spelled correctly\n4. Check browser console for errors\n5. Ensure your element has text content"
    },
    {
      question: "The component doesn't work with certain Webflow elements",
      answer: "FlowBitz works best with text elements. Some complex Webflow elements or nested structures might not work properly. Try using simpler text elements or check the component documentation for compatibility notes."
    }
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Install FlowBitz in Webflow",
    "description": "Complete guide to installing and using FlowBitz animations in your Webflow projects",
    "url": "https://www.flowbitz.dev/installation",
    "totalTime": "PT5M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "step": [
      {
        "@type": "HowToStep",
        "name": "Add FlowBitz Script",
        "text": "Add the FlowBitz script to your Webflow project's custom code section",
        "url": "https://www.flowbitz.dev/installation#step-1"
      },
      {
        "@type": "HowToStep", 
        "name": "Add Component Attributes",
        "text": "Add wb-component attributes to your elements in Webflow",
        "url": "https://www.flowbitz.dev/installation#step-2"
      },
      {
        "@type": "HowToStep",
        "name": "Customize with Attributes",
        "text": "Use additional attributes to customize animation behavior and appearance",
        "url": "https://www.flowbitz.dev/installation#step-3"
      },
      {
        "@type": "HowToStep",
        "name": "Publish Your Site",
        "text": "Publish your Webflow site to see the animations in action",
        "url": "https://www.flowbitz.dev/installation#step-4"
      }
    ]
  }

  return (
    <>
      <SEO 
        title="Installation Guide - FlowBitz"
        description="Complete guide to installing and using FlowBitz animations in your Webflow projects. Easy integration with custom attributes and script installation."
        keywords="webflow, installation, flowbitz, animations, custom code, webflow script, webflow components, webflow library"
        image="https://www.slabpixel.dev/images/FlowBitz-OpenGraph.webp"
        url="https://www.flowbitz.dev/installation"
        structuredData={structuredData}
      />
      <div className="bg-background text-foreground pt-[64px] min-h-screen">
        <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-4rem)]">
          {/* Shared Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex flex-col p-4 sm:p-8 lg:p-16 w-full items-center lg:overflow-y-auto lg:h-full">
            <div className="w-full max-w-[970px] mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground">Installation Guide</h1>
              <p className="text-muted-foreground text-base sm:text-lg">
                Learn how to install and use FlowBitz animations in your Webflow projects with this step-by-step guide.
              </p>
            </div>

            {/* Installation Steps */}
            <div className="w-full max-w-[970px] space-y-16">
              
              {/* Group 1: Adding Script */}
              <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Adding FlowBitz Script</h2>
                
                {/* Step 1: Add Script */}
              <Card id="step-1" className="border-border">
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      1
                    </div>
                    <CardTitle className="text-xl">Add FlowBitz Script</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground text-sm sm:text-base">
                    Add the FlowBitz script to your Webflow project's custom code section to enable all animations. <span className="font-semibold text-foreground">Go to your Webflow project settings → Custom Code → Head Code</span>, and paste the script there.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="relative">
                      <SyntaxHighlighter
                        language="html"
                        style={tomorrow}
                        customStyle={{
                          margin: 0,
                          padding: '1rem',
                          fontSize: '0.875rem',
                          borderRadius: '0.5rem',
                          backgroundColor: '#181b27'
                        }}
                        codeTagProps={{
                          style: {
                            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
                          }
                        }}
                      >
                        {'<script async src="https://cdn.jsdelivr.net/npm/flowbitz@latest/dist/flowbitz.umd.js"></script>'}
                      </SyntaxHighlighter>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-gray-700" 
                        onClick={() => copyToClipboard('<script async src="https://cdn.jsdelivr.net/npm/flowbitz@latest/dist/flowbitz.umd.js"></script>', 'scriptTag')}
                      >
                        {copyStates.scriptTag ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-white" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base mt-4"><span className="font-semibold text-foreground">🎉 Thats it!</span> You can now use FlowBitz animations in your Webflow project.</p>
                </CardContent>
              </Card>
              </div>

              {/* Group 2: Adding Component Attributes */}
              <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Adding FlowBitz Component</h2>

                {/* Step 2: Add Attributes */}
              <Card id="step-2" className="border-border">
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      2
                    </div>
                    <CardTitle className="text-xl">Add Component Attributes</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground text-sm sm:text-base">
                    Add the wb-component attribute to any element in your Webflow project to enable animations. In Webflow, you can add custom attributes by selecting your element, going to <span className="font-semibold text-foreground">Element Settings → Custom Attributes</span>, and adding the attribute name and value.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">Attribute Name</label>
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
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">Example Value</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            value="text-type" 
                            readOnly 
                            className="w-full bg-background border border-border rounded-md px-3 py-2 pr-10 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent" 
                            onClick={() => copyToClipboard('text-type', 'attributeValue')}
                          >
                            {copyStates.attributeValue ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3: Customization */}
              <Card id="step-3" className="border-border">
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      3
                    </div>
                    <CardTitle className="text-xl">Customize with Attributes</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground text-sm sm:text-base">
                    Use additional attributes to customize animation behavior, timing, and appearance. <span className="font-semibold text-foreground">Each FlowBitz component supports various attributes like wb-duration for timing control, wb-delay for staggered effects, wb-easing for smooth motion curves, wb-color for visual customization, and wb-trigger to control when animations start.</span> These attributes work together to create unique, professional animations tailored to your design needs.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {/* Tutorial Video */}
                    <div className="relative w-full">
                      <video 
                        className="w-full rounded-lg border border-border shadow-lg"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                      >
                        <source src="https://www.slabpixel.dev/videos/flowbitz-tutorial.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 4: Publish */}
              <Card id="step-4" className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      4
                    </div>
                    <CardTitle className="text-xl">Publish Your Site</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground text-sm sm:text-base">
                    <span className="font-semibold text-foreground">Publish your Webflow site to see the animations in action!</span> Once published, your animations will work automatically. The script loads asynchronously and initializes all components on page load.
                  </CardDescription>
                </CardHeader>
              </Card>
              </div>

              {/* Installation FAQ Section */}
              <div className="space-y-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Frequently Asked Questions</h2>
                
                <div className="space-y-3">
                  {installationFAQItems.map((item, index) => (
                    <div key={index} className="bg-card bg-muted rounded-xl p-4 sm:p-6 hover:bg-accent transition-all duration-300">
                      <div 
                        className="cursor-pointer"
                        onClick={() => toggleFAQItem(index)}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold pr-4 text-foreground">{item.question}</h4>
                          <div className="flex items-center gap-2">
                            {openFAQItems[index] ? (
                              <ChevronUp className="w-5 h-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </div>
                      {openFAQItems[index] && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="prose prose-sm max-w-none text-muted-foreground">
                            <p className="whitespace-pre-line">{item.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
                <div className="mt-12 sm:mt-16 text-center">
                <div className="bg-gradient-to-r from-primary/10 to-muted-foreground/5 rounded-2xl p-8 sm:p-12">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                    Ready to explore our components?
                    </h3>
                    <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                    Start with our most popular component and see how easy it is to add stunning animations to your Webflow projects.
                    </p>
                    <Button 
                    variant="animated"
                    size="lg" 
                    onClick={() => navigate('/components/split-text')}
                    >
                    <Zap className="w-5 h-5" />
                    Explore Component
                    </Button>
                </div>
                </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Installation

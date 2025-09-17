import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button.jsx'
import { Zap, Gift, Settings, Copy, Palette, Heart } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar.jsx'
import SEO from '../components/SEO.jsx'
import { getFilteredComponentKeys } from '../../library/data/componentsMetadata.js'

const Components = () => {
  const navigate = useNavigate()
  const componentCount = getFilteredComponentKeys().length

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "FlowBitz Components Library",
    "description": "Explore our comprehensive library of 16+ interactive components designed specifically for Webflow. Free, easy to use, and performance optimized.",
    "url": "https://flowbitz.dev/components",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Webflow Components",
      "description": "Interactive components for Webflow including text animations, effects, and interactive elements",
      "numberOfItems": 16
    }
  }

  return (
    <>
      <SEO 
        title="Free Webflow Animation Components Library | 16+ GSAP Components - FlowBitz"
        description="Browse 16+ professional animation components for Webflow. Text effects, hover animations, scroll triggers - all powered by GSAP. Zero coding required, completely free."
        keywords="webflow components library, webflow animation components, webflow text effects, webflow hover effects, webflow scroll animations, webflow gsap components, free webflow components, webflow split text, webflow gradient text, webflow typewriter effect, webflow interactive components, webflow animation library, webflow effects library, webflow animation tools, webflow animation examples, webflow animation code, webflow animation tutorials, webflow animation solutions, webflow animation alternatives, webflow animation problems, webflow animation limitations"
        image="https://slabpixel.dev/images/FlowBitz-OpenGraph.webp"
        url="https://flowbitz.dev/components"
        structuredData={structuredData}
      />
      <div className="bg-background text-foreground pt-[64px] min-h-screen">
      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-4rem)]">
        {/* Shared Sidebar */}
        <Sidebar showBackLink={false} />

        {/* Main Content */}
        <main className="flex flex-col p-4 sm:p-8 lg:p-16 w-full items-center lg:overflow-y-auto lg:h-full">
          <div className="w-full max-w-[970px] mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">Free Webflow Animation Components</h1>
            <p className="text-muted-foreground text-base sm:text-lg">{componentCount}+ professional GSAP-powered components that solve Webflow's animation limitations</p>
          </div>

          {/* Introduction Content */}
          <div className="w-full max-w-[970px]">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-foreground">Solving Webflow's Animation Problem</h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
                FlowBitz bridges the gap between Webflow's basic native animations and professional GSAP effects. 
                Instead of struggling with limited animation options or expensive custom development, you get access to 
                industry-standard animations through simple HTML attributes - no JavaScript knowledge required.
              </p>
            </div>

            <div className="mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Why FlowBitz Exists</h3>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
                <strong>The Problem:</strong> Webflow's native animations are limited. Creating professional-grade effects requires 
                expensive custom GSAP development that most designers can't afford or implement.
              </p>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
                <strong>Our Solution:</strong> FlowBitz democratizes advanced web animations by providing pre-built, GSAP-powered 
                components that work through simple HTML attributes. Professional results without the complexity or cost.
              </p>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                <strong>Our Commitment:</strong> We're dedicated to these core principles:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">100% Free Forever</h4>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Unlike expensive animation libraries, FlowBitz is completely free with no premium tiers, hidden costs, or usage limits. Professional animations shouldn't be a luxury.</p>
              </div>
              
              <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">No Coding Required</h4>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Unlike manual GSAP coding, FlowBitz works through simple HTML attributes. Perfect for designers who want professional animations without learning JavaScript.</p>
              </div>
              
              <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Copy className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">One Script Installation</h4>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Just add one script tag to your Webflow project and start using components immediately. No complex setup, no multiple files to manage - just one simple integration.</p>
              </div>
              
              <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Industry-Standard GSAP</h4>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Built on the same GSAP engine used by top agencies and Fortune 500 companies. Get professional-grade performance and reliability without the complexity.</p>
              </div>
            </div>

            <div className="mb-0">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Performance</h3>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                While we do everything possible to optimize components for Webflow, here are some tips to keep in mind when using FlowBitz:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Less Is More</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Using more than 5 components on a page is not advised, as it can overload your Webflow site with animations, potentially impacting performance or user experience</p>
                </div>
                
                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Mobile Optimization</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Consider disabling certain effects on mobile devices and replacing them with static placeholders instead, using Webflow's responsive design features</p>
                </div>
                
                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 sm:col-span-2 lg:col-span-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Test Thoroughly</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Always test your Webflow site on multiple devices and browsers before publishing, ensuring the best experience for all your users</p>
                </div>
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
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
                  onClick={() => navigate('/installation')}
                >
                  <Zap className="w-5 h-5" />
                  FlowBitz Installation
                </Button>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="w-full flex flex-col items-center justify-center pt-12">
            <div className="text-center flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>by</span>
              <button 
                onClick={() => window.open('https://slabpixel.com', '_blank')}
                className="text-primary hover:underline transition-colors duration-200"
              >
                SlabPixel
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  )
}

export default Components

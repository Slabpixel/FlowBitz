import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button.jsx'
import { Zap, Gift, Settings, Copy, Palette } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar.jsx'

const Components = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-background text-foreground pt-[64px] min-h-screen">
      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-4rem)]">
        {/* Shared Sidebar */}
        <Sidebar showBackLink={false} />

        {/* Main Content */}
        <main className="flex flex-col p-4 sm:p-8 lg:p-16 w-full items-center lg:overflow-y-auto lg:h-full">
          <div className="w-full max-w-[970px] mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">Introduction</h1>
            <p className="text-muted-foreground text-base sm:text-lg">Explore our library of interactive components</p>
          </div>

          {/* Introduction Content */}
          <div className="w-full max-w-[970px]">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-foreground">FlowBitz</h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
                FlowBitz is an open-source collection of carefully designed interactive components that enhance your Webflow projects.
                This is not your typical component library, which means you won't find a set of generic buttons, inputs, or other common UI elements here.
                These components are designed to help you stand out and make a statement visually by adding a touch of creativity to your Webflow sites.
              </p>
            </div>

            <div className="mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Mission</h3>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
                The goal of FlowBitz is simple - provide flexible, visually stunning and most importantly, free components that take your Webflow projects to the next level.
              </p>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                To make that happen, the project is committed to the following principles:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Free For All</h4>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Every component you choose to add to your Webflow project is yours to modify or extend, with full access to the code and complete customization freedom.</p>
              </div>
              
              <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Webflow-Friendly</h4>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Every component is designed to work seamlessly with Webflow's visual editor, using HTML attributes and custom code that integrates perfectly with your existing designs.</p>
              </div>
              
              <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Copy className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Copy & Paste Ready</h4>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">FlowBitz components are designed for easy integration - simply copy the code and paste it into your Webflow project's custom code section or embed it directly.</p>
              </div>
              
              <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Design Freedom</h4>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Whether you're using Webflow's visual editor or custom code, these components adapt to your workflow and give you complete creative control over your projects.</p>
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
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Using more than 2-3 components on a page is not advised, as it can overload your Webflow site with animations, potentially impacting performance or user experience</p>
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
                  onClick={() => navigate('/components/split-text')}
                >
                  <Zap className="w-5 h-5" />
                  Explore Component
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[970px] text-center text-muted-foreground text-sm mt-8 sm:mt-12">
            Made with 💙 by <a href="https://slabpixel.com" target="_blank" rel="noopener noreferrer" className="text-primary">SlabPixel</a>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Components

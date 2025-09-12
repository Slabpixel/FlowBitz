import React from 'react'
import Sidebar from '../components/layout/Sidebar.jsx'

const Components = () => {

  return (
    <div className="bg-background text-foreground pt-[64px] min-h-screen">
      <div className="flex flex-col lg:flex-row">
        {/* Shared Sidebar */}
        <Sidebar showBackLink={false} />

        {/* Main Content */}
        <main className="flex flex-col p-4 sm:p-8 lg:p-16 w-full items-center min-h-screen">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12">
              <div className="bg-card bg-muted rounded-xl p-4 sm:p-6 hover:bg-accent transition-all duration-300">
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🆓</div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Free For All</h4>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Every component you choose to add to your Webflow project is yours to modify or extend, with full access to the code and complete customization freedom.</p>
              </div>
              
              <div className="bg-card bg-muted rounded-xl p-4 sm:p-6 hover:bg-accent transition-all duration-300">
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">⚙️</div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Webflow-Friendly</h4>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Every component is designed to work seamlessly with Webflow's visual editor, using HTML attributes and custom code that integrates perfectly with your existing designs.</p>
              </div>
              
              <div className="bg-card bg-muted rounded-xl p-4 sm:p-6 hover:bg-accent transition-all duration-300">
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🧩</div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Copy & Paste Ready</h4>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">FlowBitz components are designed for easy integration - simply copy the code and paste it into your Webflow project's custom code section or embed it directly.</p>
              </div>
              
              <div className="bg-card bg-muted rounded-xl p-4 sm:p-6 hover:bg-accent transition-all duration-300">
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🎨</div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Design Freedom</h4>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Whether you're using Webflow's visual editor or custom code, these components adapt to your workflow and give you complete creative control over your projects.</p>
              </div>
            </div>

            <div className="mb-0">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Performance</h3>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                While we do everything possible to optimize components for Webflow, here are some tips to keep in mind when using FlowBitz:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-card bg-muted rounded-xl p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">⚡</div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Less Is More</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Using more than 2-3 components on a page is not advised, as it can overload your Webflow site with animations, potentially impacting performance or user experience</p>
                </div>
                
                <div className="bg-card bg-muted rounded-xl p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">📱</div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Mobile Optimization</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Consider disabling certain effects on mobile devices and replacing them with static placeholders instead, using Webflow's responsive design features</p>
                </div>
                
                <div className="bg-card bg-muted rounded-xl p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
                  <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🔍</div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Test Thoroughly</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Always test your Webflow site on multiple devices and browsers before publishing, ensuring the best experience for all your users</p>
                </div>
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

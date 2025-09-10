import React from 'react'
import Sidebar from '../components/layout/Sidebar.jsx'

const Components = () => {

  return (
    <div className="bg-background text-foreground mt-[64px]">
      <div className="flex">
        {/* Shared Sidebar */}
        <Sidebar showBackLink={false} />

        {/* Main Content */}
        <main className="flex flex-col p-16 w-full items-center">
          <div className="w-full max-w-[970px] mb-8">
            <h1 className="text-4xl font-bold mb-2 text-foreground">Introduction</h1>
            <p className="text-muted-foreground text-lg">Explore our library of interactive components</p>
          </div>

          {/* Introduction Content */}
          <div className="w-full max-w-[970px]">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">FlowBits</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                FlowBits is an open-source collection of carefully designed interactive components that aim to enhance your Webflow web applications.
                This is not your typical component library, which means you won't find a set of generic buttons, inputs, or other common UI elements here.
                Basically, these components are here to help you stand out and make a statement visually by adding a touch of creativity to your projects.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Mission</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                The goal of FlowBits is simple - provide flexible, visually stunning and most importantly, free components that take web projects to the next level.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To make that happen, the project is committed to the following principles:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-card border border-border rounded-xl p-6 hover:bg-accent transition-all duration-300">
                <div className="text-3xl mb-4">🆓</div>
                <h4 className="text-xl font-semibold mb-3 text-foreground">Free For All</h4>
                <p className="text-muted-foreground leading-relaxed">Every component you choose to bring into your project is yours to modify or extend, because you get full visibility of the code, not just an import.</p>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-6 hover:bg-accent transition-all duration-300">
                <div className="text-3xl mb-4">⚙️</div>
                <h4 className="text-xl font-semibold mb-3 text-foreground">Attribute-First Approach</h4>
                <p className="text-muted-foreground leading-relaxed">Every component is designed to be flexible and customizable, with HTML attributes that allow you to adjust the look and feel without having to always dive into the code.</p>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-6 hover:bg-accent transition-all duration-300">
                <div className="text-3xl mb-4">🧩</div>
                <h4 className="text-xl font-semibold mb-3 text-foreground">Fully Modular</h4>
                <p className="text-muted-foreground leading-relaxed">FlowBits is not your classic NPM library, you install only the components you need by either copying the code or using the CDN, without pulling in a whole library.</p>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-6 hover:bg-accent transition-all duration-300">
                <div className="text-3xl mb-4">🎨</div>
                <h4 className="text-xl font-semibold mb-3 text-foreground">Free Choice</h4>
                <p className="text-muted-foreground leading-relaxed">I don't want to dictate how you build your projects. Whether you prefer vanilla JavaScript or frameworks, plain CSS or preprocessors, it's all here for you to use as you see fit.</p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Performance</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                While we do everything possible to optimize components and offer the best experience, here are some tips to keep in mind when using FlowBits:
              </p>
              
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h4 className="text-xl font-semibold mb-3 text-foreground">Less Is More</h4>
                  <p className="text-muted-foreground leading-relaxed">Using more than 2-3 components on a page is not advised, it can overload your page with animations, potentially impacting performance or UX</p>
                </div>
                
                <div className="bg-card border border-border rounded-xl p-6">
                  <h4 className="text-xl font-semibold mb-3 text-foreground">Mobile Optimization</h4>
                  <p className="text-muted-foreground leading-relaxed">Consider disabling certain effects on mobile and replacing them with static placeholders instead</p>
                </div>
                
                <div className="bg-card border border-border rounded-xl p-6">
                  <h4 className="text-xl font-semibold mb-3 text-foreground">Test Thoroughly</h4>
                  <p className="text-muted-foreground leading-relaxed">Your device may be high-end, but be considerate of your users - always test on multiple devices before going live</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Components

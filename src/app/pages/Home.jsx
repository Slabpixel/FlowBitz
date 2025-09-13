import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button.jsx'
import { Zap, Plus, Layers, Github } from 'lucide-react'
import GridDistortion from '../components/ui/grid-distortion.jsx';

const Home = () => {
  const navigate = useNavigate()

  const handleGitHub = () => {
    window.open('https://github.com/Slabpixel/Webflow-Bits', '_blank')
  }

  return (
    <div className="relative bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-[100px] sm:py-[100px] lg:py-[100px]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-8 lg:space-y-8 order-1 lg:order-1">
            {/* Component Count Pill */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-primary/20 to-muted-foreground/10 dark:from-primary/20 dark:to-white/10 rounded-full text-xs sm:text-sm font-medium text-black dark:text-white">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span>16 Components Available</span>
            </div>
            
            <h1 className="text-5xl sm:text-5xl md:text-5xl lg:text-7xl font-bold text-foreground">
              <div>Interactive</div>
              <div>Components</div>
              <div>for <span wb-component="text-type" 
                wb-typing-speed="80" 
                wb-deleting-speed="40" 
                wb-pause-time="2000"
                wb-cursor-character="underscore"
                wb-text-1="Webflow"
                wb-text-2="Designers"
                wb-text-3="Developers"
                wb-text-4="Creators"
                wb-text-5="Everyone">Webflow</span></div>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Create stunning animations and interactive effects with our powerful library components. 
              Easy to use, performant, and designed specifically for Webflow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                size="lg" 
                className="bg-primary w-full sm:w-auto" 
                onClick={() => navigate('/components/split-text')}
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Explore Components</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-border hover:bg-accent w-full sm:w-auto"
                onClick={handleGitHub}
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>GitHub</span>
              </Button>
            </div>

            {/* Mobile 3D Image */}
            <div className="flex justify-center sm:hidden pt-8">
              <img 
                src="https://slabpixel.dev/images/FlowBitz-3D.png" 
                alt="Flowbitz 3D Logo" 
                className="w-[90%] h-auto max-w-full"
                loading="eager"
              />
            </div>
          </div>
          <div className="hidden sm:flex justify-center order-1 lg:order-2">
            <div className="w-full h-[540px] sm:h-[420px] md:h-[420px] lg:h-[540px] position-relative max-w-sm sm:max-w-md lg:max-w-lg sm:rounded-3xl flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <GridDistortion 
                imageSrc="https://slabpixel.dev/images/FlowBitz-3D.png" 
                grid={10} 
                mouse={0.2} 
                strength={0.15} 
                relaxation={0.9} 
                className="w-full h-auto"
                fallbackImage={
                  <img 
                    src="https://slabpixel.dev/images/FlowBitz-3D.png" 
                    alt="Flowbitz 3D Logo" 
                    className="w-full h-auto"
                  />
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <span wb-component="gradient-text">Powerful</span> Features
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create engaging web experiences
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">16 Components</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Comprehensive library of text animations and interactive effects</p>
            </div>
            
            <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">GSAP Powered</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Built on industry-standard animation library for smooth performance</p>
            </div>
            
            <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Easy Integration</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Simple HTML attributes - no complex JavaScript required</p>
            </div>
            
            <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Responsive</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Works perfectly across all devices and screen sizes</p>
            </div>
            
            <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Webflow Ready</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Designed specifically for Webflow's visual editor</p>
            </div>
            
            <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Performance</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Optimized for speed with minimal impact on page load</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-32 lg:pb-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
              Ready to <span wb-component="gradient-text">Enhance</span> Your Projects?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl">
              Join thousands of developers creating amazing experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md sm:max-w-none">
              <Button 
                size="lg" 
                className="bg-primary w-full sm:w-auto"
                onClick={() => navigate('/components/split-text')}
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="ml-2">Explore Components</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-border hover:bg-accent w-full sm:w-auto"
                onClick={handleGitHub}
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="ml-2">GitHub</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

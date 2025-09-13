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
          <div className="space-y-4 lg:space-y-8 order-1 lg:order-1">
            {/* Component Count Pill */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-primary/20 to-muted-foreground/10 dark:from-primary/20 dark:to-white/10 rounded-full text-xs sm:text-sm font-medium text-black dark:text-white">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span>16 Components Available</span>
            </div>
            
            <h1 className="text-5xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-foreground" 
                wb-component="blur-text" wb-animate-by="words" wb-delay="200">
              Interactive Components for Webflow
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
            <div className="flex justify-center sm:hidden">
              <img 
                src="/flowbitz-3d.png" 
                alt="Flowbitz 3D Logo" 
                className="w-[90%] h-auto max-w-full"
                loading="eager"
                decoding="async"
                crossOrigin="anonymous"
                onError={(e) => {
                  console.warn('Image failed to load, trying fallback');
                  e.target.src = './flowbitz-3d.png';
                }}
              />
            </div>
          </div>
          <div className="hidden sm:flex justify-center order-1 lg:order-2">
            <div className="w-full h-[540px] sm:h-[420px] md:h-[420px] lg:h-[540px] position-relative max-w-sm sm:max-w-md lg:max-w-lg sm:rounded-3xl flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <GridDistortion 
                imageSrc="/flowbitz-3d.png" 
                grid={10} 
                mouse={0.2} 
                strength={0.15} 
                relaxation={0.9} 
                className="w-full h-auto"
                fallbackImage={
                  <img 
                    src="/flowbitz-3d.png" 
                    alt="Flowbitz 3D Logo" 
                    className="w-full h-auto"
                    loading="eager"
                    crossOrigin="anonymous"
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" 
                wb-component="text-type" wb-typing-speed="50" wb-deleting-speed="25">
              Powerful Features
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create engaging web experiences
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-neutral-200/30 dark:bg-neutral-800/20 backdrop-blur-lg rounded-xl p-6 sm:p-8 text-center hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎨</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">16 Components</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Comprehensive library of text animations and interactive effects</p>
            </div>
            <div className="bg-neutral-200/30 dark:bg-neutral-800/20 backdrop-blur-lg rounded-xl p-6 sm:p-8 text-center hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">GSAP Powered</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Built on industry-standard animation library for smooth performance</p>
            </div>
            <div className="bg-neutral-200/30 dark:bg-neutral-800/20 backdrop-blur-lg rounded-xl p-6 sm:p-8 text-center hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔧</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Easy Integration</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Simple HTML attributes - no complex JavaScript required</p>
            </div>
            <div className="bg-neutral-200/30 dark:bg-neutral-800/20 backdrop-blur-lg rounded-xl p-6 sm:p-8 text-center hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📱</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Responsive</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Works perfectly across all devices and screen sizes</p>
            </div>
            <div className="bg-neutral-200/30 dark:bg-neutral-800/20 backdrop-blur-lg rounded-xl p-6 sm:p-8 text-center hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎯</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Webflow Ready</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Designed specifically for Webflow's visual editor</p>
            </div>
            <div className="bg-neutral-200/30 dark:bg-neutral-800/20 backdrop-blur-lg rounded-xl p-6 sm:p-8 text-center hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🚀</div>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-foreground"
            wb-component="text-type" wb-typing-speed="50" wb-deleting-speed="25">
              Ready to enhance your Webflow projects?
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

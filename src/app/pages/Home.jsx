import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button.jsx'
import { Zap, Plus, Layers, Github, ArrowRight } from 'lucide-react'
import Three3D from '../components/ui/three-3d.jsx'
import SEO from '../components/SEO.jsx'
import { getFilteredComponentKeys } from '../../library/data/componentsMetadata.js'

const Home = () => {
  const navigate = useNavigate()
  const componentCount = getFilteredComponentKeys().length

  const handleGitHub = () => {
    window.open('https://github.com/Slabpixel/FlowBitz', '_blank')
  }

  const handleGetStarted = () => {
    navigate('/components')
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FlowBitz - Free GSAP Animation Components for Webflow",
    "description": `Transform your Webflow projects with ${componentCount}+ professional animation components. Zero JavaScript knowledge needed - just add HTML attributes. GSAP-powered, mobile-responsive, and completely free.`,
    "url": "https://www.flowbitz.dev",
    "publisher": {
      "@type": "Organization",
      "name": "SlabPixel Studio",
      "url": "https://slabpixel.com",
      "description": "Creative studio specializing in web development and Webflow solutions"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.flowbitz.dev/components?search={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free GSAP animation components for Webflow - no coding required"
    },
    "keywords": "webflow animations, webflow components, gsap webflow, webflow text effects, webflow animation library, free webflow components"
  }

  return (
    <>
      <SEO 
        title="FlowBitz - Free GSAP Animation Components for Webflow | No Coding Required"
        description={`Transform your Webflow projects with ${componentCount}+ professional animation components. Zero JavaScript knowledge needed - just add HTML attributes. GSAP-powered, mobile-responsive, and completely free.`}
        keywords="webflow animations, webflow components, gsap webflow, webflow text effects, webflow animation library, free webflow components, webflow split text, webflow gradient text, webflow typewriter effect, webflow interactive components, webflow animation plugins, webflow gsap integration, webflow animation tools, webflow effects library, webflow animation components, webflow text animations, webflow hover effects, webflow scroll animations, webflow animation code, webflow animation examples"
        image="https://www.slabpixel.dev/images/FlowBitz-OpenGraph.webp"
        url="https://www.flowbitz.dev"
        structuredData={structuredData}
      />
      <div className="relative bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-[100px] sm:py-[100px] lg:py-[100px]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-8 lg:space-y-8 order-1 lg:order-1">
            {/* Component Count Pill */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-primary/20 to-muted-foreground/10 dark:from-primary/20 dark:to-white/10 rounded-full text-xs sm:text-sm font-medium text-black dark:text-white">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span>{componentCount} Components Available</span>
            </div>
            
            <h1 className="text-[12.5vw] sm:text-6xl md:text-6xl lg:text-7xl font-bold text-foreground" style={{ lineHeight: '1' }}>
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
            Bridge Webflow's animation limitations with professional GSAP effects. Add stunning text animations and interactive effects using simple HTML attributes - no coding required.
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
                onClick={handleGetStarted}
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Get Started</span>
              </Button>
            </div>

            {/* Mobile 3D Image */}
            <div className="flex justify-center sm:hidden pt-8">
              <img 
                src="https://www.slabpixel.dev/images/FlowBitz-3D.png" 
                alt="Flowbitz 3D Logo" 
                className="w-[90%] h-auto max-w-full"
                loading="eager"
              />
            </div>
          </div>
          <div className="hidden sm:flex justify-center order-1 lg:order-2">
            <div className="w-full h-[540px] sm:h-[420px] md:h-[420px] lg:h-[540px] max-w-sm sm:max-w-md lg:max-w-lg sm:rounded-3xl flex items-center justify-center">
              <Three3D 
                // Model Settings - FlowBitz specific
                modelPath="https://www.slabpixel.dev/3d/FlowBitz-3D.glb"
                // 3D Object Customization - FlowBitz specific
                modelSize={4.2}                 // Model size (1=small, 4=normal, 8=large)
                modelPosition={[-2, -0.5, 0.2]} // Manual position [x, y, z] (if useManualPosition=true)
                useManualPosition={true}        // Use manual position instead of auto-centering
                // Model Rotation (in degrees)
                modelRotationX={0}            // Model X rotation (degrees)
                modelRotationY={0}             // Model Y rotation (degrees)
                modelRotationZ={0}              // Model Z rotation (degrees)
                // Animation Settings
                autoRotate={false}
                rotateSpeed={0}
                enableZoom={false}
                enableRotate={false}
                enablePan={false}
                enableOrbit={true}
                // Mouse Tracking
                enableMouseTracking={true}
                mouseSensitivity={0.5}
                // Orbit Controls Settings - FlowBitz specific limits
                yMin={70}
                yMax={110}
                xMin={-22.5}
                xMax={22.5}
                orbitMinDistance={3}
                orbitMaxDistance={8}
                orbitDamping={true}
                orbitDampingFactor={0.05}
                // Camera Settings - FlowBitz specific
                cameraPosition={[1, -5, 5]}      // Camera position [x, y, z]
                cameraFOV={40}                   // Camera field of view (30-90 degrees)
                // Material Settings - FlowBitz specific
                metalness={0.1}                  // Material metalness (0.0-1.0)
                roughness={0.1}                  // Material roughness (0.0-1.0)
                modelColor={null}                // Model color (hex string like "#ff0000" or null)
                // Lighting Settings - FlowBitz specific
                ambientLightIntensity={2.0}      // Ambient light intensity (0.0-2.0)
                directionalLightIntensity={4.0}  // Directional light intensity (0.0-2.0)
                directionalLightPosition={[-5, 5, 5]} // Directional light position [x, y, z]
                pointLightIntensity={0.0}        // Point light intensity (0.0-2.0)
                pointLightPosition={[0, 0, 0]} // Point light position [x, y, z]
                // Light Colors - FlowBitz specific
                ambientLightColor="#ffffff"      // Ambient light color
                directionalLightColor="#ffffff"  // Directional light color
                pointLightColor="#ffffff"        // Point light color
                // Advanced Lighting Settings
                directionalLightCastShadow={true}     // Directional light casts shadows
                directionalLightShadowMapSize={1024}   // Shadow map resolution (512, 1024, 2048, 4096)
                directionalLightShadowCameraSize={10}  // Shadow camera frustum size
                pointLightCastShadow={true}           // Point light casts shadows
                pointLightShadowMapSize={512}         // Point light shadow map resolution
                pointLightDistance={0}                 // Point light distance (0 = infinite)
                pointLightDecay={10}                    // Point light decay factor (0 = no decay)
                className="w-full h-full rounded-3xl"
                fallbackImage={
                  <img 
                    src="https://www.slabpixel.dev/images/FlowBitz-3D.png" 
                    alt="Flowbitz 3D Logo" 
                    className="w-full h-full"
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 max-w-3xl">
              Why <span wb-component="gradient-text">FlowBitz</span> Solves Your Animation Problems
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Stop struggling with Webflow's limited animations. Get professional GSAP effects without coding.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">{componentCount} Ready-to-Use Components</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Professional text animations, hover effects, and scroll triggers - no coding required</p>
            </div>
            
            <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">GSAP-Powered Performance</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Industry-standard animation engine ensures smooth 60fps animations across all devices</p>
            </div>
            
            <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Zero JavaScript Required</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Just add HTML attributes to any Webflow element - no coding knowledge needed</p>
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
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Built for Webflow</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Designed specifically for Webflow's visual editor - works seamlessly with your existing projects</p>
            </div>
            
            <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Lightning Fast</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Optimized for speed with minimal impact on page load times and Core Web Vitals</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-32 lg:pb-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-foreground max-w-2xl">
              Ready to <span wb-component="gradient-text">Transform</span> Your Webflow Projects?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl">
              Join thousands of designers and developers who've upgraded their Webflow sites with professional animations
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md sm:max-w-none">
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
                onClick={handleGetStarted}
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Get Started</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default Home

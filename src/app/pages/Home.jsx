import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button.jsx'
import { Zap, Plus, Layers, Github, ArrowRight } from 'lucide-react'
import Three3D from '../components/ui/three-3d.jsx'
import SEO from '../components/SEO.jsx'
import { getFilteredComponentKeys } from '../../library/data/componentsMetadata.js'
import { useResponsive } from '../hooks/useResponsive.js'
import Logo from '../components/Logo.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from '../contexts/ThemeContext.jsx'

const Home = () => {
  const navigate = useNavigate()
  const componentCount = getFilteredComponentKeys().length
  const { isMobile } = useResponsive()
  const { theme } = useTheme();

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
      <div className="relative z-[2] bg-background text-foreground">
        {/* Hero Gradient Top */}
        <img 
          src="/images/home-gradient.webp"
          alt=""
          aria-hidden="true"
          className="absolute top-0 w-full object-cover -z-10 pointer-events-none"
          loading='lazy'
        />
        {/* End Hero Gradient Top */}

        {/* Hero Section */}
        <section className="relative pt-18">
          <div className='max-w-[1200px] mx-auto py-16 flex flex-col items-center border-x-[1px] border-b-[1px] border-foreground/10'>
            <div className='max-w-[800px] w-2/3 flex flex-col items-center gap-[1.625rem]'>
              <div className='flex gap-[0.875rem] px-4 py-2 bg-foreground/10 rounded-[2px] items-center'>
                <div className='w-2 h-2 bg-[#51A2FF]' />
                <p className='inter-med-16 text-foreground'>24 components available</p>
              </div>

              <h1 className='inter-semi-72 text-center'>Free GSAP Components for Webflow</h1>

              <p className='inter-reg-18 text-center text-foreground/90 opacity-80'>Interactive effects using simple HTML attributes, <br/> No coding required!</p>
            </div>
          </div>
        </section>
        {/* End Hero Section */}

        {/* Features Section */}
        <section className=" py-12 sm:py-16 lg:py-96 px-4 sm:px-6 lg:px-8">
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
        <section>
          <div className='max-w-[1200px] mx-auto py-7 border-x-[1px] border-foreground/10'>
            <div className='relative w-full h-[500px] border-y-[1px] border-foreground/10 flex justify-between items-center pl-[3.75rem]'>
              <div className='flex flex-col gap-10 max-w-[550px]'>
                <div className='flex flex-col gap-4 items-start'>
                  <Logo className='h-8 w-auto'/>
                  <h2 className='inter-semi-48 text-foreground'>Pro Animations, <br/> Zero Code.</h2>
                </div>

                <div className='w-full flex'>
                  <button 
                    onClick={() => navigate('/installation')}
                    className={`pr-3 lg:pr-6 py-[10px] border-r text-foreground inter-med-16 transition-all duration-200 flex items-center gap-3 hover:text-foreground/50
                      ${ theme === 'dark' ? 'border-white/10' : 'border-black/10' }
                    `}
                  >
                    <FontAwesomeIcon icon={['far', 'book-open']} className='w-4 h-4 opacity-60'/>
                    <span className="hidden lg:inline">Installation Guide</span>
                  </button>

                  <button 
                    onClick={() => navigate('/contact?tab=report')}
                    className={`px-3 lg:px-6 py-[10px] border-r text-foreground inter-med-16 transition-all duration-200 flex items-center gap-3 hover:text-foreground/50
                      ${ theme === 'dark' ? 'border-white/10' : 'border-black/10' }
                    `}
                  >
                    <FontAwesomeIcon icon={['far', 'bug']} className='w-4 h-4 opacity-60'/>
                    <span className="hidden lg:inline">Report Bug</span>
                  </button>

                  <button 
                    onClick={() => navigate('/contact?tab=feature')}
                    className={`px-3 lg:px-6 py-[10px] text-foreground inter-med-16 transition-all duration-200 flex items-center gap-3 hover:text-foreground/50
                    `}
                  >
                    <FontAwesomeIcon icon={['far', 'lightbulb']} className='w-4 h-4 opacity-60'/>
                    <span className="hidden lg:inline">Request a Feature</span>
                  </button>
                </div>
              </div>
              
              <div className='relative w-1/2 h-full'>
                <video src="/videos/flowbitz-tutorial.mp4" autoPlay loop muted playsInline className='relative w-full z-[1] h-full object-cover'></video>
                <div className='absolute top-0 w-full h-full z-[2] pointer-events-none bg-gradient-custom'></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home

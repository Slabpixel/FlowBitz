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
import { GalleryContainer } from '../components/gallery'

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
      <div className="relative overflow-scroll h-[calc(100dvh-4.5rem)] z-[2] text-foreground">
        {/* Hero Section */}
        <section className="relative">
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

        {/* Component Gallery Section */}
        <GalleryContainer />

        {/* CTA Section */}
        <section>
          <div className='max-w-[1200px] mx-auto py-7 border-x-[1px] border-foreground/10'>
            <div className='relative w-full h-[500px] border-y-[1px] border-foreground/10 flex justify-between items-center pl-[3.75rem] overflow-hidden'>
              <div className='flex flex-col gap-10 max-w-[550px] relative z-[3]'>
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
                    <span className="hidden lg:inline text-nowrap">Installation Guide</span>
                  </button>

                  <button 
                    onClick={() => navigate('/contact?tab=report')}
                    className={`px-3 lg:px-6 py-[10px] border-r text-foreground inter-med-16 transition-all duration-200 flex items-center gap-3 hover:text-foreground/50
                      ${ theme === 'dark' ? 'border-white/10' : 'border-black/10' }
                    `}
                  >
                    <FontAwesomeIcon icon={['far', 'bug']} className='w-4 h-4 opacity-60'/>
                    <span className="hidden lg:inline text-nowrap">Report Bug</span>
                  </button>

                  <button 
                    onClick={() => navigate('/contact?tab=feature')}
                    className={`px-3 lg:px-6 py-[10px] text-foreground inter-med-16 transition-all duration-200 flex items-center gap-3 hover:text-foreground/50
                    `}
                  >
                    <FontAwesomeIcon icon={['far', 'lightbulb']} className='w-4 h-4 opacity-60'/>
                    <span className="hidden lg:inline text-nowrap">Request a Feature</span>
                  </button>
                </div>
              </div>
              
              <div className='relative w-1/2 h-full z-[1]'>
                <video src="/videos/flowbitz-tutorial.mp4" autoPlay loop muted playsInline className='relative w-full z-[1] h-full object-cover'></video>
                <div className='absolute top-0 w-full h-full z-[2] pointer-events-none bg-gradient-custom'></div>
              </div>

              <img 
                src="/images/cta-gradient.webp"
                alt=""
                aria-hidden="true"
                className="absolute top-0 left-0 w-full object-contain z-[1] pointer-events-none"
                loading='lazy'
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home

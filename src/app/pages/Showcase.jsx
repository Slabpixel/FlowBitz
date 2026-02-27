import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExternalLink, Upload, Globe } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import Logo from '../components/Logo.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../components/ui/button.jsx'

const ITEMS_PER_PAGE = 9

const Showcase = () => {
  const navigate = useNavigate()
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  const handleSubmitShowcase = () => {
    navigate('/showcase/submit')
  }

  const showcaseProjects = [
    {
      name: 'SlabPixel',
      url: 'https://slabpixel.com',
      image: 'https://slabpixel.dev/images/slabpixel.webp',
      description: 'Creative Digital Studio',
      components: ['Split Text', 'Smart Animate']
    },
    {
      name: 'Neuera',
      url: 'https://neuera.webflow.io',
      image: 'https://slabpixel.dev/images/neuera.webp',
      description: 'AI-powered Solutions',
      components: ['Split Text', 'Smart Animate']
    },
    {
      name: 'Whispr',
      url: 'https://whisprrr.webflow.io',
      image: 'https://slabpixel.dev/images/whispr.webp',
      description: 'Communication Platform',
      components: ['Split Text', 'Smart Animate']
    },
    {
      name: 'Quantra AI',
      url: 'https://quantra-ai.webflow.io',
      image: 'https://slabpixel.dev/images/quantra.webp',
      description: 'Quantum AI Technology',
      components: ['Split Text', 'Smart Animate']
    },
    {
      name: 'Mavence',
      url: 'https://mavencee.webflow.io',
      image: 'https://slabpixel.dev/images/mavence.webp',
      description: 'Business Solutions',
      components: ['Split Text', 'Smart Animate']
    },
    {
      name: 'Formahaus',
      url: 'https://formahaus.webflow.io',
      image: 'https://slabpixel.dev/images/formahaus.webp',
      description: 'Design & Architecture',
      components: ['Split Text', 'Smart Animate']
    },
    {
      name: 'Vexum',
      url: 'https://vexum.webflow.io',
      image: 'https://slabpixel.dev/images/vexum.webp',
      description: 'WEB3 & Finance',
      components: ['Split Text', 'Smart Animate']
    },
    {
      name: 'Langford',
      url: 'https://llangford.webflow.io',
      image: 'https://slabpixel.dev/images/langford.webp',
      description: 'Fashion & Lifestyle',
      components: ['Split Text', 'Smart Animate']
    },
    {
      name: 'Stagetimer',
      url: 'https://stagetimer.webflow.io',
      image: 'https://slabpixel.dev/images/stagetimer.webp',
      description: 'Tools & Management',
      components: ['Split Text', 'Smart Animate']
    },
    {
      name: 'Art-Doc',
      url: 'https://art-doc.webflow.io',
      image: 'https://slabpixel.dev/images/artdoc.webp',
      description: 'Art & Culture',
      components: ['Split Text', 'Smart Animate']
    },
    {
      name: 'Swiftmate',
      url: 'https://swftmate.webflow.io',
      image: 'https://slabpixel.dev/images/swiftmate.webp',
      description: 'Finance Application',
      components: ['Split Text', 'Smart Animate']
    }
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "FlowBitz Showcase",
    "description": "Explore real-world examples and showcases of FlowBitz components in action. See how developers are using our interactive components in their Webflow projects.",
    "url": "https://www.flowbitz.dev/showcase",
    "mainEntity": {
      "@type": "ItemList",
      "name": "FlowBitz Component Showcases",
      "description": "Real-world examples of FlowBitz components in Webflow projects"
    }
  }

  return (
    <>
      <SEO 
        title="Showcase - FlowBitz Components"
        description="Explore real-world examples and showcases of FlowBitz components in action. See how developers are using our interactive components in their Webflow projects."
        keywords="flowbitz showcase, webflow components examples, webflow components showcase, flowbitz projects, webflow components in action"
        image="https://www.slabpixel.dev/images/FlowBitz-OpenGraph.webp"
        url="https://www.flowbitz.dev/showcase"
        structuredData={structuredData}
      />
      <section className="bg-background text-foreground min-h-screen relative overflow-hidden pb-16 md:pb-10">
        <div className="max-w-[1200px] mx-auto relative z-[2] border-x border-foreground/10">
          {/* Hero Section */}
          <div wb-component="smart-animate" className="flex flex-col items-center max-w-[550px] md:mx-auto text-center pt-6 md:py-14 gap-5 md:gap-4">
            <div className="bg-foreground/10 h-[30px] w-fit px-4 flex items-center justify-center gap-1">
              <span className='text-tooltip text-foreground'>Made with</span>
              <Logo className='h-4 w-auto' />
            </div>
            
            <h1 className="inter-med-56 text-foreground">
              Website Showcase
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Explore examples and uses of FlowBitz components. See how they enhance your Webflow websites.
            </p>
            
            {/* Submit Project Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleSubmitShowcase}
                variant="custom"
                size="custom"
                className="h-10 flex items-center px-4 bg-foreground rounded text-tooltip text-background"
              >
                Submit Your Project
              </Button>
            </div>
          </div>
        {/* End Hero Section */}

          {/* Showcase Gallery */}
          <div wb-component="smart-animate" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcaseProjects.slice(0, visibleCount).map((project, index) => (
              <a
                key={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-fit object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute flex items-end h-full bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex w-full items-center p-2 gap-4 text-white">
                      <div className='w-full flex flex-wrap gap-2'>
                        {project.components.map((component, index) => (
                          <div key={index} className="text-attribute text-foreground rounded px-2.5 py-1.5 bg-base-low/50">
                            {component}
                          </div>
                        ))}
                      </div>

                      <FontAwesomeIcon icon={['far', 'arrow-right']} className='w-5 h-5 -rotate-45'/>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="py-4">
                  <h3 className="text-link font-medium text-foreground">
                    {project.name} - {project.description}
                  </h3>
                </div>

                {/* Decorative corner gradient */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl"></div>
              </a>
            ))}
          </div>

          {/* Load More */}
          {visibleCount < showcaseProjects.length && (
            <div className="flex justify-center pt-12 md:pt-8">
              <button 
                onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                className="flex items-center gap-2 px-6 py-3 border border-foreground/10 rounded text-foreground hover:text-foreground/70 transition-colors duration-200"
              >
                <span className="text-sm font-medium">Load More</span>
                <FontAwesomeIcon icon={['far', 'chevron-down']} className='w-4 h-4 opacity-60'/>
              </button>
            </div>
          )}
        </div>
      </section>
  
    </>
  )
}

export default Showcase

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ExternalLink, Upload, Globe } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import Footer from '../components/layout/Footer.jsx'
import { Button } from '../components/ui/button.jsx'

const Showcase = () => {
  const navigate = useNavigate()

  const handleSubmitShowcase = () => {
    navigate('/showcase/submit')
  }

  const showcaseProjects = [
    {
      name: 'SlabPixel',
      url: 'https://slabpixel.com',
      image: 'https://slabpixel.dev/images/slabpixel.webp',
      description: 'Creative Digital Studio'
    },
    {
      name: 'Neuera',
      url: 'https://neuera.webflow.io',
      image: 'https://slabpixel.dev/images/neuera.webp',
      description: 'AI-powered Solutions'
    },
    {
      name: 'Whispr',
      url: 'https://whisprrr.webflow.io',
      image: 'https://slabpixel.dev/images/whispr.webp',
      description: 'Communication Platform'
    },
    {
      name: 'Quantra AI',
      url: 'https://quantra-ai.webflow.io',
      image: 'https://slabpixel.dev/images/quantra.webp',
      description: 'Quantum AI Technology'
    },
    {
      name: 'Mavence',
      url: 'https://mavencee.webflow.io',
      image: 'https://slabpixel.dev/images/mavence.webp',
      description: 'Business Solutions'
    },
    {
      name: 'Formahaus',
      url: 'https://formahaus.webflow.io',
      image: 'https://slabpixel.dev/images/formahaus.webp',
      description: 'Design & Architecture'
    },
    {
      name: 'Vexum',
      url: 'https://vexum.webflow.io',
      image: 'https://slabpixel.dev/images/vexum.webp',
      description: 'WEB3 & Finance'
    },
    {
      name: 'Langford',
      url: 'https://llangford.webflow.io',
      image: 'https://slabpixel.dev/images/langford.webp',
      description: 'Fashion & Lifestyle'
    },
    {
      name: 'Stagetimer',
      url: 'https://stagetimer.webflow.io',
      image: 'https://slabpixel.dev/images/stagetimer.webp',
      description: 'Tools & Management'
    },
    {
      name: 'Art-Doc',
      url: 'https://art-doc.webflow.io',
      image: 'https://slabpixel.dev/images/artdoc.webp',
      description: 'Art & Culture'
    },
    {
      name: 'Swiftmate',
      url: 'https://swftmate.webflow.io',
      image: 'https://slabpixel.dev/images/swiftmate.webp',
      description: 'Finance Application'
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
      <div className="bg-background text-foreground pt-[64px] min-h-screen relative overflow-hidden">
        {/* Half Radial Gradient Background */}
        <div wb-component="smart-animate" wb-start-delay="0.4" className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] pointer-events-none">
          <div className="w-full h-full blur-3xl" 
               style={{
                 background: 'radial-gradient(circle at center top, hsl(var(--primary) / 0.2) 0%, hsl(var(--primary) / 0.15) 30%, hsl(var(--primary) / 0.05) 60%, transparent 100%)'
               }}>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
          {/* Hero Section */}
          <div wb-component="smart-animate" className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-muted-foreground/10 dark:from-primary/20 dark:to-white/10 rounded-full text-sm font-medium text-black dark:text-white mb-6">
              <Sparkles className="w-4 h-4" />
              <span>{showcaseProjects.length} Projects Featured</span>
            </div>
            
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Website <span wb-component="gradient-text">Showcase</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Discover real-world examples and creative implementations of FlowBitz components. 
            See how our components can transform your Webflow projects.
          </p>
          
          {/* Submit Project Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSubmitShowcase}
              variant="animated"
              size="lg"
            >
              <Upload className="w-5 h-5" />
              Submit Your Project
            </Button>
          </div>
        </div>

          {/* Showcase Gallery */}
          <div wb-component="smart-animate" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {showcaseProjects.map((project, index) => (
              <a
                key={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-md bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 right-2 flex items-center gap-2 text-white">
                      <span className="text-sm font-medium">Visit Site</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-md font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <span className="truncate">{project.url.replace('https://', '')}</span>
                  </div>
                </div>

                {/* Decorative corner gradient */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl"></div>
              </a>
            ))}

            {/* CTA Card */}
            <button
              onClick={handleSubmitShowcase}
              className="group relative overflow-hidden rounded-md bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-dashed border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 p-5 flex flex-col items-center justify-center"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-md mx-auto flex items-center justify-center shadow-lg shadow-primary/25 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-md font-bold text-foreground mb-3">
                  Submit Your Project
                </h3>
                <p className="text-sm text-muted-foreground mb-2 max-w-xs">
                  Built something amazing with FlowBitz? Share it with the community!
                </p>
                
                <div className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  <span>Get Featured</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    
    {/* Footer */}
    <Footer />
    </>
  )
}

export default Showcase

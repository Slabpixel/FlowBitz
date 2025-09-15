import React from 'react'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Github, ExternalLink, Heart, Users, Lightbulb, Target, Gift, Zap, Settings, Palette, Smartphone, Rocket } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar.jsx'
import SEO from '../components/SEO.jsx'
import { getAllComponentKeys } from '../../library/data/componentsMetadata.js'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const componentCount = getAllComponentKeys().length
  const navigate = useNavigate()

  const handleGitHub = () => {
    window.open('https://github.com/Slabpixel/FlowBitz', '_blank')
  }

  const handleSlabPixel = () => {
    window.open('https://slabpixel.com', '_blank')
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About FlowBitz",
    "description": "Learn about FlowBitz - the free interactive components library for Webflow. Created by SlabPixel Studio to help designers and developers create stunning web experiences.",
    "url": "https://flowbitz.dev/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "SlabPixel Studio",
      "url": "https://slabpixel.com",
      "description": "Creative studio specializing in web development and design"
    }
  }

  return (
    <>
      <SEO 
        title="About FlowBitz - Interactive Components for Webflow"
        description="Learn about FlowBitz - the free interactive components library for Webflow. Created by SlabPixel Studio to help designers and developers create stunning web experiences."
        keywords="about flowbitz, webflow components, slabpixel studio, interactive components, webflow library, free components"
        image="https://slabpixel.dev/images/FlowBitz-OpenGraph.webp"
        url="https://flowbitz.dev/about"
        structuredData={structuredData}
      />
      <div className="bg-background text-foreground pt-[64px] min-h-screen">
      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-4rem)]">
        {/* Shared Sidebar */}
        <Sidebar showBackLink={false} />

        {/* Main Content */}
        <main className="flex flex-col p-4 sm:p-8 lg:p-16 w-full items-center lg:overflow-y-auto lg:h-full">
          <div className="w-full max-w-[970px] mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">About FlowBitz</h1>
            <p className="text-muted-foreground text-base sm:text-lg">A powerful collection of interactive components designed to bring your Webflow projects to life.</p>
          </div>

          <div className="w-full max-w-[970px]">
            {/* Mission & Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
              <Card className="bg-card bg-muted rounded-xlsm:p-6 hover:bg-accent transition-all duration-300 border-none">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-primary" />
                    <CardTitle className="text-2xl">Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    We harness the transformative power of creativity to drive growth and success for businesses. 
                    Through our unlimited design solutions, we inspire, engage, and deliver tangible results, 
                    ensuring our clients thrive in an ever-evolving marketplace.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card bg-muted rounded-xlsm:p-6 hover:bg-accent transition-all duration-300 border-none">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-primary" />
                    <CardTitle className="text-2xl">Our Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Creating a design studio with a comfortable ecosystem for both designers and clients, 
                    fostering a sustainable business framework that empowers creativity and innovation.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* FlowBitz Story */}
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
                The FlowBitz Story
              </h2>
              <div className="mx-auto">
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">
                    FlowBitz was born from our passion for creating exceptional web experiences. As a team of 
                    designers and developers at SlabPixel, we noticed a gap in the market for high-quality, 
                    easy-to-use interactive components specifically designed for Webflow.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    We believe that every web project deserves to stand out. That's why we've created FlowBitz 
                    - a comprehensive library of {componentCount} carefully crafted components that bring your Webflow projects 
                    to life with smooth animations and interactive effects.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Our commitment to the community drives us to keep FlowBitz completely free and open-source. 
                    We want to empower designers and developers worldwide to create stunning web experiences 
                    without the barriers of expensive libraries or complex implementations.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
                Why FlowBitz?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Free & Open Source</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Every component is completely free to use, modify, and extend. No hidden costs or premium tiers.
                  </p>
                </div>

                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">GSAP Powered</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Built on industry-standard GSAP for smooth, performant animations that work across all devices.
                  </p>
                </div>

                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Webflow Ready</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Designed specifically for Webflow with simple HTML attributes - no complex JavaScript required.
                  </p>
                </div>

                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Responsive</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    All components are fully responsive and work perfectly across desktop, tablet, and mobile devices.
                  </p>
                </div>

                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Highly Customizable</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Extensive customization options with attributes for timing, easing, colors, and behavior.
                  </p>
                </div>

                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Performance Optimized</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Lightweight and optimized for speed with minimal impact on your site's loading performance.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mb-16">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{componentCount}</div>
                  <div className="text-sm text-muted-foreground">Components</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Free</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">2</div>
                  <div className="text-sm text-muted-foreground">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">∞</div>
                  <div className="text-sm text-muted-foreground">Possibilities</div>
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

            {/* Footer */}
            <div className="w-full flex flex-col items-center justify-center pt-12">
              <div className="text-center flex items-center gap-2 text-sm text-muted-foreground">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>by</span>
                <button 
                  onClick={() => window.open('https://slabpixel.com', '_blank')}
                  className="text-primary hover:underline transition-colors duration-200"
                >
                  SlabPixel
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  )
}

export default About

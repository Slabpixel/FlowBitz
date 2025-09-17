import React from 'react'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Github, ExternalLink, Heart, Users, Lightbulb, Target, Gift, Zap, Settings, Palette, Smartphone, Rocket } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar.jsx'
import SEO from '../components/SEO.jsx'
import { getFilteredComponentKeys } from '../../library/data/componentsMetadata.js'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const componentCount = getFilteredComponentKeys().length
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
        title="About FlowBitz - Solving Webflow Animation Problems | Free GSAP Components"
        description="Discover how FlowBitz bridges the gap between Webflow's basic animations and professional GSAP effects. Learn about our mission to democratize advanced web animations for everyone."
        keywords="about flowbitz, webflow animation problems, webflow gsap integration, webflow animation limitations, webflow components library, free webflow animations, webflow animation solutions, webflow animation tools, webflow animation alternatives, webflow animation library, webflow animation components, webflow animation examples, webflow animation tutorials, webflow animation code, webflow animation plugins, webflow animation effects, webflow animation library, webflow animation tools, webflow animation solutions, webflow animation alternatives"
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">Solving Webflow's Animation Problem</h1>
            <p className="text-muted-foreground text-base sm:text-lg">FlowBitz bridges the gap between Webflow's limited native animations and professional GSAP effects - making advanced animations accessible to everyone.</p>
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
                    To democratize professional web animations by making advanced GSAP effects accessible to Webflow users 
                    without requiring coding knowledge. We believe every designer deserves access to the same powerful 
                    animation tools used by top agencies and developers.
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
                    A world where advanced web animations are accessible to everyone, regardless of technical skill level. 
                    We envision a future where designers can create stunning, professional animations without barriers, 
                    leveling the playing field between agencies and independent creators.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* FlowBitz Story */}
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
                The Problem We're Solving
              </h2>
              <div className="mx-auto">
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">
                    <strong>The Challenge:</strong> Webflow's native animations are limited. While perfect for basic interactions, 
                    creating professional-grade animations requires manual GSAP coding - a barrier that excludes most designers 
                    and requires expensive developer resources.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    <strong>Our Solution:</strong> FlowBitz bridges this gap with {componentCount} pre-built, GSAP-powered components 
                    that work through simple HTML attributes. No JavaScript knowledge required - just add attributes to any 
                    Webflow element and get professional animations instantly.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    <strong>The Impact:</strong> We've democratized advanced web animations, making them accessible to designers, 
                    agencies, and independent creators worldwide. FlowBitz levels the playing field, allowing anyone to create 
                    stunning animations that previously required expensive development resources.
                  </p>
                  <p className="text-lg leading-relaxed">
                    <strong>Our Commitment:</strong> FlowBitz remains completely free and open-source because we believe 
                    professional web animations shouldn't be a luxury. Every designer deserves access to the same powerful 
                    tools used by top agencies, regardless of budget or technical expertise.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
                Why FlowBitz is Different
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">100% Free Forever</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Unlike expensive animation libraries, FlowBitz is completely free with no premium tiers, 
                    hidden costs, or usage limits. Professional animations shouldn't be a luxury.
                  </p>
                </div>

                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Industry-Standard GSAP</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Built on the same GSAP engine used by top agencies and Fortune 500 companies. 
                    Get professional-grade performance without the complexity.
                  </p>
                </div>

                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">No Coding Required</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Unlike manual GSAP coding, FlowBitz works through simple HTML attributes. 
                    Perfect for designers who want professional animations without learning JavaScript.
                  </p>
                </div>

                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Mobile-First Design</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Every component is optimized for mobile devices and responsive design. 
                    No more worrying about animations breaking on different screen sizes.
                  </p>
                </div>

                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Highly Customizable</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Extensive customization through HTML attributes - control timing, easing, colors, and behavior 
                    without touching a single line of JavaScript code.
                  </p>
                </div>

                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Performance Optimized</h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Lightweight and optimized for Core Web Vitals. Minimal impact on page load times 
                    while delivering smooth 60fps animations across all devices.
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
                  Ready to solve your Webflow animation problems?
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Stop struggling with Webflow's limited animations. See how easy it is to add professional GSAP effects 
                  with just HTML attributes - no coding required.
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

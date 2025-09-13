import React from 'react'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Github, ExternalLink, Heart, Users, Lightbulb, Target } from 'lucide-react'

const About = () => {
  const handleGitHub = () => {
    window.open('https://github.com/Slabpixel/Webflow-Bits', '_blank')
  }

  const handleSlabPixel = () => {
    window.open('https://slabpixel.com', '_blank')
  }

  return (
    <div className="bg-background text-foreground pt-[64px] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            About FlowBitz
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A powerful collection of interactive components designed to bring your Webflow projects to life. 
            Built with passion by the creative minds at SlabPixel.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
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

          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
            The FlowBitz Story
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                FlowBitz was born from our passion for creating exceptional web experiences. As a team of 
                designers and developers at SlabPixel, we noticed a gap in the market for high-quality, 
                easy-to-use interactive components specifically designed for Webflow.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                We believe that every web project deserves to stand out. That's why we've created FlowBitz 
                - a comprehensive library of 16 carefully crafted components that bring your Webflow projects 
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
            Why FlowBitz?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border bg-card hover:bg-accent/50 transition-all duration-300">
              <CardHeader>
                <div className="text-3xl mb-2">🆓</div>
                <CardTitle className="text-xl">Free & Open Source</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every component is completely free to use, modify, and extend. No hidden costs or premium tiers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:bg-accent/50 transition-all duration-300">
              <CardHeader>
                <div className="text-3xl mb-2">⚡</div>
                <CardTitle className="text-xl">GSAP Powered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built on industry-standard GSAP for smooth, performant animations that work across all devices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:bg-accent/50 transition-all duration-300">
              <CardHeader>
                <div className="text-3xl mb-2">🔧</div>
                <CardTitle className="text-xl">Webflow Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Designed specifically for Webflow with simple HTML attributes - no complex JavaScript required.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:bg-accent/50 transition-all duration-300">
              <CardHeader>
                <div className="text-3xl mb-2">📱</div>
                <CardTitle className="text-xl">Responsive</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All components are fully responsive and work perfectly across desktop, tablet, and mobile devices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:bg-accent/50 transition-all duration-300">
              <CardHeader>
                <div className="text-3xl mb-2">🎨</div>
                <CardTitle className="text-xl">Highly Customizable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Extensive customization options with attributes for timing, easing, colors, and behavior.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:bg-accent/50 transition-all duration-300">
              <CardHeader>
                <div className="text-3xl mb-2">🚀</div>
                <CardTitle className="text-xl">Performance Optimized</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Lightweight and optimized for speed with minimal impact on your site's loading performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* SlabPixel Team */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
            Built by SlabPixel
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Meet the Creative Collective</CardTitle>
                <CardDescription className="text-center text-lg">
                  The talented team behind FlowBitz and SlabPixel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-muted-foreground/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Adam Katsutrio</h3>
                    <p className="text-muted-foreground mb-2">Lead Developer</p>
                    <p className="text-sm text-muted-foreground">
                      The technical mastermind behind FlowBitz, ensuring every component is optimized and performant.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-muted-foreground/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Alfian Nurohman</h3>
                    <p className="text-muted-foreground mb-2">Lead Graphic Designer</p>
                    <p className="text-sm text-muted-foreground">
                      The creative visionary who brings beautiful designs and user experiences to life.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">16</div>
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
        <div className="text-center">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-muted-foreground/5">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl text-foreground">
                Ready to Get Started?
              </CardTitle>
              <CardDescription className="text-lg">
                Join thousands of developers creating amazing experiences with FlowBitz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
                  onClick={() => window.location.href = '/components/split-text'}
                >
                  Explore Components
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-border hover:bg-accent px-8 py-3"
                  onClick={handleGitHub}
                >
                  <Github className="w-5 h-5 mr-2" />
                  View on GitHub
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-border hover:bg-accent px-8 py-3"
                  onClick={handleSlabPixel}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Visit SlabPixel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500" /> by 
            <a 
              href="https://slabpixel.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline ml-1"
            >
              SlabPixel
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default About

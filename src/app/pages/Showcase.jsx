import React from 'react'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Clock, Sparkles, Layers, ExternalLink, Github } from 'lucide-react'

const Showcase = () => {
  const handleGitHub = () => {
    window.open('https://github.com/Slabpixel/Webflow-Bits', '_blank')
  }

  const handleComponents = () => {
    window.location.href = '/components'
  }

  return (
    <div className="bg-background text-foreground pt-[64px] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-muted-foreground/10 dark:from-primary/20 dark:to-white/10 rounded-full text-sm font-medium text-black dark:text-white mb-6">
            <Clock className="w-4 h-4" />
            <span>Coming Soon</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Component Showcase
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover real-world examples and creative implementations of FlowBitz components. 
            See how our components can transform your Webflow projects.
          </p>
        </div>

        {/* Coming Soon Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-muted-foreground/5">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-muted-foreground/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-3xl sm:text-4xl text-foreground mb-4">
                Something Amazing is Coming
              </CardTitle>
              <CardDescription className="text-lg sm:text-xl text-muted-foreground">
                We're working hard to bring you an incredible showcase of FlowBitz components in action.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Our showcase will feature real-world examples, creative implementations, and inspiring use cases 
                that demonstrate the full potential of FlowBitz components. You'll see how designers and developers 
                around the world are using our components to create stunning web experiences.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
                  <Layers className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">Live Examples</p>
                    <p className="text-sm text-muted-foreground">Interactive demos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
                  <ExternalLink className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">Real Projects</p>
                    <p className="text-sm text-muted-foreground">Actual implementations</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
                  <Github className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">Code Snippets</p>
                    <p className="text-sm text-muted-foreground">Copy & paste ready</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">Inspiration</p>
                    <p className="text-sm text-muted-foreground">Creative ideas</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">What to Expect</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <p className="font-medium text-foreground">Component Galleries</p>
                    <p>Browse by category and see all variations</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <p className="font-medium text-foreground">Use Case Examples</p>
                    <p>See components in real website contexts</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <p className="font-medium text-foreground">Code Playground</p>
                    <p>Experiment with different configurations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alternative Actions */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
            Can't Wait? Explore Now
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            While we're preparing the showcase, you can start exploring our components and see them in action.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
              onClick={handleComponents}
            >
              <Layers className="w-5 h-5 mr-2" />
              Browse Components
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
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="border-border bg-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Stay Updated</CardTitle>
              <CardDescription>
                Get notified when the showcase is ready and receive updates about new components.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="max-w-md mx-auto">
                <p className="text-muted-foreground mb-4">
                  Follow us on GitHub to stay updated with the latest developments and be the first to know when the showcase launches.
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleGitHub}
                  className="w-full sm:w-auto"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Follow on GitHub
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-muted-foreground">
          <p>
            Made with 💙 by <a href="https://slabpixel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SlabPixel</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Showcase

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Clock, Sparkles, Layers, ExternalLink, Github } from 'lucide-react'

const Showcase = () => {
  const navigate = useNavigate()

  const handleGitHub = () => {
    window.open('https://github.com/Slabpixel/Webflow-Bits', '_blank')
  }

  const handleComponents = () => {
    navigate('/components')
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
        <div className="max-w-7xl mx-auto">
          {/* Main Hero Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-muted-foreground/5 border border-primary/20 p-4 pt-8 sm:p-12 lg:p-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-muted-foreground rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary/30 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              {/* Icon and Title Section */}
              <div className="text-center mb-12">
                <div className="relative inline-block mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-primary/25">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                  Something Amazing is
                  <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Coming Soon
                  </span>
                </h2>
                
                <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  We're crafting an incredible showcase that will transform how you see and use FlowBitz components.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Live Examples</h3>
                  <p className="text-sm text-muted-foreground">Interactive demos that showcase real functionality</p>
                </div>
                
                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ExternalLink className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Real Projects</h3>
                  <p className="text-sm text-muted-foreground">Actual implementations from real websites</p>
                </div>
                
                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Code Snippets</h3>
                  <p className="text-sm text-muted-foreground">Ready-to-use code you can copy instantly</p>
                </div>
                
                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Inspiration</h3>
                  <p className="text-sm text-muted-foreground">Creative ideas to spark your imagination</p>
                </div>
              </div>

              {/* What to Expect Section */}
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">What to Expect</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div className="group">
                    <div className="relative w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-primary">1</span>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Component Galleries</h4>
                    <p className="text-muted-foreground">Browse by category and explore all component variations with live previews</p>
                  </div>
                  
                  <div className="group">
                    <div className="relative w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-primary">2</span>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Use Case Examples</h4>
                    <p className="text-muted-foreground">See components in action within real website contexts and layouts</p>
                  </div>
                  
                  <div className="group">
                    <div className="relative w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-primary">3</span>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Code Playground</h4>
                    <p className="text-muted-foreground">Experiment with different configurations and see instant results</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              <Layers className="w-5 h-5"/>
              Browse Components
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-border hover:bg-accent px-8 py-3"
              onClick={handleGitHub}
            >
              <Github className="w-5 h-5"/>
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
                  <Github className="w-4 h-4" />
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

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button.jsx'
import { Zap, Plus, Layers, Github } from 'lucide-react'

const Home = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    document.getElementById('installation')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleGitHub = () => {
    window.open('https://github.com', '_blank')
  }

  return (
    <div className="bg-background text-foreground mt-[64px]">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center px-8 py-[64px]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground" 
                wb-text-animate="blur-text" wb-animate-by="words" wb-delay="200">
              Interactive Components for Webflow
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed" 
               wb-text-animate="blur-text" wb-animate-by="words" wb-delay="200">
              Create stunning animations and interactive effects with our powerful library of 15+ components. 
              Easy to use, performant, and designed specifically for Webflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" 
                onClick={() => navigate('/components')}
              >
                <Zap className="w-5 h-5" />
                Explore Components
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-border hover:bg-accent"
                onClick={handleGetStarted}
              >
                <Plus className="w-5 h-5" />
                Get Started
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-h-[500px] bg-card border border-border rounded-3xl flex items-center justify-center p-8" 
                 wb-animate="shape-blur"
                 wb-shape-variation="0"
                 wb-shape-size="1.2"
                 wb-roundness="0.4"
                 wb-border-size="0.05"
                 wb-circle-size="0.3"
                 wb-circle-edge="0.5"
                 wb-mouse-damp="8">
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" 
                wb-text-animate="text-type" wb-typing-speed="50" wb-deleting-speed="25">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create engaging web experiences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-8 text-center hover:bg-accent transition-all duration-300">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">15+ Components</h3>
              <p className="text-muted-foreground">Comprehensive library of text animations and interactive effects</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 text-center hover:bg-accent transition-all duration-300">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">GSAP Powered</h3>
              <p className="text-muted-foreground">Built on industry-standard animation library for smooth performance</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 text-center hover:bg-accent transition-all duration-300">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Easy Integration</h3>
              <p className="text-muted-foreground">Simple HTML attributes - no complex JavaScript required</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 text-center hover:bg-accent transition-all duration-300">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Responsive</h3>
              <p className="text-muted-foreground">Works perfectly across all devices and screen sizes</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 text-center hover:bg-accent transition-all duration-300">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Webflow Ready</h3>
              <p className="text-muted-foreground">Designed specifically for Webflow's visual editor</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 text-center hover:bg-accent transition-all duration-300">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Performance</h3>
              <p className="text-muted-foreground">Optimized for speed with minimal impact on page load</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-card border border-border rounded-3xl p-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Ready to enhance your Webflow projects?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers creating amazing experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                onClick={() => navigate('/components')}
              >
                <Layers className="w-5 h-5" />
                Start Building
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-border hover:bg-accent"
                onClick={handleGitHub}
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

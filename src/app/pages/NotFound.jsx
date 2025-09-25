import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button.jsx'
import { Home, ArrowLeft, Search } from 'lucide-react'
import SEO from '../components/SEO.jsx'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <>
      <SEO 
        title="404 - Page Not Found | FlowBitz"
        description="The page you're looking for doesn't exist. Explore our collection of interactive Webflow components or return to the homepage."
        keywords="404, page not found, flowbitz, webflow components"
        image="https:/www.slabpixel.dev/images/FlowBitz-OpenGraph.webp"
        url="https://www.flowbitz.dev/404"
      />
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl sm:text-9xl font-bold text-primary/20 mb-4">404</div>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-muted-foreground mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
            onClick={() => navigate('/')}
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-border hover:bg-accent px-8 py-3"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="bg-muted/30 rounded-xl p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-foreground mb-4">Maybe you're looking for:</h3>
          <div className="space-y-2">
            <button 
              onClick={() => navigate('/components')}
              className="block w-full text-left text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg px-3 py-2 transition-all duration-200"
            >
              <Search className="w-4 h-4 inline mr-2" />
              Browse Components
            </button>
            <button 
              onClick={() => navigate('/components/split-text')}
              className="block w-full text-left text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg px-3 py-2 transition-all duration-200"
            >
              <Search className="w-4 h-4 inline mr-2" />
              Split Text Component
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-sm text-muted-foreground">
          Made with 💙 by <a href="https://slabpixel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SlabPixel</a>
        </div>
      </div>
    </div>
    </>
  )
}

export default NotFound

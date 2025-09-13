import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button.jsx'
import { Mail, MessageSquare, Bug, HelpCircle, ExternalLink, Github, BookOpen, Users } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar.jsx'

const Support = () => {
  const navigate = useNavigate()

  const handleFAQ = () => {
    navigate('/faq')
  }

  const handleBugReport = () => {
    window.open('https://github.com/Slabpixel/Webflow-Bits/issues/new?template=bug_report.md&title=%5BBUG%5D%3A%20General-Report&labels=bug', '_blank')
  }

  const handleFeatureRequest = () => {
    window.open('https://github.com/Slabpixel/Webflow-Bits/issues/new?template=feature_request.md&title=%5BFEAT%5D%3A%20Feature-Request&labels=enhancement', '_blank')
  }

  const handleEmail = () => {
    window.open('mailto:hello@slabpixel.com?subject=FlowBitz Support Inquiry', '_blank')
  }

  const handleGitHub = () => {
    window.open('https://github.com/Slabpixel/Webflow-Bits', '_blank')
  }

  const handleSlabPixel = () => {
    window.open('https://slabpixel.com', '_blank')
  }

  const handleComponents = () => {
    navigate('/components')
  }

  return (
    <div className="bg-background text-foreground pt-[64px] min-h-screen">
      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-4rem)]">
        {/* Shared Sidebar */}
        <Sidebar showBackLink={false} />

        {/* Main Content */}
        <main className="flex flex-col p-4 sm:p-8 lg:p-16 w-full items-center lg:overflow-y-auto lg:h-full">
          <div className="w-full max-w-[970px] mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">Support & Help</h1>
            <p className="text-muted-foreground text-base sm:text-lg">Need help with FlowBitz? We're here to assist you. Find answers to common questions or get in touch with our team.</p>
          </div>

          <div className="w-full max-w-[970px]">
            {/* Support Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
              {/* FAQ */}
              <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="h-full flex flex-col justify-between text-center">
                  <div className="flex flex-col">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <HelpCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">FAQ</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Find answers to common questions about FlowBitz components
                    </p>
                  </div>
                  <Button 
                    onClick={handleFAQ}
                    variant="outline"
                    className="w-full"
                  >
                    <BookOpen className="w-4 h-4" />
                    Browse FAQ
                  </Button>
                </div>
              </div>

              {/* Email Support */}
              <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="h-full flex flex-col justify-between text-center">
                  <div className="flex flex-col">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Email Support</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get direct help from our support team
                    </p>
                  </div>
                  <Button 
                    onClick={handleEmail}
                    variant="outline"
                    className="w-full"
                  >
                    <Mail className="w-4 h-4" />
                    Send Email
                  </Button>
                </div>
              </div>

              {/* GitHub Issues */}
              <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="h-full flex flex-col justify-between text-center">
                  <div className="flex flex-col">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Github className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">GitHub</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Report bugs and request features on GitHub
                    </p>
                  </div>
                  <Button 
                    onClick={handleGitHub}
                    variant="outline"
                    className="w-full"
                  >
                    <Github className="w-4 h-4" />
                    View Repository
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <Button 
                    onClick={handleBugReport}
                    variant="outline"
                    size="lg"
                    className="w-full justify-start p-0 border-none hover:bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Bug className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Report a Bug</div>
                        <div className="text-sm text-muted-foreground">Found an issue? Let us know</div>
                      </div>
                    </div>
                  </Button>
                </div>

                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <Button 
                    onClick={handleFeatureRequest}
                    variant="outline"
                    size="lg"
                    className="w-full justify-start p-0 border-none hover:bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <HelpCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Request Feature</div>
                        <div className="text-sm text-muted-foreground">Suggest new functionality</div>
                      </div>
                    </div>
                  </Button>
                </div>

                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <Button 
                    onClick={handleComponents}
                    variant="outline"
                    size="lg"
                    className="w-full justify-start p-0 border-none hover:bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Browse Components</div>
                        <div className="text-sm text-muted-foreground">Explore our component library</div>
                      </div>
                    </div>
                  </Button>
                </div>

                <div className="group relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <Button 
                    onClick={handleSlabPixel}
                    variant="outline"
                    size="lg"
                    className="w-full justify-start p-0 border-none hover:bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Visit SlabPixel</div>
                        <div className="text-sm text-muted-foreground">Learn more about our team</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="w-full max-w-[970px] text-center text-muted-foreground text-sm mt-8 sm:mt-12">
              Made with 💙 by <a href="https://slabpixel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SlabPixel</a>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Support

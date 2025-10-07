import React, { useState } from 'react'
import { Button } from '../components/ui/button.jsx'
import { Input } from '../components/ui/input.jsx'
import { Textarea } from '../components/ui/textarea.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Upload, Send, CheckCircle, AlertCircle } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import Footer from '../components/layout/Footer.jsx'

const ShowcaseSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    projectName: '',
    description: '',
    liveUrl: '',
    components: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('https://slabpixel.dev/api/send-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'showcase-submit',
          name: formData.name,
          email: formData.email,
          subject: formData.projectName,
          message: formData.description,
          projectName: formData.projectName,
          liveUrl: formData.liveUrl,
          components: formData.components
        })
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          name: '',
          email: '',
          projectName: '',
          description: '',
          liveUrl: '',
          components: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Submit Your FlowBitz Showcase",
    "description": "Share your FlowBitz implementations with the community. Submit your projects to be featured in our showcase gallery.",
    "url": "https://www.flowbitz.dev/showcase/submit"
  }

  return (
    <>
      <SEO 
        title="Submit Your Showcase - FlowBitz"
        description="Share your FlowBitz implementations with the community. Submit your projects to be featured in our showcase gallery."
        keywords="flowbitz showcase submit, webflow showcase, flowbitz community, webflow projects showcase"
        image="https://www.slabpixel.dev/images/FlowBitz-OpenGraph.webp"
        url="https://www.flowbitz.dev/showcase/submit"
        structuredData={structuredData}
      />
      
      <div className="bg-background text-foreground pt-[64px] min-h-screen">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col items-center w-full mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Share Your Project
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Built something cool with FlowBitz? Share it with the community! 
                Just fill out this simple form and we'll feature your work.
              </p>
            </div>

            {/* Main Form */}
            <div className="w-full max-w-4xl">
              <Card className="border border-border shadow-sm p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                {/* Simple Form Fields */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name *
                        </label>
                        <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                        </label>
                        <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        placeholder="john@example.com"
                        />
                    </div>
                    </div>

                    <div>
                    <label htmlFor="projectName" className="block text-sm font-medium mb-2">
                        Project Name *
                    </label>
                    <Input
                        id="projectName"
                        type="text"
                        value={formData.projectName}
                        onChange={(e) => handleInputChange('projectName', e.target.value)}
                        required
                        placeholder="My Awesome Website"
                    />
                    </div>

                    <div>
                    <label htmlFor="liveUrl" className="block text-sm font-medium mb-2">
                        Website URL *
                    </label>
                    <Input
                        id="liveUrl"
                        type="url"
                        value={formData.liveUrl}
                        onChange={(e) => handleInputChange('liveUrl', e.target.value)}
                        required
                        placeholder="https://yourproject.com"
                    />
                    </div>

                    <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                        Description *
                    </label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        required
                        placeholder="Tell us about your project in 1-2 sentences..."
                        rows={3}
                    />
                    </div>

                    <div>
                    <label htmlFor="components" className="block text-sm font-medium mb-2">
                        FlowBitz Components Used
                    </label>
                    <Input
                        id="components"
                        type="text"
                        value={formData.components}
                        onChange={(e) => handleInputChange('components', e.target.value)}
                        placeholder="e.g., Gradient Button, Text Reveal, Hover Effects..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                        Which FlowBitz components did you use? (Optional but helpful!)
                    </p>
                    </div>
                </div>

                {/* Submit Button */}
                    <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                    {isSubmitting ? (
                        <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                        </>
                    ) : (
                        <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit for Showcase
                        </>
                    )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-3">
                    By submitting, you agree that your project may be featured in our showcase gallery.
                    </p>
                </form>
              </Card>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="w-full max-w-4xl mt-4 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Submission Received!</h3>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    Awesome! We've received your submission. We'll take a look and get back to you soon. 
                    Thanks for sharing your work with the FlowBitz community! 🎉
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="w-full max-w-4xl mt-4 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Submission Failed</h3>
                  <p className="text-sm text-red-600 dark:text-red-300">
                    There was an error submitting your project. Please try again or contact us directly at flowbitz@slabpixel.com
                  </p>
                </div>
              </div>
            )}

            {/* Simple Guidelines */}
            <div className="w-full max-w-4xl mt-4">
              <Card className="border border-border p-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Simple Requirements
                  </CardTitle>
                  <CardDescription>
                    Just make sure your project meets these basic criteria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">✅ What we need:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Uses FlowBitz components</li>
                        <li>• Live, working website</li>
                        <li>• Your original work</li>
                        <li>• Looks good on mobile & desktop</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">💡 Bonus points for:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Creative use of animations</li>
                        <li>• Unique design approach</li>
                        <li>• Great user experience</li>
                        <li>• Inspiring other developers</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}

export default ShowcaseSubmit

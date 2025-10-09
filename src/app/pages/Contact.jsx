import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../components/ui/button.jsx'
import { Input } from '../components/ui/input.jsx'
import { Textarea } from '../components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Mail, Bug, Lightbulb, Send, CheckCircle, AlertCircle } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import Footer from '../components/layout/Footer.jsx'

const Contact = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState('contact')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal',
    browser: '',
    url: '',
    steps: '',
    category: 'text-effects',
    useCase: ''
  })

  // Handle URL parameters for tab switching
  useEffect(() => {
    const tab = searchParams.get('tab')
    const component = searchParams.get('component')
    
    if (tab && ['contact', 'report', 'feature'].includes(tab)) {
      setActiveTab(tab === 'report' ? 'bug-report' : tab === 'feature' ? 'feature-request' : 'contact')
    }
    
    // Pre-fill subject with component information if coming from component page
    if (component) {
      const componentName = component.charAt(0).toUpperCase() + component.slice(1).replace(/-/g, ' ')
      if (tab === 'report') {
        setFormData(prev => ({
          ...prev,
          subject: `Bug in ${componentName} component`
        }))
      } else if (tab === 'feature') {
        setFormData(prev => ({
          ...prev,
          subject: `Feature request for ${componentName} component`
        }))
      }
    }
  }, [searchParams])

  const handleTabChange = (value) => {
    setActiveTab(value)
    // Update URL parameter
    const newTab = value === 'bug-report' ? 'report' : value === 'feature-request' ? 'feature' : 'contact'
    setSearchParams({ tab: newTab })
    setSubmitStatus(null)
  }

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
          formType: activeTab,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          priority: formData.priority,
          browser: formData.browser,
          url: formData.url,
          steps: formData.steps,
          category: formData.category,
          useCase: formData.useCase
        })
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          priority: 'normal',
          browser: '',
          url: '',
          steps: '',
          category: 'text-effects',
          useCase: ''
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

  const getFormTitle = () => {
    switch (activeTab) {
      case 'contact':
        return 'Contact Us'
      case 'bug-report':
        return 'Report a Bug'
      case 'feature-request':
        return 'Request a Feature'
      default:
        return 'Contact Us'
    }
  }

  const getFormDescription = () => {
    switch (activeTab) {
      case 'contact':
        return 'Get in touch with our team. We\'d love to hear from you!'
      case 'bug-report':
        return 'Found a bug? Help us fix it by providing detailed information.'
      case 'feature-request':
        return 'Have an idea for a new feature? We\'d love to hear your suggestions!'
      default:
        return 'Get in touch with our team.'
    }
  }

  return (
    <>
      <SEO 
        title="Contact FlowBitz - Get Support & Submit Feedback"
        description="Contact the FlowBitz team for support, bug reports, or feature requests. Get help with your Webflow animations and provide feedback."
        keywords="contact flowbitz, webflow support, bug report, feature request, animation help"
      />
      
      <div className="bg-background text-foreground pt-[64px] min-h-screen">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col items-center w-full mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                {getFormTitle()}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {getFormDescription()}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-col gap-12 items-center w-full max-w-3xl">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full flex flex-col gap-6 items-center">
                  <TabsList className="grid w-fit grid-cols-3">
                    <TabsTrigger value="contact" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact Us
                    </TabsTrigger>
                    <TabsTrigger value="bug-report" className="flex items-center gap-2">
                      <Bug className="w-4 h-4" />
                      Bug Report
                    </TabsTrigger>
                    <TabsTrigger value="feature-request" className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Feature Request
                    </TabsTrigger>
                  </TabsList>

                  {/* Contact Form */}
                  <TabsContent value="contact" className="w-full p-8 bg-card shadow-sm border border-border rounded-xl">
                    <div>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                              Name *
                            </label>
                            <Input
                              id="name"
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              required
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                              Email *
                            </label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              required
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium mb-2">
                            Subject
                          </label>
                          <Input
                            id="subject"
                            type="text"
                            value={formData.subject}
                            onChange={(e) => handleInputChange('subject', e.target.value)}
                            placeholder="What's this about?"
                          />
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium mb-2">
                            Message *
                          </label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            required
                            placeholder="Tell us how we can help..."
                            rows={6}
                          />
                        </div>

                        <Button type="submit" variant="animated" disabled={isSubmitting} className="w-full">
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </div>
                  </TabsContent>

                  {/* Bug Report Form */}
                  <TabsContent value="bug-report" className="w-full p-8 bg-card shadow-sm border border-border rounded-xl">
                    <div>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                              Name *
                            </label>
                            <Input
                              id="name"
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              required
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                              Email *
                            </label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              required
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium mb-2">
                            Bug Title *
                          </label>
                          <Input
                            id="subject"
                            type="text"
                            value={formData.subject}
                            onChange={(e) => handleInputChange('subject', e.target.value)}
                            required
                            placeholder="Brief description of the bug"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <label htmlFor="priority" className="block text-sm font-medium mb-2">
                              Priority
                            </label>
                            <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label htmlFor="browser" className="block text-sm font-medium mb-2">
                              Browser
                            </label>
                            <Input
                              id="browser"
                              type="text"
                              value={formData.browser}
                              onChange={(e) => handleInputChange('browser', e.target.value)}
                              placeholder="e.g., Chrome 120, Firefox 121"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="url" className="block text-sm font-medium mb-2">
                            URL where bug occurred
                          </label>
                          <Input
                            id="url"
                            type="url"
                            value={formData.url}
                            onChange={(e) => handleInputChange('url', e.target.value)}
                            placeholder="https://example.com/page"
                          />
                        </div>

                        <div>
                          <label htmlFor="steps" className="block text-sm font-medium mb-2">
                            Steps to reproduce
                          </label>
                          <Textarea
                            id="steps"
                            value={formData.steps}
                            onChange={(e) => handleInputChange('steps', e.target.value)}
                            placeholder="1. Go to... 2. Click... 3. See error..."
                            rows={4}
                          />
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium mb-2">
                            Bug Description *
                          </label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            required
                            placeholder="Describe the bug in detail..."
                            rows={6}
                          />
                        </div>

                        <Button type="submit" variant="animated" disabled={isSubmitting} className="w-full">
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Bug className="w-4 h-4 mr-2" />
                              Report Bug
                            </>
                          )}
                        </Button>
                      </form>
                    </div>
                  </TabsContent>

                  {/* Feature Request Form */}
                  <TabsContent value="feature-request" className="w-full p-8 bg-card shadow-sm border border-border rounded-xl">
                    <div>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                              Name *
                            </label>
                            <Input
                              id="name"
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              required
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                              Email *
                            </label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              required
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium mb-2">
                            Feature Title *
                          </label>
                          <Input
                            id="subject"
                            type="text"
                            value={formData.subject}
                            onChange={(e) => handleInputChange('subject', e.target.value)}
                            required
                            placeholder="Brief title for your feature request"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <label htmlFor="category" className="block text-sm font-medium mb-2">
                              Category
                            </label>
                            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="components">Components</SelectItem>
                                <SelectItem value="animations">Animations</SelectItem>
                                <SelectItem value="performance">Performance</SelectItem>
                                <SelectItem value="accessibility">Accessibility</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label htmlFor="priority" className="block text-sm font-medium mb-2">
                              Priority
                            </label>
                            <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="useCase" className="block text-sm font-medium mb-2">
                            Use Case
                          </label>
                          <Textarea
                            id="useCase"
                            value={formData.useCase}
                            onChange={(e) => handleInputChange('useCase', e.target.value)}
                            placeholder="Describe how you would use this feature..."
                            rows={4}
                          />
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium mb-2">
                            Feature Description *
                          </label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            required
                            placeholder="Describe the feature in detail..."
                            rows={6}
                          />
                        </div>

                        <Button type="submit" variant="animated" disabled={isSubmitting} className="w-full">
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Lightbulb className="w-4 h-4 mr-2" />
                              Request Feature
                            </>
                          )}
                        </Button>
                      </form>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="w-full max-w-3xl mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Success!</h3>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    Your {activeTab === 'contact' ? 'message' : activeTab === 'bug-report' ? 'bug report' : 'feature request'} has been sent successfully. We'll get back to you soon!
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="w-full max-w-3xl mt-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Error</h3>
                  <p className="text-sm text-red-600 dark:text-red-300">
                    There was an error sending your message. Please try again or contact us directly at flowbitz@slabpixel.com
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}

export default Contact

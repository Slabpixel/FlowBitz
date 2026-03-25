import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../components/ui/button.jsx'
import { Input } from '../components/ui/input.jsx'
import { Textarea } from '../components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx'
import { CheckCircle, AlertCircle, Send, Bug, Lightbulb, Mail } from 'lucide-react'
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

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact FlowBitz',
    description:
      "Contact the FlowBitz team for support, bug reports, or feature requests. Get help with your Webflow animations and provide feedback.",
    url: 'https://www.flowbitz.dev/contact',
    publisher: {
      '@type': 'Organization',
      name: 'SlabPixel Studio',
      url: 'https://slabpixel.com',
    },
  }

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
        title="Contact FlowBitz | Support, Bug Reports & Feature Requests"
        description="Contact the FlowBitz team for support, bug reports, or feature requests. Get help with your Webflow animations."
        keywords="FlowBitz contact, webflow support, bug report, feature request, animation help, FlowBitz team"
        image="https://www.slabpixel.dev/images/FlowBitz-OpenGraph.webp"
        url="https://www.flowbitz.dev/contact"
        structuredData={structuredData}
      />
      
      <div className="bg-transparent text-foreground relative z-[2]">
        <div className="mx-2 lg:mx-auto max-w-[1200px] border-x border-foreground/10">
          <div className="flex flex-col items-center w-full mx-auto">
            {/* Header */}
            <div className="text-center my-10">
              <h1 className="inter-med-40 text-foreground mb-2">
                {getFormTitle()}
              </h1>
              <p className="inter-reg-18 mx-auto text-text-medium opacity-80">
                {getFormDescription()}
              </p>
            </div>

            {/* Form Area */}
            <div className="flex flex-col gap-10 items-center w-full max-w-3xl px-4 pb-16">

              {/* Contact Form */}
              {activeTab === 'contact' && (
                <div className="w-full p-6 rounded bg-base-low border border-foreground/10">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
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
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                          Your Email
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

                    <div className='mt-3'>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2 text-foreground">
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

                    <div className='mt-3'>
                      <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                        Messages *
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        placeholder="What's this about?"
                        rows={6}
                        className="bg-base-medium border-base-high resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="custom"
                      size="custom"
                      disabled={isSubmitting}
                      className="mt-6 w-full bg-foreground text-background hover:bg-text-medium font-semibold h-10 rounded-lg text-base inline-flex items-center justify-center gap-4 transition-colors disabled:pointer-events-none disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className='w-[0.875rem] h-3 opacity-60'/>
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}

              {/* Bug Report Form */}
              {activeTab === 'bug-report' && (
                <div className="w-full p-6 rounded bg-base-low border border-foreground/10">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
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
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
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

                    <div className="mt-3">
                      <label htmlFor="subject" className="block text-sm font-medium mb-2 text-foreground">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <label htmlFor="priority" className="block text-sm font-medium mb-2 text-foreground">
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
                        <label htmlFor="browser" className="block text-sm font-medium mb-2 text-foreground">
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

                    <div className="mt-3">
                      <label htmlFor="url" className="block text-sm font-medium mb-2 text-foreground">
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

                    <div className="mt-3">
                      <label htmlFor="steps" className="block text-sm font-medium mb-2 text-foreground">
                        Steps to reproduce
                      </label>
                      <Textarea
                        id="steps"
                        value={formData.steps}
                        onChange={(e) => handleInputChange('steps', e.target.value)}
                        placeholder="1. Go to... 2. Click... 3. See error..."
                        rows={4}
                        className="bg-base-medium border-base-high resize-none"
                      />
                    </div>

                    <div className="mt-3">
                      <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                        Bug Description *
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        placeholder="Describe the bug in detail..."
                        rows={6}
                        className="bg-base-medium border-base-high resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="custom"
                      size="custom"
                      disabled={isSubmitting}
                      className="mt-6 w-full bg-foreground text-background hover:bg-text-medium font-semibold h-10 rounded-lg text-base inline-flex items-center justify-center gap-4 transition-colors disabled:pointer-events-none disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Report Bug
                          <Bug className='w-[0.875rem] h-3 opacity-60'/>
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}

              {/* Feature Request Form */}
              {activeTab === 'feature-request' && (
                <div className="w-full p-6 rounded bg-base-low border border-foreground/10">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
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
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
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

                    <div className="mt-3">
                      <label htmlFor="subject" className="block text-sm font-medium mb-2 text-foreground">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium mb-2 text-foreground">
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
                        <label htmlFor="priority" className="block text-sm font-medium mb-2 text-foreground">
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

                    <div className="mt-3">
                      <label htmlFor="useCase" className="block text-sm font-medium mb-2 text-foreground">
                        Use Case
                      </label>
                      <Textarea
                        id="useCase"
                        value={formData.useCase}
                        onChange={(e) => handleInputChange('useCase', e.target.value)}
                        placeholder="Describe how you would use this feature..."
                        rows={4}
                        className="bg-base-medium border-base-high resize-none"
                      />
                    </div>

                    <div className="mt-3">
                      <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                        Feature Description *
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        placeholder="Describe the feature in detail..."
                        rows={6}
                        className="bg-base-medium border-base-high resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="custom"
                      size="custom"
                      disabled={isSubmitting}
                      className="mt-6 w-full bg-foreground text-background hover:bg-text-medium font-semibold h-10 rounded-lg text-base inline-flex items-center justify-center gap-4 transition-colors disabled:pointer-events-none disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Request Feature
                          <Lightbulb className='w-[0.875rem] h-3 opacity-60'/>
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="w-full p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Success!</h3>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      Your {activeTab === 'contact' ? 'message' : activeTab === 'bug-report' ? 'bug report' : 'feature request'} has been sent successfully. We'll get back to you soon!
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="w-full p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-4">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Error</h3>
                    <p className="text-sm text-red-600 dark:text-red-300">
                      There was an error sending your message. Please try again or contact us directly at flowbitz@slabpixel.com
                    </p>
                  </div>
                </div>
              )}

              {/* Other Topics Navigation */}
              <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-6">
                <h2 className="inter-semi-24 text-foreground">Other topics?</h2>
                <div className="flex gap-3">
                  {activeTab !== 'contact' && (
                    <Button
                      variant="custom"
                      size="custom"
                      onClick={() => handleTabChange('contact')}
                      className="border border-foreground/20 rounded-none text-link font-medium text-foreground hover:bg-foreground/5 gap-2 px-4 h-11"
                    >
                      <Mail className='w-[0.875rem] h-[0.875rem] opacity-60'/>
                      Contact Us
                    </Button>
                  )}
                  {activeTab !== 'bug-report' && (
                    <Button
                      variant="custom"
                      size="custom"
                      onClick={() => handleTabChange('bug-report')}
                      className="border border-foreground/20 rounded-none text-link font-medium text-foreground hover:bg-foreground/5 gap-2 px-4 h-11"
                    >
                      <Bug className='w-[0.875rem] h-[0.875rem] opacity-60'/>
                      Bug Report
                    </Button>
                  )}
                  {activeTab !== 'feature-request' && (
                    <Button
                      variant="custom"
                      size="custom"
                      onClick={() => handleTabChange('feature-request')}
                      className="border border-foreground/20 rounded-none text-link font-medium text-foreground hover:bg-foreground/5 gap-2 px-4 h-11"
                    >
                      <Lightbulb className='w-[0.875rem] h-[0.875rem] opacity-60'/>
                      Request Feature
                    </Button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
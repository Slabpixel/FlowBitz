import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Bug, Lightbulb, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from './ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.jsx'
import { Input } from './ui/input.jsx'
import { Textarea } from './ui/textarea.jsx'
import { Label } from './ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select.jsx'

const ContactBubble = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('contact')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const bubbleRef = useRef(null)
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

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isContactFormOpen && bubbleRef.current && !bubbleRef.current.contains(event.target)) {
        setIsContactFormOpen(false)
        setSubmitStatus(null)
        setActiveTab('contact')
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
      }
    }

    if (isContactFormOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isContactFormOpen])

  const handleTabChange = (value) => {
    setActiveTab(value)
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

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={bubbleRef}>
      {/* Morphing Bubble/Card Container */}
      <div
        onClick={() => !isContactFormOpen && setIsContactFormOpen(true)}
          className={`
          relative
          ${isContactFormOpen 
            ? 'w-[90vw] sm:w-[560px] bg-background/95 backdrop-blur-md border-2 border-border/50 shadow-2xl overflow-hidden' 
            : 'h-12 w-12 bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/50 cursor-pointer overflow-hidden hover:w-[130px] hover:px-3 group'
          }
        `}
          style={{
          transformOrigin: 'bottom right',
          borderRadius: isContactFormOpen ? '0.5rem' : '9999px', // rounded-lg = 0.5rem, rounded-full = 9999px
          transition: isContactFormOpen 
            ? 'width 0ms ease-out, height 0ms ease-out, background 0ms ease-out, border 0ms ease-out, box-shadow 0ms ease-out, border-radius 0ms ease-out'
            : 'width 300ms ease-out, padding 300ms ease-out, border-radius 0ms ease-out',
        }}
      >
        {/* Bubble Icon - Hidden immediately when expanded */}
        {!isContactFormOpen && (
          <div className="flex items-center justify-center h-full px-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-white flex-shrink-0" />
              <span className="text-sm font-medium text-white whitespace-nowrap hidden group-hover:inline transition-opacity duration-100">
                Contact Us
              </span>
            </div>
          </div>
        )}

        {/* Card Content - Shown after morph completes, hidden before container morphs back */}
        <div 
          className={`
            transition-all duration-200 ease-out
            ${isContactFormOpen 
              ? 'opacity-100 delay-100 pointer-events-auto scale-100' 
              : 'opacity-0 pointer-events-none scale-95 delay-0 duration-0'
            }
          `}
        >
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">Get in Touch</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsContactFormOpen(false)
                    setSubmitStatus(null)
                    setActiveTab('contact')
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
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="contact" className="text-xs sm:text-sm">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden sm:inline">Contact</span>
                  </TabsTrigger>
                  <TabsTrigger value="bug-report" className="text-xs sm:text-sm">
                    <Bug className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden sm:inline">Bug</span>
                  </TabsTrigger>
                  <TabsTrigger value="feature-request" className="text-xs sm:text-sm">
                    <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden sm:inline">Feature</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Contact Form */}
                <TabsContent value="contact" className="space-y-4 mt-0">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Name *</Label>
                        <Input 
                          id="contact-name" 
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email *</Label>
                        <Input 
                          id="contact-email" 
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-subject">Subject</Label>
                      <Input 
                        id="contact-subject" 
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="What's this about?"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Message *</Label>
                      <Textarea 
                        id="contact-message" 
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        placeholder="Tell us how we can help..."
                        rows={4}
                        className="min-h-[80px]"
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
                </TabsContent>
                
                {/* Bug Report Form */}
                <TabsContent value="bug-report" className="space-y-4 mt-0">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bug-name">Name *</Label>
                        <Input 
                          id="bug-name" 
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bug-email">Email *</Label>
                        <Input 
                          id="bug-email" 
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bug-subject">Bug Title *</Label>
                      <Input 
                        id="bug-subject" 
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                        placeholder="Brief description of the bug"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bug-priority">Priority</Label>
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
                      <div className="space-y-2">
                        <Label htmlFor="bug-browser">Browser</Label>
                        <Input 
                          id="bug-browser" 
                          type="text"
                          value={formData.browser}
                          onChange={(e) => handleInputChange('browser', e.target.value)}
                          placeholder="e.g., Chrome 120, Firefox 121"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bug-url">URL where bug occurred</Label>
                      <Input 
                        id="bug-url" 
                        type="url"
                        value={formData.url}
                        onChange={(e) => handleInputChange('url', e.target.value)}
                        placeholder="https://example.com/page"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bug-steps">Steps to reproduce</Label>
                      <Textarea 
                        id="bug-steps" 
                        value={formData.steps}
                        onChange={(e) => handleInputChange('steps', e.target.value)}
                        placeholder="1. Go to... 2. Click... 3. See error..."
                        rows={3}
                        className="min-h-[60px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bug-message">Bug Description *</Label>
                      <Textarea 
                        id="bug-message" 
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        placeholder="Describe the bug in detail..."
                        rows={4}
                        className="min-h-[80px]"
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
                </TabsContent>
                
                {/* Feature Request Form */}
                <TabsContent value="feature-request" className="space-y-4 mt-0">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="feature-name">Name *</Label>
                        <Input 
                          id="feature-name" 
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feature-email">Email *</Label>
                        <Input 
                          id="feature-email" 
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="feature-subject">Feature Title *</Label>
                      <Input 
                        id="feature-subject" 
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                        placeholder="Brief title for your feature request"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="feature-category">Category</Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text-effects">Text Effects</SelectItem>
                            <SelectItem value="components">Components</SelectItem>
                            <SelectItem value="animations">Animations</SelectItem>
                            <SelectItem value="performance">Performance</SelectItem>
                            <SelectItem value="accessibility">Accessibility</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feature-priority">Priority</Label>
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
                    <div className="space-y-2">
                      <Label htmlFor="feature-useCase">Use Case</Label>
                      <Textarea 
                        id="feature-useCase" 
                        value={formData.useCase}
                        onChange={(e) => handleInputChange('useCase', e.target.value)}
                        placeholder="Describe how you would use this feature..."
                        rows={3}
                        className="min-h-[60px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="feature-message">Feature Description *</Label>
                      <Textarea 
                        id="feature-message" 
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        placeholder="Describe the feature in detail..."
                        rows={4}
                        className="min-h-[80px]"
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
                </TabsContent>
              </Tabs>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-green-800 dark:text-green-200">Success!</h3>
                    <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                      Your {activeTab === 'contact' ? 'message' : activeTab === 'bug-report' ? 'bug report' : 'feature request'} has been sent successfully. We'll get back to you soon!
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-red-800 dark:text-red-200">Error</h3>
                    <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                      There was an error sending your message. Please try again or contact us directly at flowbitz@slabpixel.com
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ContactBubble


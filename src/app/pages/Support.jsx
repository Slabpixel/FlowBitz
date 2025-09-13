import React, { useState } from 'react'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Input } from '../components/ui/input.jsx'
import { Label } from '../components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Send, Mail, MessageSquare, Bug, HelpCircle, CheckCircle, ExternalLink } from 'lucide-react'

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    type: 'general',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Try Vercel function first
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            name: '',
            email: '',
            subject: '',
            type: 'general',
            message: ''
          })
        }, 3000)
      } else {
        throw new Error('API not available')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      
      // Fallback: Open email client
      const subject = encodeURIComponent(`[${formData.type.toUpperCase()}] ${formData.subject}`)
      const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Type: ${formData.type}
Subject: ${formData.subject}

Message:
${formData.message}
      `)
      
      const mailtoLink = `mailto:hello@slabpixel.com?subject=${subject}&body=${body}`
      window.open(mailtoLink)
      
      // Show success message anyway
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          subject: '',
          type: 'general',
          message: ''
        })
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFAQ = () => {
    window.location.href = '/faq'
  }

  return (
    <div className="bg-background text-foreground pt-[64px] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Support & Help
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Need help with FlowBitz? We're here to assist you. Find answers to common questions or get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="w-full">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-2xl">Get in Touch</CardTitle>
                    <CardDescription>
                      Send us a message and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground">
                          Thank you for your message. We'll get back to you soon.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name *</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              placeholder="Your name"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="your@email.com"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="type">Type of Inquiry</Label>
                          <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">
                                <div className="flex items-center gap-2">
                                  <MessageSquare className="w-4 h-4" />
                                  General Question
                                </div>
                              </SelectItem>
                              <SelectItem value="bug">
                                <div className="flex items-center gap-2">
                                  <Bug className="w-4 h-4" />
                                  Bug Report
                                </div>
                              </SelectItem>
                              <SelectItem value="feature">
                                <div className="flex items-center gap-2">
                                  <HelpCircle className="w-4 h-4" />
                                  Feature Request
                                </div>
                              </SelectItem>
                              <SelectItem value="support">
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4" />
                                  Technical Support
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => handleInputChange('subject', e.target.value)}
                            placeholder="Brief description of your inquiry"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message *</Label>
                          <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            placeholder="Please provide details about your inquiry..."
                            className="w-full min-h-[120px] px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            required
                          />
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-primary hover:bg-primary/90 text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
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
                    )}
                  </CardContent>
                </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">hello@slabpixel.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Response Time</p>
                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-xl">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleFAQ}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  <span>FAQ</span>
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/components'}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Browse Components
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open('https://github.com/Slabpixel/Webflow-Bits', '_blank')}
                >
                  <Bug className="w-4 h-4 mr-2" />
                  GitHub Issues
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open('https://slabpixel.com', '_blank')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Visit SlabPixel
                </Button>
              </CardContent>
            </Card>

            {/* Support Types */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-xl">Support Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">General</Badge>
                  <span className="text-sm text-muted-foreground">Questions about usage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">Bug Report</Badge>
                  <span className="text-sm text-muted-foreground">Report issues</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Feature</Badge>
                  <span className="text-sm text-muted-foreground">Request new features</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">Support</Badge>
                  <span className="text-sm text-muted-foreground">Technical assistance</span>
                </div>
              </CardContent>
            </Card>
          </div>
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

export default Support

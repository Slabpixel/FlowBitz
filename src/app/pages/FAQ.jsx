import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Button } from '../components/ui/button.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageSquare, ExternalLink, Github, Bug, Heart } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar.jsx'
import SEO from '../components/SEO.jsx'
import { useNavigate } from 'react-router-dom'

const FAQ = () => {
  const [openItems, setOpenItems] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const faqCategories = [
    { key: 'installation', label: 'Installation', icon: '🔧' },
    { key: 'usage', label: 'Usage', icon: '💡' },
    { key: 'customization', label: 'Customization', icon: '🎨' },
    { key: 'troubleshooting', label: 'Troubleshooting', icon: '🔧' },
    { key: 'general', label: 'General', icon: '❓' }
  ]

  const faqItems = [
    // Installation
    {
      question: "How do I install FlowBitz components?",
      answer: "Installing FlowBitz is incredibly simple! Just add one script tag to your Webflow project's custom code section, then add HTML attributes to any element. No complex setup, no multiple files - just one script and you're ready to add professional GSAP animations.",
      category: "installation"
    },
    {
      question: "Do I need to install GSAP separately?",
      answer: "No! FlowBitz includes GSAP and all necessary plugins bundled in. Just add our single script tag and everything will work automatically.",
      category: "installation"
    },
    {
      question: "Can I use FlowBitz with other frameworks besides Webflow?",
      answer: "FlowBitz is specifically designed for Webflow, but the core JavaScript can be adapted for other frameworks. However, we recommend using it with Webflow for the best experience.",
      category: "installation"
    },
    {
      question: "What's the difference between the UMD and ES module versions?",
      answer: "The UMD version works in any environment and is recommended for most users. The ES module version is for modern bundlers. For Webflow, use the UMD version.",
      category: "installation"
    },

    // Usage
    {
      question: "Do I need to know JavaScript to use FlowBitz?",
      answer: "Absolutely not! FlowBitz is specifically designed for designers who want professional animations without coding. Just add HTML attributes to your Webflow elements - no JavaScript knowledge required. This is what makes FlowBitz different from manual GSAP coding.",
      category: "usage"
    },
    {
      question: "How do I add a component to my Webflow project?",
      answer: "1. Add the FlowBitz script to your project's custom code section. 2. Select any text element in Webflow. 3. Go to Element Settings → Custom Attributes. 4. Add 'wb-component' as the attribute name and the component name (like 'split-text') as the value. 5. Publish your site!",
      category: "usage"
    },
    {
      question: "Can I use multiple components on the same page?",
      answer: "Yes, you can use multiple components on the same page, but we recommend limiting it to 2-3 components to maintain good performance and user experience.",
      category: "usage"
    },
    {
      question: "Will FlowBitz work on mobile devices?",
      answer: "Yes, all components are fully responsive and optimized for mobile devices. However, consider disabling some effects on mobile for better performance using Webflow's responsive design features.",
      category: "usage"
    },

    // Customization
    {
      question: "Can I customize the animations?",
      answer: "Absolutely! Each component comes with various attributes to customize timing, easing, colors, and behavior. Check the component documentation for all available customization options.",
      category: "customization"
    },
    {
      question: "How do I change animation timing and delays?",
      answer: "Most components have attributes like 'wb-delay', 'wb-duration', and 'wb-stagger-delay' that let you control timing. Check each component's documentation for specific attributes.",
      category: "customization"
    },
    {
      question: "Can I change colors and styling?",
      answer: "Yes! Many components support color customization through attributes like 'wb-color', 'wb-gradient', and 'wb-text-color'. You can also use CSS to override styles if needed.",
      category: "customization"
    },
    {
      question: "How do I make animations trigger on scroll?",
      answer: "Most components automatically trigger on scroll by default. You can control this with attributes like 'wb-trigger' and 'wb-scroll-offset' to customize when animations start.",
      category: "customization"
    },

    // Troubleshooting
    {
      question: "My animations aren't working. What should I check?",
      answer: "1. Make sure the FlowBitz script is loaded. 2. Check that you have the correct wb-component attribute. 3. Verify the component name is spelled correctly. 4. Check browser console for errors. 5. Ensure your element has text content.",
      category: "troubleshooting"
    },
    {
      question: "The component is working but looks different than expected.",
      answer: "This is usually due to CSS conflicts. Check if your Webflow styles are overriding FlowBitz styles. Try adding !important to FlowBitz styles or adjusting your CSS specificity.",
      category: "troubleshooting"
    },
    {
      question: "Animations are slow or choppy on mobile.",
      answer: "This is common on mobile devices. Consider reducing the number of components, using simpler animations, or disabling effects on mobile using Webflow's responsive design features.",
      category: "troubleshooting"
    },
    {
      question: "The component doesn't work with certain Webflow elements.",
      answer: "FlowBitz works best with text elements. Some complex Webflow elements or nested structures might not work properly. Try using simpler text elements or check the component documentation for compatibility notes.",
      category: "troubleshooting"
    },

    // General
    {
      question: "Are FlowBitz components free to use?",
      answer: "Yes! FlowBitz is 100% free forever with no premium tiers, hidden costs, or usage limits. Unlike expensive animation libraries, we believe professional web animations shouldn't be a luxury. You can use, modify, and distribute them without any restrictions.",
      category: "general"
    },
    {
      question: "Can I use FlowBitz in commercial projects?",
      answer: "Absolutely! FlowBitz is free for both personal and commercial use. There are no licensing restrictions or fees.",
      category: "general"
    },
    {
      question: "How can I contribute to FlowBitz?",
      answer: "We welcome contributions! You can report bugs, suggest features, or submit pull requests on our GitHub repository. Check our contributing guidelines for more information.",
      category: "general"
    },
    {
      question: "Will there be more components added?",
      answer: "Yes! We're constantly working on new components and improvements. Follow our GitHub repository to stay updated with the latest releases and announcements.",
      category: "general"
    },
    {
      question: "How do I get support if I can't find the answer here?",
      answer: "If you can't find the answer in our FAQ, you can contact us through our support page, open an issue on GitHub, or reach out to us at hello@slabpixel.com.",
      category: "general"
    }
  ]

  // Filter items based on search
  const filteredItems = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  // Group items by category
  const groupedItems = faqCategories.map(category => ({
    ...category,
    items: filteredItems.filter(item => item.category === category.key)
  })).filter(category => category.items.length > 0)

  const handleBugReport = () => {
    window.open('https://github.com/Slabpixel/FlowBitz/issues/new?template=bug_report.md&title=%5BBUG%5D%3A%20General-Report&labels=bug', '_blank')
  }

  const handleFeatureRequest = () => {
    window.open('https://github.com/Slabpixel/FlowBitz/issues/new?template=feature_request.md&title=%5BFEAT%5D%3A%20Feature-Request&labels=enhancement', '_blank')
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "FlowBitz FAQ",
    "description": "Frequently asked questions about FlowBitz - the free interactive components library for Webflow. Get help with installation, usage, and troubleshooting.",
    "url": "https://flowbitz.dev/faq",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <SEO 
        title="FAQ - FlowBitz Components"
        description="Frequently asked questions about FlowBitz - the free interactive components library for Webflow. Get help with installation, usage, and troubleshooting."
        keywords="flowbitz faq, webflow components help, webflow components installation, webflow components troubleshooting, flowbitz support"
        image="https://slabpixel.dev/images/FlowBitz-OpenGraph.webp"
        url="https://flowbitz.dev/faq"
        structuredData={structuredData}
      />
      <div className="bg-background text-foreground pt-[64px] min-h-screen">
      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-4rem)]">
        {/* Shared Sidebar */}
        <Sidebar showBackLink={false} />

        {/* Main Content */}
        <main className="flex flex-col p-4 sm:p-8 lg:p-16 w-full items-center lg:overflow-y-auto lg:h-full">
          <div className="w-full max-w-[970px] mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-base sm:text-lg">Find answers to common questions about FlowBitz components, installation, usage, and troubleshooting.</p>
          </div>

          <div className="w-full max-w-[970px]">
             {/* Search */}
             <div className="mb-8">
               <div className="mx-auto mb-6">
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                   <input
                     type="text"
                     placeholder="Search FAQs..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                   />
                 </div>
               </div>
             </div>

            {/* FAQ Items */}
            <div className="mx-auto space-y-8 mb-12">
              {groupedItems.length === 0 ? (
                <div className="bg-card bg-muted rounded-xl p-4 sm:p-6 hover:bg-accent transition-all duration-300 text-center py-12">
                  <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No questions found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms.
                  </p>
                  <Button variant="outline" onClick={() => setSearchQuery('')}>
                    Clear Search
                  </Button>
                </div>
              ) : (
                groupedItems.map((category) => (
                  <div key={category.key} className="space-y-4">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="text-xl sm:text-2xl font-semibold text-foreground">{category.label}</h3>
                      <Badge variant="secondary" className="ml-2">
                        {category.items.length}
                      </Badge>
                    </div>
                    
                    {/* Category Items */}
                    <div className="space-y-3">
                      {category.items.map((item, index) => {
                        const globalIndex = faqItems.findIndex(faqItem => faqItem === item)
                        return (
                          <div key={globalIndex} className="bg-card bg-muted rounded-xl p-4 sm:p-6 hover:bg-accent transition-all duration-300">
                            <div 
                              className="cursor-pointer"
                              onClick={() => toggleItem(globalIndex)}
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-semibold pr-4 text-foreground">{item.question}</h4>
                                <div className="flex items-center gap-2">
                                  {openItems[globalIndex] ? (
                                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                                  ) : (
                                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                  )}
                                </div>
                              </div>
                            </div>
                            {openItems[globalIndex] && (
                              <div className="mt-4 pt-4 border-t border-border">
                                <div className="prose prose-sm max-w-none text-muted-foreground">
                                  <p className="whitespace-pre-line">{item.answer}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Still Need Help */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-primary/10 to-muted-foreground/5 rounded-2xl p-8 sm:p-12">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                  Still Need Help?
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Can't find the answer you're looking for? We're here to help!
                </p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Button 
                     size="lg" 
                     className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
                     onClick={() => navigate('/support')}
                   >
                     <MessageSquare className="w-5 h-5" />
                     Contact Support
                   </Button>
                   <Button 
                     variant="outline" 
                     size="lg" 
                     className="border-border hover:bg-accent px-8 py-3"
                     onClick={handleBugReport}
                   >
                     <Bug className="w-5 h-5" />
                     Report Bug
                   </Button>
                   <Button 
                     variant="outline" 
                     size="lg" 
                     className="border-border hover:bg-accent px-8 py-3"
                     onClick={handleFeatureRequest}
                   >
                     <Github className="w-5 h-5" />
                     Request Feature
                   </Button>
                 </div>
              </div>
            </div>

            {/* Footer */}
            <div className="w-full flex flex-col items-center justify-center pt-12">
              <div className="text-center flex items-center gap-2 text-sm text-muted-foreground">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>by</span>
                <button 
                  onClick={() => window.open('https://slabpixel.com', '_blank')}
                  className="text-primary hover:underline transition-colors duration-200"
                >
                  SlabPixel
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  )
}

export default FAQ

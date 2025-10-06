import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Shield, CheckCircle, XCircle, Info, FileText, Copy, ExternalLink, Heart } from 'lucide-react';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';

const License = () => {
  const navigate = useNavigate()
  const mitLicense = `MIT License

Copyright (c) 2025 Slabpixel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

  const allowedUses = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: "Commercial Use",
      description: "Use FlowBitz in commercial projects, client work, and products"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: "Modification",
      description: "Modify, adapt, and customize components for your specific needs"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: "Distribution",
      description: "Distribute and share FlowBitz with others"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: "Private Use",
      description: "Use FlowBitz in private projects and internal applications"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: "Patent Use",
      description: "Use any patents held by the contributors"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: "Sublicensing",
      description: "Sublicense FlowBitz under different terms"
    }
  ];

  const requirements = [
    {
      icon: <Info className="w-5 h-5 text-blue-500" />,
      title: "License & Copyright Notice",
      description: "Include the MIT license and copyright notice in all copies"
    },
    {
      icon: <Info className="w-5 h-5 text-blue-500" />,
      title: "Source Code",
      description: "Include the source code when distributing modified versions"
    }
  ];

  const restrictions = [
    {
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      title: "No Warranty",
      description: "The software is provided 'as is' without any warranty"
    },
    {
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      title: "No Liability",
      description: "Authors are not liable for any damages or issues"
    }
  ];

  const thirdPartyLicenses = [
    {
      name: "GSAP (GreenSock)",
      version: "3.13.0",
      license: "Commercial License",
      description: "Animation library - bundled with FlowBitz",
      note: "GSAP's commercial license is included with FlowBitz"
    },
    {
      name: "Three.js",
      version: "0.180.0",
      license: "MIT",
      description: "3D graphics library - auto-loaded when needed",
      note: "Auto-loaded only for shape-blur component"
    }
  ];

  const faq = [
    {
      question: "Can I use FlowBitz in commercial projects?",
      answer: "Yes! The MIT license allows commercial use without any restrictions. You can use FlowBitz in client projects, commercial websites, and even sell products that include FlowBitz."
    },
    {
      question: "Do I need to pay for FlowBitz?",
      answer: "No, FlowBitz is completely free to use. The MIT license allows free use for both personal and commercial projects."
    },
    {
      question: "Can I modify FlowBitz components?",
      answer: "Absolutely! You can modify, customize, and adapt FlowBitz components to fit your specific needs. The MIT license encourages modification and improvement."
    },
    {
      question: "Do I need to include the license in my project?",
      answer: "Yes, when distributing your project (especially if modified), you should include the MIT license and copyright notice. This is a simple requirement that protects both you and the original authors."
    },
    {
      question: "Can I redistribute FlowBitz?",
      answer: "Yes, you can redistribute FlowBitz as-is or with modifications. Just make sure to include the license and copyright notice."
    },
    {
      question: "What about GSAP's license?",
      answer: "GSAP's commercial license is included with FlowBitz, so you don't need a separate GSAP license when using FlowBitz. However, if you use GSAP directly in your project outside of FlowBitz, you may need your own license."
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "FlowBitz License",
    "description": "FlowBitz is licensed under the MIT License. Learn about usage rights, commercial use, modification permissions, and third-party dependencies.",
    "url": "https://www.flowbitz.dev/license",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "FlowBitz",
      "license": "MIT",
      "url": "https://www.flowbitz.dev"
    }
  }

  return (
    <>
      <SEO 
        title="License - FlowBitz | MIT License & Usage Guidelines"
        description="FlowBitz is licensed under the MIT License. Learn about usage rights, commercial use, modification permissions, and third-party dependencies."
        keywords="flowbitz license, MIT license, open source, commercial use, webflow components"
        image="https://www.slabpixel.dev/images/FlowBitz-OpenGraph.webp"
        url="https://www.flowbitz.dev/license"
        structuredData={structuredData}
      />
      <div className="bg-background text-foreground pt-[64px] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              MIT <span className="text-primary">License</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              FlowBitz is released under the MIT License, one of the most permissive open-source licenses. 
              This means you have maximum freedom to use, modify, and distribute FlowBitz.
            </p>
          </div>

          {/* License Content */}
          <div className="max-w-4xl mx-auto space-y-12">
            {/* What You Can Do */}
            <div className="group relative">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-semibold text-foreground">What You Can Do</h3>
              </div>
              <p className="text-muted-foreground mb-4">The MIT license gives you extensive rights to use FlowBitz</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {allowedUses.map((use, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 border border-border/50 rounded-lg hover:border-primary/30 transition-all duration-300">
                          {use.icon}
                          <div>
                            <h4 className="font-semibold text-sm text-foreground">{use.title}</h4>
                            <p className="text-xs text-muted-foreground">{use.description}</p>
                          </div>
                        </div>
                      ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="group relative">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-semibold text-foreground">Requirements</h3>
              </div>
              <p className="text-muted-foreground mb-4">Simple requirements when using FlowBitz</p>
              <div className="grid md:grid-cols-2 gap-4">
                      {requirements.map((req, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 border border-border/50 rounded-lg hover:border-primary/30 transition-all duration-300">
                          {req.icon}
                          <div>
                            <h4 className="font-semibold text-sm text-foreground">{req.title}</h4>
                            <p className="text-xs text-muted-foreground">{req.description}</p>
                          </div>
                        </div>
                      ))}
              </div>
            </div>

            {/* Restrictions */}
            <div className="group relative">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-semibold text-foreground">Limitations</h3>
              </div>
              <p className="text-muted-foreground mb-4">Important limitations to be aware of</p>
              <div className="grid md:grid-cols-2 gap-4">
                      {restrictions.map((restriction, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 border border-border/50 rounded-lg hover:border-primary/30 transition-all duration-300">
                          {restriction.icon}
                          <div>
                            <h4 className="font-semibold text-sm text-foreground">{restriction.title}</h4>
                            <p className="text-xs text-muted-foreground">{restriction.description}</p>
                          </div>
                        </div>
                      ))}
              </div>
            </div>

            {/* License Text */}
            <div className="group relative">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-semibold text-foreground">MIT License Text</h3>
              </div>
              <p className="text-muted-foreground mb-4">The complete MIT License text for FlowBitz</p>
              <div className="relative">
                <div className="bg-muted p-6 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap font-mono">
                    {mitLicense}
                </pre>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                This license text should be included in any distribution of FlowBitz or modified versions.
              </p>
            </div>

            {/* Dependencies */}
            <div className="group relative">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Third-Party Dependencies</h3>
              <p className="text-muted-foreground mb-4">FlowBitz uses several open-source libraries. Here's how their licenses affect you.</p>
              <div className="space-y-2">
                      {thirdPartyLicenses.map((dep, index) => (
                        <div key={index} className="border border-border/50 rounded-lg p-4 hover:border-primary/30 transition-all duration-300">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-foreground">{dep.name}</h4>
                              <p className="text-sm text-muted-foreground">Version {dep.version}</p>
                            </div>
                            <Badge variant={dep.license === 'MIT' ? 'secondary' : 'default'}>
                              {dep.license}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2 text-muted-foreground">{dep.description}</p>
                          <p className="text-xs text-muted-foreground">{dep.note}</p>
                        </div>
                      ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Important Note
                      </h4>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        When using FlowBitz, you don't need to worry about individual library licenses. 
                        All necessary licenses are included with FlowBitz. However, if you use these 
                        libraries directly in your project outside of FlowBitz, you may need separate licenses.
                      </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="group relative">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Frequently Asked Questions</h3>
              <p className="text-muted-foreground mb-4">Common questions about FlowBitz licensing and usage</p>
              <div className="space-y-2">
                      {faq.map((item, index) => (
                        <div key={index} className=" p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                          <h4 className="font-semibold mb-2 text-foreground">{item.question}</h4>
                          <p className="text-sm text-muted-foreground">{item.answer}</p>
                        </div>
                      ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default License;

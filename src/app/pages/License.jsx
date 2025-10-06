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
            {/* License Terms Table */}
            <div className="group relative">
              <h3 className="text-2xl font-semibold text-foreground mb-4">License Terms</h3>
              <p className="text-muted-foreground mb-6">Complete overview of what you can do, requirements, and limitations under the MIT license</p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border/50 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border/50 p-4 text-left font-semibold text-foreground">Category</th>
                      <th className="border border-border/50 p-4 text-left font-semibold text-foreground">Item</th>
                      <th className="border border-border/50 p-4 text-left font-semibold text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* What You Can Do */}
                    {allowedUses.map((use, index) => (
                      <tr key={`allowed-${index}`} className="hover:bg-muted/30 transition-colors">
                        <td className="border border-border/50 p-4 text-sm text-foreground font-medium">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-green-600 dark:text-green-400">Allowed</span>
                          </div>
                        </td>
                        <td className="border border-border/50 p-4 text-sm font-semibold text-foreground">{use.title}</td>
                        <td className="border border-border/50 p-4 text-sm text-muted-foreground">{use.description}</td>
                      </tr>
                    ))}
                    
                    {/* Requirements */}
                    {requirements.map((req, index) => (
                      <tr key={`requirement-${index}`} className="hover:bg-muted/30 transition-colors">
                        <td className="border border-border/50 p-4 text-sm text-foreground font-medium">
                          <div className="flex items-center gap-2">
                            <Info className="w-4 h-4 text-blue-500" />
                            <span className="text-blue-600 dark:text-blue-400">Required</span>
                          </div>
                        </td>
                        <td className="border border-border/50 p-4 text-sm font-semibold text-foreground">{req.title}</td>
                        <td className="border border-border/50 p-4 text-sm text-muted-foreground">{req.description}</td>
                      </tr>
                    ))}
                    
                    {/* Restrictions */}
                    {restrictions.map((restriction, index) => (
                      <tr key={`restriction-${index}`} className="hover:bg-muted/30 transition-colors">
                        <td className="border border-border/50 p-4 text-sm text-foreground font-medium">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="text-red-600 dark:text-red-400">Limited</span>
                          </div>
                        </td>
                        <td className="border border-border/50 p-4 text-sm font-semibold text-foreground">{restriction.title}</td>
                        <td className="border border-border/50 p-4 text-sm text-muted-foreground">{restriction.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              <p className="text-muted-foreground mb-6">Common questions about FlowBitz licensing and usage</p>
              <div className="space-y-3">
                      {faq.map((item, index) => (
                        <div key={index} className="bg-card bg-muted rounded-xl p-4 sm:p-6 hover:bg-accent transition-all duration-300">
                          <h4 className="text-lg font-semibold mb-2 text-foreground">{item.question}</h4>
                          <div className="prose prose-sm max-w-none text-muted-foreground">
                            <p className="whitespace-pre-line">{item.answer}</p>
                          </div>
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

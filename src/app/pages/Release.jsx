import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { CheckCircle, Download, Star, Zap, Bug, Plus, ArrowRight, Heart } from 'lucide-react';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';

const Release = () => {
  const releases = [
    {
      version: "1.1.8",
      date: "October 6, 2025",
      type: "stable",
      description: "First public release of FlowBitz - bringing professional-grade animations to Webflow projects",
      changes: [
        "18 production-ready components",
        "Zero-configuration setup with single script tag",
        "Full responsive support across all devices",
        "Webflow-optimized workflow and integration",
        "Comprehensive documentation and examples",
        "Multiple CDN options for easy installation",
        "Performance optimized for Core Web Vitals",
        "MIT license for maximum freedom"
      ]
    },
    {
      version: "1.0.0",
      date: "September 15, 2025",
      type: "pre-release",
      description: "Pre-release version with core functionality and initial component set",
      changes: [
        "Initial component library with 12 components",
        "Basic GSAP integration and animation system",
        "Webflow custom attributes implementation",
        "Core text animation components",
        "Basic button interaction effects",
        "Initial documentation and setup guide"
      ]
    },
    {
      version: "0.0.0",
      date: "July 23, 2025",
      type: "Project Started",
      description: "Project started and initial development",
      changes: [
        "Project started and initial development"
      ]
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FlowBitz",
    "description": "Interactive components library for Webflow - Release notes and version history",
    "url": "https://www.flowbitz.dev/release",
    "version": "1.1.8",
    "datePublished": "2025-10-06",
    "applicationCategory": "Web Development",
    "operatingSystem": "Web Browser"
  }

  return (
    <>
      <SEO 
        title="Release Notes - FlowBitz | Version History & Roadmap"
        description="FlowBitz release notes and version history. Track the evolution of our animation components library for Webflow."
        keywords="flowbitz release notes, webflow components version history, animation library roadmap, flowbitz changelog"
        image="https://www.slabpixel.dev/images/FlowBitz-OpenGraph.webp"
        url="https://www.flowbitz.dev/release"
        structuredData={structuredData}
      />
      <div className="bg-background text-foreground pt-[64px] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Release <span className="text-primary">Notes</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Track the evolution of FlowBitz - from pre-release to stable versions. See what's new in each release.
            </p>
          </div>

          {/* Release List */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
                {releases.map((release, index) => (
                  <div key={index} className="bg-card bg-muted rounded-xl p-4 sm:p-6 hover:bg-accent transition-all duration-300 border-none">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Badge variant={release.type === 'stable' ? 'default' : 'secondary'}>
                          v{release.version}
                        </Badge>
                        <span className="text-muted-foreground text-sm">{release.date}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-muted-foreground">
                          {release.type === 'stable' ? 'Stable Release' : 'Pre-release'}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                      {release.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-foreground mb-2">What's included:</h4>
                      <ul className="space-y-1">
                        {release.changes.map((change, changeIndex) => (
                          <li key={changeIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ArrowRight className="w-3 h-3 text-primary mt-1.5 flex-shrink-0" />
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Release;

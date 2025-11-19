import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { CheckCircle, Download, Star, Zap, Bug, Plus, ArrowRight, Heart } from 'lucide-react';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';

const Release = () => {
    const navigate = useNavigate()
    const releases = [
        {
            version: "2.4.1",
            date: "November 19, 2025",
            type: "stable",
            description: "v2.4.1 feature release: Two new interactive components, ContactBubble with morphing animation, ImageTrail improvements, and enhanced showcase and SEO updates.",
            changes: [
                "New Component - Shimmer Button with customizable direction, speed, and color options",
                "New Component - Hover Zoom with parallax movement that follows mouse direction",
                "ContactBubble Features - Expands from circular bubble to full contact form card on click",
                "ImageTrail improvements - Enhanced performance and better image preloading",
                "ScrollTrigger improvements - Enhanced helper calculations and viewport unit handling",
                "Updated showcase lists with latest community projects and examples",
                "Blog updates with new implementation guides and component highlights",
                "SEO improvements for index page and robots.txt optimization"
            ]
        },
        {
            version: "2.3.5",
            date: "November 11, 2025",
            type: "stable",
            description: "v2.3.5 maintenance and content update: ScrollTrigger helper refinements, SplitText and SmartAnimate bug fixes, refreshed component metadata, and new showcase/blog content.",
            changes: [
                "Improved ScrollTrigger helper calculations for consistent viewport unit behavior",
                "Fixed SplitText animation lifecycle to prevent duplicate initializations and ensure cleanup",
                "Resolved SmartAnimate timing issues for staggered children and ScrollTrigger start margins",
                "Launched new blog features highlighting release updates and implementation tips",
                "Expanded component metadata with richer attribute guidance and defaults",
                "Updated Showcase page with latest community projects and CTA enhancements"
            ]
        },
        {
            version: "2.3.4",
            date: "November 7, 2025",
            type: "stable",
            description: "v2.3.4 feature release: Three new visual components plus enhanced configuration options and improved color support.",
            changes: [
                "New Components - Roll Text, 3D Card Hover, Outline Gradient, and Image Trail",
                "Added Root Margin Options - Support for %, vh, px, em, rem, and other CSS units",
                "Added RGBA Color Support - Full RGBA color format support for better color control",
                "Added On Hover options - Enable/disable animations on hover (True/False)",
                "Added Repeat options - Control animation repeat behavior (True/False)",
            ]
        },
        {
            version: "2.0.0",
            date: "October 10, 2025",
            type: "stable",
            description: "Major release with modular architecture and dual-build system for maximum flexibility",
            changes: [
                "On-demand component loading (Finsweet-inspired architecture)",
                "Dual build system: ES modules (CDN GSAP) and UMD (bundled GSAP)",
                "ES module: Smart GSAP loading from CDN when needed (~15KB initial)",
                "UMD module: GSAP fully bundled for compatibility (larger but works everywhere)",
                "Auto-detects and reuses existing GSAP installations",
                "Zero GSAP for CSS-only components (5 components)",
                "True one-script setup - no configuration needed",
                "New getGSAPStats() API to track GSAP usage",
                "Individual component chunks for optimal performance (ES only)",
                "Choose ES for modern sites or UMD for maximum compatibility"
            ]
        },
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
            version: "1.1.0",
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
            version: "1.0.0",
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
        "version": "2.4.0",
        "datePublished": "2025-12-20",
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
                            Release <span wb-component="gradient-text">Notes</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Track the evolution of FlowBitz - from pre-release to stable versions. See what's new in each release.
                        </p>
                    </div>

                    {/* Release Timeline */}
                    <div className="max-w-6xl mx-auto">
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border"></div>

                            <div className="space-y-8">
                                {releases.map((release, index) => {
                                    // Parse date to extract month and year
                                    const dateObj = new Date(release.date);
                                    const month = dateObj.toLocaleDateString('en-US', { month: 'long' });
                                    const day = dateObj.getDate();
                                    const year = dateObj.getFullYear();

                                    return (
                                        <div key={index} className="relative flex items-start gap-4">
                                            {/* Timeline dot */}
                                            <div className="block w-4 h-4 bg-primary rounded-full border-4 border-background shadow-sm z-10"></div>

                                            <div className="w-full flex items-start gap-4 sm:flex-row flex-col">
                                                {/* Date indicator */}
                                                <div className="flex-shrink-0 min-w-[120px] text-left">
                                                    <div>
                                                        <div className="text-sm font-semibold text-foreground">
                                                            {month} {day}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {year}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Release card */}
                                                <div className="flex-1 bg-card rounded-xl p-6 transition-all duration-300 border border-border shadow-sm">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <Badge variant={release.type === 'stable' ? 'default' : 'secondary'}>
                                                                v{release.version}
                                                            </Badge>
                                                            <span className="text-muted-foreground text-sm">{release.type === 'stable' ? 'Stable Release' : 'Pre-release'}</span>
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
                                            </div>
                                        </div>
                                    );
                                })}
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

export default Release;

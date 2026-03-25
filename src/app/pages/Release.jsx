import React from "react";
import { ArrowRight } from "lucide-react";
import Logo from "../components/Logo.jsx";
import Footer from "../components/layout/Footer";
import SEO from "../components/SEO.jsx";

const Release = () => {
    const releases = [
        {
            version: "2.4.4",
            date: "November 27, 2025",
            type: "stable",
            description: "v2.4.4 bug fix release: Fixed SplitText component visibility and state restoration issues, ensuring animations remain visible after completion and during tab focus changes.",
            changes: [
                "Fixed SplitText visibility issues - elements now stay visible after animation completes",
                "Fixed SplitText state restoration when tab regains focus",
                "Improved SplitText ScrollTrigger refresh handling to maintain completed states",
                "Enhanced SplitText CSS with !important flags to prevent style resets",
                "Added page visibility listener to restore completed animation states",
                "Fixed hoverZoom component initialization and cleanup issues",
                "Fixed smartAnimate wb-start-delay issue",
                "Blog content updates",
                "CardHover component bug fixes"
            ]
        },
        {
            version: "2.4.3",
            date: "November 24, 2025",
            type: "stable",
            description: "v2.4.3 feature release: Two new interactive components, ContactBubble with morphing animation, ImageTrail improvements, and enhanced showcase and SEO updates.",
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
        "version": "2.4.4",
        "datePublished": "2025-12-20",
        "applicationCategory": "Web Development",
        "operatingSystem": "Web Browser"
    }

    return (
        <>
            <SEO
                title="Release Notes - FlowBitz | Version History & Roadmap"
                description="Track FlowBitz release notes, version history, and roadmap updates. See what's new in free GSAP-powered Webflow animation components."
                keywords="FlowBitz release notes, FlowBitz changelog, webflow components version history, animation roadmap, GSAP components for Webflow"
                image="https://www.slabpixel.dev/images/FlowBitz-OpenGraph.webp"
                url="https://www.flowbitz.dev/release"
                structuredData={structuredData}
            />
            <section className="bg-transparent text-foreground min-h-screen relative overflow-hidden">
                <div className="max-w-[1200px] lg:mx-auto mx-2 relative z-[2] border-x border-foreground/10">
                    {/* Hero */}
                    <header
                        wb-component="smart-animate"
                        className="w-full flex flex-col items-center gap-5 md:gap-[1.625rem] py-6 md:py-14 border-b border-foreground/10"
                    >

                        <h1 className="inter-semi-48 w-2/3 md:w-full text-center text-foreground">
                            Release Notes
                        </h1>

                        <p className="inter-reg-18 text-text-medium text-center px-4 md:px-0 max-w-[99%] md:max-w-[770px]">
                            Track the evolution of FlowBitz - from pre-release to stable versions. See what's new in each release.
                        </p>
                    </header>

                    {/* Release Timeline */}
                    <div className="py-12 md:py-16 px-4 md:px-0 border-b border-foreground/10">
                        <div wb-component="smart-animate" className="relative max-w-[900px] mx-auto">
                            {/* Timeline line */}
                            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-foreground/10"></div>

                            <div className="flex flex-col gap-24">
                                {releases.map((release, index) => {
                                    const dateObj = new Date(release.date);
                                    const month = dateObj.toLocaleDateString("en-US", {
                                        month: "long",
                                    });
                                    const day = dateObj.getDate();
                                    const year = dateObj.getFullYear();

                                    return (
                                        <div key={index} className="relative flex items-start gap-4">
                                            {/* Timeline dot */}
                                            <div className="block w-4 h-4 bg-primary/60 rounded-full border-4 border-background shadow-sm z-10"></div>

                                            <div className="w-full flex items-start gap-4 sm:flex-row flex-col">
                                                {/* Date indicator */}
                                                <div className="flex-shrink-0 min-w-[140px] text-left">
                                                    <div className="text-sm font-semibold text-foreground">
                                                        {month} {day}
                                                    </div>
                                                    <div className="text-xs text-text-medium opacity-80">
                                                        {year}
                                                    </div>
                                                </div>

                                                {/* Release card */}
                                                <div className="flex-1 transition-all duration-300">
                                                    <div className="flex items-start justify-between mb-4 gap-4">
                                                        <div className="flex items-center gap-3">
                                                            <span className="inline-flex items-center px-3 py-1 rounded-[2px] border border-foreground/10 bg-background/40 text-text-medium text-xs font-semibold">
                                                                v{release.version}
                                                            </span>
                                                            <span className="text-sm text-text-medium opacity-80">
                                                                {release.type === "stable"
                                                                    ? "Stable Release"
                                                                    : "Pre-release"}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <p className="text-paragraph large text-text-medium mb-4">
                                                        {release.description}
                                                    </p>

                                                    <div className="space-y-2">
                                                        <h4 className="text-sm font-semibold text-foreground mb-2">
                                                            What's included:
                                                        </h4>

                                                        <ul className="space-y-1">
                                                            {release.changes.map((change, changeIndex) => (
                                                                <li
                                                                    key={changeIndex}
                                                                    className="flex items-start gap-2 text-sm text-text-medium"
                                                                >
                                                                    <ArrowRight className="w-3 h-3 text-foreground/60 mt-1.5 flex-shrink-0" />
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
            </section>
        </>
    );
};

export default Release;

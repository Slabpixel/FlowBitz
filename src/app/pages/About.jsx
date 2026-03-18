import React from "react";
import { Button } from "../components/ui/button.jsx";
import {
  Heart,
  Lightbulb,
  Target,
  Gift,
  Zap,
  Settings,
  Palette,
  Smartphone,
  Rocket,
  Globe,
} from "lucide-react";
import Sidebar from "../components/layout/leftSidebar.jsx";
import SEO from "../components/SEO.jsx";
import { getFilteredComponentKeys } from "../../library/data/componentsMetadata.js";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const About = () => {
  const componentCount = getFilteredComponentKeys().length;
  const navigate = useNavigate();

  const handleGitHub = () => {
    window.open("https://github.com/Slabpixel/FlowBitz", "_blank");
  };

  const handleSlabPixel = () => {
    window.open("https://slabpixel.com", "_blank");
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About FlowBitz",
    description:
      "Learn about FlowBitz - the free interactive components library for Webflow. Created by SlabPixel Studio to help designers and developers create stunning web experiences.",
    url: "https://www.flowbitz.dev/about",
    mainEntity: {
      "@type": "Organization",
      name: "SlabPixel Studio",
      url: "https://slabpixel.com",
      description: "Creative studio specializing in web development and design",
    },
  };

  return (
    <>
      <SEO
        title="About FlowBitz - Solving Webflow Animation Problems | Free GSAP Components"
        description="Discover how FlowBitz bridges the gap between Webflow's basic animations and professional GSAP effects. Learn about our mission to democratize advanced web animations for everyone."
        keywords="about flowbitz, webflow animation problems, webflow gsap integration, webflow animation limitations, webflow components library, free webflow animations, webflow animation solutions, webflow animation tools, webflow animation alternatives, webflow animation library, webflow animation components, webflow animation examples, webflow animation tutorials, webflow animation code, webflow animation plugins, webflow animation effects, webflow animation library, webflow animation tools, webflow animation solutions, webflow animation alternatives"
        image="https://www.slabpixel.dev/images/FlowBitz-OpenGraph.webp"
        url="https://www.flowbitz.dev/about"
        structuredData={structuredData}
      />
      <div className="bg-background text-foreground h-full overflow-scroll lg:overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-4.5rem)]">
          {/* Shared Sidebar */}
          <Sidebar showBackLink={false} />

          {/* Main Content */}
          <main className="flex flex-col px-2 py-8 gap-8 md:p-6 w-full items-center lg:overflow-y-auto lg:h-full">
            <div className="w-full max-w-[800px] flex flex-col gap-2">
              <h1 className="inter-semi-32 installation text-foreground md:pt-4">
                Solving Webflow's Animation Problem
              </h1>
              <p className="text-paragraph large text-text-medium">
                FlowBitz bridges the gap between Webflow's limited native
                animations and professional GSAP effects - making advanced
                animations accessible to everyone.
              </p>
            </div>

            <div className="w-full max-w-[800px] flex flex-col gap-10">
              {/* Mission & Vision */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group relative flex flex-col gap-[0.875rem] p-[0.875rem] bg-background/40 border border-foreground/10 rounded-[6px]">
                  <div className="relative z-[2] flex gap-2 items-center py-1.5">
                    <Target className="w-4 h-4 opacity-60" />
                    <h3 className="text-paragraph highlight text-foreground">
                      Our Mission
                    </h3>
                  </div>
                  <p className="relative z-[2] text-paragraph large text-textLow flex-1">
                    To democratize professional web animations by making
                    advanced GSAP effects accessible to Webflow users without
                    requiring coding knowledge. We believe every designer
                    deserves access to the same powerful animation tools used
                    by top agencies and developers.
                  </p>
                </div>

                <div className="group relative flex flex-col gap-[0.875rem] p-[0.875rem] bg-background/40 border border-foreground/10 rounded-[6px]">
                  <div className="relative z-[2] flex gap-2 items-center py-1.5">
                    <Lightbulb className="w-4 h-4 opacity-60" />
                    <h3 className="text-paragraph highlight text-foreground">
                      Our Vision
                    </h3>
                  </div>
                  <p className="relative z-[2] text-paragraph large text-textLow flex-1">
                    A world where advanced web animations are accessible to
                    everyone, regardless of technical skill level. We envision
                    a future where designers can create stunning, professional
                    animations without barriers, leveling the playing field
                    between agencies and independent creators.
                  </p>
                </div>
              </div>

              {/* FlowBitz Story */}
              <div className="flex flex-col gap-4">
                <h2 className="text-heading-small text-foreground">
                  The Problem We're Solving
                </h2>
                <div className="flex flex-col gap-4 p-4 border border-foreground/10 rounded-lg">
                  <p className="text-paragraph large text-text-medium">
                    <strong className="text-foreground">The Challenge:</strong>{" "}
                    Webflow's native animations are limited. While perfect for
                    basic interactions, creating professional-grade animations
                    requires manual GSAP coding - a barrier that excludes most
                    designers and requires expensive developer resources.
                  </p>
                  <p className="text-paragraph large text-text-medium">
                    <strong className="text-foreground">Our Solution:</strong>{" "}
                    FlowBitz bridges this gap with {componentCount} pre-built,
                    GSAP-powered components that work through simple HTML
                    attributes. No JavaScript knowledge required - just add
                    attributes to any Webflow element and get professional
                    animations instantly.
                  </p>
                  <p className="text-paragraph large text-text-medium">
                    <strong className="text-foreground">The Impact:</strong> We've
                    democratized advanced web animations, making them
                    accessible to designers, agencies, and independent creators
                    worldwide. FlowBitz levels the playing field, allowing
                    anyone to create stunning animations that previously
                    required expensive development resources.
                  </p>
                  <p className="text-paragraph large text-text-medium">
                    <strong className="text-foreground">Our Commitment:</strong>{" "}
                    FlowBitz remains completely free and open-source because we
                    believe professional web animations shouldn't be a luxury.
                    Every designer deserves access to the same powerful tools
                    used by top agencies, regardless of budget or technical
                    expertise.
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div className="flex flex-col gap-6">
                <h2 className="text-heading-small text-foreground">
                  Why FlowBitz is Different
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="group relative flex flex-col gap-[0.875rem] p-[0.875rem] bg-background/40 border border-foreground/10 rounded-[6px]">
                    <div className="relative z-[2] flex gap-2 items-center py-1.5">
                      <Gift className="w-4 h-4 opacity-60" />
                      <h4 className="text-paragraph highlight text-foreground">
                        100% Free Forever
                      </h4>
                    </div>
                    <p className="relative z-[2] text-paragraph large text-textLow flex-1">
                      Unlike expensive animation libraries, FlowBitz is
                      completely free with no premium tiers, hidden costs, or
                      usage limits. Professional animations shouldn't be a
                      luxury.
                    </p>
                  </div>

                  <div className="group relative flex flex-col gap-[0.875rem] p-[0.875rem] bg-background/40 border border-foreground/10 rounded-[6px]">
                    <div className="relative z-[2] flex gap-2 items-center py-1.5">
                      <Zap className="w-4 h-4 opacity-60" />
                      <h4 className="text-paragraph highlight text-foreground">
                        Industry-Standard GSAP
                      </h4>
                    </div>
                    <p className="relative z-[2] text-paragraph large text-textLow flex-1">
                      Built on the same GSAP engine used by top agencies and
                      Fortune 500 companies. Get professional-grade performance
                      without the complexity.
                    </p>
                  </div>

                  <div className="group relative flex flex-col gap-[0.875rem] p-[0.875rem] bg-background/40 border border-foreground/10 rounded-[6px]">
                    <div className="relative z-[2] flex gap-2 items-center py-1.5">
                      <Settings className="w-4 h-4 opacity-60" />
                      <h4 className="text-paragraph highlight text-foreground">
                        No Coding Required
                      </h4>
                    </div>
                    <p className="relative z-[2] text-paragraph large text-textLow flex-1">
                      Unlike manual GSAP coding, FlowBitz works through simple
                      HTML attributes. Perfect for designers who want
                      professional animations without learning JavaScript.
                    </p>
                  </div>

                  <div className="group relative flex flex-col gap-[0.875rem] p-[0.875rem] bg-background/40 border border-foreground/10 rounded-[6px]">
                    <div className="relative z-[2] flex gap-2 items-center py-1.5">
                      <Smartphone className="w-4 h-4 opacity-60" />
                      <h4 className="text-paragraph highlight text-foreground">
                        Mobile-First Design
                      </h4>
                    </div>
                    <p className="relative z-[2] text-paragraph large text-textLow flex-1">
                      Every component is optimized for mobile devices and
                      responsive design. No more worrying about animations
                      breaking on different screen sizes.
                    </p>
                  </div>

                  <div className="group relative flex flex-col gap-[0.875rem] p-[0.875rem] bg-background/40 border border-foreground/10 rounded-[6px]">
                    <div className="relative z-[2] flex gap-2 items-center py-1.5">
                      <Palette className="w-4 h-4 opacity-60" />
                      <h4 className="text-paragraph highlight text-foreground">
                        Highly Customizable
                      </h4>
                    </div>
                    <p className="relative z-[2] text-paragraph large text-textLow flex-1">
                      Extensive customization through HTML attributes - control
                      timing, easing, colors, and behavior without touching a
                      single line of JavaScript code.
                    </p>
                  </div>

                  <div className="group relative flex flex-col gap-[0.875rem] p-[0.875rem] bg-background/40 border border-foreground/10 rounded-[6px]">
                    <div className="relative z-[2] flex gap-2 items-center py-1.5">
                      <Rocket className="w-4 h-4 opacity-60" />
                      <h4 className="text-paragraph highlight text-foreground">
                        Performance Optimized
                      </h4>
                    </div>
                    <p className="relative z-[2] text-paragraph large text-textLow flex-1">
                      Lightweight and optimized for Core Web Vitals. Minimal
                      impact on page load times while delivering smooth 60fps
                      animations across all devices.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-4 border border-foreground/10 rounded-lg">
                <div className="text-center">
                  <div className="inter-semi-32 text-foreground mb-1">
                    {componentCount}
                  </div>
                  <div className="text-paragraph large text-textLow">
                    Components
                  </div>
                </div>
                <div className="text-center">
                  <div className="inter-semi-32 text-foreground mb-1">
                    100%
                  </div>
                  <div className="text-paragraph large text-textLow">Free</div>
                </div>
                <div className="text-center">
                  <div className="inter-semi-32 text-foreground mb-1">
                    2
                  </div>
                  <div className="text-paragraph large text-textLow">
                    Categories
                  </div>
                </div>
                <div className="text-center">
                  <div className="inter-semi-32 text-foreground mb-1">
                    ∞
                  </div>
                  <div className="text-paragraph large text-textLow">
                    Possibilities
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="relative flex flex-col gap-4 px-4 py-6 md:p-6 bg-base-medium rounded w-full max-w-[800px]">
                <h4 className="relative z-[2] text-heading-small text-foreground">
                  Ready to solve your Webflow animation problems?
                </h4>
                <p className="relative z-[2] text-paragraph text-foreground/60">
                  Stop struggling with Webflow's limited animations. See how easy
                  it is to add professional GSAP effects with just HTML
                  attributes - no coding required.
                </p>
                <div className="relative z-[2] flex flex-wrap gap-2 items-start justify-start">
                  <Button
                    variant="custom"
                    size="custom"
                    className="flex items-center gap-2 px-3 py-[0.625rem] rounded-lg bg-background border border-foreground/10 text-link font-medium"
                    onClick={() => navigate("/components/split-text")}
                  >
                    <Zap className="w-4 h-4 opacity-60" />
                    Explore Component
                  </Button>
                  <Button
                    variant="custom"
                    size="custom"
                    className="flex items-center gap-2 px-3 py-[0.625rem] rounded-lg bg-background border border-foreground/10 text-link font-medium"
                    onClick={handleGitHub}
                  >
                    <FontAwesomeIcon
                      icon={["fab", "github"]}
                      className="w-4 h-4 opacity-60"
                    />
                    View on GitHub
                  </Button>
                  <Button
                    variant="custom"
                    size="custom"
                    className="flex items-center gap-2 px-3 py-[0.625rem] rounded-lg bg-background border border-foreground/10 text-link font-medium"
                    onClick={handleSlabPixel}
                  >
                    <Globe
                      className="w-4 h-4 opacity-60"
                    />
                    Visit SlabPixel
                  </Button>
                </div>
                <img
                  src="/images/group.svg"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover z-[1] pointer-events-none"
                  loading="lazy"
                />
              </div>

              {/* Footer */}
              <div className="w-full flex flex-col items-center justify-center pt-6">
                <div className="text-center flex items-center gap-2 text-paragraph text-textLow">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>by</span>
                  <button
                    onClick={() =>
                      window.open("https://slabpixel.com", "_blank")
                    }
                    className="text-link font-medium hover:underline transition-colors duration-200"
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
  );
};

export default About;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button.jsx";
import Logo from "../components/Logo.jsx";
import {
  Lightbulb,
  Gift,
  Zap,
  Settings,
  Palette,
  Smartphone,
  Rocket,
  Globe,
  AlertCircle,
  TrendingUp,
  Heart,
  Infinity as InfinityIcon,
  Layers,
  LayoutGrid,
} from "lucide-react";
import SEO from "../components/SEO.jsx";
import { getFilteredComponentKeys } from "../../library/data/componentsMetadata.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ABOUT_HERO_IMAGE =
  "https://www.slabpixel.dev/images/FlowBitz-OpenGraph.webp";

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
      <article className="relative z-[2] text-foreground max-w-[1200px] mx-2 md:mx-4 lg:mx-auto border-x border-foreground/10 pb-12 md:pb-16">
        <header
          wb-component="smart-animate"
          className="w-full flex flex-col items-center gap-5 md:gap-[1.625rem] py-6 md:py-14 border-b border-foreground/10"
        >
          <div className="bg-foreground/10 h-[30px] w-fit px-4 flex items-center justify-center gap-1">
            <span className="text-link font-medium text-foreground">
              About
            </span>
            <Logo className="h-4 w-auto" />
          </div>

          <h1 className="inter-semi-48 w-2/3 md:w-full text-center text-foreground">
            Solving Webflow&apos;s Animation Problem
          </h1>

          <p className="inter-reg-18 text-text-medium text-center px-4 md:px-0 max-w-[99%] md:max-w-[770px]">
            FlowBitz bridges the gap between Webflow&apos;s limited native animations and professional GSAP effects — making advanced animations accessible to everyone.
          </p>
        </header>

        <div
          wb-component="smart-animate"
          className="flex flex-col"
        >
          <div className="mx-auto w-full flex flex-col">
            <img
              src={ABOUT_HERO_IMAGE}
              alt="FlowBitz — free GSAP components for Webflow"
              className="w-full border-b border-foreground/10"
              loading="lazy"
            />

            <div className="flex flex-col">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-12 p-4 border-b border-foreground/10">
              <h2 className="inter-semi-24 col-span-1 text-foreground">
                Our Mission
              </h2>
              <p className="text-paragraph large text-text-medium col-span-2">
                To democratize professional web animations by making advanced
                GSAP effects accessible to Webflow users without requiring
                coding knowledge. We believe every designer deserves access to
                the same powerful animation tools used by top agencies and
                developers.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-12 p-4 border-b border-foreground/10">
              <h2 className="inter-semi-24 col-span-1 text-foreground">
                Our Vision
              </h2>
              <p className="text-paragraph large text-text-medium col-span-2">
                A world where advanced web animations are accessible to
                everyone, regardless of technical skill level. We envision a
                future where designers can create stunning, professional
                animations without barriers, leveling the playing field between
                agencies and independent creators.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-12 p-4 border-b border-foreground/10">
              <h2 className="inter-semi-24 col-span-1 text-foreground">
                The Problem We&apos;re Solving
              </h2>
              <ul className="flex flex-col gap-6 list-none p-0 m-0 col-span-2">
                <li className="flex gap-3 items-start">
                  <span className="mt-0.5 shrink-0 inline-flex text-foreground/70">
                    <AlertCircle className="w-5 h-5" aria-hidden />
                  </span>
                  <p className="text-paragraph large text-text-medium min-w-0">
                    <strong className="text-foreground">The Challenge:</strong>{" "}
                    Webflow&apos;s native animations are limited. While perfect
                    for basic interactions, creating professional-grade
                    animations requires manual GSAP coding — a barrier that
                    excludes most designers and requires expensive developer
                    resources.
                  </p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-0.5 shrink-0 inline-flex text-foreground/70">
                    <Lightbulb className="w-5 h-5" aria-hidden />
                  </span>
                  <p className="text-paragraph large text-text-medium min-w-0">
                    <strong className="text-foreground">Our Solution:</strong>{" "}
                    FlowBitz bridges this gap with {componentCount} pre-built,
                    GSAP-powered components that work through simple HTML
                    attributes. No JavaScript knowledge required — just add
                    attributes to any Webflow element and get professional
                    animations instantly.
                  </p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-0.5 shrink-0 inline-flex text-foreground/70">
                    <TrendingUp className="w-5 h-5" aria-hidden />
                  </span>
                  <p className="text-paragraph large text-text-medium min-w-0">
                    <strong className="text-foreground">The Impact:</strong>{" "}
                    We&apos;ve democratized advanced web animations, making them
                    accessible to designers, agencies, and independent creators
                    worldwide. FlowBitz levels the playing field, allowing anyone
                    to create stunning animations that previously required
                    expensive development resources.
                  </p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-0.5 shrink-0 inline-flex text-foreground/70">
                    <Heart className="w-5 h-5" aria-hidden />
                  </span>
                  <p className="text-paragraph large text-text-medium min-w-0">
                    <strong className="text-foreground">Our Commitment:</strong>{" "}
                    FlowBitz remains completely free and open-source because we
                    believe professional web animations shouldn&apos;t be a
                    luxury. Every designer deserves access to the same powerful
                    tools used by top agencies, regardless of budget or
                    technical expertise.
                  </p>
                </li>
              </ul>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-12 p-4 border-b border-foreground/10">
              <h2 className="inter-semi-24 col-span-1 text-foreground">
                Why FlowBitz is Different
              </h2>
              <ul className="flex flex-col gap-8 list-none p-0 m-0 col-span-2">
                <li className="flex gap-3 items-start">
                  <span className="mt-0.5 shrink-0 inline-flex text-foreground/70">
                    <Gift className="w-5 h-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-paragraph highlight text-foreground mb-2">
                      100% Free Forever
                    </h3>
                    <p className="text-paragraph large text-text-medium">
                      Unlike expensive animation libraries, FlowBitz is
                      completely free with no premium tiers, hidden costs, or
                      usage limits. Professional animations shouldn&apos;t be a
                      luxury.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-0.5 shrink-0 inline-flex text-foreground/70">
                    <Zap className="w-5 h-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-paragraph highlight text-foreground mb-2">
                      Industry-Standard GSAP
                    </h3>
                    <p className="text-paragraph large text-text-medium">
                      Built on the same GSAP engine used by top agencies and
                      Fortune 500 companies. Get professional-grade performance
                      without the complexity.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-0.5 shrink-0 inline-flex text-foreground/70">
                    <Settings className="w-5 h-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-paragraph highlight text-foreground mb-2">
                      No Coding Required
                    </h3>
                    <p className="text-paragraph large text-text-medium">
                      Unlike manual GSAP coding, FlowBitz works through simple
                      HTML attributes. Perfect for designers who want
                      professional animations without learning JavaScript.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-0.5 shrink-0 inline-flex text-foreground/70">
                    <Smartphone className="w-5 h-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-paragraph highlight text-foreground mb-2">
                      Mobile-First Design
                    </h3>
                    <p className="text-paragraph large text-text-medium">
                      Every component is optimized for mobile devices and
                      responsive design. No more worrying about animations
                      breaking on different screen sizes.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-0.5 shrink-0 inline-flex text-foreground/70">
                    <Palette className="w-5 h-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-paragraph highlight text-foreground mb-2">
                      Highly Customizable
                    </h3>
                    <p className="text-paragraph large text-text-medium">
                      Extensive customization through HTML attributes — control
                      timing, easing, colors, and behavior without touching a
                      single line of JavaScript code.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-0.5 shrink-0 inline-flex text-foreground/70">
                    <Rocket className="w-5 h-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-paragraph highlight text-foreground mb-2">
                      Performance Optimized
                    </h3>
                    <p className="text-paragraph large text-text-medium">
                      Lightweight and optimized for Core Web Vitals. Minimal
                      impact on page load times while delivering smooth 60fps
                      animations across all devices.
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            <section className="flex flex-col border-b border-foreground/10">
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0">
                <li className="border-r border-foreground/10 bg-background/40 p-5 sm:p-6 flex flex-col items-center text-center gap-3 min-h-0">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-foreground/5 text-foreground/80">
                    <Layers className="w-5 h-5" aria-hidden />
                  </span>
                  <span className="inter-semi-32 text-foreground tabular-nums">
                    {componentCount}
                  </span>
                  <span className="text-paragraph large text-textLow">
                    Components
                  </span>
                </li>
                <li className="border-r border-foreground/10 bg-background/40 p-5 sm:p-6 flex flex-col items-center text-center gap-3 min-h-0">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-foreground/5 text-foreground/80">
                    <Gift className="w-5 h-5" aria-hidden />
                  </span>
                  <span className="inter-semi-32 text-foreground tabular-nums">
                    100%
                  </span>
                  <span className="text-paragraph large text-textLow">Free</span>
                </li>
                <li className="border-r border-foreground/10 bg-background/40 p-5 sm:p-6 flex flex-col items-center text-center gap-3 min-h-0">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-foreground/5 text-foreground/80">
                    <LayoutGrid className="w-5 h-5" aria-hidden />
                  </span>
                  <span className="inter-semi-32 text-foreground tabular-nums">
                    3
                  </span>
                  <span className="text-paragraph large text-textLow">
                    Categories
                  </span>
                </li>
                <li className="bg-background/40 p-5 sm:p-6 flex flex-col items-center text-center gap-3 min-h-0">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-foreground/5 text-foreground/80">
                    <InfinityIcon className="w-5 h-5" aria-hidden />
                  </span>
                  <span className="inter-semi-32 text-foreground">∞</span>
                  <span className="text-paragraph large text-textLow">
                    Possibilities
                  </span>
                </li>
              </ul>
            </section>

            <div className="relative flex flex-col gap-4 px-4 py-16 bg-base-medium w-full text-center items-center">
              <h2 className="relative z-[2] text-heading-small text-foreground max-w-xl">
                Ready to solve your Webflow animation problems?
              </h2>
              <p className="relative z-[2] text-paragraph text-foreground/60 max-w-xl">
                Stop struggling with Webflow&apos;s limited animations. See how
                easy it is to add professional GSAP effects with just HTML
                attributes — no coding required.
              </p>
              <div className="relative z-[2] flex flex-wrap gap-2 justify-center">
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
                  <Globe className="w-4 h-4 opacity-60" />
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
          </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default About;

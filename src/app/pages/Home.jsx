import React from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import { getFilteredComponentKeys } from "../../library/data/componentsMetadata.js";
import Logo from "../components/Logo.jsx";
import { BookOpen, Bug, Lightbulb } from "lucide-react";
import { GalleryContainer } from "../components/gallery";

const Home = () => {
  const navigate = useNavigate();
  const componentCount = getFilteredComponentKeys().length;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FlowBitz - Free GSAP Animation Components for Webflow",
    description: `Transform your Webflow projects with ${componentCount}+ professional animation components. Zero JavaScript knowledge needed - just add HTML attributes. GSAP-powered, mobile-responsive, and completely free.`,
    url: "https://www.flowbitz.dev",
    publisher: {
      "@type": "Organization",
      name: "SlabPixel Studio",
      url: "https://slabpixel.com",
      description:
        "Creative studio specializing in web development and Webflow solutions",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.flowbitz.dev/components?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description:
        "Free GSAP animation components for Webflow - no coding required",
    },
    keywords:
      "webflow animations, webflow components, gsap webflow, webflow text effects, webflow animation library, free webflow components",
  };

  return (
    <>
      <SEO
        title="FlowBitz | Free GSAP Animation Components for Webflow (No Coding Required)"
        description={`Transform your Webflow projects with ${componentCount}+ FlowBitz components. Use simple HTML attributes to activate GSAP-powered motion—free, mobile-friendly, and performance optimized.`}
        keywords="FlowBitz, webflow animations, GSAP for Webflow, webflow HTML attributes, interactive components, free webflow components, motion effects, hover animations, scroll animations"
        image="https://www.slabpixel.dev/images/FlowBitz-OpenGraph.webp"
        url="https://www.flowbitz.dev"
        structuredData={structuredData}
      />
      <div className="relative z-[2] text-foreground">
        {/* Hero Section */}
        <section className="relative px-2 lg:px-0">
          <div className="max-w-[1200px] mx-auto py-6 lg:py-16 flex flex-col items-center border-x-[1px] border-b-[1px] border-foreground/10">
            <div className="max-w-[800px] w-[80%] lg:w-2/3 flex flex-col items-center gap-[1.625rem]">
              <div className="flex gap-[0.875rem] px-4 py-2 bg-foreground/10 rounded-[2px] items-center">
                <div className="w-2 h-2 bg-[#51A2FF]" />
                <p className="flex flex-row gap-1 inter-med-16 text-foreground">
                  {componentCount} components available -
                  <span wb-component="text-type" 
                  wb-text-1="100% Free Forever"
                  wb-text-2="Industry Standard GSAP"
                  wb-text-3="No Coding Required"
                  wb-text-4="Highly Customizable"
                  wb-text-5="Performance Optimized"
                  />
                </p>
              </div>

              <h1 className="inter-semi-72 text-center">
                Free GSAP Components for <span wb-component="gradient-text">Webflow</span>
              </h1>

              <p className="inter-reg-18 text-center lg:w-[430px] text-foreground/90 opacity-80">
                Interactive effects using simple HTML attributes, No coding
                required!
              </p>
            </div>
          </div>
        </section>
        {/* End Hero Section */}

        {/* Component Gallery Section */}
        <GalleryContainer showAll={false} />

        {/* CTA Section */}
        <section className="px-2 lg:px-0">
          <div className="max-w-[1200px] mx-auto pt-0 pb-12 md:py-7 border-x-[1px] border-foreground/10">
            <div className="relative w-full lg:h-[500px] border-y-[1px] border-foreground/10 flex flex-col lg:flex-row justify-between items-start gap-9 lg:gap-0 lg:items-center lg:pl-[3.75rem] overflow-hidden">
              <div className="flex flex-col gap-6 md:gap-10 max-w-[550px] relative z-[3] pt-6 pl-6 lg:pt-0 lg:pl-0">
                <div className="flex flex-col gap-4 items-start">
                  <Logo className="h-8 w-auto" />
                  <h2 className="inter-semi-48 text-foreground">
                    Pro Animations, <br /> Zero Code.
                  </h2>
                </div>

                <div className="w-full flex flex-wrap gap-3 md:gap-0 lg:flex-nowrap">
                  <button
                    onClick={() => navigate("/installation")}
                    className="pr-0 md:pr-3 lg:pr-6 py-2 md:py-[10px] md:border-r border-white/10 text-foreground inter-med-16 transition-all duration-200 flex items-center gap-2 md:gap-3 hover:text-foreground/50"
                  >
                    <BookOpen
                      className="w-4 h-4 opacity-60"
                    />
                    <span className="inline text-nowrap">
                      Installation Guide
                    </span>
                  </button>

                  <button
                    onClick={() => navigate("/contact?tab=report")}
                    className="px-0 md:px-3 lg:px-6 py-2 md:py-[10px] md:border-r border-white/10 text-foreground inter-med-16 transition-all duration-200 flex items-center gap-2 md:gap-3 hover:text-foreground/50"
                  >
                    <Bug
                      className="w-4 h-4 opacity-60"
                    />
                    <span className="inline text-nowrap">Report Bug</span>
                  </button>

                  <button
                    onClick={() => navigate("/contact?tab=feature")}
                    className={`px-0 md:px-3 lg:px-6 py-2 md:py-[10px] text-foreground inter-med-16 transition-all duration-200 flex items-center gap-3 hover:text-foreground/50
                    `}
                  >
                    <Lightbulb
                      className="w-4 h-4 opacity-60"
                    />
                    <span className="inline text-nowrap">
                      Request a Feature
                    </span>
                  </button>
                </div>
              </div>

              <div className="relative w-full lg:w-1/2 h-full z-[1]">
                <video
                  src="/videos/flowbitz-tutorial.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="relative w-full z-[1] h-full object-cover"
                ></video>
                <div className="absolute top-0 w-full h-full z-[2] pointer-events-none bg-gradient-custom-mobile md:bg-gradient-custom"></div>
              </div>

              <img
                src="/images/cta-gradient.webp"
                alt=""
                aria-hidden="true"
                className="absolute hidden md:block top-0 left-0 w-full object-contain z-[2] md:z-[1] pointer-events-none"
                loading="lazy"
              />

              <img
                src="/images/cta-grad-mobile.webp"
                alt=""
                aria-hidden="true"
                className="absolute block md:hidden top-0 right-0 object-contain z-[2] md:z-[1] pointer-events-none"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;

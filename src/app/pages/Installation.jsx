import React, { useState, useRef } from "react";
import Sidebar from "../components/layout/LeftSidebar.jsx";
import SEO from "../components/SEO.jsx";
import { Button } from "../components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card.jsx";
import {
  Copy,
  CheckCircle,
  Code,
  Settings,
  Upload,
  Rocket,
  ExternalLink,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useNavigate } from "react-router-dom";

const Installation = () => {
  const [copyStates, setCopyStates] = useState({});
  const [openFAQItems, setOpenFAQItems] = useState({});
  const navigate = useNavigate();

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStates((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopyStates((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const toggleFAQItem = (index) => {
    setOpenFAQItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const installationFAQItems = [
    {
      question: "Do I need to install GSAP separately?",
      answer:
        "No! FlowBitz includes GSAP and all necessary plugins bundled in. Just add our single script tag and everything will work automatically.",
    },
    {
      question: "Can I use FlowBitz with other frameworks besides Webflow?",
      answer:
        "FlowBitz is specifically designed for Webflow, but the core JavaScript can be adapted for other frameworks. However, we recommend using it with Webflow for the best experience.",
    },
    {
      question: "My animations aren't working. What should I check?",
      answer:
        "1. Make sure the FlowBitz script is loaded\n2. Check that you have the correct wb-component attribute\n3. Verify the component name is spelled correctly\n4. Check browser console for errors\n5. Ensure your element has text content",
    },
    {
      question: "The component doesn't work with certain Webflow elements",
      answer:
        "FlowBitz works best with text elements. Some complex Webflow elements or nested structures might not work properly. Try using simpler text elements or check the component documentation for compatibility notes.",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Install FlowBitz in Webflow",
    description:
      "Complete guide to installing and using FlowBitz animations in your Webflow projects",
    url: "https://www.flowbitz.dev/installation",
    totalTime: "PT5M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    step: [
      {
        "@type": "HowToStep",
        name: "Add FlowBitz Script",
        text: "Add the FlowBitz script to your Webflow project's custom code section",
        url: "https://www.flowbitz.dev/installation#step-1",
      },
      {
        "@type": "HowToStep",
        name: "Add Component Attributes",
        text: "Add wb-component attributes to your elements in Webflow",
        url: "https://www.flowbitz.dev/installation#step-2",
      },
      {
        "@type": "HowToStep",
        name: "Customize with Attributes",
        text: "Use additional attributes to customize animation behavior and appearance",
        url: "https://www.flowbitz.dev/installation#step-3",
      },
      {
        "@type": "HowToStep",
        name: "Publish Your Site",
        text: "Publish your Webflow site to see the animations in action",
        url: "https://www.flowbitz.dev/installation#step-4",
      },
    ],
  };

  return (
    <>
      <SEO
        title="Installation Guide - FlowBitz | Add GSAP Animations to Webflow"
        description="Complete guide to installing FlowBitz in your Webflow projects. Add the script and configure GSAP-powered animations with simple HTML attributes—step-by-step, no coding required."
        keywords="FlowBitz installation, webflow installation guide, webflow custom code, FlowBitz script, webflow HTML attributes, webflow GSAP animations"
        image="https://www.slabpixel.dev/images/FlowBitz-OpenGraph.webp"
        url="https://www.flowbitz.dev/installation"
        structuredData={structuredData}
      />
      <div className="bg-background text-foreground h-full overflow-scroll lg:overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-4.5rem)]">
          {/* Shared Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex flex-col px-2 py-8 md:p-6 gap-8 w-full items-center overflow-scroll lg:h-full">
            <div className="w-full max-w-[800px] flex flex-col gap-2">
              <h1 className="inter-semi-32 installation text-foreground">
                Installation Guide
              </h1>
              <p className="text-paragraph large text-text-medium">
                Learn how to install and use FlowBitz animations in your Webflow
                projects with this step-by-step guide.
              </p>
            </div>

            {/* Installation Steps */}
            <div className="w-full max-w-[800px] flex flex-col gap-10 md:py-6">
              <div className="flex flex-col gap-2 p-4 border border-foreground/10 rounded-lg">
                <h2 className="text-heading-small text-foreground my-1">
                  1. &nbsp; Adding FlowBitz Script
                </h2>

                {/* Step 1: Add Script */}
                <div className="ml-6 flex flex-col gap-2">
                  <p className="text-paragraph large text-text-medium">
                    • Add the FlowBitz script to your Webflow project's custom
                    code section to enable all animations.
                  </p>

                  <p className="text-paragraph large text-text-medium">
                    • Go to your Webflow Project{" "}
                    <strong>Settings → Custom Code → Footer Code</strong>, and
                    paste the script there.
                  </p>

                  <div className="relative">
                    <SyntaxHighlighter
                      language="html"
                      style={tomorrow}
                      customStyle={{
                        margin: 0,
                        padding: "0.875rem",
                        fontSize: "0.75rem",
                        borderRadius: "0.5rem",
                        backgroundColor: "#181b27",
                      }}
                      codeTagProps={{
                        style: {
                          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                        },
                      }}
                    >
                      {
                        '<script src="https://cdn.jsdelivr.net/npm/flowbitz@latest/dist/flowbitz.umd.js"></script>'
                      }
                    </SyntaxHighlighter>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-gray-700"
                      onClick={() =>
                        copyToClipboard(
                          '<script src="https://cdn.jsdelivr.net/npm/flowbitz@latest/dist/flowbitz.umd.js"></script>',
                          "scriptTag",
                        )
                      }
                    >
                      {copyStates.scriptTag ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-white" />
                      )}
                    </Button>
                  </div>

                  <p className="text-paragraph large text-text-medium">
                    Thats it! 🎉 You can now use FlowBitz animations in your
                    Webflow project.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-4 border border-foreground/10 rounded-lg">
                <h2 className="text-heading-small text-foreground my-1">
                  2. &nbsp; Adding FlowBitz Component
                </h2>

                {/* Step 2: Add Component */}
                <div className="ml-8 flex flex-col gap-2">
                  <p className="text-paragraph large semi text-foreground">
                    Add Component Attributes
                  </p>

                  <p className="text-paragraph large text-text-medium">
                    Add the wb-component attribute to any element in your
                    Webflow project to enable animations. In Webflow, you can
                    add custom attributes by selecting your element, going to{" "}
                    <strong>Element Settings → Custom Attributes</strong>, and
                    adding the attribute name and value.
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-paragraph large text-text-medium">
                          Attribute Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value="wb-component"
                            readOnly
                            className="w-full p-2.5 flex items-center justify-center text-attribute bg-base-high border border-foreground/10 rounded"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent"
                            onClick={() =>
                              copyToClipboard("wb-component", "attributeName")
                            }
                          >
                            {copyStates.attributeName ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-paragraph large text-text-medium">
                          Example Value
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value="text-type"
                            readOnly
                            className="w-full p-2.5 flex items-center justify-center text-attribute bg-base-high border border-foreground/10 rounded"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent"
                            onClick={() =>
                              copyToClipboard("text-type", "attributeValue")
                            }
                          >
                            {copyStates.attributeValue ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-4 border border-foreground/10 rounded-lg">
                <h2 className="text-heading-small text-foreground my-1">
                  3. &nbsp; Customize with Attributes
                </h2>

                <div className="relative w-full pl-8">
                  <video
                    className="rounded-lg border border-border shadow-lg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source
                      src="https://www.slabpixel.dev/videos/flowbitz-tutorial.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <p className=" ml-8 text-paragraph large text-text-medium">
                  Use additional attributes to customize animation behavior,
                  timing, and appearance.{" "}
                  <strong>
                    {" "}
                    Each FlowBitz component supports various attributes like
                    wb-duration for timing control, wb-delay for staggered
                    effects, wb-easing for smooth motion curves, wb-color for
                    visual customization, and wb-trigger to control when
                    animations start.{" "}
                  </strong>
                  These attributes work together to create unique, professional
                  animations tailored to your design needs.
                </p>
              </div>

              <div className="flex flex-col gap-2 p-4 border border-foreground/10 rounded-lg">
                <h2 className="text-heading-small text-foreground my-1">
                  4. &nbsp; Publish Your Site
                </h2>

                {/* Step 3: Publish */}
                <div className="ml-8 flex flex-col gap-2">
                  <p className="text-paragraph large semi text-foreground">
                    Publish your Webflow site to see the animations in action!
                  </p>

                  <p className="text-paragraph large text-text-medium">
                    Once published, your animations will work automatically. The
                    script loads asynchronously and initializes all components
                    on page load.
                  </p>
                </div>
              </div>
            </div>

            {/* Installation FAQ Section */}
            <div className="w-full max-w-[800px] flex flex-col gap-4">
              <h2 className="inter-semi-32 installation text-foreground">
                Frequently Asked Questions
              </h2>

              <div className="space-y-3">
                {installationFAQItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-base-medium rounded p-4 hover:bg-base-high transition-all duration-300"
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => toggleFAQItem(index)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="inter-med-16 pr-4 text-foreground">
                          {item.question}
                        </h4>
                        <div className="flex items-center gap-2">
                          {openFAQItems[index] ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>
                    {openFAQItems[index] && (
                      <div className="mt-4 pt-4">
                        <div className="prose prose-sm max-w-none text-paragraph font-medium text-text-medium">
                          <p className="whitespace-pre-line">{item.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Installation;

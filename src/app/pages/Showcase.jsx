import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ChevronDown,
  Plus,
} from "lucide-react";
import SEO from "../components/SEO.jsx";
import Logo from "../components/Logo.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Modal } from "../components/ui/modal.jsx";
import { componentsMetadata } from "../../library/data/componentsMetadata.js";

const ITEMS_PER_PAGE = 15;

const componentNames = Object.values(componentsMetadata).map((c) => c.name);

const ComponentAutocomplete = ({ selected = [], onChange }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  const filtered = componentNames.filter((name) => {
    if (selected.includes(name)) return false;
    if (!query) return true;
    return name.toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const activeEl = listRef.current.children[activeIndex];
      if (activeEl) activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const addItem = useCallback(
    (name) => {
      onChange([...selected, name]);
      setQuery("");
      setActiveIndex(-1);
      inputRef.current?.focus();
    },
    [selected, onChange],
  );

  const removeItem = useCallback(
    (name) => {
      onChange(selected.filter((s) => s !== name));
      inputRef.current?.focus();
    },
    [selected, onChange],
  );

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && !query && selected.length > 0) {
      removeItem(selected[selected.length - 1]);
      return;
    }

    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (!open) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && filtered[activeIndex]) {
          addItem(filtered[activeIndex]);
        }
        break;
      case "Escape":
        e.stopPropagation();
        setOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  return (
    <div className="relative">
      <div
        className="flex flex-wrap items-center gap-1.5 w-full min-h-10 rounded bg-base-medium px-2 py-1.5 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {selected.map((name) => (
          <span
            key={name}
            className="inline-flex items-center gap-1 rounded bg-foreground/90 px-2.5 py-1 text-xs font-medium text-background"
          >
            {name}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeItem(name);
              }}
              className="ml-0.5 hover:text-background/70 transition-colors"
              aria-label={`Remove ${name}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder={selected.length === 0 ? "Search components..." : ""}
          className="flex-1 min-w-[80px] bg-transparent text-sm text-foreground placeholder:text-base-medium outline-none"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls="component-listbox"
          autoComplete="off"
        />
      </div>
      {open && filtered.length > 0 && (
        <ul
          id="component-listbox"
          ref={listRef}
          role="listbox"
          className="absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded border border-border bg-background shadow-md"
        >
          {filtered.map((name, i) => (
            <li
              key={name}
              role="option"
              aria-selected={i === activeIndex}
              className={`cursor-pointer px-3 py-2 text-sm transition-colors ${
                i === activeIndex
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-accent/50"
              }`}
              onMouseDown={() => addItem(name)}
              onMouseEnter={() => setActiveIndex(i)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Showcase = () => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    liveUrl: "",
    components: [],
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://slabpixel.dev/api/send-email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "showcase-submit",
          name: "Flowbitz Showcase",
          email: formData.email,
          subject: "New Submission",
          message: "New Submission",
          projectName: "New Submission",
          liveUrl: formData.liveUrl,
          components: formData.components.join(", "),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ email: "", liveUrl: "", components: [] });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = () => {
    setSubmitStatus(null);
    setModalOpen(true);
  };

  const showcaseProjects = [
    {
      name: "SlabPixel",
      url: "https://slabpixel.com",
      image: "https://slabpixel.dev/images/slabpixel.webp",
      description: "Creative Digital Studio",
      components: ["Split Text", "Smart Animate"],
    },
    {
      name: "Neuera",
      url: "https://neuera.webflow.io",
      image: "https://slabpixel.dev/images/neuera.webp",
      description: "AI-powered Solutions",
      components: ["Split Text", "Smart Animate"],
    },
    {
      name: "Whispr",
      url: "https://whisprrr.webflow.io",
      image: "https://slabpixel.dev/images/whispr.webp",
      description: "Communication Platform",
      components: ["Split Text", "Smart Animate"],
    },
    {
      name: "Quantra AI",
      url: "https://quantra-ai.webflow.io",
      image: "https://slabpixel.dev/images/quantra.webp",
      description: "Quantum AI Technology",
      components: ["Split Text", "Smart Animate"],
    },
    {
      name: "Mavence",
      url: "https://mavencee.webflow.io",
      image: "https://slabpixel.dev/images/mavence.webp",
      description: "Business Solutions",
      components: ["Split Text", "Smart Animate"],
    },
    {
      name: "Formahaus",
      url: "https://formahaus.webflow.io",
      image: "https://slabpixel.dev/images/formahaus.webp",
      description: "Design & Architecture",
      components: ["Split Text", "Smart Animate"],
    },
    {
      name: "Vexum",
      url: "https://vexum.webflow.io",
      image: "https://slabpixel.dev/images/vexum.webp",
      description: "WEB3 & Finance",
      components: ["Split Text", "Smart Animate"],
    },
    {
      name: "Langford",
      url: "https://llangford.webflow.io",
      image: "https://slabpixel.dev/images/langford.webp",
      description: "Fashion & Lifestyle",
      components: ["Split Text", "Smart Animate"],
    },
    {
      name: "Stagetimer",
      url: "https://stagetimer.webflow.io",
      image: "https://slabpixel.dev/images/stagetimer.webp",
      description: "Tools & Management",
      components: ["Split Text", "Smart Animate"],
    },
    {
      name: "Art-Doc",
      url: "https://art-doc.webflow.io",
      image: "https://slabpixel.dev/images/artdoc.webp",
      description: "Art & Culture",
      components: ["Split Text", "Smart Animate"],
    },
    {
      name: "Swiftmate",
      url: "https://swftmate.webflow.io",
      image: "https://slabpixel.dev/images/swiftmate.webp",
      description: "Finance Application",
      components: ["Split Text", "Smart Animate"],
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FlowBitz Showcase",
    description:
      "Explore real-world examples and showcases of FlowBitz components in action. See how developers are using our interactive components in their Webflow projects.",
    url: "https://www.flowbitz.dev/showcase",
    mainEntity: {
      "@type": "ItemList",
      name: "FlowBitz Component Showcases",
      description:
        "Real-world examples of FlowBitz components in Webflow projects",
    },
  };

  return (
    <>
      <SEO
        title="Showcase - FlowBitz Components"
        description="Explore real-world examples and showcases of FlowBitz components in action. See how developers are using our interactive components in their Webflow projects."
        keywords="flowbitz showcase, webflow components examples, webflow components showcase, flowbitz projects, webflow components in action"
        image="https://www.slabpixel.dev/images/FlowBitz-OpenGraph.webp"
        url="https://www.flowbitz.dev/showcase"
        structuredData={structuredData}
      />
      <section className="bg-transparent text-foreground min-h-screen relative overflow-hidden">
        <div className="max-w-[1200px] lg:mx-auto mx-2 relative z-[2] border-x border-foreground/10">
          {/* Hero Section */}
          <header
            wb-component="smart-animate"
            className="w-full flex flex-col items-center gap-5 md:gap-[1.625rem] py-6 md:py-14 border-b border-foreground/10"
          >
            <div className="bg-foreground/10 h-[30px] w-fit px-4 flex items-center justify-center gap-1">
              <span className="text-link font-medium text-foreground">
                Made with
              </span>
              <Logo className="h-4 w-auto" />
            </div>

            <h1 className="inter-semi-48 w-2/3 md:w-full text-center text-foreground">
              Website Showcase
            </h1>

            <p className="inter-reg-18 text-text-medium text-center px-4 md:px-0 max-w-[99%] md:max-w-[770px]">
              Explore real-world Webflow builds powered by FlowBitz—see
              how teams turn ideas into polished motion with our
              components.
            </p>
          </header>
          {/* End Hero Section */}

          {/* Showcase Gallery */}
          <div
            wb-component="smart-animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-foreground/10"
          >
            {showcaseProjects.slice(0, visibleCount).map((project, index) => (
              <a
                key={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 overflow-hidden transition-all duration-300 border-r border-b border-foreground/10"
              >
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-fit object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute flex items-end h-full bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex w-full items-center p-2 gap-4 text-white">
                      {/* <div className="w-[90%] hide-scrollbar overflow-x-scroll flex flex-nowrap lg:flex-wrap gap-2">
                        {project.components.map((component, index) => (
                          <div
                            key={index}
                            className="text-attribute text-foreground rounded px-2.5 py-1.5 bg-base-low/50 text-nowrap"
                          >
                            {component}
                          </div>
                        ))}
                      </div> */}

                      <ArrowRight
                        className="ml-auto w-5 h-5 -rotate-45"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-4">
                  <h3 className="text-link font-medium text-foreground">
                    {project.name} - {project.description}
                  </h3>
                </div>

                {/* Decorative corner gradient */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl"></div>
              </a>
            ))}

            <button
              type="button"
              onClick={openModal}
              className="group relative flex flex-col overflow-hidden text-left transition-all duration-300 border-r border-b border-foreground/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="relative h-full aspect-video overflow-hidden bg-muted">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-base-medium/90 p-6 transition-colors duration-300 group-hover:bg-base-medium">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10 text-foreground transition-transform duration-300 group-hover:scale-105">
                    <Plus className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <span className="inter-semi-24 text-foreground">Add your site</span>
                  <span className="inter-reg-18 text-text-medium text-center max-w-[240px]">
                    Submit your project to appear in the showcase
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Load More */}
          {visibleCount < showcaseProjects.length && (
            <div className="flex justify-center pt-12 md:pt-8">
              <button
                onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                className="flex items-center gap-2 px-6 py-3 border border-foreground/10 rounded text-foreground hover:text-foreground/70 transition-colors duration-200"
              >
                <span className="text-sm font-medium">Load More</span>
<ChevronDown
                className="w-4 h-4 opacity-60"
              />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Submit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {submitStatus === "success" ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
            <h3 className="text-lg font-semibold text-foreground">
              Submission Received!
            </h3>
            <p className="text-sm text-muted-foreground">
              We'll take a look and get back to you soon. Thanks for sharing
              your work!
            </p>
            <Button
              onClick={() => setModalOpen(false)}
              variant="custom"
              size="custom"
              className="mt-2 h-10 px-6 bg-foreground rounded text-tooltip text-background"
            >
              Close
            </Button>
          </div>
        ) : submitStatus === "error" ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
            <h3 className="text-lg font-semibold text-foreground">
              Submission Failed
            </h3>
            <p className="text-sm text-muted-foreground">
              Something went wrong. Please try again or contact us at
              flowbitz@slabpixel.com
            </p>
            <Button
              onClick={() => setSubmitStatus(null)}
              variant="custom"
              size="custom"
              className="mt-2 h-10 px-6 bg-foreground rounded text-tooltip text-background"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6 md:gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div className="bg-foreground/10 h-[30px] w-fit px-4 flex items-center justify-center gap-1">
                  <span className="text-link font-medium text-foreground">
                    Made with
                  </span>
                  <Logo className="h-4 w-auto" />
                </div>

                <p className="inter-med-40 text-foreground">
                  Share Your <br /> #MadewithFlowbitz Project
                </p>
              </div>

              <p className="inter-reg-18 text-text-medium opacity-80">
                Share your cool FlowBitz project! Fill out this <br /> form to
                feature your work.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="modal-email"
                  className="block text-link text-foreground font-medium mb-2"
                >
                  Your Email
                </label>
                <Input
                  id="modal-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="modal-url"
                  className="block text-link text-foreground font-medium mb-2"
                >
                  Website URL
                </label>
                <Input
                  id="modal-url"
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => handleInputChange("liveUrl", e.target.value)}
                  required
                  placeholder="https://yourproject.com"
                />
              </div>

              <div className="mb-10 pb-6">
                <label
                  htmlFor="modal-components"
                  className="block text-link text-foreground font-medium mb-2"
                >
                  Flowbitz components used
                </label>
                <ComponentAutocomplete
                  selected={formData.components}
                  onChange={(val) => handleInputChange("components", val)}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="custom"
                size="custom"
                className="w-full h-10 bg-foreground rounded text-link font-medium text-background flex items-center justify-center gap-4"
              >
                {isSubmitting ? (
                  <>
                    Submitting...
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background" />
                  </>
                ) : (
                  <>
                    Submit
<ArrowRight
                    className="w-3 h-3 opacity-60"
                  />
                  </>
                )}
              </Button>

              <p className="mt-2 text-tooltip text-text-medium text-center opacity-60">
                By submitting, you agree that your project may be featured in
                our showcase gallery.
              </p>
            </form>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Showcase;

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Lenis from "lenis";
import Preloader from "./components/Preloader";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/scrollToTop";
import ContactBubble from "./components/contactBubble";
import Home from "./pages/Home";
import Components from "./pages/Components";
import ComponentDetail from "./pages/ComponentDetail";
import Installation from "./pages/Installation";
import About from "./pages/About";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import Showcase from "./pages/Showcase";
import FAQ from "./pages/FAQ";
import Release from "./pages/Release";
import License from "./pages/License";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const SIDEBAR_PATHS = [
  "/components",
  "/installation",
  "/support",
  "/faq",
  "/about",
];

function isSidebarRoute(pathname) {
  return SIDEBAR_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );
  const heroGradientRef = useRef(null);
  const mainRef = useRef(null);
  const mainContentRef = useRef(null);
  const lenisRef = useRef(null);
  const handlePreloaderComplete = useCallback(() => setIsLoading(false), []);
  const handleScrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      const el = document.getElementById("main-content");
      if (el) el.scrollTop = 0;
    }
  }, []);
  const isMainPage =
    location.pathname === "/" ||
    location.pathname === "/showcase" ||
    location.pathname.startsWith("/blog") ||
    location.pathname.startsWith("/contact");

  const sidebarRoute = isSidebarRoute(location.pathname);

  // Track desktop vs mobile breakpoint (tailwind lg ≈ 1024px)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 1024px)");

    const handleChange = (e) => {
      setIsDesktop(e.matches);
    };

    // Initial sync
    setIsDesktop(mq.matches);

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // Lenis on #main-content only when:
  // - Bukan halaman Sidebar, dan
  // - Breakpoint desktop (isDesktop === true)
  useEffect(() => {
    if (sidebarRoute || !isDesktop) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const wrapper = mainRef.current;
    const content = mainContentRef.current;
    if (!wrapper || !content) return;

    const lenis = new Lenis({
      wrapper,
      content,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const scrollHandler = ({ scroll }) => setIsScrolled(scroll > 100);
    lenis.on("scroll", scrollHandler);
    scrollHandler({ scroll: lenis.scroll });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off("scroll", scrollHandler);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [sidebarRoute, isDesktop]);

  useEffect(() => {
    if (sidebarRoute) {
      setIsScrolled(false);
    } else {
      lenisRef.current?.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, sidebarRoute]);

  // Top Gradient Parallax
  useEffect(() => {
    if (!isMainPage || !heroGradientRef.current) return;

    const gsap = window.gsap;
    if (!gsap || !window.ScrollTrigger) return;

    const heroGrad = heroGradientRef.current;
    const scroller = document.getElementById("main-content");

    if (!scroller) return;

    gsap.set(heroGrad, { xPercent: -50 });

    const heroGradTween = gsap.to(heroGrad, {
      y: -500,
      ease: "none",
      scrollTrigger: {
        scroller,
        trigger: scroller,
        start: "top top",
        end: "600px top",
        scrub: true,
      },
    });

    return () => {
      heroGradTween.scrollTrigger?.kill();
      heroGradTween.kill();
      gsap.set(heroGrad, { clearProps: "all" });
    };
  }, [isMainPage]);

  return (
    <HelmetProvider>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <div className="app relative bg-background overflow-hidden">
        <ScrollToTop />
        <Navbar isScrolled={isScrolled} />
        <ContactBubble />
        {isMainPage && (
          <>
            <div
              ref={heroGradientRef}
              id="hero-top-gradient"
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[400%] lg:w-full max-w-[1440px] object-cover z-[1] pointer-events-none flex items-center justify-center"
            >
              <img
                src="/images/hero-gradient.webp"
                alt=""
                aria-hidden="true"
                className="w-full h-full z-[1]"
                loading="lazy"
              />
              <div
                className="absolute inset-0 z-[2] grid grid-cols-4 grid-rows-2 pointer-events-none opacity-20"
                aria-hidden="true"
              >
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/noise.webp')" }}
                  />
                ))}
              </div>
            </div>
          </>
        )}
        <main
          ref={mainRef}
          id="main-content"
          className={`relative z-[2] h-[calc(100dvh-4.5rem)] mt-18 overflow-y-auto overflow-x-hidden ${
            sidebarRoute
              ? ""
              : "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-background"
          }`}
        >
          {sidebarRoute ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/components" element={<Components />} />
              <Route
                path="/components/:componentName"
                element={<ComponentDetail />}
              />
              <Route path="/installation" element={<Installation />} />
              <Route path="/about" element={<About />} />
              <Route path="/support" element={<Support />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/showcase" element={<Showcase />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/release" element={<Release />} />
              <Route path="/license" element={<License />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <>
              <div ref={mainContentRef} className="min-h-full">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/components" element={<Components />} />
                  <Route
                    path="/components/:componentName"
                    element={<ComponentDetail />}
                  />
                  <Route path="/installation" element={<Installation />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/showcase" element={<Showcase />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/release" element={<Release />} />
                  <Route path="/license" element={<License />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                {isMainPage && <Footer onScrollToTop={handleScrollToTop} />}
              </div>
            </>
          )}
        </main>
      </div>
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  );
}

export default App;

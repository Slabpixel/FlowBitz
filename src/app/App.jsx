import React, { useEffect, useState, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ScrollToTop'
import ContactBubble from './components/ContactBubble'
import Home from './pages/Home'
import Components from './pages/Components'
import ComponentDetail from './pages/ComponentDetail'
import Installation from './pages/Installation'
import About from './pages/About'
import Support from './pages/Support'
import Contact from './pages/Contact'
import Showcase from './pages/Showcase'
import ShowcaseSubmit from './pages/ShowcaseSubmit'
import FAQ from './pages/FAQ'
import Release from './pages/Release'
import License from './pages/License'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'
import { ThemeProvider } from './contexts/ThemeContext'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false);
  const heroGradientRef = useRef(null);
  const isMainPage = location.pathname === '/' || location.pathname === '/showcase' || location.pathname.startsWith('/blog');

  useEffect(() => {
    const handleScroll = () => {
      const scrollElement = document.getElementById('root')
      const scrollTop = scrollElement?.scrollTop || 0
      
      setIsScrolled(scrollTop > 100)
    }

    const scrollElement = document.getElementById('root')
    scrollElement?.addEventListener('scroll', handleScroll)
    
    handleScroll()

    return () => {
      scrollElement?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Reset scroll position on route change (optional)
  useEffect(() => {
    const scrollElement = document.getElementById('root')
    if (scrollElement) {
      scrollElement.scrollTop = 0
    }
  }, [location.pathname])

  // Top Gradient Parallax
  useEffect(() => {
    if (!isMainPage || !heroGradientRef) return;

    const gsap = window.gsap
    if (!gsap || !window.ScrollTrigger) return

    const heroGrad = heroGradientRef.current;
    const scroller = document.getElementById('main-content');

    if (!scroller) return;

    gsap.set(heroGrad, { xPercent: -50 });

    const heroGradTween = gsap.to(heroGrad, {
      y: -500,
      ease: 'none',
      scrollTrigger: {
        scroller: scroller,
        trigger: scroller,
        start: 'top top',
        end: '600px top',
        scrub: true,
      }
    });

    return () => {
      heroGradTween.scrollTrigger?.kill();
      heroGradTween.kill();
      gsap.set(heroGrad, { clearProps: 'all' })
    }
  }, [isMainPage]);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <div className="app relative bg-background overflow-hidden">
          <ScrollToTop />
          <Navbar isScrolled={isScrolled} />
          <ContactBubble />
          { isMainPage && (
              // Hero Gradient Top
              <div ref={heroGradientRef} id='hero-top-gradient' className='absolute top-0 left-1/2 -translate-x-1/2 w-[400%] lg:w-full max-w-[1440px] object-cover z-[1] pointer-events-none flex items-center justify-center'>
                <img 
                  src="/images/hero-gradient.webp"
                  alt=""
                  aria-hidden="true"
                  className='w-full h-full z-[1]'
                  loading='lazy'
                />

                {/* Noise grid 4×2: satu wrapper, 8 cell dengan background agar tetap satu asset */}
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
              // End Hero Gradient Top
            ) }
          <main id="main-content" className='relative overflow-scroll h-[calc(100dvh-4.5rem)] mt-18'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/components" element={<Components />} />
              <Route path="/components/:componentName" element={<ComponentDetail />} />
              <Route path="/installation" element={<Installation />} />
              <Route path="/about" element={<About />} />
              <Route path="/support" element={<Support />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/showcase" element={<Showcase />} />
              <Route path="/showcase/submit" element={<ShowcaseSubmit />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/release" element={<Release />} />
              <Route path="/license" element={<License />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            {isMainPage && <Footer />}
          </main>
        </div>
      </ThemeProvider>
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  )
}

export default App

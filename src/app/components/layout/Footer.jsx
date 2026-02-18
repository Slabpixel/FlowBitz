import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Github, Heart, ExternalLink, Layers, HelpCircle, User, MessageSquare, Sparkles, Download, Bug, MessageCircle, Home, Tag, FileText } from 'lucide-react'
import { getFilteredComponentKeys } from '../../../library/data/componentsMetadata.js'
import Logo from '../Logo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../ui/button.jsx'

const Footer = () => {
  const componentCount = getFilteredComponentKeys().length
  const navigate = useNavigate()
  const location = useLocation()
  const getYear = new Date().getFullYear();

  const scrollToTop = () => {
    document.getElementById('root').scrollTop = 0
  }

  const handleNavigation = (path) => {
    if (location.pathname === path) {
      // Same page - just scroll to top
      scrollToTop()
    } else {
      // Different page - navigate (global ScrollToTop will handle scrolling)
      navigate(path)
    }
  }
  const handleGitHub = () => {
    window.open('https://github.com/Slabpixel/FlowBitz', '_blank')
  }

  const handleInstagram = () => {
    window.open('https://www.instagram.com/slabpixel/', '_blank');
  }

  const handleSlabPixel = () => {
    window.open('https://slabpixel.com', '_blank')
  }

  return (
    <footer className="relative w-full bg-background px-2 lg:px-0 overflow-hidden">
      <div className='relative z-[2] flex flex-col overflow-hidden max-w-[1200px] mx-auto border-x-[1px] border-foreground/10'>
        {/* Footer CTA */}
        <div className='flex flex-col items-center pt-2 pb-12 px-2 lg:px-0 lg:py-16 border-b-[1px] border-foreground/10'>
          <div className='flex flex-col items-center gap-6 md:max-w-[348px] w-full md:w-[29%]'>
            <div className='flex flex-col items-center gap-4 text-center'>
              <Logo className='h-10 w-auto' />

              <p className='inter-reg-18 w-[294px] md:w-auto opacity-80 text-foreground'>Create stunning animations with our library of GSAP components.</p>
            </div>

            <div className='flex gap-2 w-fit'>
              <Button onClick={handleGitHub} variant='outline' size='icon' className="border-foreground/10 text-foreground hover:text-foreground/80">
                <FontAwesomeIcon icon={['fab', 'github']} className='w-5 h-5'/>
              </Button>

              <Button onClick={handleInstagram} variant='outline' size='icon' className="border-foreground/10 text-foreground hover:text-foreground/80">
                <FontAwesomeIcon icon={['fab', 'instagram']} className='w-5 h-5'/>
              </Button>
            </div>
          </div>
        </div>
        {/* End Footer CTA */}

        {/* Footer Link List */}
        <div className='flex flex-col items-stretch md:items-center py-10 px-2 lg-px-0 md:py-[3.75rem] border-b-[1px] border-foreground/10'>
          <div className='md:max-w-[548px] w-full md:w-[45.67%] px-2 md:px-0 flex flex-wrap md:flex-nowrap'>
            <div className='flex flex-col items-start md:items-center pl-4 md:pl-0 w-1/2 md:w-auto md:pr-8 md:border-r-[1px] border-foreground/10 gap-2 md:gap-4 flex-grow'>
              <h4 className='display-semi-16 text-foreground'>Navigation</h4>

              <div className='flex flex-col items-start md:items-center gap-2'>
                <button onClick={() =>handleNavigation('/')} className='inter-reg-16 opacity-80 text-foreground hover:opacity-100'>
                  Home
                </button>
                <button onClick={() => handleNavigation('/components')} className='inter-reg-16 opacity-80 text-foreground hover:opacity-100'>
                  Components
                </button>
                <button onClick={() => handleNavigation('/blog')} className='inter-reg-16 opacity-80 text-foreground hover:opacity-100'>
                  Blog
                </button>
                <button onClick={() => handleNavigation('/showcase')} className='inter-reg-16 opacity-80 text-foreground hover:opacity-100'>
                  Showcase
                </button>
                <button onClick={() => handleNavigation('/about')} className='inter-reg-16 opacity-80 text-foreground hover:opacity-100'>
                  About us
                </button>
              </div>
            </div>

            <div className='flex flex-col items-start md:items-center pr-4 md:px-8 w-1/2 md:w-auto md:border-r-[1px] border-foreground/10 gap-2 md:gap-4 flex-grow'>
              <h4 className='display-semi-16 text-foreground'>Support</h4>

              <div className='flex flex-col items-start md:items-center gap-2'>
                <button onClick={() =>handleNavigation('/faq')} className='inter-reg-16 opacity-80 text-foreground hover:opacity-100'>
                  FAQ
                </button>
                <button onClick={() => handleNavigation('/contact?tab=contact')} className='inter-reg-16 opacity-80 text-foreground hover:opacity-100'>
                  Contact
                </button>
                <button onClick={() => handleNavigation('/support')} className='inter-reg-16 opacity-80 text-foreground hover:opacity-100'>
                  Support
                </button>
                <button onClick={handleGitHub} className='inter-reg-16 opacity-80 text-foreground hover:opacity-100'>
                  Github
                </button>
              </div>
            </div>

            <div className='flex flex-col items-start md:items-center pt-5 md:pt-0 pl-4 md:pl-8 gap-2 md:gap-4 flex-grow'>
              <h4 className='display-semi-16 text-foreground'>Resources</h4>

              <div className='flex flex-col items-start md:items-center gap-2'>
                <button onClick={() =>handleNavigation('/release')} className='inter-reg-16 opacity-80 text-foreground hover:opacity-100'>
                  Release notes
                </button>
                <button onClick={() => handleNavigation('/contact?tab=report')} className='inter-reg-16 opacity-80 text-foreground hover:opacity-100'>
                  Report bug
                </button>
                <button onClick={() => handleNavigation('/contact?tab=feature')} className='inter-reg-16 opacity-80 text-foreground hover:opacity-100'>
                  Feature request
                </button>
                <button onClick={() => handleNavigation('/license')} className='inter-reg-16 opacity-80 text-foreground hover:opacity-100'>
                  License
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* End Footer Link List */}

        {/* Footer Copyright */}
        <div className='px-10 py-6 md:py-8 flex flex-col md:flex-row items-center gap-3 md:justify-between'>
          <p className='inter-reg-16 text-foreground'>© {getYear} FlowBitz. All rights reserved.</p>

          <div className="flex gap-3 inter-reg-16 text-foreground">
            <div className='flex gap-1 items-baseline'>
              <p>Made with</p>
              <FontAwesomeIcon icon={['fas', 'heart']} className='w-4 h-4' />
              <p>by <a className='underline' href="https://www.slabpixel.com/" target='_blank'>SlabPixel</a></p>
            </div>

            <div className='border-l border-foreground/30 h-6' />

            <p>v{process.env.REACT_APP_VERSION || '1.0.0'}</p>
          </div>
        </div>
        {/* End Footer Copyright */}
      </div>

      {/* Footer Gradient Bottom */}
      <img 
          src="/images/footer-gradient.webp"
          alt=""
          aria-hidden="true"
          className="absolute w-[400%] bottom-0 left-2/4 -translate-x-2/4 md:w-full max-w-[1440px] object-cover z-[1] pointer-events-none"
          loading='lazy'
        />
        {/* End Footer Gradient Bottom */}
    </footer>
  )
}

export default Footer
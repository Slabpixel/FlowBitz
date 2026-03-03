import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Book, Calendar, FileText } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import { getAllPosts } from '../data/blogPosts.js'
import Footer from '../components/layout/Footer.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const posts = getAllPosts()
const POSTS_PER_PAGE = 2

const formatDate = (value) => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(value))
  } catch (error) {
    console.warn('Unable to format date', value, error)
    return value
  }
}

const Blog = () => {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  return (
    <>
      <SEO
        title="FlowBitz Blog — Tutorials, Release Notes, and Motion Workflows"
        description="Read about FlowBitz releases, Webflow animation tips, and GSAP-powered workflows to ship premium motion without writing custom JavaScript."
        url="https://www.flowbitz.dev/blog"
        keywords="flowbitz blog, webflow animation blog, gsap webflow tutorial, flowbitz release notes"
      />
      <div className="relative z-[2] text-foreground">
        <div className="max-w-[1200px] mx-auto flex justify-center items-center flex-col border-x border-foreground/10">
          <header wb-component="smart-animate" className="w-full flex flex-col items-center gap-[1.625rem] py-6 md:py-14 border-b border-foreground/10">
            <div className='w-fit h-[30px] bg-foreground/10 pl-3 pr-4 gap-[0.875rem] flex items-center text-link font-medium text-foreground rounded-[2px]'>
              <div className='w-2 h-2 bg-[#51A2FF]'> </div>
              Blog
            </div>

            <h1 className="inter-med-56 font-medium">
              Insights and Release News
            </h1>
          </header>

          <section wb-component="smart-animate" wb-start-delay="0.2" className="flex flex-col px-2 pt-2 md:px-14 md:pt-14">
            <div className='flex flex-col gap-5 md:gap-8'>
              {posts.slice(0, visibleCount).map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col gap-4 md:gap-8 sm:flex-row overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl"
                >
                  <Link to={`/blog/${post.slug}`} className="relative w-40 rounded border border-foreground/5 sm:self-stretch sm:flex-shrink-0 overflow-hidden bg-muted">
                    <img
                      src={post.heroImage}
                      alt={post.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>

                  <div className="flex w-full md:py-[0.625rem] justify-between">
                    <div className="flex flex-col gap-2 w-[80%]">
                      <div className="inline-flex items-center gap-2 text-link font-medium text-text-medium">
                        <div className='flex md:hidden gap-1.5 items-center'>
                          <div className='w-5 h-5 flex items-center justify-center'>
                            <FontAwesomeIcon icon={['far', 'calendar']} className='w-4 h-4'/>
                          </div>
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>

                        <span className='block md:hidden' aria-hidden="true">•</span>

                        <span>{post.readingMinutes} min read</span>
                      </div>

                      <Link to={`/blog/${post.slug}`} className="group/title inline-flex text-balance">
                        <h2 className="inter-semi-24 text-foreground">
                          {post.title}
                        </h2>
                      </Link>

                      <div className="flex flex-wrap gap-2">
                        {post.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-link font-medium text-text-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className='h-full pt-4'>
                      <div className='flex gap-1.5 items-center text-text-medium'>
                        <div className='w-5 h-5 flex items-center justify-center'>
                          <FontAwesomeIcon icon={['far', 'calendar']} className='w-4 h-4'/>
                        </div>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              <div className='h-[1px] w-full bg-foreground/10' />

              {visibleCount < posts.length && (
                <div className="flex justify-center pt-[7.5rem] mb-7 md:pt-12 md:pb-18">
                  <button
                    onClick={() => setVisibleCount(prev => prev + POSTS_PER_PAGE)}
                    className="flex items-center gap-2 px-6 py-3 border border-foreground/10 rounded text-foreground hover:text-foreground/70 transition-colors duration-200"
                  >
                    <span className="text-sm font-medium">Load More</span>
                    <FontAwesomeIcon icon={['far', 'chevron-down']} className='w-4 h-4 opacity-60'/>
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

    </>
  )
}

export default Blog



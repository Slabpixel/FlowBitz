import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import { getAllPosts } from '../data/blogPosts.js'

const posts = getAllPosts()

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
  return (
    <>
      <SEO
        title="FlowBitz Blog — Tutorials, Release Notes, and Motion Workflows"
        description="Read about FlowBitz releases, Webflow animation tips, and GSAP-powered workflows to ship premium motion without writing custom JavaScript."
        url="https://www.flowbitz.dev/blog"
        keywords="flowbitz blog, webflow animation blog, gsap webflow tutorial, flowbitz release notes"
      />
      <div className="bg-background text-foreground pt-[64px] pb-16">
        <div className="max-w-5xl mx-auto flex justify-center items-center flex-col gap-12 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <header wb-component="smart-animate" className="max-w-4xl space-y-4 text-center">
            <p className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-muted-foreground/10 dark:from-primary/20 dark:to-white/10 rounded-full text-sm font-medium text-black dark:text-white">
              FlowBitz Blog
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Motion ideas, release notes, and workflows for Webflow teams
            </h1>
            <p className="max-w-2xl mx-auto text-base text-muted-foreground sm:text-lg">
              Follow along as we improve the FlowBitz library, share deep dives on signature components, and document shortcuts for shipping GSAP-grade motion without JavaScript.
            </p>
          </header>

          <section wb-component="smart-animate" wb-start-delay="0.2" className="flex flex-col gap-6 sm:gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col sm:flex-row rounded-md border border-border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Link to={`/blog/${post.slug}`} className="relative w-full sm:w-80 h-48 sm:h-auto sm:self-stretch sm:flex-shrink-0 overflow-hidden bg-muted">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {post.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                    <span aria-hidden="true">•</span>
                    <span>{post.readingMinutes} min read</span>
                  </div>
                  <div className="mb-4 flex-1 space-y-2">
                    <Link to={`/blog/${post.slug}`} className="group/title inline-flex">
                      <h2 className="text-xl font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover/title:text-primary">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {post.description}
                    </p>
                  </div>
                  <div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-200 hover:text-primary/80"
                    >
                      Read article
                      <span aria-hidden="true" className="text-base leading-none">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
    </>
  )
}

export default Blog



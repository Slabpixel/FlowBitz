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
      <div className="bg-background text-foreground pt-24 pb-16">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          <header className="space-y-4">
            <p className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              FlowBitz Blog
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Motion ideas, release notes, and workflows for Webflow teams
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              Follow along as we improve the FlowBitz library, share deep dives on signature components, and document shortcuts for shipping GSAP-grade motion without JavaScript.
            </p>
          </header>

          <section className="grid gap-6 sm:gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                    <span aria-hidden="true">•</span>
                    <span>{post.readingMinutes} min read</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <Link to={`/blog/${post.slug}`} className="group inline-flex">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-muted-foreground sm:text-base">
                    {post.description}
                  </p>
                </div>
                <div className="mt-6">
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
              </article>
            ))}
          </section>
        </div>
      </div>
    </>
  )
}

export default Blog



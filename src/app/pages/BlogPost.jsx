import React, { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import { getAdjacentPosts, getPostContent } from '../data/blogPosts.js'
import { cn } from '../../shared/lib/utils.js'
import { buttonVariants } from '../components/ui/button.jsx'

const formatDate = (value) => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(value))
  } catch (error) {
    console.warn('Unable to format date', value, error)
    return value
  }
}

const BlogPost = () => {
  const { slug } = useParams()
  const post = useMemo(() => getPostContent(slug), [slug])

  const { previous, next } = useMemo(() => getAdjacentPosts(slug), [slug])

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "description": post.description,
    "articleBody": post.excerpt,
    "wordCount": post.words,
    "timeRequired": `PT${Math.max(1, post.readingMinutes)}M`,
    "url": `https://www.flowbitz.dev/blog/${post.slug}`,
    "author": {
      "@type": "Organization",
      "name": "SlabPixel Studio",
      "url": "https://slabpixel.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SlabPixel Studio",
      "url": "https://slabpixel.com"
    }
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        url={`https://www.flowbitz.dev/blog/${post.slug}`}
        image={post.heroImage}
        type="article"
        publishedTime={post.publishedAt}
        structuredData={structuredData}
      />
      <article className="bg-background text-foreground pt-24 pb-16">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Link
              to="/blog"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'gap-2 px-2 text-sm text-muted-foreground hover:text-foreground'
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>
          </div>

          <header className="space-y-6">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span aria-hidden="true">•</span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readingMinutes} min read
                </span>
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {post.title}
              </h1>
              <p className="text-base text-muted-foreground sm:text-lg">
                {post.description}
              </p>
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {post.heroImage && (
              <img
                src={post.heroImage}
                alt={post.title}
                className="w-full rounded-3xl border border-border"
                loading="lazy"
              />
            )}
          </header>

          {post.body ? (
            <div
              className="blog-article space-y-6 text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          ) : (
            <p className="text-base text-muted-foreground">
              Article content is coming soon.
            </p>
          )}

          <footer className="border-t border-border pt-8">
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <span>Published {formatDate(post.publishedAt)}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {previous && (
                <Link
                  to={`/blog/${previous.slug}`}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                    'gap-2'
                  )}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Link>
              )}
              {next && (
                <Link
                  to={`/blog/${next.slug}`}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                    'gap-2'
                  )}
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </footer>
        </div>
      </article>
    </>
  )
}

export default BlogPost



import React, { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react'
import SEO from '../components/SEO.jsx'
import { getAdjacentPosts, getPostContent } from '../data/blogPosts.js'
import { cn } from '../../shared/lib/utils.js'
import { buttonVariants } from '../components/ui/button.jsx'
import Footer from '../components/layout/Footer.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      <article className="relative z-[2] md:pt-14 pt-10 pb-12 bg-transparent text-foreground max-w-[1200px] mx-auto border-x border-foreground/10">
        <div className="mx-auto flex w-full lg:max-w-[800px] flex-col gap-8 px-4 lg:px-0">
          <header className="flex flex-col items-center justify-center gap-2">
            <div className='flex gap-2'>
              <Link
                to="/blog"
                className={cn(
                  buttonVariants({ variant: 'custom', size: 'custom' }),
                  'gap-2 w-fit flex justify-center items-center'
                )}
              >
                <p className='text-link font-medium text-text-medium hover:text-foreground'>Blog/</p>
              </Link>

              <p className='text-link font-medium text-foreground'>Creative</p>
            </div>

            <h1 className="inter-semi-32 text-foreground text-center">
                {post.title}
            </h1>
          </header>

          {post.heroImage && (
            <img
              src={post.heroImage}
              alt={post.title}
              className="w-full rounded-3xl border border-border"
              loading="lazy"
            />
          )}

          <div className="inline-flex items-center gap-2 text-link font-medium text-text-medium">
            <div className='flex gap-1.5 items-center'>
              <div className='w-5 h-5 flex items-center justify-center'>
                <FontAwesomeIcon icon={['far', 'calendar']} className='w-4 h-4'/>
              </div>
              <span>{formatDate(post.publishedAt)}</span>
            </div>

            <span className='block' aria-hidden="true">•</span>

            <span>{post.readingMinutes} min read</span>
          </div>

          <div className='h-[1px] w-full bg-foreground/10' />

          {post.body ? (
            <div
              className="blog-article text-muted-foreground"
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



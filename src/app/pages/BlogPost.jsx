import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Link2 } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-bash";
import SEO from "../components/SEO.jsx";
import { getAdjacentPosts, getPostContent } from "../data/blogPosts.js";
import { cn } from "../../shared/lib/utils.js";
import { buttonVariants } from "../components/ui/button.jsx";
import Footer from "../components/layout/Footer.jsx";

const formatDate = (value) => {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(value));
  } catch (error) {
    console.warn("Unable to format date", value, error);
    return value;
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);
  const articleBodyRef = useRef(null);
  const post = useMemo(() => getPostContent(slug), [slug]);

  const { previous, next } = useMemo(() => getAdjacentPosts(slug), [slug]);

  useLayoutEffect(() => {
    const root = articleBodyRef.current;
    if (!root) return;
    root.querySelectorAll('pre code[class*="language-"]').forEach((el) => {
      Prism.highlightElement(el);
    });
  }, [post?.body]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    description: post.description,
    articleBody: post.excerpt,
    wordCount: post.words,
    timeRequired: `PT${Math.max(1, post.readingMinutes)}M`,
    url: `https://www.flowbitz.dev/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      name: "SlabPixel Studio",
      url: "https://slabpixel.com",
    },
    publisher: {
      "@type": "Organization",
      name: "SlabPixel Studio",
      url: "https://slabpixel.com",
    },
  };

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
        <div
          key={slug}
          wb-component="smart-animate"
          className="mx-auto flex w-full lg:max-w-[800px] flex-col gap-8 px-4 lg:px-0"
        >
          <Link
            to="/blog"
            className={cn(
              buttonVariants({ variant: "custom", size: "custom" }),
              "gap-2 w-fit h-10 flex justify-center items-center me-auto",
            )}
          >
            <ArrowLeft className="w-3 h-3" />
            Back
          </Link>

          <header className="flex flex-col items-center justify-center gap-2">
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-1.5 text-link font-medium"
            >
              <Link
                to="/blog"
                className="text-text-medium hover:text-foreground transition-colors"
              >
                Blog
              </Link>
              <span className="text-text-medium" aria-hidden="true">
                /
              </span>
              <span className="text-foreground">Creative</span>
            </nav>

            <h1 className="inter-semi-32 text-foreground text-center">
              {post.title}
            </h1>
          </header>

          {post.heroImage && (
            <img
              src={post.heroImage}
              alt={post.title}
              className="w-full"
              loading="lazy"
            />
          )}

          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-link font-medium text-text-medium">
              <div className="flex gap-1.5 items-center">
                <div className="w-5 h-5 flex items-center justify-center">
                  <Calendar
                    className="w-4 h-4"
                  />
                </div>
                <span>{formatDate(post.publishedAt)}</span>
              </div>

              <span className="block" aria-hidden="true">
                •
              </span>

              <span>{post.readingMinutes} min read</span>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center gap-2 text-link font-medium text-foreground hover:text-foreground/50 transition-colors duration-200"
            >
              <Link2 className="w-4 h-4" />
              {copied ? "Copied!" : "Share"}
            </button>
          </div>

          <div className="h-[1px] w-full bg-foreground/10" />

          {post.body ? (
            <div
              ref={articleBodyRef}
              className="blog-article text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          ) : (
            <p className="text-base text-muted-foreground">
              Article content is coming soon.
            </p>
          )}

          <footer className="border-t border-border pt-8">
            <div className="mt-6 flex flex-col md:flex-row w-full gap-10 md:gap-6">
              {previous && (
                <Link
                  to={`/blog/${previous.slug}`}
                  className="w-full  md:w-1/2 flex flex-col"
                >
                  <div className="overflow-hidden rounded w-full aspect-[388/230]">
                    <img
                      src={previous.heroImage}
                      alt={previous.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col gap-2 py-4">
                    <div className="inline-flex items-center gap-2 text-link font-medium text-text-medium">
                      <div className="flex gap-1.5 items-center">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <Calendar
                            className="w-4 h-4"
                          />
                        </div>
                        <span>{formatDate(previous.publishedAt)}</span>
                      </div>

                      <span className="block" aria-hidden="true">
                        •
                      </span>

                      <span>{previous.readingMinutes} min read</span>
                    </div>

                    <p className="inter-med-16 blog text-foreground">
                      {previous.title}
                    </p>

                    <p className="md:hidden line-clamp-2 text-paragraph text-text-medium">
                      {previous.description}
                    </p>
                  </div>
                </Link>
              )}
              {next && (
                <Link
                  to={`/blog/${next.slug}`}
                  className="w-full  md:w-1/2 flex flex-col"
                >
                  <div className="overflow-hidden rounded w-full aspect-[388/230]">
                    <img
                      src={next.heroImage}
                      alt={next.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col gap-2 py-4">
                    <div className="inline-flex items-center gap-2 text-link font-medium text-text-medium">
                      <div className="flex gap-1.5 items-center">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <Calendar
                            className="w-4 h-4"
                          />
                        </div>
                        <span>{formatDate(next.publishedAt)}</span>
                      </div>

                      <span className="block" aria-hidden="true">
                        •
                      </span>

                      <span>{next.readingMinutes} min read</span>
                    </div>

                    <p className="inter-med-16 blog text-foreground">
                      {next.title}
                    </p>

                    <p className="md:hidden line-clamp-2 text-paragraph text-text-medium">
                      {next.description}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </footer>
        </div>
      </article>
    </>
  );
};

export default BlogPost;

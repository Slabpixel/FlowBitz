import React from 'react'
import { Helmet } from 'react-helmet-async'

const SEO = ({ 
  title = "FlowBitz - Interactive Components for Webflow",
  description = "Create stunning animations and interactive effects with FlowBitz - a powerful library of 16+ components designed specifically for Webflow. Easy to use, performant, and completely free.",
  keywords = "webflow, components, animations, gsap, interactive, text effects, webflow library, webflow components, webflow animations, split text, gradient text, webflow plugins",
  image = "https://slabpixel.dev/images/FlowBitz-OpenGraph.webp",
  url = "https://flowbitz.dev",
  type = "website",
  author = "SlabPixel Studio",
  publishedTime,
  modifiedTime,
  structuredData
}) => {
  const fullTitle = title.includes('FlowBitz') ? title : `${title} | FlowBitz`
  const fullImage = image.startsWith('http') ? image : `https://flowbitz.dev${image}`
  const fullUrl = url.startsWith('http') ? url : `https://flowbitz.dev${url}`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="FlowBitz" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content="@slabpixel" />
      <meta name="twitter:site" content="@slabpixel" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="FlowBitz" />

      {/* Article specific meta tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      <link rel="preconnect" href="https://slabpixel.dev" />
      <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
      <link rel="dns-prefetch" href="https://slabpixel.dev" />
    </Helmet>
  )
}

export default SEO

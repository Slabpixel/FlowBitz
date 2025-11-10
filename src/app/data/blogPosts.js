const formatISODate = (value) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString()
}

const stripHtml = (html = '') => {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\/?[^>]+(>|$)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const countWords = (html = '') => {
  const text = stripHtml(html)
  return text.length === 0 ? 0 : text.split(/\s+/).length
}

const metaModules = import.meta.glob('../content/blog/meta/*.json', {
  eager: true,
  import: 'default'
})

const htmlModules = import.meta.glob('../content/blog/html/*.html', {
  eager: true,
  import: 'default',
  query: '?raw'
})

const loadedPosts = Object.entries(metaModules).map(([path, meta]) => {
  const data = meta ?? {}

  if (!data || typeof data !== 'object') {
    console.warn(`[blog] Skipped invalid blog module at ${path}`)
    return null
  }

  const slug =
    data.slug ??
    path.split('/').pop().replace(/\.json$/i, '')

  const htmlPath = path
    .replace('/meta/', '/html/')
    .replace(/\.json$/i, '.html')
  const htmlContent = htmlModules[htmlPath]

  return {
    ...data,
    slug,
    body: typeof htmlContent === 'string' ? htmlContent : ''
  }
}).filter(Boolean)

const derivedPosts = loadedPosts
  .map((post) => {
    const body = typeof post.body === 'string' ? post.body.trim() : ''
    const publishedAt = formatISODate(post.publishedAt)
    const words = countWords(body)
    const text = stripHtml(body)
    const excerpt =
      post.excerpt ??
      (text.length > 220 ? `${text.slice(0, 220).trim()}…` : text)
    const readingMinutes =
      post.readingMinutes ?? Math.max(1, Math.round(words / 200))

    return {
      ...post,
      publishedAt,
      tags: Array.isArray(post.tags) ? post.tags : [],
      heroImage:
        post.heroImage ??
        'https://www.slabpixel.dev/images/FlowBitz-OpenGraph.webp',
      body,
      description: post.description ?? excerpt,
      excerpt,
      words,
      readingMinutes
    }
  })
  .sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
  )

export const getAllPosts = () =>
  derivedPosts.map(({ body, ...rest }) => rest)

export const getPostBySlug = (slug) =>
  derivedPosts.find((post) => post.slug === slug)

export const getPostContent = (slug) =>
  derivedPosts.find((post) => post.slug === slug) ?? null

export const getAdjacentPosts = (slug) => {
  const index = derivedPosts.findIndex((post) => post.slug === slug)

  if (index === -1) {
    return { previous: null, next: null }
  }

  return {
    previous: derivedPosts[index + 1] ?? null,
    next: derivedPosts[index - 1] ?? null
  }
}



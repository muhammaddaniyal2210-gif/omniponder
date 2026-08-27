import type { Article } from '@/lib/markdown'
import { absoluteUrl, siteConfig, siteUrl } from '@/lib/site'

/**
 * schema.org payloads. Search engines read these to build rich results —
 * the article byline, publish date, and publication name shown beside a link.
 * Every value here must match what the page visibly says; contradicting the
 * rendered content is a manual-action risk, not a clever optimisation.
 */

const publisher = {
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl('/icon-512.png'),
    width: 512,
    height: 512,
  },
} as const

const author = {
  '@type': 'Person',
  name: siteConfig.author,
  url: absoluteUrl('/about'),
  sameAs: ['https://x.com/RedactLocal', 'https://www.linkedin.com/in/muhammad-daniyal-3139a23b2/'],
} as const

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    founder: author,
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    inLanguage: 'en',
    publisher: { '@id': `${siteUrl}#organization` },
  }
}

export function articleSchema(article: Article) {
  const url = absoluteUrl(`/article/${article.slug}`)

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    // Next generates the card at this route from the article's own segment.
    image: [absoluteUrl(`/article/${article.slug}/opengraph-image`)],
    datePublished: article.date,
    dateModified: article.date,
    author,
    publisher,
    articleSection: article.topic,
    keywords: article.tags.join(', '),
    wordCount: article.wordCount,
    inLanguage: 'en',
    isAccessibleForFree: true,
  }
}

export function breadcrumbSchema(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Archive', item: absoluteUrl('/archive') },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: absoluteUrl(`/article/${article.slug}`),
      },
    ],
  }
}

/**
 * FAQPage markup. Google requires the questions and answers to be visibly
 * present on the page; this is emitted only when the article actually renders
 * an FAQ section, never as schema-only decoration.
 */
export function faqSchema(article: Article) {
  if (article.faq.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  }
}

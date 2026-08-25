import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/markdown'
import { absoluteUrl, siteUrl } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles()
  const newest = articles[0]?.date ? new Date(articles[0].date) : new Date()

  return [
    {
      url: siteUrl,
      // The homepage reprints the newest piece, so it changes when that does.
      lastModified: newest,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: absoluteUrl('/archive'),
      lastModified: newest,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: absoluteUrl('/about'),
      lastModified: newest,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...articles.map((article) => ({
      url: absoluteUrl(`/article/${article.slug}`),
      lastModified: new Date(article.date),
      // Published pieces are not revised; crawl budget belongs elsewhere.
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    })),
  ]
}

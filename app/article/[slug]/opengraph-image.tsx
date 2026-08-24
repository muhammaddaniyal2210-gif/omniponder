import { ImageResponse } from 'next/og'
import { formatDate, getArticleBySlug, getArticleSlugs } from '@/lib/markdown'
import { siteConfig } from '@/lib/site'

export const alt = 'Omniponder article'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  const slugs = await getArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  const title = article?.title ?? siteConfig.name
  const topic = article?.topic ?? 'Daily Education'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: '#a1a1aa',
            letterSpacing: 6,
            textTransform: 'uppercase',
          }}
        >
          {topic}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: title.length > 46 ? 68 : 84,
            fontWeight: 700,
            color: '#18181b',
            letterSpacing: -2,
            lineHeight: 1.12,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 28,
            color: '#71717a',
            borderTop: '2px solid #e4e4e7',
            paddingTop: 32,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontWeight: 700, color: '#18181b' }}>
              {siteConfig.name}
            </div>
            <div style={{ display: 'flex', fontSize: 24, marginTop: 6 }}>
              By {siteConfig.author}
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            {article ? `${formatDate(article.date)} · ${article.readingTime} min read` : ''}
          </div>
        </div>
      </div>
    ),
    size
  )
}

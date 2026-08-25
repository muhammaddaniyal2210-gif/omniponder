import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { formatDate, getArticleBySlug, getArticleSlugs } from '@/lib/markdown'
import { siteConfig } from '@/lib/site'

export const alt = 'Omniponder article'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  const slugs = await getArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

const [serif, sans] = await Promise.all([
  readFile(join(process.cwd(), 'assets/Newsreader-Medium.ttf')),
  readFile(join(process.cwd(), 'assets/InterTight-Medium.ttf')),
])

const PAPER = '#fbfaf7'
const INK = '#171614'
const MUTED = '#66625a'
const FAINT = '#77736a'
const RULE = '#e2ded4'

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
          background: PAPER,
          padding: 80,
          fontFamily: 'Newsreader',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'InterTight',
            fontSize: 24,
            color: FAINT,
            letterSpacing: 7,
          }}
        >
          {topic.toUpperCase()}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: title.length > 46 ? 72 : 88,
            color: INK,
            letterSpacing: -2.5,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `1px solid ${RULE}`,
            paddingTop: 32,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 32, color: INK }}>{siteConfig.name}</div>
            <div
              style={{
                display: 'flex',
                fontFamily: 'InterTight',
                fontSize: 19,
                color: FAINT,
                letterSpacing: 3,
                marginTop: 8,
              }}
            >
              BY {siteConfig.author.toUpperCase()}
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: MUTED }}>
            {article ? `${formatDate(article.date)} · ${article.readingTime} min read` : ''}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Newsreader', data: serif, style: 'normal', weight: 500 },
        { name: 'InterTight', data: sans, style: 'normal', weight: 500 },
      ],
    }
  )
}

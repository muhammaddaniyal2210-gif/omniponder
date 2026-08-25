import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react'
import AdPlaceholder from '@/components/AdPlaceholder'
import ReadingProgress from '@/components/ReadingProgress'
import JsonLd from '@/components/JsonLd'
import ShareButtons from '@/components/ShareButtons'
import { articleSchema, breadcrumbSchema } from '@/lib/structured-data'
import { formatDate, getArticleBySlug, getArticleSlugs } from '@/lib/markdown'
import { absoluteUrl, siteConfig } from '@/lib/site'

const ARTICLE_BODY_ID = 'article-body'

export async function generateStaticParams() {
  const slugs = await getArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata(props: PageProps<'/article/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return { title: 'Article not found' }
  }

  const url = absoluteUrl(`/article/${article.slug}`)

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: siteConfig.author }],
    keywords: article.tags,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      siteName: siteConfig.name,
      type: 'article',
      locale: 'en_US',
      publishedTime: article.date,
      modifiedTime: article.date,
      section: article.topic,
      tags: article.tags,
      authors: [siteConfig.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  }
}

export default async function ArticlePage(props: PageProps<'/article/[slug]'>) {
  const { slug } = await props.params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const url = absoluteUrl(`/article/${article.slug}`)

  return (
    <>
      <JsonLd data={[articleSchema(article), breadcrumbSchema(article)]} />
      <ReadingProgress targetId={ARTICLE_BODY_ID} />

      <div className="mx-auto max-w-[42rem] px-6 py-12 sm:py-16">
        <Link
          href="/"
          className="group text-ink-muted hover:text-ink inline-flex items-center gap-2 text-[0.6875rem] font-medium tracking-[0.18em] uppercase transition-colors"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Back to today
        </Link>

        <article className="mt-10">
          <header className="border-b border-rule pb-10">
            <p className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase">
              {article.topic}
            </p>

            <h1 className="text-ink mt-7 font-serif text-[2.5rem] leading-[1.06] font-medium tracking-[-0.025em] text-balance sm:text-[3.25rem]">
              {article.title}
            </h1>

            {/* Byline sits directly under the headline, above the standfirst. */}
            <div className="text-ink-muted mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.6875rem] tracking-[0.14em] uppercase">
              <span className="text-ink font-medium">By {siteConfig.author}</span>
              <span aria-hidden="true" className="text-rule-strong">
                &middot;
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </span>
              <span aria-hidden="true" className="text-rule-strong">
                &middot;
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {article.readingTime} min read
              </span>
            </div>

            {article.excerpt && (
              <p className="text-ink-muted mt-10 font-serif text-[1.4rem] leading-[1.5] tracking-[-0.01em] text-pretty sm:text-[1.6rem]">
                {article.excerpt}
              </p>
            )}
          </header>

          <div
            id={ARTICLE_BODY_ID}
            className="prose prose-neutral prose-omniponder mt-14 max-w-none"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        </article>

        {article.tags.length > 0 && (
          <div className="border-rule mt-16 border-t pt-8">
            <h2 className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase">
              Filed under
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
              {article.tags.map((tag) => (
                <li
                  key={tag}
                  className="border-rule text-ink-muted border px-3 py-1.5 text-[0.6875rem] tracking-[0.12em] uppercase"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="border-rule mt-12 border-t pt-10">
          <ShareButtons url={url} title={article.title} />
        </div>

        <AdPlaceholder variant="leaderboard" className="mt-16" />

        <div className="border-rule mt-16 border-t pt-8 text-[0.6875rem] tracking-[0.18em] uppercase">
          <Link href="/archive" className="text-ink-muted hover:text-ink transition-colors">
            Browse the archive
          </Link>
        </div>
      </div>
    </>
  )
}

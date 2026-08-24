import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react'
import AdPlaceholder from '@/components/AdPlaceholder'
import ReadingProgress from '@/components/ReadingProgress'
import ShareButtons from '@/components/ShareButtons'
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
      <ReadingProgress targetId={ARTICLE_BODY_ID} />

      <div className="mx-auto max-w-2xl px-6 py-14 sm:py-20">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Back to today
        </Link>

        <article className="mt-10">
          <header className="border-b border-zinc-200 pb-10">
            <p className="text-xs font-medium tracking-[0.2em] text-zinc-400 uppercase">
              {article.topic}
            </p>

            <h1 className="mt-5 text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-zinc-900 sm:text-5xl">
              {article.title}
            </h1>

            {/* Byline sits directly under the headline, above the standfirst. */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500">
              <span className="font-medium text-zinc-900">By {siteConfig.author}</span>
              <span aria-hidden="true" className="text-zinc-300">
                &middot;
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </span>
              <span aria-hidden="true" className="text-zinc-300">
                &middot;
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {article.readingTime} min read
              </span>
            </div>

            {article.excerpt && (
              <p className="mt-8 border-l-2 border-zinc-900 pl-6 font-serif text-lg leading-relaxed text-pretty text-zinc-600">
                {article.excerpt}
              </p>
            )}
          </header>

          <div
            id={ARTICLE_BODY_ID}
            className="prose prose-zinc prose-omniponder prose-lg mt-12 max-w-none font-serif prose-headings:font-sans prose-headings:tracking-tight prose-a:underline-offset-2 prose-blockquote:border-l-2 prose-blockquote:pl-6 prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        </article>

        <div className="mt-16 border-t border-zinc-200 pt-8">
          <ShareButtons url={url} title={article.title} />
        </div>

        <AdPlaceholder variant="leaderboard" className="mt-14" />

        <div className="mt-14 text-sm">
          <Link href="/archive" className="text-zinc-500 transition-colors hover:text-zinc-900">
            Browse the archive &rarr;
          </Link>
        </div>
      </div>
    </>
  )
}

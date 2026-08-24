import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate, getAllArticles, groupByTopic } from '@/lib/markdown'
import { absoluteUrl, siteConfig } from '@/lib/site'

const description = 'The complete Omniponder index — every long-form piece, arranged by discipline.'

export const metadata: Metadata = {
  title: 'Archive',
  description,
  alternates: { canonical: absoluteUrl('/archive') },
  openGraph: {
    title: `Archive | ${siteConfig.name}`,
    description,
    url: absoluteUrl('/archive'),
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Archive | ${siteConfig.name}`,
    description,
  },
}

export default async function ArchivePage() {
  const articles = await getAllArticles()
  const groups = groupByTopic(articles)

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
      <header className="max-w-2xl">
        <p className="text-xs font-medium tracking-[0.2em] text-zinc-400 uppercase">The library</p>
        <h1 className="mt-6 text-5xl leading-[1.05] font-semibold tracking-tight text-balance text-zinc-900 sm:text-6xl">
          Archive
        </h1>
        <p className="mt-6 font-serif text-lg leading-relaxed text-pretty text-zinc-600">
          Every piece published to date, arranged by discipline. {articles.length}{' '}
          {articles.length === 1 ? 'essay' : 'essays'} across {groups.length}{' '}
          {groups.length === 1 ? 'subject' : 'subjects'}.
        </p>
      </header>

      {groups.length > 0 && (
        <nav
          aria-label="Jump to subject"
          className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-y border-zinc-200 py-5"
        >
          {groups.map((group) => (
            <a
              key={group.slug}
              href={`#${group.slug}`}
              className="group inline-flex items-baseline gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900"
            >
              <span className="border-b border-transparent group-hover:border-zinc-900">
                {group.topic}
              </span>
              <span className="text-xs tabular-nums text-zinc-400">
                {group.articles.length}
              </span>
            </a>
          ))}
        </nav>
      )}

      {groups.length === 0 ? (
        <p className="mt-16 text-zinc-600">
          Nothing published yet. Add a Markdown file to{' '}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">content/articles</code>.
        </p>
      ) : (
        <div className="mt-4 divide-y divide-zinc-200">
          {groups.map((group) => (
            <section
              key={group.slug}
              id={group.slug}
              aria-labelledby={`${group.slug}-heading`}
              className="grid scroll-mt-28 gap-8 py-14 lg:grid-cols-[13rem_1fr] lg:gap-12"
            >
              {/* Discipline rail — sticks alongside its entries on desktop. */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <h2
                  id={`${group.slug}-heading`}
                  className="text-2xl font-semibold tracking-tight text-zinc-900"
                >
                  {group.topic}
                </h2>
                <p className="mt-2 text-sm tabular-nums text-zinc-400">
                  {group.articles.length} {group.articles.length === 1 ? 'essay' : 'essays'}
                </p>
              </div>

              <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
                {group.articles.map((article) => (
                  <li key={article.slug}>
                    <Link href={`/article/${article.slug}`} className="group block">
                      <div className="flex items-baseline gap-2 text-xs tracking-wide text-zinc-400">
                        <time dateTime={article.date}>{formatDate(article.date)}</time>
                        <span aria-hidden="true">&middot;</span>
                        <span className="tabular-nums">{article.readingTime} min</span>
                      </div>

                      <h3 className="mt-2.5 text-lg leading-snug font-semibold tracking-tight text-balance text-zinc-900 decoration-zinc-300 underline-offset-4 group-hover:underline">
                        {article.title}
                      </h3>

                      <p className="mt-2 font-serif text-[0.9375rem] leading-relaxed text-pretty text-zinc-600">
                        {article.excerpt}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

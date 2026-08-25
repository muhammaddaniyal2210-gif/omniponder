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
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
      <header className="max-w-2xl">
        <p className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase">The Library</p>
        <h1 className="text-ink mt-7 font-serif text-5xl leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-7xl">
          Archive
        </h1>
        <p className="text-ink-muted mt-7 font-serif text-xl leading-[1.6] text-pretty">
          Every piece published to date, arranged by discipline. {articles.length}{' '}
          {articles.length === 1 ? 'essay' : 'essays'} across {groups.length}{' '}
          {groups.length === 1 ? 'subject' : 'subjects'}.
        </p>
      </header>

      {groups.length > 0 && (
        <nav
          aria-label="Jump to subject"
          className="border-rule mt-14 flex flex-wrap gap-x-8 gap-y-3 border-y py-5"
        >
          {groups.map((group) => (
            <a
              key={group.slug}
              href={`#${group.slug}`}
              className="group text-ink-muted hover:text-ink inline-flex items-baseline gap-2 text-[0.6875rem] tracking-[0.18em] uppercase transition-colors"
            >
              <span className="border-b border-transparent group-hover:border-ink">
                {group.topic}
              </span>
              <span className="text-ink-faint text-[0.625rem] tabular-nums">
                {group.articles.length}
              </span>
            </a>
          ))}
        </nav>
      )}

      {groups.length === 0 ? (
        <p className="mt-16 text-ink-muted">
          Nothing published yet. Add a Markdown file to{' '}
          <code className="rounded bg-paper-deep px-1.5 py-0.5 text-sm">content/articles</code>.
        </p>
      ) : (
        <div className="divide-rule divide-y">
          {groups.map((group) => (
            <section
              key={group.slug}
              id={group.slug}
              aria-labelledby={`${group.slug}-heading`}
              className="grid scroll-mt-28 gap-8 py-16 lg:grid-cols-[15rem_1fr] lg:gap-16"
            >
              {/* Discipline rail — sticks alongside its entries on desktop. */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <h2
                  id={`${group.slug}-heading`}
                  className="text-ink font-serif text-3xl font-medium tracking-[-0.02em]"
                >
                  {group.topic}
                </h2>
                <p className="text-ink-faint mt-3 text-[0.625rem] tracking-[0.18em] uppercase">
                  {group.articles.length} {group.articles.length === 1 ? 'essay' : 'essays'}
                </p>
              </div>

              <ul className="grid gap-x-12 gap-y-12 sm:grid-cols-2">
                {group.articles.map((article) => (
                  <li key={article.slug}>
                    <Link href={`/article/${article.slug}`} className="group block">
                      <div className="text-ink-faint flex items-baseline gap-2 text-[0.625rem] tracking-[0.18em] uppercase">
                        <time dateTime={article.date}>{formatDate(article.date)}</time>
                        <span aria-hidden="true">&middot;</span>
                        <span className="tabular-nums">{article.readingTime} min</span>
                      </div>

                      <h3 className="text-ink mt-3.5 font-serif text-2xl leading-[1.2] font-medium tracking-[-0.015em] text-balance transition-opacity group-hover:opacity-60">
                        {article.title}
                      </h3>

                      <p className="text-ink-muted mt-3 font-serif leading-relaxed text-pretty">
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

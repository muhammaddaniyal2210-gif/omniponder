import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AdPlaceholder from '@/components/AdPlaceholder'
import HeroFlowCanvas from '@/components/HeroFlowCanvas'
import NewsletterForm from '@/components/NewsletterForm'
import { formatDate, getAllArticles, getLatestArticle } from '@/lib/markdown'
import { CATEGORIES } from '@/lib/categories'
import { siteConfig } from '@/lib/site'

export default async function HomePage() {
  const [latest, all] = await Promise.all([getLatestArticle(), getAllArticles()])
  const dispatches = all.filter((article) => article.slug !== latest?.slug)

  // Data-driven pillars: each carries its live count and newest essay as the
  // "start here" entry, so the section maintains itself as articles publish.
  // `all` is already newest-first, so the first match is the latest in a pillar.
  const pillars = CATEGORIES.map((category) => {
    const essays = all.filter((article) => article.topic === category.name)
    return { ...category, count: essays.length, featured: essays[0] ?? null }
  }).filter((pillar) => pillar.count > 0)

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-10">
      {/* Dateline — the strip under a printed masthead. */}
      <div className="border-rule text-ink-faint flex items-center justify-between border-b py-4 text-[0.625rem] tracking-[0.2em] uppercase">
        <span>Independent Essays</span>
        <span className="hidden md:inline">
          Power &amp; Systems · History &amp; Economy · Human Nature &amp; Ideas
        </span>
        {latest && <time dateTime={latest.date}>{formatDate(latest.date)}</time>}
      </div>

      {/* Positioning — the publication's standing promise, stated immediately. */}
      <section aria-labelledby="positioning-heading" className="border-rule border-b py-12 sm:py-14">
        <p id="positioning-heading" className="text-ink font-serif text-2xl leading-[1.25] font-medium tracking-[-0.02em] text-balance sm:text-[1.75rem]">
          Understand the forces shaping the modern world.
        </p>
        <p className="text-ink-muted mt-4 max-w-2xl font-serif text-lg leading-[1.55] text-pretty">
          Original essays on power, history, economics, human behaviour and consequential
          ideas&mdash;written to reveal what exists beneath the headlines.
        </p>
      </section>

      {latest ? (
        <section
          aria-labelledby="todays-essay"
          className="border-rule relative overflow-hidden border-b"
        >
          {/* Broadsheet hero: story left, generative field right. */}
          <div className="lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-14">
            <div className="relative z-10 py-14 sm:py-18 lg:py-24">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <span className="bg-ink text-paper px-2.5 py-1 text-[0.625rem] font-medium tracking-[0.2em] uppercase">
                  Featured Essay
                </span>
                <span
                  id="todays-essay"
                  className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase"
                >
                  {latest.topic}
                </span>
              </div>

              <h1 className="text-ink mt-8 font-serif text-[2.25rem] leading-[1.05] font-medium tracking-[-0.025em] text-balance sm:text-[3.25rem] lg:text-[4rem]">
                <Link
                  href={`/article/${latest.slug}`}
                  className="transition-opacity hover:opacity-70"
                >
                  {latest.title}
                </Link>
              </h1>

              <p className="text-ink-muted mt-7 max-w-2xl font-serif text-lg leading-[1.6] text-pretty sm:text-xl">
                {latest.excerpt}
              </p>

              {/* Metadata compressed to a single rule-separated line. */}
              <p className="text-ink-muted mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.6875rem] tracking-[0.14em] uppercase">
                <span className="text-ink font-medium">{siteConfig.author}</span>
                <span aria-hidden="true" className="text-rule-strong">
                  /
                </span>
                <time dateTime={latest.date}>{formatDate(latest.date)}</time>
                <span aria-hidden="true" className="text-rule-strong">
                  /
                </span>
                <span>{latest.readingTime} min read</span>
              </p>

              <Link
                href={`/article/${latest.slug}`}
                className="group border-ink text-ink hover:bg-ink hover:text-paper focus-visible:outline-ink mt-10 inline-flex items-center gap-3 border px-7 py-3.5 text-[0.6875rem] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:outline-1 focus-visible:outline-offset-4"
              >
                Read Essay
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/*
              One instance, two roles. Below lg it is lifted out of flow and
              becomes a full-bleed backdrop behind the headline — a horizon the
              text sits on, rather than a shrunken panel competing with it. From
              lg it returns to the grid as the right column of the broadsheet.
              Never interactive, and never above the type.
            */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[62%] sm:h-[58%] lg:relative lg:inset-auto lg:z-auto lg:h-auto lg:self-stretch"
            >
              <HeroFlowCanvas className="h-full w-full opacity-[0.34] sm:opacity-[0.4] lg:min-h-[30rem] lg:opacity-100" />
            </div>
          </div>
        </section>
      ) : (
        <div className="border-rule border-b py-32 text-center">
          <h1 className="text-ink font-serif text-4xl font-medium tracking-tight">
            Nothing published yet
          </h1>
          <p className="text-ink-muted mt-4 font-serif text-lg">
            Add a Markdown file to{' '}
            <code className="bg-paper-deep px-1.5 py-0.5 text-sm">content/articles</code> to
            publish the first edition.
          </p>
        </div>
      )}

      {/* Start here — the three editorial pillars, each with its newest essay. */}
      {pillars.length > 0 && (
        <section aria-labelledby="pillars-heading" className="border-rule border-b py-14">
          <div className="border-rule flex items-baseline justify-between border-b pb-5">
            <h2
              id="pillars-heading"
              className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase"
            >
              Start Here
            </h2>
            <Link
              href="/archive"
              className="text-ink-muted hover:text-ink text-[0.6875rem] tracking-[0.18em] uppercase transition-colors"
            >
              All Essays
            </Link>
          </div>

          <ul className="grid gap-x-10 gap-y-12 pt-12 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <li key={pillar.slug} className="flex flex-col">
                <Link
                  href={`/archive#${pillar.slug}`}
                  className="group inline-flex items-baseline gap-2"
                >
                  <span className="text-ink font-serif text-2xl leading-tight font-medium tracking-[-0.015em] transition-opacity group-hover:opacity-60">
                    {pillar.name}
                  </span>
                  <span className="text-ink-faint text-[0.625rem] tabular-nums">
                    {pillar.count}
                  </span>
                </Link>
                <span className="text-ink-faint mt-3 block text-sm leading-snug text-pretty">
                  {pillar.description}
                </span>

                {pillar.featured && (
                  <Link
                    href={`/article/${pillar.featured.slug}`}
                    className="group border-rule mt-6 flex flex-col border-t pt-6"
                  >
                    <span className="text-ink-faint text-[0.5625rem] tracking-[0.18em] uppercase">
                      Start with
                    </span>
                    <span className="text-ink mt-2 font-serif text-lg leading-[1.25] font-medium text-pretty transition-opacity group-hover:opacity-60">
                      {pillar.featured.title}
                    </span>
                    <span className="text-ink-faint mt-auto flex items-center gap-2 pt-3 text-[0.625rem] tracking-[0.18em] uppercase">
                      <time dateTime={pillar.featured.date}>
                        {formatDate(pillar.featured.date)}
                      </time>
                      <span aria-hidden="true" className="text-rule-strong">
                        /
                      </span>
                      {pillar.featured.readingTime} min
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Editorial dispatch grid */}
      {dispatches.length > 0 && (
        <section aria-labelledby="dispatch-heading" className="border-rule border-b py-14">
          <div className="border-rule flex items-baseline justify-between border-b pb-5">
            <h2
              id="dispatch-heading"
              className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase"
            >
              Editorial Dispatch
            </h2>
            <Link
              href="/archive"
              className="text-ink-muted hover:text-ink text-[0.6875rem] tracking-[0.18em] uppercase transition-colors"
            >
              All Essays
            </Link>
          </div>

          {/* Newspaper columns: hairlines between, reset at each row start. */}
          <ul className="grid gap-y-12 pt-12 sm:grid-cols-2 lg:grid-cols-3">
            {dispatches.map((article) => (
              <li
                key={article.slug}
                className="border-rule sm:border-l sm:pl-10 sm:[&:nth-child(2n+1)]:border-l-0 sm:[&:nth-child(2n+1)]:pl-0 lg:[&:nth-child(2n+1)]:border-l lg:[&:nth-child(2n+1)]:pl-10 lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0"
              >
                <Link href={`/article/${article.slug}`} className="group flex h-full flex-col">
                  <span className="text-ink-faint text-[0.625rem] tracking-[0.18em] uppercase">
                    {article.topic}
                  </span>

                  <h3 className="text-ink mt-3 font-serif text-2xl leading-[1.2] font-medium tracking-[-0.015em] text-balance transition-opacity group-hover:opacity-60">
                    {article.title}
                  </h3>

                  <p className="text-ink-muted mt-3 line-clamp-2 font-serif leading-relaxed text-pretty">
                    {article.excerpt}
                  </p>

                  <span className="text-ink-faint mt-auto flex items-center gap-2 pt-5 text-[0.625rem] tracking-[0.18em] uppercase">
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                    <span aria-hidden="true" className="text-rule-strong">
                      /
                    </span>
                    {article.readingTime} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <AdPlaceholder variant="leaderboard" className="my-14" />

      {/*
        The page container already pads by px-6; cancel it here on phones so
        the Beehiiv embed is not double-padded down to ~279px, which is too
        narrow for its field-and-button row.
      */}
      <div className="-mx-6 mb-14 sm:mx-0">
        <NewsletterForm />
      </div>
    </div>
  )
}

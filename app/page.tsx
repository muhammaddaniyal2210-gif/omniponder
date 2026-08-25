import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AdPlaceholder from '@/components/AdPlaceholder'
import NewsletterForm from '@/components/newsletter-form'
import { formatDate, getAllArticles, getLatestArticle } from '@/lib/markdown'
import { siteConfig } from '@/lib/site'

const disciplines = [
  ['Human nature', 'Why people do what they do'],
  ['Science', 'What we learned, and what it overturns'],
  ['Philosophy', 'Old questions, treated as live ones'],
  ['Global systems', 'The slow forces shaping the decades ahead'],
]

export default async function HomePage() {
  const [latest, all] = await Promise.all([getLatestArticle(), getAllArticles()])
  const previously = all.filter((article) => article.slug !== latest?.slug)

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-10">
      {/* Dateline — the strip under a newspaper masthead. */}
      <div className="border-rule text-ink-faint flex items-center justify-between border-b py-4 text-[0.625rem] tracking-[0.2em] uppercase">
        <span>Daily Edition</span>
        <span className="hidden sm:inline">Science · Philosophy · Human Nature · Global Systems</span>
        {latest && <time dateTime={latest.date}>{formatDate(latest.date)}</time>}
      </div>

      {latest ? (
        <section aria-labelledby="todays-read" className="border-rule border-b">
          {/*
            Full-measure hero. The metadata that used to sit in a narrow right
            rail now runs as a horizontal band beneath the standfirst, so
            nothing competes with the headline for width.
          */}
          <div className="py-14 sm:py-20">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <span className="bg-ink text-paper px-2.5 py-1 text-[0.625rem] font-medium tracking-[0.2em] uppercase">
                Featured
              </span>
              <span
                id="todays-read"
                className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase"
              >
                Today&rsquo;s Read
              </span>
              <span className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase sm:ml-auto">
                {latest.topic}
              </span>
            </div>

            <h1 className="text-ink mt-8 max-w-5xl font-serif text-[2.6rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-6xl lg:text-[4.5rem]">
              <Link
                href={`/article/${latest.slug}`}
                className="transition-opacity hover:opacity-70"
              >
                {latest.title}
              </Link>
            </h1>

            <p className="text-ink-muted mt-8 max-w-3xl font-serif text-xl leading-[1.6] text-pretty sm:text-[1.4rem]">
              {latest.excerpt}
            </p>

            <dl className="border-rule mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t pt-8 sm:grid-cols-4">
              {[
                ['Subject', latest.topic],
                ['Written by', siteConfig.author],
                ['Published', formatDate(latest.date)],
                ['Length', `${latest.readingTime} minute read`],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase">
                    {label}
                  </dt>
                  <dd className="text-ink mt-2.5 font-serif text-base leading-snug text-pretty sm:text-lg">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              href={`/article/${latest.slug}`}
              className="group border-ink text-ink hover:bg-ink hover:text-paper focus-visible:outline-ink mt-12 inline-flex items-center gap-3 border px-7 py-3.5 text-[0.6875rem] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:outline-1 focus-visible:outline-offset-4"
            >
              Read the essay
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
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

      {/* Disciplines, freed from the hero rail and given the full measure. */}
      <section aria-labelledby="disciplines-heading" className="border-rule border-b py-14">
        <h2
          id="disciplines-heading"
          className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase"
        >
          The Disciplines
        </h2>
        <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {disciplines.map(([name, blurb]) => (
            <li key={name}>
              <span className="text-ink block font-serif text-xl leading-tight">{name}</span>
              <span className="text-ink-faint mt-2 block text-sm leading-snug text-pretty">
                {blurb}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <AdPlaceholder variant="leaderboard" className="my-14" />

      {previously.length > 0 && (
        <section aria-labelledby="previously-heading" className="border-rule border-t pt-10">
          <div className="border-rule flex items-baseline justify-between border-b pb-5">
            <h2
              id="previously-heading"
              className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase"
            >
              From the Archive
            </h2>
            <Link
              href="/archive"
              className="text-ink-muted hover:text-ink text-[0.6875rem] tracking-[0.18em] uppercase transition-colors"
            >
              All essays
            </Link>
          </div>

          {/* Newspaper columns: vertical hairlines between, reset each row. */}
          <ul className="grid gap-y-12 pt-12 sm:grid-cols-2 lg:grid-cols-3">
            {previously.map((article) => (
              <li
                key={article.slug}
                className="border-rule sm:[&:nth-child(2n+1)]:border-l-0 sm:[&:nth-child(2n+1)]:pl-0 lg:[&:nth-child(2n+1)]:border-l lg:[&:nth-child(2n+1)]:pl-10 lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0 sm:border-l sm:pl-10"
              >
                <Link href={`/article/${article.slug}`} className="group flex h-full flex-col">
                  <div className="text-ink-faint flex items-baseline gap-2 text-[0.625rem] tracking-[0.18em] uppercase">
                    <span>{article.topic}</span>
                    <span aria-hidden="true">/</span>
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                  </div>

                  <h3 className="text-ink mt-4 font-serif text-2xl leading-[1.2] font-medium tracking-[-0.015em] text-balance transition-opacity group-hover:opacity-60">
                    {article.title}
                  </h3>

                  <p className="text-ink-muted mt-3 font-serif leading-relaxed text-pretty">
                    {article.excerpt}
                  </p>

                  <span className="text-ink-faint mt-auto pt-5 text-[0.625rem] tracking-[0.18em] uppercase">
                    {article.readingTime} min read
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-14">
        <NewsletterForm />
      </div>
    </div>
  )
}

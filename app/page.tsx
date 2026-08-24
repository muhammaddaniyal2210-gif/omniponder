import Link from 'next/link'
import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import AdPlaceholder from '@/components/AdPlaceholder'
import NewsletterForm from '@/components/newsletter-form'
import { formatDate, getAllArticles, getLatestArticle } from '@/lib/markdown'
import { siteConfig } from '@/lib/site'

export default async function HomePage() {
  const [latest, all] = await Promise.all([getLatestArticle(), getAllArticles()])
  const previously = all.filter((article) => article.slug !== latest?.slug)

  return (
    <div className="mx-auto max-w-5xl px-6">
      {latest ? (
        <section aria-labelledby="todays-read" className="pt-14 sm:pt-20">
          <div className="rounded-2xl bg-zinc-50 p-8 sm:p-12 lg:p-16">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-zinc-900 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.14em] text-white uppercase">
                Featured
              </span>
              <span id="todays-read" className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
                Today&rsquo;s Read
              </span>
              <span className="text-xs font-medium tracking-[0.2em] text-zinc-400 uppercase sm:ml-auto">
                {latest.topic}
              </span>
            </div>

            <h1 className="mt-8 max-w-3xl text-4xl leading-[1.06] font-semibold tracking-tight text-balance text-zinc-900 sm:text-5xl lg:text-6xl">
              <Link href={`/article/${latest.slug}`} className="transition-opacity hover:opacity-80">
                {latest.title}
              </Link>
            </h1>

            <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-pretty text-zinc-600 sm:text-xl">
              {latest.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-500">
              <span className="font-medium text-zinc-700">By {siteConfig.author}</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                <time dateTime={latest.date}>{formatDate(latest.date)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {latest.readingTime} min read
              </span>
            </div>

            <Link
              href={`/article/${latest.slug}`}
              className="group mt-10 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Read today&rsquo;s piece
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </section>
      ) : (
        <div className="py-24 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Nothing published yet
          </h1>
          <p className="mt-3 text-zinc-600">
            Add a Markdown file to{' '}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">content/articles</code> to
            publish the first edition.
          </p>
        </div>
      )}

      <AdPlaceholder variant="leaderboard" className="mt-16" />

      {previously.length > 0 && (
        <section aria-labelledby="previously-heading" className="mt-20 sm:mt-24">
          <div className="flex items-baseline justify-between border-b border-zinc-200 pb-5">
            <h2
              id="previously-heading"
              className="text-xs font-medium tracking-[0.2em] text-zinc-400 uppercase"
            >
              Previously
            </h2>
            <Link
              href="/archive"
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
            >
              All essays &rarr;
            </Link>
          </div>

          <ul className="grid gap-x-10 gap-y-12 pt-12 sm:grid-cols-2 lg:grid-cols-3">
            {previously.map((article) => (
              <li key={article.slug}>
                <Link href={`/article/${article.slug}`} className="group flex h-full flex-col">
                  <div className="flex items-baseline gap-2 text-xs tracking-wide text-zinc-400">
                    <span className="font-medium text-zinc-500">{article.topic}</span>
                    <span aria-hidden="true">&middot;</span>
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                  </div>

                  <h3 className="mt-3 text-xl leading-snug font-semibold tracking-tight text-balance text-zinc-900 decoration-zinc-300 underline-offset-4 group-hover:underline">
                    {article.title}
                  </h3>

                  <p className="mt-3 font-serif leading-relaxed text-pretty text-zinc-600">
                    {article.excerpt}
                  </p>

                  <span className="mt-auto pt-4 text-xs tabular-nums text-zinc-400">
                    {article.readingTime} min read
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="py-20 sm:py-24">
        <NewsletterForm />
      </div>
    </div>
  )
}

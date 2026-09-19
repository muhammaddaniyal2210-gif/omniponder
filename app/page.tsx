import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import AdPlaceholder from '@/components/AdPlaceholder'
import NewsletterForm from '@/components/NewsletterForm'
import { formatDate, getAllArticles, pickHomeFeature, topicSlug, type ArticleMeta } from '@/lib/markdown'
import { CATEGORIES } from '@/lib/categories'
import { siteConfig } from '@/lib/site'

/**
 * The lead essay's 16:9 image — the only article image on the homepage. Stable
 * aspect-ratio wrapper (relative, fill) so nothing shifts; monogram fallback if
 * the lead ever lacks an image. The image is the sole `priority` request.
 */
function LeadImage({ article }: { article: ArticleMeta }) {
  if (!article.image) {
    return (
      <div
        aria-hidden="true"
        className="bg-paper-deep text-ink-faint flex aspect-[16/9] w-full items-center justify-center font-serif text-5xl select-none"
      >
        O
      </div>
    )
  }
  return (
    <div className="bg-paper-deep relative aspect-[16/9] w-full overflow-hidden">
      <Image
        src={article.image}
        alt={article.imageAlt || article.title}
        fill
        sizes="(min-width: 1024px) 44rem, 100vw"
        priority
        className="object-cover"
      />
    </div>
  )
}

function CategoryLink({ topic }: { topic: string }) {
  return (
    <Link
      href={`/archive#${topicSlug(topic)}`}
      className="text-ink-muted hover:text-ink focus-visible:outline-ink text-[0.6875rem] font-medium tracking-[0.16em] uppercase transition-colors focus-visible:outline-1 focus-visible:outline-offset-4"
    >
      {topic}
    </Link>
  )
}

export default async function HomePage() {
  const all = await getAllArticles()
  // Newest leads unless an article opts in with `featured: true` (documented
  // editorial override). No article opts in today, so the newest is the lead.
  const lead = pickHomeFeature(all)
  const rest = lead ? all.filter((article) => article.slug !== lead.slug) : all
  const recent = rest.slice(0, 3)

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-10">
      {/* Publication descriptor — a quiet Roman-serif declaration on a hairline. */}
      <div className="border-rule border-b py-5 sm:py-6">
        <p className="text-ink-soft font-serif text-[1.0625rem] leading-snug tracking-[0.005em] sm:text-[1.25rem]">
          An independent journal of power, history and human nature.
        </p>
      </div>

      {lead ? (
        <section aria-label="Lead essay" className="border-rule border-b py-12 sm:py-16">
          <div className="lg:grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
            <Link
              href={`/article/${lead.slug}`}
              tabIndex={-1}
              aria-hidden="true"
              className="block"
            >
              <LeadImage article={lead} />
            </Link>

            <div className="mt-7 lg:mt-0">
              <CategoryLink topic={lead.topic} />
              <h1 className="text-ink mt-4 font-serif text-[2.25rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-[3rem] lg:text-[3.25rem]">
                <Link
                  href={`/article/${lead.slug}`}
                  className="focus-visible:outline-ink transition-opacity hover:opacity-70 focus-visible:outline-1 focus-visible:outline-offset-4"
                >
                  {lead.title}
                </Link>
              </h1>
              <p className="text-ink-muted mt-6 max-w-xl font-serif text-lg leading-[1.55] text-pretty">
                {lead.excerpt}
              </p>
              <p className="text-ink-muted mt-6 flex flex-wrap items-center gap-x-2.5 text-[0.8125rem] tracking-wide">
                <span className="text-ink font-medium">{siteConfig.author}</span>
                <span aria-hidden="true" className="text-rule-strong">
                  /
                </span>
                <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                <span aria-hidden="true" className="text-rule-strong">
                  /
                </span>
                <span>{lead.readingTime} min read</span>
              </p>
              <Link
                href={`/article/${lead.slug}`}
                className="group border-ink text-ink focus-visible:outline-ink mt-8 inline-flex items-center gap-2 border-b pb-1 font-serif text-base transition-opacity hover:opacity-60 focus-visible:outline-1 focus-visible:outline-offset-4"
              >
                Read the essay
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
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
            publish the first essay.
          </p>
        </div>
      )}

      {/* Recently published — a text-only editorial index of the next three. */}
      {recent.length > 0 && (
        <section aria-labelledby="recent-heading" className="border-rule border-b py-14 sm:py-16">
          <h2
            id="recent-heading"
            className="text-ink font-serif text-2xl font-medium tracking-[-0.02em]"
          >
            Recently published
          </h2>

          <ol className="mt-10">
            {recent.map((article, index) => (
              <li key={article.slug} className="border-rule border-t">
                <div className="grid gap-x-5 py-7 sm:grid-cols-[2.5rem_1fr] sm:gap-x-8">
                  <span
                    aria-hidden="true"
                    className="text-ink-faint pt-1.5 font-serif text-base leading-none tabular-nums"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-ink-muted flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[0.6875rem] tracking-[0.12em] uppercase">
                      <span>{article.topic}</span>
                      <span aria-hidden="true" className="text-rule-strong">
                        &middot;
                      </span>
                      <time dateTime={article.date}>{formatDate(article.date)}</time>
                      <span aria-hidden="true" className="text-rule-strong">
                        &middot;
                      </span>
                      <span>{article.readingTime} min</span>
                    </p>
                    <h3 className="mt-2.5 font-serif text-2xl leading-[1.2] font-medium tracking-[-0.015em] text-pretty sm:text-[1.75rem]">
                      <Link
                        href={`/article/${article.slug}`}
                        className="text-ink focus-visible:outline-ink transition-opacity hover:opacity-60 focus-visible:outline-1 focus-visible:outline-offset-4"
                      >
                        {article.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="border-rule border-t">
            <Link
              href="/archive"
              className="group text-ink hover:text-ink-muted focus-visible:outline-ink inline-flex items-center gap-2 py-6 text-[0.8125rem] font-medium tracking-[0.12em] uppercase transition-colors focus-visible:outline-1 focus-visible:outline-offset-4"
            >
              View all essays
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </section>
      )}

      {/* Explore by lens — a typographic pillar index, not cards. */}
      <section aria-labelledby="lens-heading" className="border-rule border-b py-14 sm:py-16">
        <h2
          id="lens-heading"
          className="text-ink font-serif text-2xl font-medium tracking-[-0.02em]"
        >
          Explore by lens
        </h2>
        <ul className="divide-rule mt-8 sm:grid sm:grid-cols-3 sm:divide-x">
          {CATEGORIES.map((category) => (
            <li
              key={category.slug}
              className="border-rule border-t py-6 sm:border-t-0 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0"
            >
              <h3 className="font-serif text-xl font-medium tracking-[-0.015em]">
                <Link
                  href={`/archive#${category.slug}`}
                  className="group text-ink focus-visible:outline-ink inline-flex items-baseline gap-2 transition-opacity hover:opacity-70 focus-visible:outline-1 focus-visible:outline-offset-4"
                >
                  {category.name}
                  <ArrowRight
                    className="h-3.5 w-3.5 self-center transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </h3>
              <p className="text-ink-muted mt-2.5 text-sm leading-snug text-pretty">
                {category.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Reserved ad slot — subordinate, below the editorial content. */}
      <AdPlaceholder variant="leaderboard" className="my-14" />

      {/*
        The page container already pads by px-6; cancel it here on phones so
        the Beehiiv embed is not double-padded down to a too-narrow field row.
      */}
      <div className="-mx-6 mb-14 sm:mx-0">
        <NewsletterForm />
      </div>
    </div>
  )
}

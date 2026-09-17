import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import AdPlaceholder from '@/components/AdPlaceholder'
import NewsletterForm from '@/components/NewsletterForm'
import { formatDate, getAllArticles, pickHomeFeature, topicSlug, type ArticleMeta } from '@/lib/markdown'
import { CATEGORIES } from '@/lib/categories'
import { siteConfig } from '@/lib/site'

/**
 * Representative 16:9 image for a card. Falls back to a paper-deep frame with
 * the monogram (never a broken image), preserving the ratio so nothing shifts.
 * Only the lead image is `priority`; everything below lazy-loads.
 */
function CardImage({
  article,
  sizes,
  priority = false,
}: {
  article: ArticleMeta
  sizes: string
  priority?: boolean
}) {
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
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  )
}

function CategoryLink({ topic, className = '' }: { topic: string; className?: string }) {
  return (
    <Link
      href={`/archive#${topicSlug(topic)}`}
      className={`text-ink-muted hover:text-ink text-[0.6875rem] font-medium tracking-[0.16em] uppercase transition-colors ${className}`}
    >
      {topic}
    </Link>
  )
}

function CardMeta({ article }: { article: ArticleMeta }) {
  return (
    <p className="text-ink-muted mt-3 flex flex-wrap items-center gap-x-2.5 text-[0.75rem] tracking-wide">
      <time dateTime={article.date}>{formatDate(article.date)}</time>
      <span aria-hidden="true" className="text-rule-strong">
        /
      </span>
      <span>{article.readingTime} min read</span>
    </p>
  )
}

/** A supporting or latest-grid card. `variant` sets the headline hierarchy. */
function ArticleCard({
  article,
  variant,
  sizes,
}: {
  article: ArticleMeta
  variant: 'support' | 'latest'
  sizes: string
}) {
  const headingSize =
    variant === 'support'
      ? 'text-2xl sm:text-[1.75rem]'
      : 'text-xl'
  return (
    <article className="group flex flex-col">
      <Link
        href={`/article/${article.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="block"
      >
        <CardImage article={article} sizes={sizes} />
      </Link>
      <div className="mt-5 flex flex-1 flex-col">
        <CategoryLink topic={article.topic} />
        <h3
          className={`text-ink mt-2.5 font-serif ${headingSize} leading-[1.18] font-medium tracking-[-0.015em] text-pretty`}
        >
          <Link
            href={`/article/${article.slug}`}
            className="focus-visible:outline-ink transition-opacity hover:opacity-60 focus-visible:outline-1 focus-visible:outline-offset-4"
          >
            {article.title}
          </Link>
        </h3>
        <p className="text-ink-muted mt-3 line-clamp-3 font-serif leading-relaxed text-pretty">
          {article.excerpt}
        </p>
        <CardMeta article={article} />
      </div>
    </article>
  )
}

export default async function HomePage() {
  const all = await getAllArticles()
  const feature = pickHomeFeature(all)
  const rest = feature ? all.filter((article) => article.slug !== feature.slug) : all

  // Strict, non-repeating hierarchy: 1 lead, 2 supporting, then 6 latest.
  const supporting = rest.slice(0, 2)
  const latest = rest.slice(2, 8)

  const pillars = CATEGORIES.map((category) => ({
    ...category,
    count: all.filter((article) => article.topic === category.name).length,
  })).filter((pillar) => pillar.count > 0)

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-10">
      {/* Editorial signature — the manifesto line, mirroring the three pillars.
          One serif italic statement, aligned to the content grid, on a hairline. */}
      <div className="border-rule border-b py-5 sm:py-7">
        <p className="text-ink font-serif text-xl leading-snug tracking-[0.01em] text-pretty italic sm:text-[1.5rem]">
          <span className="whitespace-nowrap">Power moves.</span>{' '}
          <span className="whitespace-nowrap">History echoes.</span>{' '}
          <span className="whitespace-nowrap">Human nature endures.</span>
        </p>
      </div>

      {feature ? (
        <section aria-label="Featured essays" className="border-rule border-b py-12 sm:py-16">
          {/* Lead — asymmetric: image ~62%, story ~38%. */}
          <div className="lg:grid lg:grid-cols-[minmax(0,1.62fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
            <Link
              href={`/article/${feature.slug}`}
              tabIndex={-1}
              aria-hidden="true"
              className="block"
            >
              <CardImage article={feature} sizes="(min-width: 1024px) 46rem, 100vw" priority />
            </Link>

            <div className="mt-7 lg:mt-0">
              <CategoryLink topic={feature.topic} />
              <h1 className="text-ink mt-4 font-serif text-[2.25rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-[3rem] lg:text-[3.25rem]">
                <Link
                  href={`/article/${feature.slug}`}
                  className="focus-visible:outline-ink transition-opacity hover:opacity-70 focus-visible:outline-1 focus-visible:outline-offset-4"
                >
                  {feature.title}
                </Link>
              </h1>
              <p className="text-ink-muted mt-6 font-serif text-lg leading-[1.55] text-pretty">
                {feature.excerpt}
              </p>
              <p className="text-ink-muted mt-6 flex flex-wrap items-center gap-x-2.5 text-[0.8125rem] tracking-wide">
                <span className="text-ink font-medium">{siteConfig.author}</span>
                <span aria-hidden="true" className="text-rule-strong">
                  /
                </span>
                <time dateTime={feature.date}>{formatDate(feature.date)}</time>
                <span aria-hidden="true" className="text-rule-strong">
                  /
                </span>
                <span>{feature.readingTime} min read</span>
              </p>
              <Link
                href={`/article/${feature.slug}`}
                className="group border-ink text-ink hover:bg-ink hover:text-paper focus-visible:outline-ink mt-8 inline-flex items-center gap-3 border px-7 py-3.5 text-[0.6875rem] font-medium tracking-[0.16em] uppercase transition-colors focus-visible:outline-1 focus-visible:outline-offset-4"
              >
                Read essay
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Supporting — the next two strongest, larger than the latest grid. */}
          {supporting.length > 0 && (
            <>
              <h2 className="sr-only">More featured essays</h2>
              <ul className="border-rule mt-14 grid gap-x-12 gap-y-12 border-t pt-14 sm:grid-cols-2">
                {supporting.map((article) => (
                  <li key={article.slug}>
                    <ArticleCard
                      article={article}
                      variant="support"
                      sizes="(min-width: 1024px) 34rem, (min-width: 640px) 50vw, 100vw"
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
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

      {/* Latest Essays — six cards, then a route to the full library. */}
      {latest.length > 0 && (
        <section aria-labelledby="latest-heading" className="border-rule border-b py-14 sm:py-16">
          <div className="border-rule flex items-baseline justify-between border-b pb-5">
            <h2 id="latest-heading" className="text-ink font-serif text-2xl font-medium tracking-[-0.02em]">
              Latest Essays
            </h2>
            <Link
              href="/archive"
              className="text-ink-muted hover:text-ink text-[0.75rem] font-medium tracking-[0.14em] uppercase transition-colors"
            >
              View all essays
            </Link>
          </div>
          <ul className="grid gap-x-10 gap-y-14 pt-14 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((article) => (
              <li key={article.slug}>
                <ArticleCard
                  article={article}
                  variant="latest"
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <AdPlaceholder variant="leaderboard" className="my-14" />

      {/* Explore the pillars — compact navigation, well down the page. */}
      {pillars.length > 0 && (
        <section aria-labelledby="pillars-heading" className="border-rule border-b py-14 sm:py-16">
          <h2 id="pillars-heading" className="text-ink font-serif text-2xl font-medium tracking-[-0.02em]">
            Explore the pillars
          </h2>
          <ul className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <li key={pillar.slug} className="border-rule flex flex-col border-t pt-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-ink font-serif text-xl leading-tight font-medium tracking-[-0.015em]">
                    <Link
                      href={`/archive#${pillar.slug}`}
                      className="focus-visible:outline-ink transition-opacity hover:opacity-60 focus-visible:outline-1 focus-visible:outline-offset-4"
                    >
                      {pillar.name}
                    </Link>
                  </h3>
                  <span className="text-ink-muted text-[0.75rem] tabular-nums">{pillar.count}</span>
                </div>
                <p className="text-ink-muted mt-3 text-sm leading-snug text-pretty">
                  {pillar.description}
                </p>
                <Link
                  href={`/archive#${pillar.slug}`}
                  className="group text-ink hover:text-ink-muted mt-5 inline-flex items-center gap-2 text-[0.75rem] font-medium tracking-[0.14em] uppercase transition-colors"
                >
                  Explore
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/*
        The page container already pads by px-6; cancel it here on phones so
        the Beehiiv embed is not double-padded down to a too-narrow field row.
      */}
      <div className="-mx-6 my-14 sm:mx-0">
        <NewsletterForm />
      </div>
    </div>
  )
}

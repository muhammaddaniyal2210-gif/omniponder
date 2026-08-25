import type { Metadata } from 'next'
import Image from 'next/image'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import NewsletterForm from '@/components/newsletter-form'
import { absoluteUrl, siteConfig } from '@/lib/site'

const description =
  'Omniponder publishes daily research on international political economy, energy and maritime systems, and strategic stability — one rigorous analysis at a time.'

export const metadata: Metadata = {
  title: 'About',
  description,
  alternates: { canonical: absoluteUrl('/about') },
  openGraph: {
    title: `About ${siteConfig.name}`,
    description,
    url: absoluteUrl('/about'),
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `About ${siteConfig.name}`,
    description,
  },
}

/*
 * Drop a portrait at public/images/author-profile.jpg and it renders here.
 * Checked at build time so the page never ships a broken image reference —
 * until the file exists, the monogram below stands in at identical dimensions.
 */
const AUTHOR_PHOTO = '/images/author-profile.jpg'
const hasAuthorPhoto = existsSync(join(process.cwd(), 'public', 'images', 'author-profile.jpg'))

const coverage = [
  {
    name: 'International Political Economy',
    blurb:
      'How trade, capital, and industrial policy translate into leverage — and who holds it when the arrangement is tested.',
  },
  {
    name: 'Energy & Maritime Systems',
    blurb:
      'Chokepoints, sea lanes, and the transition from hydrocarbons to minerals: the physical infrastructure beneath the abstraction.',
  },
  {
    name: 'Strategic Stability',
    blurb:
      'Deterrence, escalation, and the cost-exchange ratios that decide whether a confrontation stays contained.',
  },
  {
    name: 'Systemic Risk',
    blurb:
      'Demographic, ecological, and technological pressures that move slowly enough to ignore until they do not.',
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Masthead statement */}
      <section className="border-rule mx-auto max-w-6xl border-b px-6 pt-16 pb-14 sm:px-10 sm:pt-20 sm:pb-16">
        <p className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase">
          About the Publication
        </p>

        <h1 className="text-ink mt-8 max-w-3xl font-serif text-[1.75rem] leading-[1.25] font-medium tracking-[-0.015em] text-balance sm:text-[2.125rem] lg:text-[2.5rem]">
          Rigorous analysis on global systems, maritime chokepoints, and strategic
          stability.
        </h1>

        <p className="text-ink-muted mt-7 max-w-2xl font-serif text-lg leading-[1.6] text-pretty">
          Published daily from London and read by people who need the structure of a
          problem, not the headline.
        </p>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
        <h2 className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase">
          Editorial Mission
        </h2>

        <div className="prose prose-neutral prose-omniponder mt-10 max-w-2xl">
          <p>
            Most coverage of international affairs reports what happened. Very little
            of it explains the mechanism — the arrangement of incentives, capabilities,
            and constraints that made the outcome likely, and that will shape the next
            one. The gap is not a shortage of information. It is a shortage of analysis
            willing to take the time.
          </p>

          <p>
            Omniponder exists to close that gap. Each day we publish a single
            deep-dive: a sustained examination of one question in international
            political economy, energy and maritime security, or strategic stability,
            researched properly and argued to a conclusion. We are interested in the
            structural forces that operate below the news cycle — how a processing
            bottleneck becomes strategic leverage, why a cost-exchange ratio determines
            whether a sea lane stays open, what a demographic curve set in motion
            decades ago is about to deliver.
          </p>

          <p>
            The method is consistent: establish the mechanism, test it against
            evidence, state plainly what remains uncertain. We do not manufacture
            urgency, and we do not pretend to more confidence than the analysis
            supports. What we offer is a clearer view of how the system actually works
            — the foundation on which any serious judgment about what comes next has to
            rest.
          </p>
        </div>
      </section>

      {/* Areas of coverage */}
      <section className="border-rule mx-auto max-w-6xl border-t px-6 py-20 sm:px-10 sm:py-24">
        <h2 className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase">
          Areas of Coverage
        </h2>

        <ul className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {coverage.map(({ name, blurb }, index) => (
            <li key={name} className="border-rule border-t pt-6">
              <span className="text-ink-faint text-[0.625rem] tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-ink mt-3 font-serif text-2xl leading-tight font-medium tracking-[-0.015em]">
                {name}
              </h3>
              <p className="text-ink-muted mt-3 font-serif leading-relaxed text-pretty">
                {blurb}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Editor */}
      <section className="border-rule mx-auto max-w-6xl border-t px-6 py-20 sm:px-10 sm:py-24">
        <h2 className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase">
          Founder &amp; Editor
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,17rem)_1fr] md:gap-16">
          {/* Borderless editorial frame — the image sits flush, no chrome. */}
          <figure className="m-0">
            <div className="bg-paper-deep relative aspect-4/5 w-full overflow-hidden">
              {hasAuthorPhoto ? (
                <Image
                  src={AUTHOR_PHOTO}
                  alt="Muhammad Daniyal, Founder and Editor of Omniponder"
                  fill
                  sizes="(min-width: 768px) 17rem, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="text-ink-faint flex h-full w-full items-center justify-center font-serif text-5xl select-none"
                >
                  MD
                </div>
              )}
            </div>
          </figure>

          <div>
            <h3 className="text-ink font-serif text-3xl leading-tight font-medium tracking-[-0.02em] sm:text-4xl">
              Muhammad Daniyal
            </h3>
            <p className="text-ink-faint mt-3 text-[0.625rem] tracking-[0.2em] uppercase">
              Founder &amp; Editor
            </p>

            <div className="prose prose-neutral prose-omniponder mt-8 max-w-none">
              <p>
                Muhammad Daniyal is an International Relations graduate, researcher, and
                writer specializing in global systems, maritime politics, and energy
                security. With a deep focus on international political economy and
                strategic stability, his research analyzes how state actions and digital
                communication shape modern geopolitics.
              </p>
              <p>
                As the author of comprehensive intelligence reports, he built Omniponder
                to bridge the gap between rigorous academic analysis and everyday
                intellectual curiosity. His mission is to distill the complexities of
                human nature, philosophy, and shifting global trends into one clear,
                authoritative daily read.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="mx-auto max-w-6xl px-6 pb-28 sm:px-10">
        <NewsletterForm
          variant="feature"
          heading="The daily brief"
          blurb="One rigorous analysis each morning — on the systems, chokepoints, and structural pressures shaping the decade ahead."
        />
      </section>
    </div>
  )
}

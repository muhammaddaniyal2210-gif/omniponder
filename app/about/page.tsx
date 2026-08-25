import type { Metadata } from 'next'
import Image from 'next/image'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import NewsletterForm from '@/components/newsletter-form'
import { absoluteUrl, siteConfig } from '@/lib/site'

const description =
  'Most media is built for reaction. Omniponder is built for understanding — one in-depth piece every day on how the world actually works.'

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

/*
 * Held as plain strings so the copy stays character-exact — no JSX entity
 * substitution, no reflow drift when the file is reformatted. The word joiners
 * around the em dash stop it from wrapping to the start of a line.
 */
const mission = [
  'Most media is built for reaction. Omniponder is built for understanding.',
  'Every single day, we publish one in-depth piece examining how the world actually works. We don’t chase breaking news headlines or superficial summaries. Instead, we look at the structural realities, historical patterns, and ideas shaping our societies—from major global events and historical precedents to science, philosophy, and human nature.',
  'No noise, no filler. Just one rigorous piece, every single day, built to give you absolute clarity.',
]

export default function AboutPage() {
  return (
    <div>
      {/* Title */}
      <section className="border-rule mx-auto max-w-6xl border-b px-6 pt-16 pb-12 sm:px-10 sm:pt-20 sm:pb-14">
        <h1 className="text-ink font-serif text-[2rem] leading-tight font-medium tracking-[-0.02em] sm:text-[2.5rem]">
          About Omniponder
        </h1>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
        <div className="prose prose-neutral prose-omniponder max-w-2xl">
          {mission.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Who writes it */}
      <section className="border-rule mx-auto max-w-6xl border-t px-6 py-20 sm:px-10 sm:py-24">
        <h2 className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase">
          Who Writes It
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
          heading="Read it every morning"
          blurb="One in-depth piece a day, sent straight to your inbox. No noise, no filler."
        />
      </section>
    </div>
  )
}

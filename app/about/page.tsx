import type { Metadata } from 'next'
import Image from 'next/image'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import NewsletterForm from '@/components/NewsletterForm'
import ScrollCanvas from '@/components/ScrollCanvas'
import SocialLinks from '@/components/SocialLinks'
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
 * substitution, no reflow drift when the file is reformatted.
 */
const mission = [
  'Most media is built for reaction. Omniponder is built for understanding.',
  'The forces that decide how you live are rarely the ones making the most sound. They are the invisible infrastructure of the world—the cables, corridors, treaties, balance sheets, and inherited assumptions that quietly set the boundaries of what is possible. Our work is to map that infrastructure, and to cut through the daily noise to deliver signal.',
  'Every single day, we publish one in-depth piece examining how the world actually works. We don’t chase breaking news headlines or superficial summaries. Instead, we look at the structural realities, historical patterns, and ideas shaping our societies—from major global events and historical precedents to science, philosophy, and human nature.',
  'The method is subtraction. Everything that survives the edit has to earn its place: one argument, built from evidence, followed to its conclusion, with the uncertainties stated rather than smoothed over. We do not manufacture urgency, and we do not mistake confidence for rigour.',
  'No noise, no filler. Just one rigorous piece, every single day, built to give you absolute clarity.',
  'Read it for a month and the change is difficult to miss. Fewer opinions held loudly. More things genuinely understood.',
]

/*
 * A line may legally break *before* an em dash (UAX #14), stranding the dash at
 * the start of the next line. A zero-width word joiner forbids that break while
 * leaving the visible copy byte-for-byte unchanged; breaking after the dash is
 * still permitted.
 */
const WORD_JOINER = '\u2060'

function protectEmDashes(text: string) {
  return text.replaceAll('\u2014', WORD_JOINER + '\u2014')
}

export default function AboutPage() {
  return (
    // `isolate` keeps the background layer's stacking context local to the page.
    <div className="relative isolate overflow-x-clip">
      {/*
        The lattice is page-wide background, not a panel in a rail. It is pinned
        to the viewport for the full height of the article, so it stays with the
        reader and keeps turning as they scroll — the rotation is driven by
        document scroll progress inside the component.
      */}
      {/*
        Bounded to end at the newsletter's bottom border (pb-28 = 7rem above the
        page end), so the lattice cannot cross that line. The bound is via
        positioning only — overflow-hidden must NOT go here, or it becomes a
        scroll container and kills the child's `sticky`. The clip stays on the
        sticky element itself.
      */}
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-28 z-0" aria-hidden="true">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="mx-auto h-full max-w-6xl px-6 sm:px-10">
            <ScrollCanvas
              className="absolute top-1/2 -right-[22%] h-[21rem] w-[21rem] -translate-y-1/2 opacity-[0.26] sm:-right-[14%] sm:h-[27rem] sm:w-[27rem] sm:opacity-[0.3] md:-right-[6%] md:h-[34rem] md:w-[34rem] md:opacity-[0.42] lg:right-[-2%] lg:h-[43rem] lg:w-[43rem] lg:opacity-[0.5] [-webkit-mask-image:radial-gradient(circle_at_center,black_45%,transparent_78%)] [mask-image:radial-gradient(circle_at_center,black_45%,transparent_78%)] md:[-webkit-mask-image:linear-gradient(to_left,black_30%,transparent_82%)] md:[mask-image:linear-gradient(to_left,black_30%,transparent_82%)]"
            />
          </div>
        </div>
      </div>

      <section className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        <div>
          <div>
            <div className="border-rule border-b pt-16 pb-14 sm:pt-20 sm:pb-16">
              <p className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase">
                About the Publication
              </p>

              <h1 className="text-ink mt-8 max-w-3xl font-serif text-[1.75rem] leading-[1.22] font-medium tracking-[-0.018em] text-balance sm:text-[2.125rem] lg:text-[2.5rem]">
                An independent daily study of the forces that shape the world.
              </h1>

              <p className="text-ink-muted mt-7 max-w-2xl font-serif text-lg leading-[1.6] text-pretty sm:text-xl">
                Written and edited by Muhammad Daniyal. Published every morning, for
                readers who would rather understand a thing than keep up with it.
              </p>
            </div>

            <div className="py-20 sm:py-24">
              <h2 className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase">
                Editorial Mission
              </h2>

              <div className="prose prose-neutral prose-omniponder mt-10 max-w-2xl">
                {mission.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{protectEmDashes(paragraph)}</p>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Who writes it */}
      <section className="border-rule relative z-10 mx-auto max-w-6xl border-t px-6 py-20 sm:px-10 sm:py-24">
        <h2 className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase">
          Who Writes It
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-[auto_1fr] md:items-start md:gap-16">
          {/* Borderless editorial frame — the image sits flush, no chrome. */}
          <figure className="m-0">
            <div className="bg-paper-deep relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-full sm:h-[160px] sm:w-[160px] lg:h-[224px] lg:w-[224px]">
              {hasAuthorPhoto ? (
                <Image
                  src={AUTHOR_PHOTO}
                  alt="Muhammad Daniyal, Founder and Editor of Omniponder"
                  fill
                  sizes="(min-width: 1024px) 224px, (min-width: 640px) 160px, 120px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="text-ink-faint flex h-full w-full items-center justify-center font-serif text-3xl select-none sm:text-4xl lg:text-5xl"
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

            <div className="border-rule mt-10 border-t pt-7">
              <h4 className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase">
                Connect
              </h4>
              <SocialLinks
                size="md"
                label="Muhammad Daniyal social accounts"
                className="mt-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <div className="relative z-10 mx-auto max-w-6xl pb-28">
        <NewsletterForm />
      </div>
    </div>
  )
}

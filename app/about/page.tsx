import type { Metadata } from 'next'
import { Brain, Compass, Globe2, Microscope } from 'lucide-react'
import NewsletterForm from '@/components/newsletter-form'
import { absoluteUrl, siteConfig } from '@/lib/site'

const description =
  'Omniponder curates the profound — science, philosophy, human nature, and global systems — into one comprehensive read each day.'

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

const disciplines = [
  {
    icon: Brain,
    name: 'Human nature',
    blurb: 'Cooperation, bias, memory, motivation — why people do what they do.',
  },
  {
    icon: Microscope,
    name: 'Science',
    blurb: 'What we have recently learned, and what it quietly overturns.',
  },
  {
    icon: Compass,
    name: 'Philosophy',
    blurb: 'The old questions, treated as live ones rather than museum pieces.',
  },
  {
    icon: Globe2,
    name: 'Global systems',
    blurb: 'The slow forces — demographic, economic, ecological — shaping the decades ahead.',
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hook */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:px-10 sm:pt-24 sm:pb-24">
        <p className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase">The Manifesto</p>

        <h1 className="text-ink mt-10 max-w-4xl font-serif text-[2.75rem] leading-[1.02] font-medium tracking-[-0.03em] text-balance sm:text-7xl lg:text-[5.5rem]">
          We believe a strong mind is built one idea at a time.
        </h1>
      </section>

      <div className="border-t border-rule" />

      {/* Mission */}
      <section className="mx-auto max-w-2xl px-6 py-20 sm:py-24">
        <h2 className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase">Our Mission</h2>

        <div className="prose prose-neutral prose-omniponder mt-10 max-w-none">
          <p>
            The modern world does not suffer from a shortage of information. It suffers
            from the opposite. We are handed more words before breakfast than our
            great-grandparents met in a month, and almost none of it is built to make us
            think. It is built to make us click, react, and move on. The result is a
            strange kind of poverty: endlessly informed, rarely educated.
          </p>

          <p>
            Omniponder exists to answer that with the smallest possible correction. Each
            day we publish one piece — a genuine ten- to fifteen-minute deep-dive into
            science, philosophy, human nature, or the global systems quietly deciding the
            next few decades. We curate the profound rather than the immediate, and we
            follow a single argument all the way through instead of skimming a dozen.
            One idea, examined properly, is worth more than a hundred half-encountered.
          </p>

          <p>
            What accumulates is not trivia but awareness: the ability to recognise a
            pattern you have met before, to spot a weak argument by its shape, to hold a
            view you actually arrived at rather than absorbed. That is the quiet engine
            of a strong mind, and it is built the only way anything durable is built —
            one idea at a time, on an ordinary day, without spectacle.
          </p>
        </div>

        <ul className="border-rule bg-rule mt-16 grid gap-px border sm:grid-cols-2">
          {disciplines.map(({ icon: Icon, name, blurb }) => (
            <li key={name} className="bg-paper p-8">
              <Icon className="h-5 w-5 text-ink-faint" aria-hidden="true" />
              <h3 className="text-ink mt-5 font-serif text-xl font-medium tracking-[-0.015em]">{name}</h3>
              <p className="text-ink-muted mt-2.5 text-sm leading-relaxed text-pretty">{blurb}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="border-t border-rule" />

      {/* Founder & Editor */}
      <section className="mx-auto max-w-2xl px-6 py-20 sm:py-24">
        <h2 className="text-ink-faint text-[0.625rem] tracking-[0.2em] uppercase">Founder &amp; Editor</h2>

        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
          {/*
            Portrait placeholder. Replace with next/image once a photograph is
            available; the fixed size keeps the row from reflowing when it lands.
          */}
          <div
            aria-hidden="true"
            className="border-rule bg-paper-deep text-ink-faint flex h-32 w-32 shrink-0 items-center justify-center border font-serif text-3xl select-none"
          >
            MD
          </div>

          <div>
            <h3 className="text-ink font-serif text-3xl font-medium tracking-[-0.02em]">
              Muhammad Daniyal
            </h3>
            <p className="text-ink-faint mt-2 text-[0.625rem] tracking-[0.2em] uppercase">
              Founder &amp; Editor, Omniponder
            </p>

            <div className="prose prose-neutral prose-omniponder mt-7 max-w-none">
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

      {/* Conversion anchor */}
      <section className="mx-auto max-w-6xl px-6 pt-8 pb-28 sm:px-10">
        <NewsletterForm
          variant="feature"
          heading="Start building, one idea at a time"
          blurb="Join readers who spend fifteen minutes a day on something worth understanding. One long-form piece, every morning."
        />
      </section>
    </div>
  )
}

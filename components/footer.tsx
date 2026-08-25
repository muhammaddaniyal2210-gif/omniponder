import Link from 'next/link'
import SocialLinks from '@/components/SocialLinks'

const linkClass =
  'text-[0.6875rem] font-medium tracking-[0.18em] text-ink-muted uppercase transition-colors hover:text-ink'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-rule mt-24 border-t">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="border-rule grid gap-10 border-b py-16 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div>
            <Link
              href="/"
              className="text-ink font-serif text-3xl font-medium tracking-[-0.02em] transition-opacity hover:opacity-60"
            >
              Omniponder
            </Link>
            <p className="text-ink-muted mt-5 max-w-sm font-serif text-lg leading-relaxed text-pretty">
              One in-depth piece every day on how the world actually works &mdash;
              global events, history, science, philosophy, and human nature.
            </p>
          </div>

          <div className="flex flex-col items-start gap-7 md:items-end">
            <nav aria-label="Footer" className="flex flex-col items-start gap-4 md:items-end">
              <Link href="/archive" className={linkClass}>
                Archive
              </Link>
              <Link href="/about" className={linkClass}>
                About
              </Link>
            </nav>

            <SocialLinks label="Omniponder social accounts" />
          </div>
        </div>

        <p className="text-ink-faint py-8 text-[0.6875rem] tracking-[0.16em] uppercase">
          &copy; {year} Omniponder
        </p>
      </div>
    </footer>
  )
}

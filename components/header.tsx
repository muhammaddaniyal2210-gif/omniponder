import Link from 'next/link'

const navLinkClass =
  'text-[0.6875rem] font-medium tracking-[0.18em] text-ink-muted uppercase transition-colors hover:text-ink focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink'

export default function Header() {
  return (
    <header className="border-rule bg-paper/92 sticky top-0 z-40 border-b backdrop-blur-sm">
      {/*
        Three equal columns hold the wordmark optically centred no matter how
        wide the flanking links run — the masthead rule of a printed front page.
      */}
      <div className="mx-auto grid h-[4.5rem] max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 sm:h-24 sm:px-10">
        <nav aria-label="Sections" className="justify-self-start">
          <Link href="/archive" className={navLinkClass}>
            Archive
          </Link>
        </nav>

        <Link
          href="/"
          aria-label="Omniponder — home"
          className="text-ink focus-visible:outline-ink justify-self-center font-serif text-[1.6rem] leading-none font-medium tracking-[-0.02em] transition-opacity hover:opacity-60 focus-visible:outline-1 focus-visible:outline-offset-4 sm:text-[2.1rem]"
        >
          Omniponder
        </Link>

        <nav aria-label="Publication" className="justify-self-end">
          <Link href="/about" className={navLinkClass}>
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}

import Link from 'next/link'

const navLinkClass =
  'text-sm tracking-wide text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 focus-visible:outline-none'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur-sm">
      {/*
        Three equal columns keep the wordmark optically centred regardless of
        how wide the flanking nav links are.
      */}
      <div className="mx-auto grid h-20 max-w-5xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6">
        <nav aria-label="Sections" className="justify-self-start">
          <Link href="/archive" className={navLinkClass}>
            Archive
          </Link>
        </nav>

        <Link
          href="/"
          aria-label="Omniponder — home"
          className="justify-self-center text-xl font-black tracking-tight text-zinc-900 transition-opacity hover:opacity-70 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 focus-visible:outline-none sm:text-2xl"
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

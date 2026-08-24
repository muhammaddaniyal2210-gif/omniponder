import Link from 'next/link'

const linkClass = 'transition-colors hover:text-zinc-900'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-28 border-t border-zinc-200">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="flex flex-col items-center gap-6 text-center">
          <Link
            href="/"
            className="text-lg font-black tracking-tight text-zinc-900 transition-opacity hover:opacity-70"
          >
            Omniponder
          </Link>

          <p className="max-w-sm text-sm leading-relaxed text-pretty text-zinc-500">
            One long-form idea, every morning. Science, philosophy, human nature,
            and global systems.
          </p>

          <nav aria-label="Footer" className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="/archive" className={linkClass}>
              Archive
            </Link>
            <Link href="/about" className={linkClass}>
              About
            </Link>
          </nav>

          <p className="text-xs text-zinc-400">&copy; {year} Omniponder</p>
        </div>
      </div>
    </footer>
  )
}

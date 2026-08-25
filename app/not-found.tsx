import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-28 text-center">
      <p className="text-xs font-medium tracking-widest text-ink-faint uppercase">404</p>
      <h1 className="text-ink mt-6 font-serif text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
        That page isn&rsquo;t here
      </h1>
      <p className="text-ink-muted mt-5 font-serif text-lg">
        The piece you were looking for may have moved, or never existed.
      </p>
      <Link
        href="/"
        className="border-ink text-ink hover:bg-ink hover:text-paper mt-10 inline-flex border px-7 py-3.5 text-[0.6875rem] font-medium tracking-[0.18em] uppercase transition-colors"
      >
        Read today&rsquo;s piece
      </Link>
    </div>
  )
}

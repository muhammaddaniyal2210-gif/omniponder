import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-28 text-center">
      <p className="text-xs font-medium tracking-widest text-zinc-400 uppercase">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900">
        That page isn&rsquo;t here
      </h1>
      <p className="mt-3 text-zinc-600">
        The piece you were looking for may have moved, or never existed.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
      >
        Read today&rsquo;s piece
      </Link>
    </div>
  )
}

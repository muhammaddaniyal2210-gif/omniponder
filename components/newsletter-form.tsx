'use client'

import { useState } from 'react'
import { ArrowRight, Check, LoaderCircle, Mail } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

type NewsletterFormProps = {
  /**
   * `panel` — recessed zinc-50 card, for mid-page placement.
   * `feature` — inverted anchor block, for the end of a page where it is the
   * primary call to action.
   */
  variant?: 'panel' | 'feature'
  heading?: string
  blurb?: string
}

const copy = {
  heading: 'One idea, every morning',
  blurb:
    'A single long-form piece on science, philosophy, human nature, and global systems — delivered daily. No feed, no backlog, no noise.',
}

export default function NewsletterForm({
  variant = 'panel',
  heading = copy.heading,
  blurb = copy.blurb,
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const inverted = variant === 'feature'

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'loading') return

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data: { message?: string } = await response.json().catch(() => ({}))

      if (!response.ok) {
        setStatus('error')
        setMessage(data.message ?? 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      setMessage(data.message ?? 'You are on the list.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Could not reach the server. Please try again.')
    }
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className={
        inverted
          ? 'rounded-2xl bg-zinc-900 px-6 py-14 sm:px-12 sm:py-16'
          : 'rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-12 sm:px-10'
      }
    >
      <div className="mx-auto max-w-xl text-center">
        <Mail
          className={`mx-auto h-6 w-6 ${inverted ? 'text-zinc-500' : 'text-zinc-400'}`}
          aria-hidden="true"
        />

        <h2
          id="newsletter-heading"
          className={`mt-5 font-semibold tracking-tight text-balance ${
            inverted ? 'text-3xl text-white sm:text-4xl' : 'text-2xl text-zinc-900'
          }`}
        >
          {heading}
        </h2>

        <p
          className={`mx-auto mt-4 max-w-md leading-relaxed text-pretty ${
            inverted ? 'text-zinc-300' : 'text-base text-zinc-600'
          }`}
        >
          {blurb}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              if (status !== 'idle') setStatus('idle')
            }}
            placeholder="you@example.com"
            disabled={status === 'loading'}
            aria-describedby={message ? 'newsletter-status' : undefined}
            className={`w-full flex-1 rounded-lg px-4 py-3.5 focus:outline-none disabled:opacity-60 ${
              inverted
                ? 'border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-white focus:ring-2 focus:ring-white/20'
                : 'border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10'
            }`}
          />

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 ${
              inverted
                ? 'bg-white text-zinc-900 hover:bg-zinc-200 focus:ring-white focus:ring-offset-zinc-900'
                : 'bg-zinc-900 text-white hover:bg-zinc-700 focus:ring-zinc-900'
            }`}
          >
            {status === 'loading' && (
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
            )}
            {status === 'success' && <Check className="h-4 w-4" aria-hidden="true" />}
            {status === 'loading' ? 'Subscribing' : status === 'success' ? 'Subscribed' : 'Subscribe'}
            {(status === 'idle' || status === 'error') && (
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </form>

        <p
          id="newsletter-status"
          role="status"
          aria-live="polite"
          className={`mt-4 min-h-5 text-sm ${
            status === 'error'
              ? inverted
                ? 'text-red-400'
                : 'text-red-600'
              : inverted
                ? 'text-zinc-300'
                : 'text-zinc-600'
          }`}
        >
          {message}
        </p>

        <p className={`mt-1 text-xs ${inverted ? 'text-zinc-500' : 'text-zinc-400'}`}>
          Free forever. Unsubscribe in one click.
        </p>
      </div>
    </section>
  )
}

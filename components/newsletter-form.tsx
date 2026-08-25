'use client'

import { useState } from 'react'
import { ArrowRight, Check, LoaderCircle, Mail } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

type NewsletterFormProps = {
  /**
   * `panel` — recessed ivory panel, for mid-page placement.
   * `feature` — inverted anchor block, for the end of a page where it is the
   * primary call to action.
   */
  variant?: 'panel' | 'feature'
  heading?: string
  blurb?: string
}

const copy = {
  heading: 'One piece, every day',
  blurb:
    'An in-depth look at how the world actually works — global events, history, science, philosophy, and human nature. Sent every morning.',
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
          ? 'bg-ink px-6 py-16 sm:px-14 sm:py-20'
          : 'border-rule border-y px-6 py-16 sm:px-10'
      }
    >
      <div className="mx-auto max-w-xl text-center">
        <Mail
          className={`mx-auto h-6 w-6 ${inverted ? 'text-paper-faint' : 'text-ink-faint'}`}
          aria-hidden="true"
        />

        <h2
          id="newsletter-heading"
          className={`mt-6 font-serif font-medium tracking-[-0.02em] text-balance ${
            inverted ? 'text-paper text-4xl sm:text-5xl' : 'text-ink text-3xl sm:text-4xl'
          }`}
        >
          {heading}
        </h2>

        <p
          className={`mx-auto mt-5 max-w-md font-serif text-lg leading-relaxed text-pretty ${
            inverted ? 'text-rule-strong' : 'text-ink-muted'
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
            className={`w-full flex-1 border px-4 py-4 text-base focus:outline-none disabled:opacity-60 ${
              inverted
                ? 'border-ink-muted bg-ink text-paper placeholder:text-paper-faint focus:border-paper'
                : 'border-rule-strong bg-paper text-ink placeholder:text-ink-faint focus:border-ink'
            }`}
          />

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[0.6875rem] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:outline-1 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70 ${
              inverted
                ? 'bg-paper text-ink hover:bg-rule focus-visible:outline-paper'
                : 'bg-ink text-paper hover:bg-ink-soft focus-visible:outline-ink'
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
                ? 'text-rule-strong'
                : 'text-ink-muted'
          }`}
        >
          {message}
        </p>

        <p
          className={`mt-2 text-[0.625rem] tracking-[0.16em] uppercase ${
            inverted ? 'text-paper-faint' : 'text-ink-faint'
          }`}
        >
          Free to read. Unsubscribe in one click.
        </p>
      </div>
    </section>
  )
}

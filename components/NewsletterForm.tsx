'use client'

import { useEffect, useRef } from 'react'
import { Mail } from 'lucide-react'

const FORM_ID = '22284ce1-fca1-425e-a9f5-c8fd95f588e8'
const LOADER_SRC = 'https://subscribe-forms.beehiiv.com/v3/loader.js'

const copy = {
  heading: 'The Daily Dispatch',
  blurb:
    'An in-depth look at how the world actually works — global events, history, science, philosophy, and human nature. Sent every morning.',
}

export default function NewsletterForm() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    /*
     * next/script is the wrong tool here. It de-duplicates by src and keeps the
     * tag alive across route changes, so on a client-side navigation back to
     * this page the loader never re-executes and the container paints empty.
     *
     * Creating the element by hand instead means every mount appends a fresh
     * script, which browsers execute on insertion even when the file is
     * cached — so the form is rebuilt each time. The cleanup empties the host,
     * which also covers StrictMode's double-invoke in development.
     */
    host.replaceChildren()

    const script = document.createElement('script')
    script.src = LOADER_SRC
    script.async = true
    script.setAttribute('data-beehiiv-form', FORM_ID)
    host.appendChild(script)

    return () => {
      host.replaceChildren()
    }
  }, [])

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="border-rule border-y px-4 py-16 sm:px-10"
    >
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <Mail className="text-ink-faint h-6 w-6" aria-hidden="true" />

        <h2
          id="newsletter-heading"
          className="text-ink mt-6 font-serif text-3xl font-medium tracking-[-0.02em] text-balance sm:text-4xl"
        >
          {copy.heading}
        </h2>

        <p className="text-ink-muted mt-5 max-w-md font-serif text-lg leading-relaxed text-pretty">
          {copy.blurb}
        </p>

        {/*
          The embed renders here. Left empty on the server — the widget is
          injected in an effect, so there is nothing for React to mismatch.
        */}
        {/*
          Block, not flex. Beehiiv's wrapper sets `width:100%; margin:0 auto`
          and sizes its iframe by script; as a flex item it collapsed to zero
          height. A plain block lets its own auto margins do the centring.
        */}
        <div ref={hostRef} className="mt-8 w-full" />

        <p className="text-ink-faint mt-2 text-[0.625rem] tracking-[0.16em] uppercase">
          Free to read. Unsubscribe in one click.
        </p>
      </div>
    </section>
  )
}

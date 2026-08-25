'use client'

import { useEffect, useState } from 'react'
import { Check, Link2, Share2, TriangleAlert } from 'lucide-react'

type ShareButtonsProps = {
  /** Absolute URL — share intents reject relative paths. */
  url: string
  title: string
}

type BrandIconProps = { className?: string }

/*
 * lucide-react removed all brand marks in v1 (no Twitter/Linkedin/Facebook
 * exports remain), so the three logos below are inlined as SVG paths. lucide
 * still supplies the surrounding UI icons.
 */
function XIcon({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  )
}

function LinkedInIcon({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

function FacebookIcon({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

const buttonClass =
  'inline-flex h-11 w-11 items-center justify-center border border-rule text-ink-muted transition-colors hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink'

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')

  useEffect(() => {
    if (copyState === 'idle') return
    const timer = setTimeout(() => setCopyState('idle'), 2000)
    return () => clearTimeout(timer)
  }, [copyState])

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const targets = [
    {
      name: 'X',
      href: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      Icon: XIcon,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: LinkedInIcon,
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FacebookIcon,
    },
  ]

  const copyLabel =
    copyState === 'copied'
      ? 'Link copied'
      : copyState === 'error'
        ? 'Could not copy link'
        : 'Copy link'

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopyState('copied')
    } catch {
      // writeText rejects when the document is unfocused or the permission is
      // denied. Surface it rather than appearing to do nothing.
      setCopyState('error')
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-5">
      <span className="text-ink-faint inline-flex items-center gap-2 text-[0.625rem] tracking-[0.2em] uppercase">
        <Share2 className="h-4 w-4" aria-hidden="true" />
        Share this piece
      </span>

      <ul className="flex items-center gap-2">
        {targets.map(({ name, href, Icon }) => (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${name}`}
              title={`Share on ${name}`}
              className={buttonClass}
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          </li>
        ))}

        <li>
          <button
            type="button"
            onClick={copyLink}
            aria-label={copyLabel}
            title={copyLabel}
            className={buttonClass}
          >
            {copyState === 'copied' && <Check className="h-[18px] w-[18px]" aria-hidden="true" />}
            {copyState === 'error' && (
              <TriangleAlert className="h-[18px] w-[18px]" aria-hidden="true" />
            )}
            {copyState === 'idle' && <Link2 className="h-[18px] w-[18px]" aria-hidden="true" />}
          </button>
        </li>
      </ul>

      <span role="status" aria-live="polite" className="sr-only">
        {copyState === 'copied' ? 'Link copied to clipboard' : ''}
        {copyState === 'error' ? 'Could not copy the link' : ''}
      </span>
    </div>
  )
}

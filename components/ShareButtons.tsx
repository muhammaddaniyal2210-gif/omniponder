'use client'

import { useEffect, useState } from 'react'
import { Check, Link2, Share2, TriangleAlert } from 'lucide-react'
import { FacebookIcon, LinkedInIcon, XIcon } from '@/components/BrandIcons'

type ShareButtonsProps = {
  /** Absolute URL — share intents reject relative paths. */
  url: string
  title: string
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

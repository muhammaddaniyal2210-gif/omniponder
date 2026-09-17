'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export type NavItem = { label: string; href: string }

/**
 * Compact masthead menu for small screens. The desktop nav is server-rendered
 * in the header; this only owns the phone/tablet disclosure so the rest of the
 * masthead stays static. Closes on navigation and on Escape; the toggle carries
 * aria-expanded / aria-controls and the panel is a labelled list.
 */
export default function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
        className="text-ink focus-visible:outline-ink -ml-2 inline-flex h-11 w-11 items-center justify-center focus-visible:outline-1 focus-visible:outline-offset-2"
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Sections"
          className="border-rule bg-paper absolute inset-x-0 top-full border-b shadow-sm"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-2 sm:px-10">
            {items.map((item) => (
              <li key={item.href} className="border-rule border-b last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-ink hover:text-ink-muted focus-visible:outline-ink block py-3.5 font-serif text-lg transition-colors focus-visible:outline-1 focus-visible:outline-offset-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}

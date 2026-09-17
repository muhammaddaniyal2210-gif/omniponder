import Link from 'next/link'
import MobileMenu, { type NavItem } from '@/components/MobileMenu'
import { CATEGORIES } from '@/lib/categories'

// One source for both the desktop row and the mobile panel. Pillars come from
// the taxonomy so the masthead never drifts from the archive.
const navItems: NavItem[] = [
  { label: 'Latest', href: '/' },
  ...CATEGORIES.map((category) => ({ label: category.name, href: `/archive#${category.slug}` })),
  { label: 'Archive', href: '/archive' },
  { label: 'About', href: '/about' },
]

const desktopLinkClass =
  'text-ink-muted hover:text-ink focus-visible:outline-ink text-[0.8125rem] font-medium tracking-[0.01em] whitespace-nowrap transition-colors focus-visible:outline-1 focus-visible:outline-offset-4'

export default function Header() {
  return (
    <header className="border-rule bg-paper/92 sticky top-0 z-40 border-b backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid h-[4.5rem] grid-cols-[auto_1fr_auto] items-center gap-4 sm:h-[4.75rem] lg:flex lg:justify-between">
          {/* Mobile: compact menu (left). Hidden on desktop. */}
          <MobileMenu items={navItems} />

          <Link
            href="/"
            aria-label="OmniPonder — home"
            className="text-ink focus-visible:outline-ink justify-self-center font-serif text-[1.6rem] leading-none font-medium tracking-[-0.02em] transition-opacity hover:opacity-60 focus-visible:outline-1 focus-visible:outline-offset-4 sm:text-[1.9rem] lg:justify-self-auto"
          >
            OmniPonder
          </Link>

          {/* Desktop: full section row (right). Hidden on mobile. */}
          <nav aria-label="Sections" className="hidden lg:flex lg:items-center lg:gap-6 xl:gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={desktopLinkClass}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile: spacer balancing the menu button so the wordmark stays centred. */}
          <div className="h-11 w-11 lg:hidden" aria-hidden="true" />
        </div>
      </div>
    </header>
  )
}

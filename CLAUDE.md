@AGENTS.md

# Omniponder

A daily editorial publication. One long-form piece per day, published to be read
once, carefully — not skimmed, not fed to an algorithm.

These rules are binding. Prefer them over generic Next.js/Tailwind defaults.

## Brand goal

**Authority, clarity, and zero distractions.** Every decision is judged against
those three words, in that order. If a feature makes the page busier without
making the argument clearer, it does not ship.

The reader should feel they are holding something considered — closer to a
printed quarterly than a content site. Nothing on the page may compete with the
prose for attention.

## Aesthetic

High-end editorial. The reference points are **Farnam Street** and
**The Atlantic**: publications where typography carries the design and almost
nothing else is asked to.

- **Typography is the design.** Before adding a border, a shadow, or a colour,
  try solving it with size, weight, leading, or space. Usually that works.
- **Generous whitespace.** Whitespace is structure, not leftover. Sections
  breathe (`py-16`+); nothing is packed. When in doubt, add space.
- **High contrast on ivory.** The ground is warm off-white (`#fbfaf7`), not
  pure `#ffffff` — paper, not screen. Text is deep charcoal, at 17:1.
- **Restraint.** No gradients, no drop shadows, no decorative colour. Motion is
  limited to subtle state transitions, with one sanctioned exception: the
  scroll-reactive lattice on the About page (`components/ScrollCanvas.tsx`).
  It is monochrome, decorative-only (`aria-hidden`), withheld from phones,
  paused when off-screen, and honours `prefers-reduced-motion`. Any further
  motion needs the same justification.

### Colour

The palette is **deep charcoal on ivory**. Warm neutrals only — **do not
introduce zinc, slate, gray, or neutral scales**; they carry a cool cast that
fights the paper ground. Use the semantic tokens, never raw Tailwind colours.

| Role | Token | Hex |
| --- | --- | --- |
| Page ground | `bg-paper` | `#fbfaf7` |
| Recessed panel | `bg-paper-deep` | `#f3f0e9` |
| Headlines, primary text | `text-ink` | `#171614` |
| Long-form body prose | `text-ink-soft` | `#3a3833` |
| Metadata, secondary copy | `text-ink-muted` | `#66625a` |
| Eyebrows, labels, captions | `text-ink-faint` | `#77736a` |
| Hairline rules | `border-rule` | `#e2ded4` |
| Emphasised rules | `border-rule-strong` | `#c8c2b4` |

Every text token clears WCAG AA (4.5:1) against `bg-paper`. If you add one,
verify the ratio before using it — `text-ink-faint` is already at the limit.

There is no accent colour. Colour beyond this scale is reserved for genuine
error states.

### Form

- **Sharp edges, always.** The radius scale is zeroed in `@theme`, so a stray
  `rounded-lg` is inert — but do not write one.
- **No shadows.** The shadow scale is zeroed too. Depth comes from rules and
  space, never from blur.
- **Hairlines do the separating.** 1px `border-rule` between sections, in the
  manner of newspaper column rules. Prefer a rule over a filled panel.
- **Whitespace is bounded.** Generous space *inside* ruled sections; never a
  large unbounded void between two rules.

### Type

- **Serif — Newsreader (`font-serif`)**: all editorial content. Article body,
  headlines, standfirsts, pull-quotes, the masthead wordmark. It carries an
  optical-size axis, so display sizes sharpen automatically.
- **Sans — Inter Tight (`font-sans`)**: chrome only. Navigation, metadata,
  bylines, eyebrows, buttons, labels. Set small, uppercase, with wide tracking
  (`tracking-[0.18em]`–`tracking-[0.2em]`).
- That split *is* the contrast in the design. Do not set body copy in sans or
  navigation in serif.
- Display headlines take negative tracking (`-0.02em` to `-0.03em`) and
  `text-balance`; body copy takes `text-pretty`.
- Article measure stays near 65–75 characters (`max-w-[42rem]`). Never widen
  the reading column to fill a screen.

## Content

Long-form **10–15 minute deep-dives** — substantially longer than a blog post
and written to be complete in one sitting. Subjects:

- **Human nature** — why people behave as they do.
- **Science** — what was recently learned, and what it overturns.
- **Philosophy** — the old questions treated as live ones.
- **Global systems** — the slow forces shaping the decades ahead.

Each piece makes one argument and follows it through. House voice is calm,
precise, and unhurried; it explains rather than asserts, and it never sells.
No listicles, no hot takes, no engagement bait, no padding to hit a length.

Articles are Markdown files in `content/articles/` with frontmatter:
`title`, `date` (`YYYY-MM-DD`), `excerpt`, `topic`. The newest date is
automatically the homepage's "Today's Read" — publishing is adding a file.

## Architecture

- Next.js App Router, **Next 16**: `params` is a `Promise` and must be awaited.
  Use the generated `PageProps<'/route'>` helpers rather than hand-written prop
  types.
- **Tailwind v4**: configuration lives in `app/globals.css` (`@theme`,
  `@plugin`) — the design tokens above ARE that config. There is no
  `tailwind.config.js`/`.ts` and creating one will not be picked up.
- Server Components by default. Add `'use client'` only for genuine
  interactivity (form state, scroll listeners, clipboard).
- Content reads go through `lib/markdown.ts`. Absolute URLs and origin
  resolution go through `lib/site.ts` — never hardcode an origin.
- **lucide-react v1 has no brand icons.** Twitter/LinkedIn/Facebook marks are
  inlined SVG paths in `components/BrandIcons.tsx` — the single source for both
  `ShareButtons` and `SocialLinks`. Never re-inline them elsewhere.

## Non-negotiables

- Articles are pre-rendered (`generateStaticParams`); the reading path stays
  static.
- Every route sets its own OG and Twitter Card metadata with an absolute
  `og:url` — link previews are the primary distribution channel.
- Ad slots reserve their space before load. Layout must never shift.
- Accessibility is part of "flawless": real landmarks, labelled controls,
  visible focus rings, `prefers-reduced-motion` respected.

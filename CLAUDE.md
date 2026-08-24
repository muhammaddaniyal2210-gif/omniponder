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
- **High contrast, true white.** `#ffffff` backgrounds — never off-white, never
  a tint. Text is near-black on white.
- **Restraint.** No gradients, no drop shadows, no decorative colour, no
  animated flourishes. Motion is limited to subtle state transitions.

### Colour

**Zinc is the neutral. Do not introduce slate, gray, or neutral.** Zinc reads
truly neutral against `#ffffff`; slate carries a blue cast that fights it.

| Role | Token |
| --- | --- |
| Page background | `bg-white` (true `#ffffff`) |
| Primary text / headings | `text-zinc-900` |
| Body prose | `text-zinc-700` |
| Secondary / metadata | `text-zinc-500` |
| Labels, eyebrows | `text-zinc-400` |
| Hairlines, rules | `border-zinc-200` |
| Recessed panels | `bg-zinc-50` |
| Inverted surfaces | `bg-zinc-900` + `text-white` |

Colour beyond zinc is reserved for genuine error states. There is no accent
colour, and adding one requires a deliberate brand decision — not a component's
convenience.

### Type

- **UI, headings, navigation:** Inter (`font-sans`), tight tracking on display
  sizes (`tracking-tight`).
- **Article and long-form body:** Source Serif 4 (`font-serif`). Serif is the
  reading surface; sans is the furniture around it.
- Headlines are set `text-balance`; body paragraphs and standfirsts
  `text-pretty`.
- Article measure stays near 65–75 characters (`max-w-2xl`). Never widen the
  reading column to fill a screen.

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
  `@plugin`). There is no `tailwind.config.js` — do not create one.
- Server Components by default. Add `'use client'` only for genuine
  interactivity (form state, scroll listeners, clipboard).
- Content reads go through `lib/markdown.ts`. Absolute URLs and origin
  resolution go through `lib/site.ts` — never hardcode an origin.
- **lucide-react v1 has no brand icons.** Twitter/LinkedIn/Facebook marks are
  inlined SVG paths in `components/ShareButtons.tsx`.

## Non-negotiables

- Articles are pre-rendered (`generateStaticParams`); the reading path stays
  static.
- Every route sets its own OG and Twitter Card metadata with an absolute
  `og:url` — link previews are the primary distribution channel.
- Ad slots reserve their space before load. Layout must never shift.
- Accessibility is part of "flawless": real landmarks, labelled controls,
  visible focus rings, `prefers-reduced-motion` respected.

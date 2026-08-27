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

**The topic sets the length — the length never sets the quality.** Ask what this
particular piece needs to be complete, and write that.

The usual landing zone is **7–12 minutes**, but it is a guideline, not a target.
Go shorter when the argument is genuinely finished sooner; go longer when the
context, history, or evidence demands it. Past roughly **12–13 minutes** you need
an actual editorial reason, not momentum.

Never trade substance for a number in either direction: no cutting context to hit
seven minutes, no filler or restatement to reach ten. Reading time is *derived,
not declared* — `lib/markdown.ts` divides the body by 220 words per minute, so
the figure on the page follows the prose. Write first, report the time after.

Before finalising, check the length honestly: is every point properly explained,
is there enough context, was anything valuable cut to hit a number, is anything
repeated or padded, does it hold interest end to end? It should feel complete
without being exhausting. Subjects:

- **Human nature** — why people behave as they do.
- **Science** — what was recently learned, and what it overturns.
- **Philosophy** — the old questions treated as live ones.
- **Global systems** — the slow forces shaping the decades ahead.

Each piece makes one argument and follows it through. House voice is calm,
precise, and unhurried; it explains rather than asserts, and it never sells.
No listicles, no hot takes, no engagement bait, no padding to hit a length.

### Publishing contract

Articles are Markdown files in `content/articles/`. The newest date becomes the
homepage's "Today's Read" — publishing is adding a file. Ties on date break on
slug, so two pieces sharing a date resolve deterministically.

```yaml
title:   "Headline — front-load the keyword phrase; aim under 60 chars"
excerpt: "The meta description. 150–160 characters, complete sentence, carries the hook."
date:    "YYYY-MM-DD"
topic:   "Economic History"        # the DISCIPLINE — drives archive grouping
tags:    ["Onam", "King Mahabali"] # 5–8 entities — drives keywords, article:tag, JSON-LD
```

`topic` and `tags` do different jobs. **`topic` is the discipline** and must
stay in the small, stable set the archive groups by (Geopolitics, Economic
History, Science, Philosophy, Human Nature, Global Systems). **`tags` are search
entities** — specific proper nouns and phrases people actually type. Never let
a one-off subject become a topic. If `topic` is omitted it falls back to the
first tag, which is a convenience, not the intended path.

### DUAL-IMAGE PROTOCOL

Every new article generated must include exactly TWO visual elements:

1. **Primary (Top):** A hand-coded, minimalist SVG infographic (map, data, or
   conceptual diagram) placed directly below the intro.
2. **Secondary (Mid-article):** A `.jpg` placed deeper in the article body that
   grounds the essay visually. A properly licensed photograph is ideal. Absent
   one — there is no image-generation tool here, and unlicensed stock is not an
   option on a commercial site — author a second illustration instead and render
   it to `.jpg`, keeping it tonally distinct from the FIG. 01 infographic so the
   two do not read as a matched pair. Never ship the reference without the file.

The SVG is authored in-repo and ships working. The `.jpg` is sourced manually
afterwards, so it is normally absent at publish time — `lib/markdown.ts` checks
every local image at build time and renders a reserved frame for any file that
is missing, rather than a broken image. The build log names them. Both images
still need real, descriptive alt text.

### SEO requirements

These are wired up already; the point is not to break them.

- Every route sets its own title, description, canonical, OG, and Twitter card.
  Absolute URLs come from `lib/site.ts` — never hardcode an origin.
- Article pages emit `Article` + `BreadcrumbList` JSON-LD from
  `lib/structured-data.ts`; the root layout emits `Organization` + `WebSite`.
  **Structured data must never contradict what the page visibly says** — that
  is a manual-action risk, not an optimisation.
- `app/sitemap.ts`, `app/robots.ts`, and `app/feed.xml` are generated from the
  article list. New articles appear in all three with no extra work.
- One `<h1>` per page; heading order must not skip levels. Work the target
  entities into `##`/`###` naturally.
- Every image needs real alt text. Markdown images have **no build-time
  existence check** — a missing file ships a broken image.

### House style

One argument per piece, followed to a conclusion, uncertainties stated. Calm,
precise, unhurried; explains rather than asserts; never sells. No listicles, no
hot takes, no padding to hit a length.

**Banned:** "delve", "tapestry", "testament", "in conclusion", "vibrant",
"navigate the complexities", "in today's fast-paced world".

**Openings.** Never open with a dictionary definition or a throat-clearing
generality. Open on a surprising fact, a live contradiction, a concrete scene, a
real question, or a specific development. The first hundred words have to earn
the next hundred.

**Structure follows the argument.** Use only the sections this particular piece
needs. Do not fit a topic to a template, and do not add headings to break up text
that is already readable.

**Also banned, as patterns rather than words:** empty motivational filler,
unsupported claims, invented statistics or quotes, keyword stuffing, conclusions
that restate the article back to the reader, and the evenly-weighted
three-clause sentence rhythm that reads as machine-written.

**Promotional copy** — newsletter and social — carries the same voice as the
essays: intelligent, specific, unhurried. It states what the piece argues and why
it is worth the time. No hype ("this will change everything", "you can't afford
to miss this"), no manufactured urgency, no overselling.

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

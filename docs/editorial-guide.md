# OmniPonder — Editorial Guide

Internal reference for positioning, categories, and commissioning decisions.
The category structure it describes is enforced in code by `lib/categories.ts`
(the single source of truth) and the `topic` field in each article's frontmatter.

## Umbrella positioning

**OmniPonder explains the hidden systems, histories and human behaviours shaping
the modern world.**

Public-facing line: *Understand the forces shaping the modern world.* The
publication serves one intellectually curious reader through three connected
editorial pillars. It is not a general educational site and should never read as
a collection of unrelated subjects.

## The three primary categories (pillars)

Every article belongs to exactly one pillar, set via `topic:` in frontmatter.

1. **Power & Systems** — Geopolitics, technology, climate, institutions and the
   forces organizing modern life.
2. **History & Economy** — How empires, trade, money and decisions from the past
   created the world we live in.
3. **Human Nature & Ideas** — Psychology, philosophy, science and the ideas
   changing how we understand ourselves and the universe.

These three names are the only primary categories. They appear on the homepage
(the "Start Here" pillars), the archive, and each article's category label.

## Tags, not categories

Discipline labels — **Science, AI, Geopolitics, Philosophy, Climate, Psychology,
History**, and similar — are **tags**, never primary categories. Tags live in the
`tags:` frontmatter array; they drive keywords, `article:tag` metadata, JSON-LD,
and the "Related Essays" logic. Use tags freely for the specific entities and
disciplines a reader would search; reserve the three pillars for the primary
lens of the piece.

## The intended reader

One intellectually curious reader: someone who wants to *understand* events
rather than merely keep up with them, who values one argument followed to its
conclusion over hot takes and summaries, and who returns because each essay
reveals something structural beneath the visible surface.

## Recommended content distribution

A guideline for commissioning over time — not a quota to force onto any single
week, and not a reason to misfile an article whose true angle sits elsewhere.

- **Power & Systems:** ~50%
- **History & Economy:** ~30%
- **Human Nature & Ideas:** ~20%

## The editorial test for a new article

> Would the same intellectually curious reader who enjoys our best essays
> reasonably value this article, and does it reveal a deeper system, history,
> human mechanism or consequential idea?

If the answer is no, it does not belong on OmniPonder — regardless of how
interesting the subject is in isolation.

## Where general science fits

General science articles belong **only** when they connect to OmniPonder's
central editorial promise — human understanding, civilization, or a consequential
idea. A cosmology piece earns its place when it is about how we understand the
universe and our place in it (file under **Human Nature & Ideas**); a purely
technical science explainer with no connection to that promise does not.

/**
 * The three editorial pillars — the single source of truth for OmniPonder's
 * category structure. Homepage, archive, article pages, and the editorial guide
 * all read from here, so the taxonomy never drifts between surfaces.
 *
 * `slug` is what `topicSlug()` in lib/markdown.ts produces from `name`
 * ("Power & Systems" → "power-systems"), so archive anchors and the category
 * links on article pages line up without a second mapping.
 */
export type Category = {
  name: string
  slug: string
  description: string
}

export const CATEGORIES: Category[] = [
  {
    name: 'Power & Systems',
    slug: 'power-systems',
    description:
      'Geopolitics, technology, climate, institutions and the forces organizing modern life.',
  },
  {
    name: 'History & Economy',
    slug: 'history-economy',
    description:
      'How empires, trade, money and decisions from the past created the world we live in.',
  },
  {
    name: 'Human Nature & Ideas',
    slug: 'human-nature-ideas',
    description:
      'Psychology, philosophy, science and the ideas changing how we understand ourselves and the universe.',
  },
]

const orderByName = new Map(CATEGORIES.map((category, index) => [category.name, index]))
const descriptionByName = new Map(CATEGORIES.map((category) => [category.name, category.description]))

/** Canonical position of a category, or Infinity for anything outside the set. */
export function categoryOrder(name: string): number {
  return orderByName.get(name) ?? Number.POSITIVE_INFINITY
}

/** The editorial description for a category name, or '' if it is not a pillar. */
export function categoryDescription(name: string): string {
  return descriptionByName.get(name) ?? ''
}

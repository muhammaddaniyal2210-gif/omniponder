import fs from 'fs/promises'
import { existsSync } from 'node:fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

const articlesDirectory = path.join(process.cwd(), 'content', 'articles')

/** Frontmatter plus everything we can derive without parsing the body. */
export type FaqEntry = {
  question: string
  answer: string
}

export type ArticleMeta = {
  slug: string
  title: string
  seoTitle: string
  date: string
  excerpt: string
  topic: string
  tags: string[]
  faq: FaqEntry[]
  wordCount: number
  readingTime: number
}

export type Article = ArticleMeta & {
  contentHtml: string
}

type Frontmatter = Partial<
  Record<'title' | 'seoTitle' | 'date' | 'excerpt' | 'topic' | 'tags' | 'faq', unknown>
>

const WORDS_PER_MINUTE = 220

function countWords(body: string) {
  return body.trim().split(/\s+/).filter(Boolean).length
}

function estimateReadingTime(words: number) {
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

function asString(value: unknown, fallback = '') {
  if (typeof value === 'string') return value
  // gray-matter turns unquoted YAML dates into Date objects.
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return fallback
}

function asTags(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((tag): tag is string => typeof tag === 'string' && tag.trim() !== '')
}

/**
 * FAQ pairs from frontmatter. Rendered on the page *and* emitted as FAQPage
 * structured data — the schema is only legitimate when the questions are
 * visible to readers too, so the two must come from this one source.
 */
function asFaq(value: unknown): FaqEntry[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((entry) => {
    if (typeof entry !== 'object' || entry === null) return []
    const { question, answer } = entry as Record<string, unknown>
    if (typeof question !== 'string' || typeof answer !== 'string') return []
    if (question.trim() === '' || answer.trim() === '') return []
    return [{ question: question.trim(), answer: answer.trim() }]
  })
}

function toMeta(slug: string, data: Frontmatter, body: string): ArticleMeta {
  const tags = asTags(data.tags)
  const wordCount = countWords(body)

  return {
    slug,
    title: asString(data.title, slug),
    // Optional: a shorter, keyword-first <title>/SERP headline. Empty = use title.
    seoTitle: asString(data.seoTitle),
    date: asString(data.date),
    excerpt: asString(data.excerpt),
    // `topic` drives the homepage rail and the archive grouping. Posts may
    // declare it explicitly; otherwise the first tag serves as the subject so
    // a tags-only frontmatter never falls through to "General".
    topic: asString(data.topic, tags[0] ?? 'General'),
    tags,
    faq: asFaq(data.faq),
    wordCount,
    readingTime: estimateReadingTime(wordCount),
  }
}

/** Newest first; entries without a valid date sort last. */
function byDateDesc(a: ArticleMeta, b: ArticleMeta) {
  const at = Date.parse(a.date)
  const bt = Date.parse(b.date)
  if (Number.isNaN(at) && Number.isNaN(bt)) return a.slug.localeCompare(b.slug)
  if (Number.isNaN(at)) return 1
  if (Number.isNaN(bt)) return -1
  // Two pieces sharing a date would otherwise fall back to directory order,
  // making "Today's Read" depend on the filesystem. Break the tie on slug so
  // the hero is deterministic across machines and builds.
  if (at === bt) return a.slug.localeCompare(b.slug)
  return bt - at
}

const publicDir = path.join(process.cwd(), 'public')

/**
 * Markdown images get no build-time existence check, so a placeholder that has
 * not been sourced yet would ship as a broken image. The Dual-Image Protocol
 * makes that the normal state of a fresh article, so instead of trusting the
 * file to be there, swap any missing local image for a reserved frame at the
 * same 16:9 aspect — no broken icon, and no layout shift when the real file
 * lands. Missing paths are reported once per build.
 */
function reserveMissingImages(html: string, slug: string) {
  const missing: string[] = []

  const out = html.replace(
    /<img src="(\/[^"]+)"(?: alt="([^"]*)")?[^>]*>/g,
    (match, src: string, alt = '') => {
      const decoded = decodeURIComponent(src)
      if (existsSync(path.join(publicDir, decoded))) return match

      missing.push(decoded)
      const label = alt || 'Image'
      return (
        `<span class="figure-pending" role="img" aria-label="${label} — image pending">` +
        `<span class="figure-pending-label">Image to follow</span>` +
        `</span>`
      )
    }
  )

  if (missing.length > 0) {
    console.warn(
      `[omniponder] ${slug}: ${missing.length} image(s) not in public/ — ` +
        `reserved frame rendered instead: ${missing.join(', ')}`
    )
  }

  return out
}

async function markdownToHtml(markdown: string, slug: string) {
  const file = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(markdown)
  return reserveMissingImages(String(file), slug)
}

export async function getArticleSlugs(): Promise<string[]> {
  let entries: string[]
  try {
    entries = await fs.readdir(articlesDirectory)
  } catch {
    // No content directory yet — treat as an empty publication rather than crashing the build.
    return []
  }
  return entries.filter((name) => name.endsWith('.md')).map((name) => name.replace(/\.md$/, ''))
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  // Guard against path traversal via the dynamic route segment.
  if (!/^[a-zA-Z0-9-_]+$/.test(slug)) return null

  let raw: string
  try {
    raw = await fs.readFile(path.join(articlesDirectory, `${slug}.md`), 'utf8')
  } catch {
    return null
  }

  const { data, content } = matter(raw)
  return {
    ...toMeta(slug, data as Frontmatter, content),
    contentHtml: await markdownToHtml(content, slug),
  }
}

/** Metadata for every article, newest first. Skips the HTML conversion. */
export async function getAllArticles(): Promise<ArticleMeta[]> {
  const slugs = await getArticleSlugs()
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await fs.readFile(path.join(articlesDirectory, `${slug}.md`), 'utf8')
      const { data, content } = matter(raw)
      return toMeta(slug, data as Frontmatter, content)
    })
  )
  return articles.sort(byDateDesc)
}

export async function getLatestArticle(): Promise<Article | null> {
  const [latest] = await getAllArticles()
  return latest ? getArticleBySlug(latest.slug) : null
}

export function formatDate(date: string) {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export type TopicGroup = {
  topic: string
  slug: string
  articles: ArticleMeta[]
}

/** Turns a topic label into a stable anchor id ("Human Nature" → "human-nature"). */
export function topicSlug(topic: string) {
  return topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Groups articles by topic for the archive index. Topics are ordered by volume
 * (then alphabetically), and each group keeps the newest-first ordering.
 */
export function groupByTopic(articles: ArticleMeta[]): TopicGroup[] {
  const groups = new Map<string, ArticleMeta[]>()

  for (const article of articles) {
    const existing = groups.get(article.topic)
    if (existing) existing.push(article)
    else groups.set(article.topic, [article])
  }

  return [...groups.entries()]
    .map(([topic, items]) => ({ topic, slug: topicSlug(topic), articles: items }))
    .sort((a, b) => b.articles.length - a.articles.length || a.topic.localeCompare(b.topic))
}

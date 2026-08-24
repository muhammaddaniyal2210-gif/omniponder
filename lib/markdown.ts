import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

const articlesDirectory = path.join(process.cwd(), 'content', 'articles')

/** Frontmatter plus everything we can derive without parsing the body. */
export type ArticleMeta = {
  slug: string
  title: string
  date: string
  excerpt: string
  topic: string
  readingTime: number
}

export type Article = ArticleMeta & {
  contentHtml: string
}

type Frontmatter = Partial<Record<'title' | 'date' | 'excerpt' | 'topic', unknown>>

const WORDS_PER_MINUTE = 220

function estimateReadingTime(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

function asString(value: unknown, fallback = '') {
  if (typeof value === 'string') return value
  // gray-matter turns unquoted YAML dates into Date objects.
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return fallback
}

function toMeta(slug: string, data: Frontmatter, body: string): ArticleMeta {
  return {
    slug,
    title: asString(data.title, slug),
    date: asString(data.date),
    excerpt: asString(data.excerpt),
    topic: asString(data.topic, 'General'),
    readingTime: estimateReadingTime(body),
  }
}

/** Newest first; entries without a valid date sort last. */
function byDateDesc(a: ArticleMeta, b: ArticleMeta) {
  const at = Date.parse(a.date)
  const bt = Date.parse(b.date)
  if (Number.isNaN(at) && Number.isNaN(bt)) return a.slug.localeCompare(b.slug)
  if (Number.isNaN(at)) return 1
  if (Number.isNaN(bt)) return -1
  return bt - at
}

async function markdownToHtml(markdown: string) {
  const file = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(markdown)
  return String(file)
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
    contentHtml: await markdownToHtml(content),
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

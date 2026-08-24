/**
 * Canonical origin for the site. Absolute URLs are required by Open Graph —
 * crawlers do not resolve relative paths.
 *
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment (e.g. https://omniponder.com).
 * Vercel exposes VERCEL_PROJECT_PRODUCTION_URL automatically on preview builds.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (vercel) return `https://${vercel}`

  return 'http://localhost:3000'
}

export const siteUrl = resolveSiteUrl()

export const siteConfig = {
  name: 'Omniponder',
  author: 'Muhammad Daniyal',
  title: 'Omniponder | Daily Education',
  description:
    'Exploring science, philosophy, human nature, and global trends daily.',
  url: siteUrl,
} as const

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path: string) {
  return new URL(path, `${siteUrl}/`).toString()
}

type JsonLdProps = {
  /** A schema.org object, or an array of them, to embed on the page. */
  data: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Emits schema.org JSON-LD. Server-rendered, so crawlers see it in the initial
 * HTML rather than after hydration.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Content is built from our own frontmatter, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

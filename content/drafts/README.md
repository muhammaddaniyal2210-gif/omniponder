# Drafts

Markdown here is **not published**. `lib/markdown.ts` only reads
`content/articles/`, so anything in this folder is off the live site, absent
from the sitemap and RSS feed, and its URL returns 404.

To publish a draft, move it back:

```
git mv content/drafts/<slug>.md content/articles/<slug>.md
```

Check for inbound internal links before unpublishing anything, and re-add them
when republishing — a link to an unpublished slug 404s silently.

## Currently held

- `the-vigilance-problem-autonomous-weapons.md` — complete and fully
  illustrated. Unpublished 2026-08-27 to keep to one article per day. Its two
  images remain in `public/images/` (`autonomous-weapons-vigilance.svg`,
  `autonomous-weapons-cockpit.jpg` + `.svg` source), so republishing needs only
  the `git mv` above. Note the piece is pegged to the UN expert group session of
  31 August – 4 September 2026; the framing needs a refresh if it runs later.

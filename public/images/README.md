# Image assets

Files the site expects. Both degrade differently, so read the notes.

## author-profile.jpg — About page portrait

Drop the editor's portrait here as **`author-profile.jpg`**.

The About page checks for this file at build time. Until it exists, the author
block renders a typographic monogram instead — no broken image, no layout shift.
Add the file and redeploy; the photo appears automatically.

Recommended: square or 4:5 portrait, at least 800px on the short edge, colour,
plain background.

## indian-ocean-shipping.jpg — flagship article figure

Referenced from `content/articles/the-indian-ocean-pivot.md`, directly below the
introduction.

**This one does NOT degrade gracefully.** Markdown images are rendered as-is,
with no build-time existence check, so until the file is added the article shows
a broken-image icon with its alt text. Add it before promoting the article.

Recommended: 16:9 landscape, at least 1600px wide.

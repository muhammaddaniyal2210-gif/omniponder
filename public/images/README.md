# Image assets

## author-profile.jpg — About page portrait

Drop the editor's portrait here as **`author-profile.jpg`**.

The About page checks for this file at build time. Until it exists, the author
block renders a typographic monogram instead — no broken image, no layout shift.
Add the file and redeploy; the photo appears automatically.

Recommended: square or 4:5 portrait, at least 800px on the short edge, colour,
plain background.

## seabed-infrastructure.jpg — flagship article figure

Referenced from `content/articles/the-seabed-chokepoint.md`, directly below the
introduction. **Present and rendering.**

This is a hand-authored vector infographic, not a generated photograph. The
source is committed alongside it as `seabed-infrastructure.svg` — edit the SVG
and re-export rather than retouching the JPEG:

```
qlmanage -t -s 1600 -o . seabed-infrastructure.svg
sips -c 900 1600 seabed-infrastructure.svg.png --out cropped.png
sips -s format jpeg -s formatOptions 92 cropped.png --out seabed-infrastructure.jpg
```

The SVG uses a 1600x1600 canvas with the 16:9 composition letterboxed at
`translate(0,350)`, because `qlmanage` fits to height; the centred 900px crop
recovers the artwork exactly.

Note: markdown images get no build-time existence check. If this file is ever
removed, the article renders a broken image — unlike the About portrait.

## onam-celebration.jpg — Onam article figure

Referenced from `content/articles/the-memory-of-utopia-onam.md`, in the section
on the Sadya. **Present and rendering.**

This is a hand-authored vector illustration of an Onam Sadya, not a photograph.
Source committed alongside as `onam-celebration.svg`; edit the SVG and re-export
rather than retouching the JPEG:

```
qlmanage -t -s 1600 -o . onam-celebration.svg
sips -c 900 1600 onam-celebration.svg.png --out crop.png
sips -s format jpeg -s formatOptions 92 crop.png --out onam-celebration.jpg
```

Same 1600x1600 letterbox trick as the seabed figure: the composition sits at
`translate(0,350)` because `qlmanage` fits to height.

Replace it freely with a properly licensed photograph — the alt text and caption
should then be updated to describe the photograph instead.

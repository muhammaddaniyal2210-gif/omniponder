// A page that declares its own `openGraph` metadata replaces the parent object
// entirely, which drops the root opengraph-image. Re-exporting the root card
// into this segment restores it.
export { default, alt, size, contentType } from '../opengraph-image'

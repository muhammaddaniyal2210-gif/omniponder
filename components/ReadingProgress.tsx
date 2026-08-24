'use client'

import { useEffect, useState } from 'react'

type ReadingProgressProps = {
  /**
   * Element to measure. Progress then spans that element's own scroll range
   * rather than the whole document, so the bar completes when the prose ends —
   * not when the footer does. Falls back to the document if absent.
   */
  targetId?: string
}

export default function ReadingProgress({ targetId }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    function measure() {
      frame = 0

      const target = targetId ? document.getElementById(targetId) : null
      const viewport = window.innerHeight

      // Start reading at the top of the target; finish when its last line clears
      // the bottom of the viewport.
      const start = target ? target.getBoundingClientRect().top + window.scrollY : 0
      const end = target
        ? start + target.offsetHeight - viewport
        : document.documentElement.scrollHeight - viewport

      const span = end - start
      const ratio = span <= 0 ? 1 : (window.scrollY - start) / span

      setProgress(Math.min(1, Math.max(0, ratio)))
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [targetId])

  return (
    // Decorative: it restates scroll position, which assistive tech already
    // conveys, so it stays out of the accessibility tree.
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
    >
      <div
        className="h-full origin-left bg-zinc-900"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}

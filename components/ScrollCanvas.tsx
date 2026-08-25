'use client'

import { useEffect, useRef } from 'react'

type ScrollCanvasProps = {
  className?: string
}

/** Ink palette, kept in sync with the tokens in app/globals.css. */
const INK = '23, 22, 20'
const FAINT = '119, 115, 106'

type Point = [number, number, number]

/**
 * A wireframe node lattice on a sphere, projected 3D → 2D by hand.
 *
 * Deliberately not Three.js: this is a decorative element, and a ~600KB WebGL
 * runtime would cost more than the whole rest of the page. Canvas 2D renders it
 * at a fraction of the weight, with no WebGL context to lose and no hydration
 * surface — the element is empty on the server and only ever drawn in an effect.
 */
function buildSphere(count: number): Point[] {
  // Fibonacci distribution — even spacing without polar clustering.
  const golden = Math.PI * (3 - Math.sqrt(5))
  const points: Point[] = []
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2
    const radius = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    points.push([Math.cos(theta) * radius, y, Math.sin(theta) * radius])
  }
  return points
}

function buildEdges(points: Point[], threshold: number): [number, number][] {
  const edges: [number, number][] = []
  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      const dx = points[i][0] - points[j][0]
      const dy = points[i][1] - points[j][1]
      const dz = points[i][2] - points[j][2]
      if (dx * dx + dy * dy + dz * dz < threshold * threshold) edges.push([i, j])
    }
  }
  return edges
}

export default function ScrollCanvas({ className = '' }: ScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const points = buildSphere(150)
    const edges = buildEdges(points, 0.36)

    let width = 0
    let height = 0
    let frame = 0
    let disposed = false
    let eased = 0
    let target = 0

    function readScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function drawFrame(time: number) {
      if (disposed || width === 0) return

      // Ease toward the scroll target so the lattice glides rather than snaps.
      eased += (target - eased) * 0.075

      const drift = motionQuery.matches ? 0 : time * 0.00004
      const rotY = eased * Math.PI * 2.1 + drift
      const rotX = -0.42 + eased * 0.6
      const scale = Math.min(width, height) * 0.38

      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)

      const projected = points.map(([px, py, pz]) => {
        const x1 = px * cosY - pz * sinY
        const z1 = px * sinY + pz * cosY
        const y2 = py * cosX - z1 * sinX
        const z2 = py * sinX + z1 * cosX
        const perspective = 2.8 / (2.8 + z2)
        return {
          x: width / 2 + x1 * scale * perspective,
          y: height / 2 + y2 * scale * perspective,
          depth: z2,
          perspective,
        }
      })

      ctx!.clearRect(0, 0, width, height)

      // Edges first, faded by depth so the far hemisphere recedes.
      ctx!.lineWidth = 1
      for (const [i, j] of edges) {
        const a = projected[i]
        const b = projected[j]
        const depth = (a.depth + b.depth) / 2
        const alpha = 0.055 + (1 - (depth + 1) / 2) * 0.16
        ctx!.strokeStyle = `rgba(${FAINT}, ${alpha.toFixed(3)})`
        ctx!.beginPath()
        ctx!.moveTo(a.x, a.y)
        ctx!.lineTo(b.x, b.y)
        ctx!.stroke()
      }

      // Nodes on top, near ones darker and fractionally larger.
      for (const p of projected) {
        const near = 1 - (p.depth + 1) / 2
        const alpha = 0.16 + near * 0.62
        const radius = 0.9 + p.perspective * 1.15
        ctx!.fillStyle = `rgba(${INK}, ${alpha.toFixed(3)})`
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function render(time: number) {
      drawFrame(time)
      if (!disposed) frame = window.requestAnimationFrame(render)
    }

    function start() {
      if (disposed || frame !== 0) return
      frame = window.requestAnimationFrame(render)
    }

    function stop() {
      if (frame === 0) return
      window.cancelAnimationFrame(frame)
      frame = 0
    }

    // Only animate while the lattice is actually on screen and the tab is in
    // front; otherwise the loop is pure battery cost for something nobody sees.
    let onScreen = false
    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        if (onScreen && !document.hidden) start()
        else stop()
      },
      { rootMargin: '120px' }
    )
    visibility.observe(canvas)

    function handleVisibility() {
      if (!document.hidden && onScreen) start()
      else stop()
    }

    const observer = new ResizeObserver(() => {
      resize()
      drawFrame(0)
    })
    observer.observe(canvas)

    resize()
    readScroll()
    eased = target
    drawFrame(0)

    window.addEventListener('scroll', readScroll, { passive: true })
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      disposed = true
      stop()
      observer.disconnect()
      visibility.disconnect()
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    // Purely decorative: it restates nothing, so it stays out of the a11y tree.
    <canvas ref={canvasRef} aria-hidden="true" className={className} />
  )
}

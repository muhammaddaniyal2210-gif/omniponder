'use client'

import { useEffect, useRef } from 'react'

type HeroFlowCanvasProps = {
  className?: string
}

/** Ink palette, kept in sync with the tokens in app/globals.css. */
const CHARCOAL = '23, 22, 20'
const COPPER = '197, 155, 109'

/**
 * An undulating topographic wave field, projected 3D → 2D by hand.
 *
 * Deliberately not Three.js: a decorative element does not justify a WebGL
 * runtime an order of magnitude heavier than the rest of the page. Canvas 2D
 * draws this at a fraction of the weight, with no GL context to lose.
 */
const COLS_DESKTOP = 46
const ROWS_DESKTOP = 26

export default function HeroFlowCanvas({ className = '' }: HeroFlowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarse = window.matchMedia('(max-width: 767px)')

    let width = 0
    let height = 0
    let frame = 0
    let disposed = false
    let onScreen = false

    let eased = 0
    let target = 0
    let pointerX = 0
    let pointerY = 0
    let pointerTargetX = 0
    let pointerTargetY = 0

    // Node density drops sharply on phones to conserve GPU and battery.
    function grid() {
      const scale = coarse.matches ? 0.3 : 1
      return {
        cols: Math.max(14, Math.round(COLS_DESKTOP * scale)),
        rows: Math.max(9, Math.round(ROWS_DESKTOP * scale)),
      }
    }

    function readScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }

    function onPointer(event: PointerEvent) {
      if (coarse.matches) return
      pointerTargetX = (event.clientX / window.innerWidth - 0.5) * 2
      pointerTargetY = (event.clientY / window.innerHeight - 0.5) * 2
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

      // Ease toward the scroll target so the field glides rather than snaps.
      eased += (target - eased) * 0.06
      pointerX += (pointerTargetX - pointerX) * 0.05
      pointerY += (pointerTargetY - pointerY) * 0.05

      const drift = motionQuery.matches ? 0 : time * 0.00022
      const { cols, rows } = grid()

      // A receding plane rather than a freely rotated one: rows march from a
      // horizon toward the viewer, each scaled by its depth. Far more legible
      // as terrain than a full 3D rotation, and it cannot fold onto itself.
      const amplitude = (1 - eased * 0.6) * height * 0.16
      const horizon = height * (0.30 + eased * 0.12) + pointerY * height * 0.02
      const fieldDepth = height * (0.62 - eased * 0.10)
      const nearWidth = width * 1.16
      // A gentle convergence only — hard perspective reads as a cone, not terrain.
      const farWidth = nearWidth * (0.66 + eased * 0.10)

      type P = { x: number; y: number; near: number; lift: number }
      const points: P[][] = []

      for (let r = 0; r < rows; r += 1) {
        // 0 = far horizon, 1 = nearest the reader.
        const near = rows === 1 ? 1 : r / (rows - 1)
        // Mild easing spaces far rows tighter without bunching them to a point.
        const depth = Math.pow(near, 1.45)
        const rowWidth = farWidth + (nearWidth - farWidth) * depth
        const baseY = horizon + fieldDepth * depth
        const row: P[] = []

        for (let c = 0; c < cols; c += 1) {
          const u = cols === 1 ? 0 : c / (cols - 1) - 0.5

          // Two crossed sine trains — enough interference to read as terrain.
          const lift =
            Math.sin(u * 7.4 + drift + near * 2.6) * 0.62 +
            Math.sin(near * 5.2 - drift * 0.8 + u * 3.4) * 0.38

          row.push({
            x: width / 2 + u * rowWidth + pointerX * width * 0.03 * depth,
            y: baseY - lift * amplitude * (0.35 + depth * 0.65),
            near,
            lift,
          })
        }
        points.push(row)
      }

      ctx!.clearRect(0, 0, width, height)
      ctx!.lineWidth = 1

      // Contour lines running with the flow.
      for (let r = 0; r < rows; r += 1) {
        // Nearer rows read darker, giving the field depth.
        const nearness = points[r][0].near
        ctx!.strokeStyle = `rgba(${CHARCOAL}, ${(0.05 + nearness * 0.22).toFixed(3)})`
        ctx!.beginPath()
        for (let c = 0; c < cols; c += 1) {
          const p = points[r][c]
          if (c === 0) ctx!.moveTo(p.x, p.y)
          else ctx!.lineTo(p.x, p.y)
        }
        ctx!.stroke()
      }

      // Sparser cross-lines give the mesh its topographic read.
      const step = coarse.matches ? 4 : 3
      for (let c = 0; c < cols; c += step) {
        ctx!.strokeStyle = `rgba(${CHARCOAL}, 0.07)`
        ctx!.beginPath()
        for (let r = 0; r < rows; r += 1) {
          const p = points[r][c]
          if (r === 0) ctx!.moveTo(p.x, p.y)
          else ctx!.lineTo(p.x, p.y)
        }
        ctx!.stroke()
      }

      // Copper nodes mark the crests only — accent, not decoration everywhere.
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const p = points[r][c]
          if (p.lift < 0.72) continue
          const alpha = 0.18 + p.near * 0.55
          ctx!.fillStyle = `rgba(${COPPER}, ${alpha.toFixed(3)})`
          ctx!.beginPath()
          ctx!.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
          ctx!.fill()
        }
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

    function syncRunState() {
      if (onScreen && !document.hidden) start()
      else stop()
    }

    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        syncRunState()
      },
      { rootMargin: '140px' }
    )
    visibility.observe(canvas)

    const observer = new ResizeObserver(() => {
      resize()
      // Repaint synchronously so a breakpoint change never flashes empty.
      drawFrame(0)
    })
    observer.observe(canvas)

    resize()
    readScroll()
    eased = target
    // Frame 0, painted before the loop is ever scheduled.
    drawFrame(0)

    window.addEventListener('scroll', readScroll, { passive: true })
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.addEventListener('visibilitychange', syncRunState)

    return () => {
      disposed = true
      stop()
      observer.disconnect()
      visibility.disconnect()
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', syncRunState)
    }
  }, [])

  // Purely decorative: it restates nothing, so it stays out of the a11y tree.
  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}

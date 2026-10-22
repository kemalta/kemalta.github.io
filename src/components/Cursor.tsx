import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/quality'
import { getState } from '../lib/store'

/**
 * A custom cursor that follows the pointer with damping and reacts to
 * interactive elements. It is skipped entirely on touch devices and when the
 * visitor asked for reduced motion.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      !prefersReducedMotion() &&
      window.matchMedia('(pointer: fine)').matches,
  )

  useEffect(() => {
    if (!enabled) return

    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    let raf = 0
    let ringX = window.innerWidth / 2
    let ringY = window.innerHeight / 2
    let dotX = ringX
    let dotY = ringY
    let visible = false

    const tick = () => {
      const { pointerPx, pointerActive } = getState()

      ringX += (pointerPx.x - ringX) * 0.16
      ringY += (pointerPx.y - ringY) * 0.16
      dotX += (pointerPx.x - dotX) * 0.42
      dotY += (pointerPx.y - dotY) * 0.42

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${pointerActive ? 1.7 : 1})`
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`

      raf = requestAnimationFrame(tick)
    }

    const onEnter = () => {
      visible = true
      ring.style.opacity = '1'
      dot.style.opacity = '1'
    }

    const onLeave = () => {
      visible = false
      ring.style.opacity = '0'
      dot.style.opacity = '0'
    }

    window.addEventListener('pointerenter', onEnter)
    document.addEventListener('pointerleave', onLeave)
    onEnter()
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointerenter', onEnter)
      document.removeEventListener('pointerleave', onLeave)
      if (!visible) onLeave()
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] h-8 w-8 rounded-full border border-signal/50 opacity-0 mix-blend-difference"
        style={{ transition: 'opacity 240ms ease, transform 40ms linear' }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] h-1.5 w-1.5 rounded-full bg-signal opacity-0"
        style={{ transition: 'opacity 240ms ease' }}
      />
    </>
  )
}

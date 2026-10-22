import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/quality'

/**
 * Pulls an element a few pixels towards the pointer. Uses the individual
 * `translate` property rather than `transform`, so Tailwind hover transforms
 * on the same element keep working.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 10) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let x = 0
    let y = 0

    const animate = () => {
      x += (targetX - x) * 0.16
      y += (targetY - y) * 0.16
      el.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`
      if (Math.abs(targetX - x) < 0.05 && Math.abs(targetY - y) < 0.05) {
        raf = 0
        return
      }
      raf = requestAnimationFrame(animate)
    }

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      targetX = ((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * strength
      targetY = ((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * strength
      if (!raf) raf = requestAnimationFrame(animate)
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      if (!raf) raf = requestAnimationFrame(animate)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('blur', onLeave)

    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('blur', onLeave)
      cancelAnimationFrame(raf)
      el.style.translate = ''
    }
  }, [strength])

  return ref
}

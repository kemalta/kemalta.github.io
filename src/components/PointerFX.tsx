import { useEffect } from 'react'

/**
 * Publishes the pointer position to the card under the cursor as `--mx` and
 * `--my`, which the `.surface::after` spotlight reads. One listener for the
 * whole page, throttled to a frame, and no state — moving the mouse never
 * triggers a React render.
 */
export function PointerFX() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    let frame = 0
    let x = 0
    let y = 0

    const apply = () => {
      frame = 0
      const target = document.elementFromPoint(x, y)
      const card = target?.closest('.surface')
      if (!(card instanceof HTMLElement)) return

      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${x - rect.left}px`)
      card.style.setProperty('--my', `${y - rect.top}px`)
    }

    const onMove = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY
      if (!frame) frame = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return null
}

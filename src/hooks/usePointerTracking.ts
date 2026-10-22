import { useEffect } from 'react'
import { setState } from '../lib/store'

/**
 * Global pointer tracking, written straight into the external store.
 * The 3D scene reads it inside `useFrame`, so moving the mouse never
 * triggers a React render.
 */
export function usePointerTracking() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const x = event.clientX
      const y = event.clientY
      setState({
        pointer: {
          x: (x / window.innerWidth) * 2 - 1,
          y: -((y / window.innerHeight) * 2 - 1),
        },
        pointerPx: { x, y },
      })
    }

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      const interactive = target?.closest('a, button, input, textarea, [data-interactive]')
      setState({ pointerActive: Boolean(interactive) })
    }

    const onLeave = () => {
      setState({ pointer: { x: 0, y: 0 }, pointerActive: false })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])
}

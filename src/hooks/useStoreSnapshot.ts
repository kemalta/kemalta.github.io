import { useEffect, useState } from 'react'
import { getState } from '../lib/store'
import type { SceneState } from '../lib/store'

/**
 * Samples the motion store at a fixed interval and returns one derived value.
 * Re-renders only when the selected value actually changes, so scroll-heavy
 * state never drives frame-rate renders.
 */
export function useStoreSnapshot<T>(
  select: (state: SceneState) => T,
  interval = 150,
): T {
  const [value, setValue] = useState<T>(() => select(getState()))

  useEffect(() => {
    const id = window.setInterval(() => {
      const next = select(getState())
      setValue((prev) => (Object.is(prev, next) ? prev : next))
    }, interval)
    return () => window.clearInterval(id)
  }, [select, interval])

  return value
}

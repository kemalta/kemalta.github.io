import { useEffect, useState } from 'react'
import { getState, setState } from '../lib/store'
import { prefersReducedMotion } from '../lib/quality'

/**
 * Measures the real frame rate of the page and publishes it to the store.
 * The HUD reads the value; nothing else depends on it.
 */
export function useFpsMeter() {
  const [enabled] = useState(() => !prefersReducedMotion())

  useEffect(() => {
    if (!enabled) return

    let raf = 0
    let frames = 0
    let last = performance.now()
    let window_ = 0

    const tick = (now: number) => {
      frames += 1
      const delta = now - last

      if (now - window_ >= 500) {
        const fps = Math.round((frames * 1000) / (now - window_))
        setState({ fps })
        frames = 0
        window_ = now
      }

      last = delta
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [enabled])
}

/**
 * A fixed readout panel — the kind of thing an operations screen shows.
 * Values are sampled at 8 Hz so React never re-renders at frame rate.
 */
export function HUD() {
  const [snapshot, setSnapshot] = useState(() => getState())

  useEffect(() => {
    const id = window.setInterval(() => setSnapshot({ ...getState() }), 125)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div
      className="pointer-events-none fixed bottom-4 left-4 z-40 hidden select-none font-mono text-[10px] leading-[1.55] tracking-[0.14em] text-muted uppercase md:block"
      aria-hidden="true"
    >
      <div className="rounded-xl border border-line/80 bg-void/70 px-3.5 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2 text-phosphor">
          <span className="pulse-dot" />
          <span className="text-ink-dim">KTE::RUNTIME</span>
        </div>
        <div className="mt-2 grid grid-cols-[auto_auto] gap-x-4 gap-y-0.5">
          <span>fps</span>
          <span className="text-right text-ink-dim tabular-nums">{snapshot.fps}</span>
          <span>scroll</span>
          <span className="text-right text-ink-dim tabular-nums">
            {(snapshot.progress * 100).toFixed(1)}%
          </span>
          <span>section</span>
          <span className="text-right text-ink-dim">#{snapshot.activeSection}</span>
          <span>pointer</span>
          <span className="text-right text-ink-dim tabular-nums">
            {snapshot.pointer.x.toFixed(2)} {snapshot.pointer.y.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

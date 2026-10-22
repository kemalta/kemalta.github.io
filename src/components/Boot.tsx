import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'

interface BootProps {
  /** True once the scene (or the static poster) is ready to be shown. */
  ready: boolean
  onDone: () => void
}

/**
 * Boot sequence. It is not decoration: the progress bar tracks real work —
 * font loading, the 3D chunk and the first rendered frame — and the overlay
 * only lifts once all of them have finished.
 */
export function Boot({ ready, onDone }: BootProps) {
  const { c } = useI18n()
  const [visibleLines, setVisibleLines] = useState(0)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const doneRef = useRef(false)

  /* type the boot log */
  useEffect(() => {
    if (visibleLines >= c.boot.lines.length) return
    const id = window.setTimeout(
      () => setVisibleLines((n) => n + 1),
      110 + visibleLines * 40,
    )
    return () => window.clearTimeout(id)
  }, [visibleLines, c.boot.lines.length])

  /* progress: creeps towards 92 % on its own, then completes when ready */
  useEffect(() => {
    if (ready) return
    const id = window.setInterval(() => {
      setProgress((p) => (p >= 92 ? p : p + (92 - p) * 0.08 + 0.4))
    }, 60)
    return () => window.clearInterval(id)
  }, [ready])

  const shown = ready ? 100 : progress

  useEffect(() => {
    if (!ready || doneRef.current) return
    doneRef.current = true

    const exit = window.setTimeout(() => setExiting(true), 520)
    const remove = window.setTimeout(onDone, 1500)
    return () => {
      window.clearTimeout(exit)
      window.clearTimeout(remove)
    }
  }, [ready, onDone])

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-void px-5 py-6 transition-[opacity,transform] duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] sm:px-10 sm:py-10"
      style={{
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'translate3d(0,-2%,0)' : 'none',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
      role="status"
      aria-live="polite"
    >
      <div className="boot-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <span
        className="pointer-events-none absolute -right-8 bottom-6 select-none font-[family-name:var(--font-display)] text-[22vw] leading-none text-ink/[0.03]"
        aria-hidden="true"
      >
        KT
      </span>

      <div className="relative flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
        <span>kemaltalhaekici</span>
        <span>v1.0 — 2026</span>
      </div>

      <div className="frame relative mx-auto w-full max-w-2xl">
        <ul className="space-y-1 font-mono text-[11px] leading-relaxed text-muted sm:text-xs">
          {c.boot.lines.map((line, index) => (
            <li
              key={line}
              className="flex items-baseline gap-3 transition-opacity duration-500"
              style={{ opacity: index < visibleLines ? 1 : 0 }}
            >
              <span className="w-5 shrink-0 text-right text-faint">
                {index < visibleLines ? '›' : ''}
              </span>
              <span className={index === 0 ? 'text-ink-dim' : ''}>{line}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center gap-[3px]" aria-hidden="true">
          {Array.from({ length: 48 }, (_, index) => {
            const lit = index < Math.round((Math.min(100, shown) / 100) * 48)
            return (
              <span
                key={index}
                className={`h-1.5 flex-1 transition-colors duration-150 ${
                  lit ? 'bg-signal' : 'bg-line'
                }`}
              />
            )
          })}
        </div>

        <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase">
          <span className="text-faint">{c.boot.hint}</span>
          <span className="tabular-nums text-signal">
            {ready ? c.boot.ready : `${Math.round(shown)}%`}
          </span>
        </div>
      </div>

      <div className="relative flex items-end justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
          ICT RUNTIME
        </span>
        <span className="hidden font-mono text-[10px] tracking-[0.2em] text-faint uppercase sm:block">
          React · Three.js · GSAP
        </span>
      </div>
    </div>
  )
}

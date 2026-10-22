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
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-void px-5 py-6 transition-[opacity,transform] duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] sm:px-10 sm:py-10"
      style={{
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'translate3d(0,-2%,0)' : 'none',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
        <span>kemaltalhaekici</span>
        <span>v1.0 — 2026</span>
      </div>

      <div className="mx-auto w-full max-w-2xl">
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

        <div className="mt-8 h-px w-full overflow-hidden bg-line">
          <div
            className="h-full bg-gradient-to-r from-signal to-phosphor transition-[width] duration-200 ease-out"
            style={{ width: `${Math.min(100, shown)}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase">
          <span className="text-faint">{c.boot.hint}</span>
          <span className="tabular-nums text-signal">
            {ready ? c.boot.ready : `${Math.round(shown)}%`}
          </span>
        </div>
      </div>

      <div className="flex items-end justify-between">
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

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/quality'

const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/<>#*+=%'

interface DecodeTextProps {
  text: string
  className?: string
}

/**
 * A short "decode" pass: the label resolves from random glyphs into the real
 * string the first time it enters the viewport. The animated copy is hidden
 * from assistive tech and a screen-reader-only copy carries the real text, so
 * nothing about the page's semantics depends on the animation.
 */
export function DecodeText({ text, className }: DecodeTextProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.textContent = text
    if (prefersReducedMotion() || text.length === 0) return

    let raf = 0
    let started = 0
    let stopped = false

    const frame = (now: number) => {
      if (stopped) return
      if (!started) started = now

      const progress = Math.min(1, (now - started) / 640)
      if (progress >= 1) {
        el.textContent = text
        return
      }

      const resolved = Math.floor(progress * text.length)
      let out = ''
      for (let i = 0; i < text.length; i += 1) {
        const char = text[i]
        out +=
          i < resolved || char === ' '
            ? char
            : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      el.textContent = out
      raf = requestAnimationFrame(frame)
    }

    let startTimer = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        startTimer = window.setTimeout(() => {
          raf = requestAnimationFrame(frame)
        }, 120)
      },
      { threshold: 0.6 },
    )

    observer.observe(el)

    return () => {
      stopped = true
      observer.disconnect()
      window.clearTimeout(startTimer)
      cancelAnimationFrame(raf)
    }
  }, [text])

  return (
    <>
      <span ref={ref} className={className} aria-hidden="true" />
      <span className="sr-only">{text}</span>
    </>
  )
}

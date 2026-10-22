import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { useI18n } from '../i18n'
import { profile } from '../content'
import { useClock } from '../hooks/useClock'
import { useMagnetic } from '../hooks/useMagnetic'
import { scrollToId } from '../lib/scrollTo'
import { prefersReducedMotion } from '../lib/quality'
import { SplitText } from './SplitText'
import { useReveal } from '../hooks/useReveal'

const BARS = Array.from({ length: 30 }, (_, index) => index)

/** Purely decorative load readout in the status panel. */
function ActivityBars() {
  return (
    <span className="activity" aria-hidden="true">
      {BARS.map((index) => (
        <i
          key={index}
          style={
            {
              '--i': `${(index % 9) * 140}ms`,
              height: `${32 + ((index * 37) % 62)}%`,
            } as CSSProperties
          }
        />
      ))}
    </span>
  )
}

export function Hero({ revealed }: { revealed: boolean }) {
  const { c } = useI18n()
  const clock = useClock()
  const ref = useReveal<HTMLElement>()
  const ctaRef = useMagnetic<HTMLButtonElement>(8)
  const [hintVisible, setHintVisible] = useState(false)
  const hintRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const nameParts = profile.name.split(' ')
  const firstName = nameParts.slice(0, -1).join(' ')
  const lastName = nameParts[nameParts.length - 1]
  const lastNameDelay = 260 + firstName.length * 20 + 90

  useEffect(() => {
    if (!revealed) return
    const id = window.setTimeout(() => setHintVisible(true), 1500)
    return () => window.clearTimeout(id)
  }, [revealed])

  /* A soft light follows the pointer across the hero. Transform-only, so it
     never touches layout; skipped on touch and for reduced motion. */
  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return
    if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return

    const host = glow.parentElement
    if (!host) return

    let raf = 0
    let x = 0
    let y = 0

    const place = (px: number, py: number) => {
      x = px
      y = py
      glow.style.transform = `translate3d(calc(${px}px - 50%), calc(${py}px - 50%), 0)`
    }

    const initial = host.getBoundingClientRect()
    place(initial.width * 0.38, initial.height * 0.45)
    glow.dataset.on = 'true'

    const apply = () => {
      raf = 0
      glow.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`
    }

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      x = event.clientX - rect.left
      y = event.clientY - rect.top
      if (!raf) raf = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  const fade = (delay: number, distance = 14): CSSProperties => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'none' : `translateY(${distance}px)`,
    transition: `opacity 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  return (
    <section
      id="hero"
      data-section="hero"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24 sm:pt-32"
    >
      <div ref={glowRef} className="hero-glow" aria-hidden="true" />
      <div className="shell w-full">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          {/* left column — the copy */}
          <div className="frame lg:col-span-7 xl:col-span-6">
            <div
              className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-phosphor uppercase"
              style={fade(120, 10)}
            >
              <span className="pulse-dot" />
              {c.hero.eyebrow}
              <span className="ml-1 hidden h-px w-10 bg-phosphor/30 sm:block" />
            </div>

            <h1
              className="glitch mt-7 font-[family-name:var(--font-display)] text-[clamp(3.4rem,10.4vw,9rem)] leading-[0.84] tracking-[-0.035em] text-ink"
              data-revealed={revealed}
              aria-label={profile.name}
            >
              <span className="block">
                <SplitText text={firstName} step={20} delay={260} />
              </span>
              <span className="block italic text-ink/90">
                <SplitText text={lastName} step={26} delay={lastNameDelay} />
              </span>
            </h1>

            <span
              aria-hidden="true"
              className="mt-8 block h-px w-20 origin-left bg-gradient-to-r from-signal to-transparent"
              style={{
                transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 1100ms cubic-bezier(0.16,1,0.3,1) 780ms',
              }}
            />

            <div
              className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] tracking-[0.18em] text-faint uppercase"
              style={fade(620, 12)}
            >
              {c.hero.roleLine.split(' · ').map((role, index) => (
                <span key={role} className="flex items-center gap-3">
                  {index > 0 ? <span className="text-signal/70">/</span> : null}
                  {role}
                </span>
              ))}
            </div>

            <p
              className="mt-8 max-w-xl text-[16px] leading-[1.65] text-ink-dim sm:text-[17px]"
              style={fade(760, 16)}
            >
              {c.hero.lead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3" style={fade(880, 16)}>
              <button
                ref={ctaRef}
                type="button"
                onClick={() => scrollToId('projects')}
                className="group relative overflow-hidden rounded-xl bg-signal px-7 py-3.5 font-mono text-[12px] tracking-[0.14em] text-void uppercase transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {c.hero.primaryCta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
                <span className="absolute inset-0 translate-y-full bg-signal-soft transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              </button>

              <button
                type="button"
                onClick={() => scrollToId('contact')}
                className="group relative overflow-hidden rounded-xl border border-line px-7 py-3.5 font-mono text-[12px] tracking-[0.14em] text-ink uppercase transition-colors duration-300 hover:border-signal/50"
              >
                <span className="relative z-10">{c.hero.secondaryCta}</span>
              </button>
            </div>
          </div>

          {/* right column — readouts */}
          <div className="lg:col-span-5 lg:col-start-8 xl:col-span-5 xl:col-start-8">
            <div className="frame">
              <div
                className="overflow-hidden rounded-2xl border border-line bg-void/60 backdrop-blur-md"
                style={fade(700, 20)}
              >
                <div className="flex items-center justify-between border-b border-line px-5 py-3">
                  <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                    <span className="pulse-dot" />
                    KTE::STATUS
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                    {profile.shortName}
                  </span>
                </div>

                <dl className="grid grid-cols-2 gap-px bg-line/60">
                  <div className="bg-void/80 p-5">
                    <dt className="label">{c.hero.metaLabels.location}</dt>
                    <dd className="mt-2 text-[15px] text-ink">{profile.location}</dd>
                  </div>
                  <div className="bg-void/80 p-5">
                    <dt className="label">{c.hero.metaLabels.time}</dt>
                    <dd className="mt-2 font-mono text-[15px] tabular-nums text-phosphor">
                      {clock}
                    </dd>
                  </div>
                  <div className="bg-void/80 p-5">
                    <dt className="label">{c.hero.metaLabels.status}</dt>
                    <dd className="mt-2 flex items-center gap-2 text-[15px] text-ink">
                      <span className="pulse-dot" />
                      {c.hero.availability}
                    </dd>
                  </div>
                  <div className="bg-void/80 p-5">
                    <dt className="label">{c.hero.metaLabels.languages}</dt>
                    <dd className="mt-2 text-[15px] text-ink">{c.hero.languages}</dd>
                  </div>
                </dl>

                <div className="flex items-end justify-between gap-4 border-t border-line px-5 py-4">
                  <ActivityBars />
                  <span className="mb-1 font-mono text-[9px] tracking-[0.2em] text-faint uppercase">
                    SYS.OK
                  </span>
                </div>
              </div>
            </div>

            <div
              className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[11px] text-faint"
              style={fade(820, 12)}
            >
              <a
                href={`mailto:${profile.email}`}
                className="transition-colors duration-300 hover:text-signal"
              >
                {profile.email}
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-signal"
              >
                {profile.linkedin}
              </a>
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-phosphor"
              >
                {profile.instagram}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div
        ref={hintRef}
        className="pointer-events-none absolute inset-x-0 bottom-7 flex justify-center"
        style={{
          opacity: hintVisible ? 1 : 0,
          transform: hintVisible ? 'none' : 'translateY(8px)',
          transition: 'opacity 700ms ease, transform 700ms cubic-bezier(0.16,1,0.3,1)',
        }}
        aria-hidden="true"
      >
        <span className="flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-faint uppercase">
          {c.hero.scrollHint}
          <span className="relative block h-10 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 h-4 animate-[scroll-hint_2s_ease-in-out_infinite] bg-signal" />
          </span>
        </span>
      </div>
    </section>
  )
}

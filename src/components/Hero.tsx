import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { profile } from '../content'
import { useClock } from '../hooks/useClock'
import { scrollToId } from '../lib/scrollTo'
import { SplitText } from './SplitText'
import { useReveal } from '../hooks/useReveal'

export function Hero({ revealed }: { revealed: boolean }) {
  const { c } = useI18n()
  const clock = useClock()
  const ref = useReveal<HTMLElement>()
  const [hintVisible, setHintVisible] = useState(false)
  const hintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!revealed) return
    const id = window.setTimeout(() => setHintVisible(true), 1500)
    return () => window.clearTimeout(id)
  }, [revealed])

  return (
    <section
      id="hero"
      data-section="hero"
      ref={ref}
      className="relative flex min-h-[100svh] items-center pt-28 pb-20 sm:pt-32"
    >
      <div className="shell w-full">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          {/* left column — the copy */}
          <div className="lg:col-span-7 xl:col-span-6">
            <div
              className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-phosphor uppercase"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'none' : 'translateY(10px)',
                transition: 'opacity 800ms cubic-bezier(0.16,1,0.3,1) 120ms, transform 800ms cubic-bezier(0.16,1,0.3,1) 120ms',
              }}
            >
              <span className="pulse-dot" />
              {c.hero.eyebrow}
            </div>

            <h1
              className="mt-7 font-[family-name:var(--font-display)] text-[clamp(3.4rem,11vw,9.5rem)] leading-[0.86] tracking-[-0.03em] text-ink"
              data-revealed={revealed}
            >
              <SplitText text={profile.name} step={22} delay={260} className="block" />
            </h1>

            <div
              className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] tracking-[0.18em] text-faint uppercase"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'none' : 'translateY(12px)',
                transition: 'opacity 800ms cubic-bezier(0.16,1,0.3,1) 620ms, transform 800ms cubic-bezier(0.16,1,0.3,1) 620ms',
              }}
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
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'none' : 'translateY(16px)',
                transition: 'opacity 900ms cubic-bezier(0.16,1,0.3,1) 760ms, transform 900ms cubic-bezier(0.16,1,0.3,1) 760ms',
              }}
            >
              {c.hero.lead}
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-3"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'none' : 'translateY(16px)',
                transition: 'opacity 900ms cubic-bezier(0.16,1,0.3,1) 880ms, transform 900ms cubic-bezier(0.16,1,0.3,1) 880ms',
              }}
            >
              <button
                type="button"
                onClick={() => scrollToId('projects')}
                className="group relative overflow-hidden rounded-xl bg-signal px-7 py-3.5 font-mono text-[12px] tracking-[0.14em] text-void uppercase transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="relative z-10">{c.hero.primaryCta}</span>
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
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line/60">
              <div className="bg-void/80 p-5 backdrop-blur-sm">
                <dt className="label">{c.hero.metaLabels.location}</dt>
                <dd className="mt-2 text-[15px] text-ink">{profile.location}</dd>
              </div>
              <div className="bg-void/80 p-5 backdrop-blur-sm">
                <dt className="label">{c.hero.metaLabels.time}</dt>
                <dd className="mt-2 font-mono text-[15px] tabular-nums text-phosphor">
                  {clock}
                </dd>
              </div>
              <div className="bg-void/80 p-5 backdrop-blur-sm">
                <dt className="label">{c.hero.metaLabels.status}</dt>
                <dd className="mt-2 flex items-center gap-2 text-[15px] text-ink">
                  <span className="pulse-dot" />
                  {c.hero.availability}
                </dd>
              </div>
              <div className="bg-void/80 p-5 backdrop-blur-sm">
                <dt className="label">{c.hero.metaLabels.languages}</dt>
                <dd className="mt-2 text-[15px] text-ink">{c.hero.languages}</dd>
              </div>
            </dl>

            <p className="mt-6 font-mono text-[11px] leading-relaxed text-faint">
              {profile.email}
              <br />
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-phosphor"
              >
                {profile.instagram}
              </a>
            </p>
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

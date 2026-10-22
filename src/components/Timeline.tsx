import { useI18n } from '../i18n'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './SectionHeader'
import { accentStyle } from '../lib/styles'

export function Timeline() {
  const { c } = useI18n()
  const ref = useReveal<HTMLElement>()

  return (
    <section
      id="timeline"
      data-section="timeline"
      ref={ref}
      className="relative py-28 sm:py-36"
    >
      <div className="shell">
        <SectionHeader
          kicker={c.timeline.kicker}
          title={c.timeline.title}
          intro={c.timeline.intro}
        />

        <ol className="mt-16 border-t border-line">
          {c.timeline.items.map((entry, index) => (
            <li
              key={entry.id}
              data-reveal
              style={accentStyle(entry.accent)}
              className="group relative grid gap-5 border-b border-line py-9 transition-colors duration-500 hover:bg-panel/30 sm:py-11 lg:grid-cols-12 lg:items-start lg:gap-8 lg:px-4"
            >
              {/* accent rail that grows on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-[var(--accent)] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
              />

              <div className="lg:col-span-3">
                <span className="font-mono text-[12px] tracking-[0.12em] text-[var(--accent)] tabular-nums">
                  {entry.period}
                </span>
                <span className="mt-3 hidden h-px w-10 bg-[var(--accent)]/40 lg:block" />
              </div>

              <div className="relative lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
                <span
                  className="absolute -left-[5px] top-1.5 hidden h-2.5 w-2.5 rounded-full border border-line bg-void transition-all duration-500 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] lg:block"
                  aria-hidden="true"
                />
                <h3 className="text-[20px] leading-snug tracking-tight text-ink sm:text-[22px]">
                  {entry.role}
                </h3>
                <p className="mt-2 inline-block border border-line px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
                  {entry.org}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-muted">
                  {entry.summary}
                </p>
              </div>

              <ul className="space-y-2.5 lg:col-span-5">
                {entry.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-[14px] leading-relaxed text-ink-dim"
                  >
                    <span
                      className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]/70"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              <span
                aria-hidden="true"
                className="absolute right-0 top-8 hidden font-mono text-[10px] tracking-[0.2em] text-faint/40 transition-colors duration-500 group-hover:text-[var(--accent)]/70 lg:block"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

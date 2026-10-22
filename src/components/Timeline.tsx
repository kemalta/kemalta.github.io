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
              className="group relative grid gap-4 border-b border-line py-8 transition-colors duration-500 hover:bg-panel/40 sm:py-10 lg:grid-cols-12 lg:gap-8 lg:px-4"
            >
              {/* marker */}
              <span
                className="absolute left-0 top-10 hidden h-2 w-2 -translate-x-[5px] rounded-full bg-line transition-colors duration-500 group-hover:bg-[var(--accent)] lg:block"
                aria-hidden="true"
              />

              <div className="lg:col-span-3">
                <span className="font-mono text-[12px] tracking-[0.12em] text-[var(--accent)] tabular-nums">
                  {entry.period}
                </span>
              </div>

              <div className="lg:col-span-4">
                <h3 className="text-[20px] leading-snug tracking-tight text-ink sm:text-[22px]">
                  {entry.role}
                </h3>
                <p className="mt-1.5 font-mono text-[11px] tracking-[0.12em] text-faint uppercase">
                  {entry.org}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-muted">
                  {entry.summary}
                </p>
              </div>

              <ul className="space-y-2.5 lg:col-span-5">
                {entry.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[14px] leading-relaxed text-ink-dim">
                    <span
                      className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]/70"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              <span className="absolute right-0 top-8 hidden font-mono text-[10px] tracking-[0.2em] text-faint/50 lg:block">
                {String(index + 1).padStart(2, '0')}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

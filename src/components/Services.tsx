import { useI18n } from '../i18n'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './SectionHeader'
import { accentStyle } from '../lib/styles'
import { scrollToId } from '../lib/scrollTo'

export function Services() {
  const { c } = useI18n()
  const ref = useReveal<HTMLElement>()

  return (
    <section
      id="services"
      data-section="services"
      ref={ref}
      className="relative py-28 sm:py-36"
    >
      <div className="shell">
        <SectionHeader
          kicker={c.services.kicker}
          title={c.services.title}
          intro={c.services.intro}
        />

        <div className="mt-14 grid gap-3 lg:grid-cols-2">
          {c.services.items.map((service) => (
            <article
              key={service.id}
              data-reveal
              style={accentStyle(service.accent)}
              className="surface group relative flex flex-col overflow-hidden p-7 sm:p-9"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/60 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="card-index" aria-hidden="true">
                {service.index}
              </span>

              <div
                className="pointer-events-none absolute -left-16 -bottom-24 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30"
                style={{ background: 'var(--accent)' }}
              />

              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] text-faint">
                  {service.index}
                </span>
                <span className="rounded-md border border-line px-2.5 py-1 font-mono text-[9px] tracking-[0.14em] text-faint uppercase">
                  {service.engagement}
                </span>
              </div>

              <h3 className="relative mt-6 text-[24px] leading-tight tracking-tight text-ink sm:text-[28px]">
                {service.title}
              </h3>

              <p className="relative mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
                {service.summary}
              </p>

              <ul className="relative mt-7 grid gap-2.5 border-t border-line pt-6 sm:grid-cols-3">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[11px] leading-relaxed text-ink-dim"
                  >
                    <span
                      className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-1px] bg-[var(--accent)]/70"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div data-reveal className="mt-10">
          <button
            type="button"
            onClick={() => scrollToId('contact')}
            className="group inline-flex items-center gap-3 rounded-xl border border-line bg-panel px-7 py-3.5 font-mono text-[12px] tracking-[0.14em] text-ink uppercase transition-colors duration-300 hover:border-signal/60 hover:text-signal"
          >
            {c.services.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

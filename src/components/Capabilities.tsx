import { useI18n } from '../i18n'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './SectionHeader'
import { accentStyle } from '../lib/styles'
import { setState } from '../lib/store'

const SPAN_CLASS: Record<string, string> = {
  normal: 'lg:col-span-1 lg:row-span-1',
  wide: 'lg:col-span-2 lg:row-span-1',
  tall: 'lg:col-span-1 lg:row-span-2',
}

export function Capabilities() {
  const { c } = useI18n()
  const ref = useReveal<HTMLElement>(90)

  const onEnter = (id: string, accent: string) => {
    setState({ activeDomain: id, accent: accent as never })
  }

  const onLeave = () => {
    setState({ activeDomain: null, accent: 'signal' })
  }

  return (
    <section
      id="capabilities"
      data-section="capabilities"
      ref={ref}
      className="relative py-28 sm:py-36"
    >
      <div className="shell">
        <SectionHeader
          kicker={c.capabilities.kicker}
          title={c.capabilities.title}
          intro={c.capabilities.intro}
        >
          <p className="mt-6 font-mono text-[10px] tracking-[0.18em] text-faint uppercase lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:mt-0">
            {c.capabilities.hoverHint}
          </p>
        </SectionHeader>

        <div className="mt-14 grid auto-rows-auto grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.capabilities.items.map((item) => (
            <article
              key={item.id}
              data-reveal
              onMouseEnter={() => onEnter(item.id, item.accent)}
              onMouseLeave={onLeave}
              onFocus={() => onEnter(item.id, item.accent)}
              onBlur={onLeave}
              tabIndex={0}
              style={accentStyle(item.accent)}
              className={`surface group relative flex cursor-default flex-col overflow-hidden p-6 outline-none transition-[transform,border-color,background-color] duration-500 hover:-translate-y-1 focus-visible:-translate-y-1 sm:p-7 ${SPAN_CLASS[item.span]}`}
            >
              {/* accent wash */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40 group-focus-visible:opacity-40"
                style={{ background: 'var(--accent)' }}
              />

              <div className="relative flex items-start justify-between gap-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-faint">
                  {item.index}
                </span>
                <span className="font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
                  {item.metric.label}
                  <span className="ml-2 text-ink-dim">{item.metric.value}</span>
                </span>
              </div>

              <h3 className="relative mt-8 text-[22px] leading-tight tracking-tight text-ink sm:text-[25px]">
                {item.title}
              </h3>

              <p className="relative mt-3.5 text-[14px] leading-relaxed text-muted">
                {item.description}
              </p>

              <ul className="relative mt-6 flex flex-wrap gap-1.5 pt-5">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-line bg-void/50 px-2.5 py-1 font-mono text-[10px] tracking-[0.06em] text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {/* hover rail */}
              <span
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                style={{
                  background:
                    'linear-gradient(90deg, var(--accent), color-mix(in oklab, var(--accent) 20%, transparent), transparent)',
                }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

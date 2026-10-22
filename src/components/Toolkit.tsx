import { useI18n } from '../i18n'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './SectionHeader'

export function Toolkit() {
  const { c } = useI18n()
  const ref = useReveal<HTMLElement>()

  return (
    <section
      id="toolkit"
      data-section="toolkit"
      ref={ref}
      className="relative py-28 sm:py-36"
    >
      <div className="shell">
        <SectionHeader
          kicker={c.toolkit.kicker}
          title={c.toolkit.title}
          intro={c.toolkit.intro}
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line/50 sm:grid-cols-2 lg:grid-cols-3">
          {c.toolkit.groups.map((group) => (
            <div key={group.id} data-reveal className="bg-void p-6 sm:p-7">
              <h3 className="font-mono text-[10px] tracking-[0.2em] text-signal uppercase">
                {group.label}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-panel px-3 py-1.5 font-mono text-[11px] text-ink-dim transition-colors duration-300 hover:border-phosphor/40 hover:text-phosphor"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

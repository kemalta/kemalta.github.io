import { useI18n } from '../i18n'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './SectionHeader'
import { accentStyle } from '../lib/styles'

export function Profile() {
  const { c } = useI18n()
  const ref = useReveal<HTMLElement>()

  return (
    <section
      id="profile"
      data-section="profile"
      ref={ref}
      className="relative py-28 sm:py-36"
    >
      <div className="shell">
        <SectionHeader kicker={c.profile.kicker} title={c.profile.title} />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* manifesto */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {c.profile.body.map((paragraph, index) => (
                <p
                  key={index}
                  data-reveal
                  className={
                    index === 0
                      ? 'text-[19px] leading-[1.65] text-ink sm:text-[21px]'
                      : 'text-[17px] leading-[1.75] text-ink-dim sm:text-[18px]'
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div
              data-reveal
              className="mt-12 flex items-end gap-4 border-t border-line pt-8"
            >
              <span className="display text-3xl text-ink sm:text-4xl">
                {c.profile.signature}
              </span>
              <span className="mb-1.5 font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                {c.profile.signatureNote}
              </span>
            </div>
          </div>

          {/* pillars */}
          <div className="lg:col-span-5 lg:pl-6">
            <div className="flex flex-col gap-3">
              {c.profile.pillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  data-reveal
                  className="surface group relative overflow-hidden p-6"
                  style={accentStyle(pillar.accent)}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-px opacity-70"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, var(--accent), transparent)',
                    }}
                  />
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-faint">
                      0{index + 1}
                    </span>
                    <h3 className="text-[19px] tracking-tight text-ink">{pillar.title}</h3>
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

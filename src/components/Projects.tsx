import { useState } from 'react'
import { useI18n } from '../i18n'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './SectionHeader'
import { accentStyle } from '../lib/styles'

export function Projects() {
  const { c } = useI18n()
  const ref = useReveal<HTMLElement>()
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section
      id="projects"
      data-section="projects"
      ref={ref}
      className="relative py-28 sm:py-36"
    >
      <div className="shell">
        <SectionHeader
          kicker={c.projects.kicker}
          title={c.projects.title}
          intro={c.projects.intro}
        />

        <div className="mt-14 flex flex-col gap-3">
          {c.projects.items.map((project) => {
            const open = openId === project.id
            return (
              <article
                key={project.id}
                data-reveal
                style={accentStyle(project.accent)}
                className="surface group relative overflow-hidden pl-px"
              >
                {/* accent rail — lights up while the case is open */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 w-px bg-[var(--accent)] transition-opacity duration-500 ${
                    open ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -left-24 top-0 h-40 w-40 rounded-full blur-3xl transition-opacity duration-700 ${
                    open ? 'opacity-25' : 'opacity-0'
                  }`}
                  style={{ background: 'var(--accent)' }}
                />
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : project.id)}
                  aria-expanded={open}
                  className="flex w-full items-start gap-5 p-6 text-left sm:p-8"
                >
                  <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-faint">
                    {project.index}
                  </span>

                  <span className="flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="text-[22px] leading-tight tracking-tight text-ink sm:text-[27px]">
                        {project.title}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                        {project.sector}
                      </span>
                    </span>

                    <span className="mt-3 block max-w-3xl text-[14px] leading-relaxed text-muted">
                      {project.problem}
                    </span>
                  </span>

                  <span
                    className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line font-mono text-[13px] text-muted transition-all duration-500 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]"
                    style={{
                      transform: open ? 'rotate(45deg)' : 'none',
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                  style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-8 border-t border-line px-6 pb-8 pt-7 sm:px-8 lg:grid-cols-12">
                      <div className="lg:col-span-5">
                        <span className="label">Problem → Approach</span>
                        <ul className="mt-4 space-y-2.5">
                          {project.approach.map((step, index) => (
                            <li
                              key={step}
                              className="flex gap-3 text-[14px] leading-relaxed text-ink-dim"
                            >
                              <span className="font-mono text-[10px] text-[var(--accent)]">
                                0{index + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="lg:col-span-4">
                        <span className="label">Outcome</span>
                        <p className="mt-4 text-[14px] leading-relaxed text-ink-dim">
                          {project.outcome}
                        </p>
                      </div>

                      <div className="lg:col-span-3">
                        <span className="label">Stack</span>
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <li
                              key={tech}
                              className="rounded-md border border-line bg-void/50 px-2.5 py-1 font-mono text-[10px] text-muted"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

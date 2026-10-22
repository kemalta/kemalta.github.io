import { useState } from 'react'
import { useI18n } from '../i18n'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './SectionHeader'
import { profile } from '../content'

export function Contact() {
  const { c } = useI18n()
  const ref = useReveal<HTMLElement>()
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', subject: '', message: '' })

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked — the address is on screen anyway */
    }
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const subject = form.subject || c.contact.form.subjectPlaceholder
    const body = `${form.message}\n\n— ${form.name || ''}\n${profile.email}`.trim()
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    window.location.href = href
  }

  return (
    <section
      id="contact"
      data-section="contact"
      ref={ref}
      className="relative py-28 sm:py-36"
    >
      <div className="shell">
        <SectionHeader kicker={c.contact.kicker} title={c.contact.title} />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* left — channels */}
          <div className="lg:col-span-5">
            <p data-reveal className="text-[16px] leading-[1.7] text-ink-dim">
              {c.contact.body}
            </p>

            <div data-reveal className="mt-10 space-y-3">
              <div className="surface flex items-center justify-between gap-4 p-5">
                <div className="min-w-0">
                  <span className="label">{c.contact.emailLabel}</span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-1.5 block truncate font-mono text-[13px] text-ink transition-colors duration-300 hover:text-signal"
                  >
                    {profile.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="shrink-0 rounded-lg border border-line px-3 py-2 font-mono text-[10px] tracking-[0.12em] text-muted uppercase transition-colors duration-300 hover:border-signal/50 hover:text-signal"
                >
                  {copied ? c.contact.copied : c.contact.copyEmail}
                </button>
              </div>

              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                data-reveal
                className="surface group flex items-center justify-between gap-4 p-5"
              >
                <div>
                  <span className="label">{c.contact.instagramLabel}</span>
                  <span className="mt-1.5 block font-mono text-[13px] text-ink transition-colors duration-300 group-hover:text-phosphor">
                    {profile.instagram}
                  </span>
                </div>
                <span className="text-ink-dim transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              <div data-reveal className="flex items-center gap-2.5 p-2">
                <span className="pulse-dot" />
                <span className="text-[13px] text-ink-dim">{c.contact.availability}</span>
                <span className="text-faint">·</span>
                <span className="font-mono text-[11px] text-faint">
                  {c.contact.responseTime}
                </span>
              </div>
            </div>
          </div>

          {/* right — composer */}
          <form onSubmit={submit} data-reveal className="lg:col-span-6 lg:col-start-7">
            <div className="surface p-6 sm:p-8">
              <div className="grid gap-5">
                <label className="block">
                  <span className="label">{c.contact.form.name}</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={c.contact.form.namePlaceholder}
                    className="mt-2 w-full rounded-lg border border-line bg-void/60 px-4 py-3 text-[15px] text-ink outline-none transition-colors duration-300 placeholder:text-faint focus:border-signal/60"
                  />
                </label>

                <label className="block">
                  <span className="label">{c.contact.form.subject}</span>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder={c.contact.form.subjectPlaceholder}
                    className="mt-2 w-full rounded-lg border border-line bg-void/60 px-4 py-3 text-[15px] text-ink outline-none transition-colors duration-300 placeholder:text-faint focus:border-signal/60"
                  />
                </label>

                <label className="block">
                  <span className="label">{c.contact.form.message}</span>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={c.contact.form.messagePlaceholder}
                    className="mt-2 w-full resize-y rounded-lg border border-line bg-void/60 px-4 py-3 text-[15px] leading-relaxed text-ink outline-none transition-colors duration-300 placeholder:text-faint focus:border-signal/60"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="group relative mt-6 w-full overflow-hidden rounded-xl bg-signal px-6 py-3.5 font-mono text-[12px] tracking-[0.14em] text-void uppercase transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="relative z-10">{c.contact.form.submit}</span>
                <span className="absolute inset-0 translate-y-full bg-signal-soft transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              </button>

              <p className="mt-3 font-mono text-[10px] leading-relaxed text-faint">
                {c.contact.form.note}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

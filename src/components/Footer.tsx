import { useI18n } from '../i18n'
import { profile } from '../content'
import { scrollToTop } from '../lib/scrollTo'

export function Footer() {
  const { c } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-line py-12">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent"
      />
      <div className="shell">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="display text-2xl text-ink sm:text-3xl">{profile.name}</p>
            <p className="mt-2 font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
              {c.footer.builtWith}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-[12px] text-muted transition-colors duration-300 hover:text-signal"
              >
                {profile.email}
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[12px] text-muted transition-colors duration-300 hover:text-signal"
              >
                LinkedIn
              </a>
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[12px] text-muted transition-colors duration-300 hover:text-phosphor"
              >
                {profile.instagram}
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-faint uppercase transition-colors duration-300 hover:text-ink"
            >
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                ↑
              </span>
              {c.footer.backToTop}
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[10px] tracking-[0.12em] text-faint uppercase sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {profile.name}. {c.footer.rights}
          </span>
          <span>{c.footer.colophon}</span>
        </div>
      </div>

      {/* oversized signature, clipped by the viewport edge */}
      <div aria-hidden="true" className="mt-10 overflow-hidden px-5 sm:px-10">
        <span className="wordmark">{profile.name}</span>
      </div>
    </footer>
  )
}

# TODO — Kemal Talha Ekici Portfolio

Everything on this site is driven by a single file: **`src/content.ts`**.
Nothing under `src/components/` or `src/scene/` contains hard-coded copy, so
every change below is a content edit — no component work required.

Each item lists where the placeholder lives, what it currently says, and what
it needs. Items marked **BLOCKER** must be resolved before the site goes
public; the rest improve accuracy.

---

## 1. Identity & contact — BLOCKER

| Field | File | Current | Needed |
|---|---|---|---|
| Location | `src/content.ts` → `profile.location` (L44) | `Türkiye` | Real city (e.g. `İstanbul, Türkiye`) |
| Timezone | `src/content.ts` → `profile.timezone` (L46) | `Europe/Istanbul` | Confirm — drives the live clock in the hero |
| Availability | `src/content.ts` → `profile.availability` | `Açık` / `Available` | Real status (open to projects / employed / etc.) |
| Response time | `copy.tr.contact.responseTime` / `copy.en…` | generic | Real commitment (e.g. `24 saat içinde`) |
| Domain | `index.html`, `public/sitemap.xml`, `public/robots.txt` | `https://kemaltalhaekici.com` | Confirm the real domain, then update all three |
| OG / social image | `index.html` | none | 1200×630 PNG with the wordmark (Twitter + OG tags) |

The email (`kemaltalhaekici@gmail.com`) and Instagram (`@kemaltalhaekici`) are
real and already wired into the mailto composer, the footer, and the hero.

## 2. Career timeline — BLOCKER

`copy.tr.timeline.items` (L392) and `copy.en.timeline.items` (L853) — four
entries, all currently anonymised as `Kurum içi` / `In-house`.

For each entry supply:

- `period` — real start/end dates (currently `2019-2022`, `2022-2024`, `2024-2025`, `2025-`)
- `role` — the title actually held
- `org` — the employer (name only, or "gizlilik için" if you prefer)
- `summary` — one sentence on what that role covered
- `points` — 3–4 concrete responsibilities, written as outcomes not duties

The current bullets describe generic ICT work; they must match the real scope.

## 3. Selected work — BLOCKER

`copy.tr.projects.items` (L519) and `copy.en.projects.items` (L980) — four
projects, all written as templates.

For each project supply:

- `title` — a plain-language name
- `sector` — the environment it shipped into
- `problem` — what was broken or missing
- `approach` — 3 steps you actually took
- `outcome` — **the result with a number in it** (the current text is a
  sentence with no metric, which reads like filler)
- `stack` — the tools you used

If a project cannot be described publicly, replace it with another one — do
not ship a template.

## 4. Capabilities & metrics

`copy.tr.capabilities.items` (L295) / `copy.en…` (L756) — eight cards.

- `metric.label` / `metric.value` are currently illustrative
  (`Katman: L2 → L7`, `SLA: 99.9`, `Çıktı: Devredilebilir`).
- Replace each with something you can defend, or remove the metric from the
  card. The Web & Interface card legitimately keeps `3D WebGL`.
- `body` paragraphs currently read as category descriptions. Add one line
  that names the concrete work you do in that area.

## 5. Profile narrative

`copy.tr.profile.body` (L266), `profile.pillars` (L270–283), `profile.signature`
and `profile.signatureNote`.

- Three body paragraphs describing your trajectory — currently a template.
- Three pillars (`Altyapı`, `Sistem`, `Zekâ`) — rename to the three ideas you
  actually want a visitor to remember.
- `signature` / `signatureNote` — the handwritten-style sign-off under the
  pillars. Currently a placeholder line.

## 6. Services & positioning

`copy.tr.services.items` (L453) / `copy.en…` (L914) — four service cards.

- Keep only the services you actually sell.
- Add how you engage (project / retainer / advisory), the typical duration,
  and what the client receives. The cards currently list scope only.
- `services.cta` — the closing call to action.

## 7. Toolkit — accuracy matters

`copy.tr.toolkit.groups` (L598–626) / `copy.en…` (L1059–1087) — six groups.

The lists name specific products (Cisco IOS/IOS-XE, FortiGate, CrowdStrike,
Wazuh, ArgoCD, Harbor, pgvector, …). **Every item should be something you
have actually operated.** Remove the ones you have only read about; this is
the section a technical reviewer will scrutinise first.

## 8. Technical / deployment

- [ ] Deploy `dist/` (Vercel / Netlify / Cloudflare Pages — any static host).
- [ ] Point the domain at the host and update `canonical` + `sitemap.xml`.
- [ ] Add an OG image and social meta tags.
- [ ] Add a `404` page that matches the design.
- [ ] Optional: privacy notice if you add analytics.
- [ ] Optional: a `Vary`/cache note — the site is static, `dist/assets/*` is
      content-hashed and safe to cache forever.

## 9. Build & verification commands

```bash
npm run lint          # eslint, 0 errors / 0 warnings
npm run typecheck     # tsc -b
npm run build         # production bundle -> dist/
npm run audit         # headless audit, default motion (1440/768/360)
npm run audit:reduced # headless audit with prefers-reduced-motion: reduce
npm run audit:scene   # proves the WebGL scene contributes pixels
npm run audit:all     # everything above, in order
```

Helper tools (write into `audit/`):

```bash
npm run shoot -- hero            # screenshot + ASCII luminance map of the hero
npm run shoot -- full full       # full-page map
npm run shoot -- scene scene     # WebGL layer only
npm run layout -- hero           # computed layout tree of one section
npm run inspect -- audit/desktop.png
```

---

## Nothing else to do

The 3D scene, scroll choreography, i18n, responsive layout, accessibility
fallbacks, and the audit tooling are complete and verified. Only the content
above is still templated.

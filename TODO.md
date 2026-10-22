# TODO — Kemal Talha Ekici Portfolio

Live at **https://kemalta.github.io** · repo **kemalta/kemalta.github.io** · deploys on push to `main`.

Everything on this site is driven by a single file: **`src/content.ts`**.
Nothing under `src/components/` or `src/scene/` contains copy, so every change
below is a content edit — no component work required.

What is already real: name, email, Instagram, LinkedIn, the services list, the
six service lines, the capability matrix, the toolkit, the 3D scene, TR/EN
localisation, and the deployment pipeline. What is still templated is listed
below.

---

## 1. Facts to confirm

| Field | Where | Current | Needed |
|---|---|---|---|
| Location | `profile.location` | `Türkiye` | Real city (e.g. `İstanbul, Türkiye`) |
| Timezone | `profile.timezone` | `Europe/Istanbul` | Confirm — drives the live hero clock |
| Availability | `profile.availability` | `Açık` / `Open` | Real status (freelance / employed / both) |
| Response time | `contact.responseTime` | `aynı gün` / `same day` | Real commitment |

## 2. Career timeline — needs real data

`timeline.items` (TR and EN) — four entries, periods `2019-2022`, `2022-2024`,
`2024-2025`, `2025-`, employers anonymised as `Kurumsal BT` / `Corporate IT`.

For each entry supply the real period, the title held, the employer (name, or a
sector label if it must stay private), and 3–4 bullets written as outcomes.
Match these to the LinkedIn profile so the two stay consistent.

## 3. Selected work — needs real data

`projects.items` (TR and EN) — four projects written as archetypes.

The strongest upgrade is a **number in every `outcome`** (downtime avoided,
restore time, hours saved per month, number of sites). If a project cannot be
described publicly, replace it with one that can — do not ship a template.

## 4. Capability metrics

`capabilities.items[].metric` — `L2 → L7`, `99.9`, `Zero Trust`, `SQL / JSON`
are illustrative. Keep only the ones you can defend; the Web card's `3D WebGL`
is accurate.

## 5. Toolkit accuracy

`toolkit.groups` names specific products (Cisco IOS-XE, FortiGate, CrowdStrike,
Wazuh, ArgoCD, Harbor, pgvector, …). This is the section a technical reviewer
scrutinises first — remove anything you have only read about.

## 6. Optional polish

- [ ] Custom domain (`kemaltalhaekici.com`) — add `CNAME`, point DNS, update
      `VITE_SITE_URL` in the workflow.
- [ ] Privacy note if analytics is ever added.

Social preview (`public/og-image.png`) and the `404.html` page are done — regenerate
the card with `npm run og` after any change to the positioning.

## 8. Commands

```bash
npm run lint          # eslint, 0 errors / 0 warnings
npm run typecheck     # tsc -b
npm run build         # production bundle -> dist/
npm run audit         # headless audit, default motion (1440/768/360)
npm run audit:reduced # headless audit with prefers-reduced-motion: reduce
npm run audit:scene   # proves the WebGL scene contributes pixels
npm run audit:all     # everything above, in order
npm run audit:live    # same audit against the deployed site (AUDIT_URL)
```

Helper tools (write into `audit/`):

```bash
npm run shoot -- hero            # screenshot + ASCII luminance map of the hero
npm run shoot -- full full       # full-page map
npm run shoot -- scene scene     # WebGL layer only
npm run layout -- hero           # computed layout tree of one section
npm run inspect -- audit/desktop.png
```

## 9. Publishing

```bash
git add -A
git commit -m "content: ..."
git push
```

GitHub Actions builds, lints, typechecks and deploys in ~40 s. Pages is set to
`build_type: workflow`, so the artifact is always the built `dist/`, never the
repository root.

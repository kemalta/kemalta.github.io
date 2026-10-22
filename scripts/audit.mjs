/**
 * Headless browser audit for the built site.
 *
 * Runs the production preview, captures every console message and page error,
 * exercises the scroll choreography, exercises the language switch, and checks
 * the layout at three breakpoints. Screenshots are written to `audit/`.
 *
 *   node scripts/audit.mjs            # default motion
 *   node scripts/audit.mjs --reduced  # prefers-reduced-motion: reduce
 */
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { setTimeout as sleep } from 'node:timers/promises'
import path from 'node:path'
import process from 'node:process'
import puppeteer from 'puppeteer-core'

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const PORT = 4187
/* `vite preview` serves from the build's `base`, so a sub-path build (GitHub
   Project Pages) can be audited by pointing AUDIT_URL at it. */
const BASE = process.env.AUDIT_URL ?? `http://127.0.0.1:${PORT}`

const REDUCED = process.argv.includes('--reduced')
const OUT = path.resolve(REDUCED ? 'audit-reduced' : 'audit')

const breakpoints = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 360, height: 740 },
]

async function waitForServer(url, timeoutMs = 30000) {
  const started = Date.now()
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.ok) return true
    } catch {
      /* not up yet */
    }
    await sleep(250)
  }
  return false
}

async function main() {
  await mkdir(OUT, { recursive: true })

  const viteBin = path.resolve('node_modules', 'vite', 'bin', 'vite.js')

  /* AUDIT_URL points at an already-running site (e.g. the live deployment),
     so no local preview is needed. */
  const preview = process.env.AUDIT_URL ? null : spawn(
    process.execPath,
    [viteBin, 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
    { cwd: process.cwd(), stdio: 'ignore', detached: true },
  )

  const cleanup = async () => {
    if (!preview?.pid) return
    await new Promise((resolve) => {
      const killer = spawn('taskkill', ['/pid', String(preview.pid), '/T', '/F'], { stdio: 'ignore' })
      killer.on('exit', resolve)
      killer.on('error', resolve)
    })
  }
  process.on('exit', () => { try { if (preview) process.kill(preview.pid, 'SIGKILL') } catch { /* already gone */ } })
  process.on('SIGINT', () => {
    void cleanup().then(() => process.exit(1))
  })

  if (!(await waitForServer(BASE))) {
    console.error('FAIL: preview server did not start')
    await cleanup()
    process.exit(1)
  }

  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: true,
    args: [
      '--no-sandbox',
      '--enable-unsafe-swiftshader',
      '--use-angle=swiftshader',
      '--enable-webgl',
      '--hide-scrollbars',
    ],
  })

  const report = {
    mode: REDUCED ? 'reduced-motion' : 'default',
    console: [],
    pageErrors: [],
    checks: [],
    shots: [],
  }

  try {
    for (const bp of breakpoints) {
      const page = await browser.newPage()
      await page.setViewport({ width: bp.width, height: bp.height, deviceScaleFactor: 1 })
      await page.emulateMediaFeatures([
        {
          name: 'prefers-reduced-motion',
          value: REDUCED ? 'reduce' : 'no-preference',
        },
        { name: 'prefers-color-scheme', value: 'dark' },
      ])

      page.on('console', (msg) => {
        const type = msg.type()
        if (type === 'error' || type === 'warning') {
          report.console.push({ breakpoint: bp.name, type, text: msg.text() })
        }
      })
      page.on('pageerror', (err) => {
        report.pageErrors.push({ breakpoint: bp.name, text: String(err) })
      })
      page.on('requestfailed', (req) => {
        report.console.push({
          breakpoint: bp.name,
          type: 'requestfailed',
          text: `${req.url()} :: ${req.failure()?.errorText ?? 'unknown'}`,
        })
      })

      await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 45000 })
      await sleep(2600)

      /* the boot overlay must lift on its own */
      const bootDismissed = await page.evaluate(() => {
        const overlay = document.querySelector('[role="status"][class*="z-[100]"]')
        if (!overlay) return true
        return getComputedStyle(overlay).opacity === '0' || overlay.getAttribute('style')?.includes('opacity: 0')
      })

      /* scroll through the whole document so every trigger fires */
      const height = await page.evaluate(() => document.documentElement.scrollHeight)
      for (let y = 0; y <= height; y += Math.round(bp.height * 0.6)) {
        await page.evaluate((top) => window.scrollTo({ top, behavior: 'auto' }), y)
        await sleep(140)
      }
      await sleep(700)

      const checks = await page.evaluate(() => {
        const de = document.documentElement

        const isClipped = (el) => {
          let node = el.parentElement
          while (node && node !== de) {
            const overflowX = getComputedStyle(node).overflowX
            if (overflowX === 'hidden' || overflowX === 'clip' || overflowX === 'auto') return true
            node = node.parentElement
          }
          return false
        }

        const overflowers = [...document.querySelectorAll('*')]
          .filter((el) => el.getBoundingClientRect().right > de.clientWidth + 1)
          .filter((el) => !isClipped(el))
          .slice(0, 6)
          .map((el) => `${el.tagName}.${String(el.className).slice(0, 40)}`)

        const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(
          (h) => `${h.tagName} ${h.textContent.trim().slice(0, 52)}`,
        )

        const links = [...document.querySelectorAll('a[href]')]
        const internalTargets = links
          .map((a) => a.getAttribute('href'))
          .filter((h) => h && h.startsWith('#'))
        const missingAnchors = internalTargets.filter((h) => !document.querySelector(h))

        const canvas = document.querySelector('canvas')
        const webglProbe = (() => {
          try {
            const probeCanvas = document.createElement('canvas')
            const gl = probeCanvas.getContext('webgl2') ?? probeCanvas.getContext('webgl')
            if (!gl) return { supported: false }
            const dbg = gl.getExtension('WEBGL_debug_renderer_info')
            return {
              supported: true,
              renderer: dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : 'n/a',
            }
          } catch (err) {
            return { supported: false, error: String(err) }
          }
        })()

        const focusables = [...document.querySelectorAll('a,button,input,textarea,select')].filter(
          (el) => el.tabIndex < 0,
        ).length

        const sections = [...document.querySelectorAll('section[data-section]')].map((section) => {
          const r = section.getBoundingClientRect()
          const text = (section.textContent ?? '').replace(/\s+/g, ' ').trim()
          let hidden = 0
          for (const el of section.querySelectorAll('[data-reveal]')) {
            const cs = getComputedStyle(el)
            if (Number(cs.opacity) < 0.05 && el.getBoundingClientRect().height > 0) hidden += 1
          }
          return {
            id: section.dataset.section,
            height: Math.round(r.height),
            textLength: text.length,
            hiddenElements: hidden,
            head: text.slice(0, 48),
          }
        })

        return {
          scrollWidth: de.scrollWidth,
          clientWidth: de.clientWidth,
          horizontalOverflow: de.scrollWidth > de.clientWidth + 1,
          overflowers,
          headings,
          h1Count: document.querySelectorAll('h1').length,
          sectionCount: document.querySelectorAll('section[data-section]').length,
          sections,
          missingAnchors,
          imagesWithoutAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
          reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          lang: de.lang,
          webgl: webglProbe,
          canvasCount: document.querySelectorAll('canvas').length,
          canvasSize: canvas ? `${canvas.width}x${canvas.height}` : null,
          staticPosterVisible: Boolean(document.querySelector('[data-static-poster="true"]')),
          emailLinks: links.filter((a) => (a.getAttribute('href') ?? '').startsWith('mailto:')).length,
          instagramLinks: links.filter((a) =>
            (a.getAttribute('href') ?? '').includes('instagram.com'),
          ).length,
          unreachableFocusables: focusables,
          documentHeight: de.scrollHeight,
        }
      })

      checks.bootDismissed = bootDismissed
      report.checks.push({ breakpoint: bp.name, ...checks })

      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'auto' }))
      await sleep(600)
      const file = path.join(OUT, `${bp.name}.png`)
      await page.screenshot({ path: file })
      report.shots.push(file)

      if (bp.name === 'desktop') {
        await page.evaluate(
          () => window.scrollTo({ top: document.documentElement.scrollHeight * 0.38, behavior: 'auto' }),
        )
        await sleep(900)
        const mid = path.join(OUT, 'desktop-scrolled.png')
        await page.screenshot({ path: mid })
        report.shots.push(mid)
      }

      await page.close()
    }

    /* ------------------------------------------------------ *
     * Language switch â€” the copy must actually change.
     * ------------------------------------------------------ */
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 900 })
    page.on('pageerror', (err) => report.pageErrors.push({ breakpoint: 'i18n', text: String(err) }))
    await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 45000 })
    await sleep(2200)

    const before = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      h1: document.querySelector('h1')?.textContent?.trim(),
      lead: document.querySelector('main p')?.textContent?.trim().slice(0, 60),
    }))

    await page.evaluate(() => {
      const buttons = [...document.querySelectorAll('button')]
      const en = buttons.find((b) => b.textContent?.trim() === 'EN')
      en?.click()
    })
    await sleep(900)

    const after = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      h1: document.querySelector('h1')?.textContent?.trim(),
      lead: document.querySelector('main p')?.textContent?.trim().slice(0, 60),
      stored: window.localStorage.getItem('kte.locale'),
    }))

    report.i18n = { before, after, changed: before.lang !== after.lang }
    await page.close()
  } finally {
    await browser.close()
    await cleanup()
  }

  console.log(JSON.stringify(report, null, 2))

  const consoleErrors = report.console.filter((c) => c.type === 'error')
  const overflow = report.checks.filter((c) => c.horizontalOverflow)
  const i18nFailed = report.i18n && !report.i18n.changed

  console.log('\n--- SUMMARY ---')
  console.log(`page errors:        ${report.pageErrors.length}`)
  console.log(`console errors:     ${consoleErrors.length}`)
  console.log(`console warnings:   ${report.console.filter((c) => c.type === 'warning').length}`)
  console.log(`failed requests:    ${report.console.filter((c) => c.type === 'requestfailed').length}`)
  console.log(
    `horizontal overflow:${overflow.length ? overflow.map((c) => c.breakpoint).join(', ') : ' none'}`,
  )
  console.log(`language switch:    ${i18nFailed ? 'FAILED' : 'ok'} (${report.i18n?.before.lang} â†’ ${report.i18n?.after.lang})`)
  console.log(
    `boot dismissed:     ${report.checks.every((c) => c.bootDismissed) ? 'yes' : 'NO'}`,
  )

  await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2))

  process.exit(
    report.pageErrors.length > 0 || consoleErrors.length > 0 || overflow.length > 0 || i18nFailed
      ? 1
      : 0,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

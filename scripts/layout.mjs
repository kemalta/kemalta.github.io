/**
 * Dumps the computed layout of a section so the composition can be reviewed
 * as text instead of pixels.
 *
 *   node scripts/layout.mjs hero
 */
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import path from 'node:path'
import process from 'node:process'
import puppeteer from 'puppeteer-core'

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const PORT = 4195
const BASE = `http://127.0.0.1:${PORT}`
const SECTION = process.argv[2] ?? 'hero'
const WIDTH = Number(process.argv[3] ?? 1440)
const HEIGHT = Number(process.argv[4] ?? 900)

async function waitForServer(url, timeoutMs = 30000) {
  const started = Date.now()
  let last = 'no attempt'
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url)
      last = `status ${res.status}`
      if (res.ok) return true
    } catch (err) {
      last = `${String(err)} cause=${String(err?.cause)} code=${err?.cause?.code}`
    }
    await sleep(250)
  }
  console.error(`[wait] ${url} never became ready (${last})`)
  return false
}

const main = async () => {
  const viteBin = path.resolve('node_modules', 'vite', 'bin', 'vite.js')
  const preview = spawn(
    process.execPath,
    [viteBin, 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
    { cwd: process.cwd(), stdio: ['ignore', 'pipe', 'pipe'], detached: true },
  )
  preview.stdout?.on('data', (chunk) => process.stderr.write(`[vite] ${chunk}`))
  preview.stderr?.on('data', (chunk) => process.stderr.write(`[vite!] ${chunk}`))
  preview.on('error', (err) => console.error('[spawn]', err))
  preview.on('exit', (code) => console.error(`[vite exited] ${code}`))
  const cleanup = async () => {
    if (!preview.pid) return
    await new Promise((resolve) => {
      const killer = spawn('taskkill', ['/pid', String(preview.pid), '/T', '/F'], { stdio: 'ignore' })
      killer.on('exit', resolve)
      killer.on('error', resolve)
    })
  }
  process.on('exit', () => { try { process.kill(preview.pid, 'SIGKILL') } catch { /* already gone */ } })

  if (!(await waitForServer(BASE))) {
    console.error('preview did not start')
    await cleanup()
    process.exit(1)
  }

  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: true,
    args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-angle=swiftshader'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: WIDTH, height: HEIGHT })
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }])
  await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 45000 })
  await sleep(3000)

  const dump = await page.evaluate((id) => {
    const section = document.querySelector(`[data-section="${id}"]`)
    if (!section) return { error: `section ${id} not found` }

    const rows = []
    const walk = (el, depth) => {
      for (const child of el.children) {
        const r = child.getBoundingClientRect()
        const cs = getComputedStyle(child)
        const ownText = [...child.childNodes]
          .filter((n) => n.nodeType === 3)
          .map((n) => n.textContent.trim())
          .join(' ')
          .trim()
        const tag = child.tagName.toLowerCase()
        const cls = String(child.className).slice(0, 46)
        rows.push(
          [
            `${'  '.repeat(depth)}${tag}${cls ? `.${cls}` : ''}`,
            `x=${Math.round(r.x)} y=${Math.round(r.y)} w=${Math.round(r.width)} h=${Math.round(r.height)}`,
            `fs=${cs.fontSize} lh=${cs.lineHeight} op=${cs.opacity} vis=${cs.visibility} col=${cs.color}`,
            ownText ? `text="${ownText.slice(0, 70)}"` : '',
          ]
            .filter(Boolean)
            .join('  |  '),
        )
        walk(child, depth + 1)
      }
    }
    walk(section, 0)
    return { rows, count: rows.length }
  }, SECTION)

  if (dump.error) {
    console.log(dump.error)
  } else {
    console.log(`${SECTION} @ ${WIDTH}x${HEIGHT} â€” ${dump.count} nodes\n`)
    console.log(dump.rows.join('\n'))
  }

  await browser.close()
  await cleanup()
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

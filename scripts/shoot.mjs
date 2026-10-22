/**
 * Fast visual probe: renders the hero and prints the colour statistics plus
 * an ASCII luminance map so the composition can be judged without eyes.
 *
 *   node scripts/shoot.mjs [outName]
 */
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { setTimeout as sleep } from 'node:timers/promises'
import path from 'node:path'
import process from 'node:process'
import puppeteer from 'puppeteer-core'

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const PORT = 4189
const BASE = `http://127.0.0.1:${PORT}`
const NAME = process.argv[2] ?? 'probe'
const FULL = process.argv[3] === 'full'
const SCENE = process.argv[3] === 'scene'
const OUT = path.resolve('audit')

const RAMP = ' .:-=+*#%@'

async function waitForServer(url, timeoutMs = 30000) {
  const started = Date.now()
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.ok) return true
    } catch {
      /* not up */
    }
    await sleep(250)
  }
  return false
}

const main = async () => {
  await mkdir(OUT, { recursive: true })
  const viteBin = path.resolve('node_modules', 'vite', 'bin', 'vite.js')
  const preview = spawn(
    process.execPath,
    [viteBin, 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
    { stdio: 'ignore', detached: true },
  )
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
  await page.setViewport({ width: 1440, height: 900 })
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }])
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })

  await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 45000 })
  await sleep(3200)

  /* walk the page so every reveal trigger fires before we capture */
  const docHeight = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y <= docHeight; y += 600) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'auto' }), y)
    await sleep(120)
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'auto' }))
  await sleep(1200)

  if (SCENE) {
    /* isolate the WebGL layer so the scene can be judged on its own */
    await page.evaluate(() => {
      for (const el of document.body.children) {
        if (!el.querySelector?.('canvas') && el.tagName !== 'CANVAS') {
          el.style.visibility = 'hidden'
        }
      }
      document.querySelectorAll('canvas').forEach((c) => {
        c.parentElement.style.visibility = 'visible'
      })
    })
    await sleep(600)
  }

  const shot = await page.screenshot({ encoding: 'base64', fullPage: FULL })
  await writeFile(path.join(OUT, `${NAME}.png`), Buffer.from(shot, 'base64'))

  const rows = FULL ? 150 : SCENE ? 40 : 34
  const cols = SCENE ? 120 : 100
  const stats = await page.evaluate(
    async (b64, cols, rows) => {
      const CH = ' .:-=+*#%@'
      const img = new Image()
      img.src = `data:image/png;base64,${b64}`
      await img.decode()
      const canvas = document.createElement('canvas')
      canvas.width = cols
      canvas.height = rows
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, cols, rows)
      const { data } = ctx.getImageData(0, 0, cols, rows)
      const lines = []
      const rgb = [0, 0, 0]
      let sum = 0
      let bright = 0
      for (let y = 0; y < rows; y += 1) {
        let line = ''
        for (let x = 0; x < cols; x += 1) {
          const i = (y * cols + x) * 4
          const luma = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]
          sum += luma
          rgb[0] += data[i]
          rgb[1] += data[i + 1]
          rgb[2] += data[i + 2]
          if (luma > 140) bright += 1
          line += CH[Math.min(9, Math.floor((luma / 255) * 9.999))]
        }
        lines.push(line)
      }
      const n = cols * rows
      return {
        lines,
        average: +(sum / n).toFixed(1),
        averageRgb: rgb.map((v) => Math.round(v / n)),
        brightPixelPercent: +((bright / n) * 100).toFixed(1),
      }
    },
    shot,
    cols,
    rows,
  )

  console.log(`rgb=${stats.averageRgb.join(',')}  luma=${stats.average}  bright(>140)=${stats.brightPixelPercent}%`)
  console.log(stats.lines.join('\n'))
  if (errors.length) console.log('ERRORS:', errors)

  await browser.close()
  await cleanup()
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

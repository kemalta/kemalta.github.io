/**
 * Proves the WebGL scene contributes visible pixels.
 *
 * Takes the hero twice â€” once with the canvas visible, once with it hidden â€”
 * and compares the two frames. If the difference is negligible, the scene is
 * rendering an empty frame.
 */
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { setTimeout as sleep } from 'node:timers/promises'
import path from 'node:path'
import process from 'node:process'
import puppeteer from 'puppeteer-core'

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const PORT = 4188
const BASE = `http://127.0.0.1:${PORT}`
const OUT = path.resolve('audit')

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

async function frameStats(page, base64) {
  return page.evaluate(async (b64) => {
    const img = new Image()
    img.src = `data:image/png;base64,${b64}`
    await img.decode()
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const sum = [0, 0, 0]
    const colors = new Set()
    for (let i = 0; i < data.length; i += 4) {
      sum[0] += data[i]
      sum[1] += data[i + 1]
      sum[2] += data[i + 2]
      colors.add(`${data[i] >> 3},${data[i + 1] >> 3},${data[i + 2] >> 3}`)
    }
    const n = data.length / 4
    return {
      width: canvas.width,
      height: canvas.height,
      average: sum.map((s) => +(s / n).toFixed(2)),
      distinctColours: colors.size,
    }
  }, base64)
}

async function compareFrames(page, aB64, bB64) {
  return page.evaluate(
    async (x, y) => {
      const decode = async (b64) => {
        const img = new Image()
        img.src = `data:image/png;base64,${b64}`
        await img.decode()
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        return ctx.getImageData(0, 0, canvas.width, canvas.height).data
      }
      const A = await decode(x)
      const B = await decode(y)
      let diff = 0
      let changed = 0
      for (let i = 0; i < A.length; i += 4) {
        const d =
          Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2])
        diff += d
        if (d > 12) changed += 1
      }
      const total = A.length / 4
      return {
        meanPixelDifference: +(diff / total / 3).toFixed(3),
        changedPixelRatioPercent: +((changed / total) * 100).toFixed(2),
      }
    },
    aB64,
    bB64,
  )
}

const main = async () => {
  await mkdir(OUT, { recursive: true })

  const viteBin = path.resolve('node_modules', 'vite', 'bin', 'vite.js')
  const preview = spawn(
    process.execPath,
    [viteBin, 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
    { cwd: process.cwd(), stdio: 'ignore', detached: true },
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
    console.error('FAIL: preview server did not start')
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
  await sleep(3500)

  const withCanvas = await page.screenshot({ encoding: 'base64' })
  await page.evaluate(() => {
    const canvas = document.querySelector('canvas')
    if (canvas) canvas.style.visibility = 'hidden'
  })
  await sleep(500)
  const withoutCanvas = await page.screenshot({ encoding: 'base64' })

  const a = await frameStats(page, withCanvas)
  const b = await frameStats(page, withoutCanvas)
  const delta = await compareFrames(page, withCanvas, withoutCanvas)

  const result = {
    canvasPresent: await page.evaluate(() => Boolean(document.querySelector('canvas'))),
    frameWithCanvas: { average: a.average, distinctColours: a.distinctColours },
    frameWithoutCanvas: { average: b.average, distinctColours: b.distinctColours },
    meanPixelDifference: delta.meanPixelDifference,
    changedPixelRatioPercent: delta.changedPixelRatioPercent,
    pageErrors: errors,
    verdict:
      delta.changedPixelRatioPercent > 2 && delta.meanPixelDifference > 1
        ? 'SCENE RENDERS'
        : 'SCENE APPEARS EMPTY',
  }

  await writeFile(path.join(OUT, 'scene-verification.json'), JSON.stringify(result, null, 2))
  console.log(JSON.stringify(result, null, 2))

  await browser.close()
  await cleanup()
  process.exit(result.verdict === 'SCENE RENDERS' && errors.length === 0 ? 0 : 1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

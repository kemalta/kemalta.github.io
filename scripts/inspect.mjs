/**
 * Renders a screenshot as an ASCII luminance map.
 *
 * This is the remote equivalent of "looking at the page": it reveals whether
 * the composition has structure (where the blocks are, whether the type is
 * where it should be, whether a section came out empty or blown out).
 *
 *   node scripts/inspect.mjs audit/desktop.png 96 40
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import puppeteer from 'puppeteer-core'

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'

const target = process.argv[2] ?? 'audit/desktop.png'
const width = Number(process.argv[3] ?? 96)
const height = Number(process.argv[4] ?? 40)

const RAMP = ' .:-=+*#%@'

const base64 = await readFile(path.resolve(target)).then((buf) => buf.toString('base64'))

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox'],
})

const page = await browser.newPage()
await page.goto('about:blank')

const map = await page.evaluate(
  async (b64, cols, rows) => {
    const RAMP_CHARS = ' .:-=+*#%@'
    const img = new Image()
    img.src = `data:image/png;base64,${b64}`
    await img.decode()

    const canvas = document.createElement('canvas')
    canvas.width = cols
    canvas.height = rows
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = true
    ctx.drawImage(img, 0, 0, cols, rows)

    const { data } = ctx.getImageData(0, 0, cols, rows)
    const out = []
    let sum = 0
    let min = 255
    let max = 0
    const rgb = [0, 0, 0]
    const brightest = { r: 0, g: 0, b: 0, luma: -1 }

    for (let y = 0; y < rows; y += 1) {
      let line = ''
      for (let x = 0; x < cols; x += 1) {
        const i = (y * cols + x) * 4
        const luma = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]
        sum += luma
        rgb[0] += data[i]
        rgb[1] += data[i + 1]
        rgb[2] += data[i + 2]
        if (luma < min) min = luma
        if (luma > max) max = luma
        if (luma > brightest.luma) {
          brightest.luma = luma
          brightest.r = data[i]
          brightest.g = data[i + 1]
          brightest.b = data[i + 2]
        }
        line += RAMP_CHARS[Math.min(9, Math.floor((luma / 255) * 9.999))]
      }
      out.push(line)
    }

    const n = cols * rows
    return {
      lines: out,
      average: +(sum / n).toFixed(1),
      averageRgb: rgb.map((v) => Math.round(v / n)),
      brightest: `rgb(${brightest.r}, ${brightest.g}, ${brightest.b})`,
      min: Math.round(min),
      max: Math.round(max),
      sourceWidth: img.width,
      sourceHeight: img.height,
    }
  },
  base64,
  width,
  height,
)

console.log(`${target}  ${map.sourceWidth}x${map.sourceHeight} -> ${width}x${height}`)
console.log(
  `luminance avg=${map.average} min=${map.min} max=${map.max}  rgb=${map.averageRgb.join(',')}  brightest=${map.brightest}\n`,
)
console.log(map.lines.join('\n'))

await browser.close()

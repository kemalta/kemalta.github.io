import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer-core'

/**
 * Renders the 1200 x 630 social preview card used by Open Graph and Twitter.
 *
 * The card is drawn as static HTML (no app bundle, no WebGL) so it is
 * deterministic and renders in under a second. Fonts are inlined as base64
 * so the output never depends on what is installed on the machine.
 */
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const ROOT = path.resolve(import.meta.dirname, '..')
const OUT = path.join(ROOT, 'public', 'og-image.png')

const font = (pkg, file) =>
  `data:font/woff2;base64,${readFileSync(
    path.join(ROOT, 'node_modules', pkg, 'files', file),
  ).toString('base64')}`

const serif = font('@fontsource/instrument-serif', 'instrument-serif-latin-400-normal.woff2')
const sans = font('@fontsource-variable/inter', 'inter-latin-ext-wght-normal.woff2')

const html = `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8" />
<style>
  @font-face {
    font-family: 'Card Serif';
    font-weight: 400;
    src: url('${serif}') format('woff2');
  }
  @font-face {
    font-family: 'Card Sans';
    font-weight: 100 900;
    src: url('${sans}') format('woff2');
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    position: relative;
    overflow: hidden;
    background: #07090c;
    color: #e8eef5;
    font-family: 'Card Sans', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 68px 76px 60px;
  }
  .grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, rgba(232, 238, 245, 0.045) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(232, 238, 245, 0.045) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(120% 90% at 50% 0%, #000 20%, transparent 78%);
  }
  .glow-a, .glow-b {
    position: absolute;
    border-radius: 999px;
    filter: blur(90px);
  }
  .glow-a {
    width: 620px; height: 420px;
    right: -160px; top: -180px;
    background: rgba(245, 165, 36, 0.20);
  }
  .glow-b {
    width: 520px; height: 380px;
    left: -140px; bottom: -200px;
    background: rgba(53, 214, 195, 0.13);
  }
  .frame {
    position: absolute;
    inset: 22px;
    border: 1px solid rgba(232, 238, 245, 0.10);
    border-radius: 18px;
  }
  header, footer, main { position: relative; z-index: 2; }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .mark {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .monogram {
    width: 46px; height: 46px;
    display: grid; place-items: center;
    border: 1px solid rgba(245, 165, 36, 0.55);
    border-radius: 10px;
    background: rgba(245, 165, 36, 0.08);
    color: #f5a524;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 0.06em;
  }
  .site {
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: #7d8794;
  }
  .eyebrow {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #35d6c3;
  }
  .dot {
    width: 8px; height: 8px;
    border-radius: 999px;
    background: #35d6c3;
    box-shadow: 0 0 0 5px rgba(53, 214, 195, 0.14);
  }
  h1 {
    margin-top: 26px;
    font-family: 'Card Serif', Georgia, serif;
    font-weight: 400;
    font-size: 104px;
    line-height: 0.9;
    letter-spacing: -0.025em;
    color: #e8eef5;
  }
  .roles {
    margin-top: 24px;
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 0.02em;
    color: #a7b2c0;
  }
  .roles b { color: #e8eef5; font-weight: 500; }
  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 26px;
    border-top: 1px solid rgba(232, 238, 245, 0.10);
    font-size: 17px;
    letter-spacing: 0.02em;
    color: #7d8794;
  }
  footer .accent { color: #e8eef5; }
</style>
</head>
<body>
  <div class="grid"></div>
  <div class="glow-a"></div>
  <div class="glow-b"></div>
  <div class="frame"></div>

  <header>
    <div class="mark">
      <div class="monogram">KT</div>
      <div class="site">kemalta.github.io</div>
    </div>
  </header>

  <main>
    <div class="eyebrow"><span class="dot"></span>Siber Güvenlik · Otomasyon · ICT</div>
    <h1>Kemal Talha Ekici</h1>
    <div class="roles"><b>Kurumsal otomasyon</b> · Network · Sunucu · Web arayüzleri</div>
  </main>

  <footer>
    <span class="accent">kemaltalhaekici@gmail.com</span>
    <span>TR / EN · Türkiye</span>
  </footer>
</body>
</html>`

mkdirSync(path.join(ROOT, 'public'), { recursive: true })

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox', '--force-device-scale-factor=1'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)

const shot = await page.screenshot({ type: 'png', captureBeyondViewport: false })
await browser.close()

writeFileSync(OUT, shot)
console.log(`og image written: ${OUT} (${(shot.length / 1024).toFixed(1)} kB)`)

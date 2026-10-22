import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * The public site URL. It feeds the canonical link, the Open Graph tags, the
 * sitemap and robots.txt. GitHub Actions sets it per deployment; locally it
 * falls back to the intended production domain.
 */
const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://kemaltalhaekici.com').replace(/\/$/, '')

/**
 * GitHub Project Pages are served from `/<repo>/`, so the asset base has to
 * follow. User/org pages (`<owner>.github.io`) are served from `/`.
 */
const BASE = process.env.VITE_BASE ?? '/'

/** Rewrites the absolute production URL in index.html and emits the site files. */
function siteMetadata(): Plugin {
  return {
    name: 'kte-site-metadata',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replaceAll('https://kemaltalhaekici.com', SITE_URL)
    },
    writeBundle(options) {
      const dir = options.dir ?? 'dist'
      writeFileSync(
        path.resolve(dir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
        'utf8',
      )
      writeFileSync(
        path.resolve(dir, 'robots.txt'),
        `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
        'utf8',
      )
    },
  }
}

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss(), siteMetadata()],
  build: {
    target: 'es2022',
    cssTarget: 'chrome111',
    // The `three` chunk is large by nature. It is isolated behind a dynamic
    // import, so it never lands in the initial payload and the warning would
    // only ever be noise.
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'three'
            if (id.includes('gsap') || id.includes('lenis')) return 'motion'
            if (id.includes('react')) return 'react'
          }
          return undefined
        },
      },
    },
  },
})

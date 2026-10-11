// Turns the `vite build --mode single` output into one self-contained HTML file:
// scripts, styles and the favicon are inlined (fonts and photos are already
// data URIs thanks to assetsInlineLimit). Output: demo/lews-electrical-demo.html
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const dir = 'dist-single'
let html = await readFile(join(dir, 'index.html'), 'utf8')

const read = (href) => readFile(join(dir, href.replace(/^\.\//, '')), 'utf8')

for (const [tag, src] of [...html.matchAll(/<script type="module" crossorigin src="([^"]+)"><\/script>/g)]) {
  const js = (await read(src)).replace(/<\/script/gi, '<\\/script')
  html = html.replace(tag, () => `<script type="module">${js}</script>`)
}

for (const [tag, href] of [...html.matchAll(/<link rel="stylesheet" crossorigin href="([^"]+)">/g)]) {
  const css = (await read(href)).replace(/<\/style/gi, '<\\/style')
  html = html.replace(tag, () => `<style>${css}</style>`)
}

const favicon = Buffer.from(await read('./favicon.svg')).toString('base64')
html = html.replace('href="./favicon.svg"', `href="data:image/svg+xml;base64,${favicon}"`)

if (/(src|href)="\.\/assets\//.test(html)) throw new Error('Some assets were not inlined')

await mkdir('demo', { recursive: true })
await writeFile('demo/lews-electrical-demo.html', html)
console.log(`demo/lews-electrical-demo.html written (${(html.length / 1024 / 1024).toFixed(2)} MB)`)

// Zero-dependency Node server for the production build.
//
//   npm run build && npm start      ->  http://localhost:4173
//
// Serves dist/ (assets cached for ten minutes, then revalidated), and accepts quote
// requests at POST /api/enquiry (stored as JSON lines in data/enquiries.ndjson).
// On static hosting such as GitHub Pages the form falls back to demo mode.
import { createServer } from 'node:http'
import { appendFile, mkdir, readFile, stat } from 'node:fs/promises'
import { extname, join, normalize, resolve, sep } from 'node:path'

const root = resolve('dist')
const dataDir = resolve('data')
const port = Number(process.env.PORT) || 4173

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
}

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, { ...securityHeaders, ...headers })
  res.end(body)
}

async function readBody(req, limit = 16 * 1024) {
  let size = 0
  const chunks = []
  for await (const chunk of req) {
    size += chunk.length
    if (size > limit) throw new Error('Payload too large')
    chunks.push(chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

const clean = (value, max = 500) => String(value ?? '').trim().slice(0, max)

async function handleEnquiry(req, res) {
  try {
    const input = JSON.parse(await readBody(req))
    const enquiry = {
      receivedAt: new Date().toISOString(),
      sector: clean(input.sector, 40),
      services: Array.isArray(input.services) ? input.services.slice(0, 12).map((s) => clean(s, 80)) : [],
      name: clean(input.name, 120),
      phone: clean(input.phone, 40),
      email: clean(input.email, 160),
      postcode: clean(input.postcode, 12),
      message: clean(input.message, 2000),
    }
    if (!enquiry.name || (!enquiry.phone && !enquiry.email)) {
      return send(res, 422, JSON.stringify({ error: 'Name and a phone number or email are required.' }), {
        'Content-Type': types['.json'],
      })
    }
    await mkdir(dataDir, { recursive: true })
    await appendFile(join(dataDir, 'enquiries.ndjson'), JSON.stringify(enquiry) + '\n')
    console.log(`New enquiry from ${enquiry.name} (${enquiry.sector || 'unspecified'})`)
    send(res, 201, JSON.stringify({ ok: true }), { 'Content-Type': types['.json'] })
  } catch (err) {
    send(res, 400, JSON.stringify({ error: err.message }), { 'Content-Type': types['.json'] })
  }
}

async function serveFile(req, res, path) {
  const info = await stat(path)
  if (!info.isFile()) throw new Error('Not a file')
  const ext = extname(path)
  // Built files have fixed names (see vite.config.ts), so they're cached briefly and then
  // revalidated rather than kept forever.
  const isAsset = path.startsWith(join(root, 'assets') + sep)
  const lastModified = new Date(Math.floor(info.mtimeMs / 1000) * 1000)
  const since = Date.parse(req.headers['if-modified-since'] ?? '')
  if (ext !== '.html' && !Number.isNaN(since) && since >= lastModified.getTime()) {
    res.writeHead(304, { 'Last-Modified': lastModified.toUTCString() })
    return res.end()
  }
  let body = await readFile(path)
  if (ext === '.html') {
    // Tell the page this host can take enquiries (static hosts leave the form in demo mode).
    body = Buffer.from(body.toString('utf8').replace('</head>', '  <meta name="enquiry-endpoint" content="./api/enquiry" />\n  </head>'))
  }
  res.writeHead(200, {
    ...securityHeaders,
    'Content-Type': types[ext] ?? 'application/octet-stream',
    'Content-Length': body.length,
    'Cache-Control': isAsset ? 'public, max-age=600' : 'no-cache',
    'Last-Modified': lastModified.toUTCString(),
  })
  res.end(req.method === 'HEAD' ? undefined : body)
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost')

  if (url.pathname === '/api/enquiry') {
    if (req.method === 'POST') return handleEnquiry(req, res)
    return send(res, 405, 'Method Not Allowed', { Allow: 'POST' })
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send(res, 405, 'Method Not Allowed', { Allow: 'GET, HEAD' })
  }

  let requested
  try {
    requested = normalize(join(root, decodeURIComponent(url.pathname)))
  } catch {
    return send(res, 400, 'Bad Request')
  }
  if (requested !== root && !requested.startsWith(root + sep)) return send(res, 403, 'Forbidden')

  try {
    await serveFile(req, res, url.pathname.endsWith('/') ? join(requested, 'index.html') : requested)
  } catch {
    try {
      // Single-page app: unknown routes get the shell.
      await serveFile(req, res, join(root, 'index.html'))
    } catch {
      send(res, 500, 'Build not found. Run `npm run build` first.')
    }
  }
})

server.listen(port, () => {
  console.log(`Lews Electrical demo running at http://localhost:${port}`)
})

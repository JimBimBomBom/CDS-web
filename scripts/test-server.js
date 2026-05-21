/**
 * test-server.js
 *
 * Lightweight static server for Playwright E2E tests.
 *
 * Reads website/index.html, substitutes __AUTH_USERNAME__ and
 * __AUTH_PASSWORD__ placeholders, writes website/.test/index.html, then
 * serves static files from the website/ directory.
 *
 * API calls (/suggestions, /distance) are intercepted by Playwright's
 * page.route() mocks — this server never needs to proxy them.
 *
 * Environment variables (all optional):
 *   TEST_BASE_URL      Full URL this server listens on  (default: http://localhost:3000)
 *   CDS_AUTH_USERNAME  Injected into HTML               (default: admin)
 *   CDS_AUTH_PASSWORD  Injected into HTML               (default: password)
 *
 * CLI:
 *   node scripts/test-server.js [port]
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const BASE_URL  = (process.env.TEST_BASE_URL ?? 'http://localhost:3000').trim();
const PORT      = parseInt(process.argv[2] || ((() => { try { return new URL(BASE_URL).port || '3000'; } catch { return '3000'; } })()), 10);
const USERNAME  = (process.env.CDS_AUTH_USERNAME ?? 'admin').trim();
const PASSWORD  = (process.env.CDS_AUTH_PASSWORD ?? 'password').trim();

const SRC_HTML  = path.resolve(__dirname, '..', 'website', 'index.html');
const TEST_DIR  = path.resolve(__dirname, '..', 'website', '.test');
const HTML_PATH = path.join(TEST_DIR, 'index.html');
const WEB_ROOT  = path.resolve(__dirname, '..', 'website');

// ── Substitute placeholders and write .test/index.html ────────────────────────

if (!fs.existsSync(TEST_DIR)) fs.mkdirSync(TEST_DIR, { recursive: true });

let html = fs.readFileSync(SRC_HTML, 'utf8');
html = html.split('__AUTH_USERNAME__').join(USERNAME);
html = html.split('__AUTH_PASSWORD__').join(PASSWORD);
fs.writeFileSync(HTML_PATH, html, 'utf8');

console.log('[test-server] Wrote website/.test/index.html');

// ── MIME types ──────────────────────────────────────────────────────────────

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon',
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

// ── Serve static files from website/ with SPA fallback ────────────────────────

http.createServer((req, res) => {
  // Resolve the requested path relative to website/
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/.test/index.html';

  const filePath = path.join(WEB_ROOT, reqPath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(WEB_ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // SPA fallback: serve index.html for unknown paths
        fs.readFile(HTML_PATH, (err2, data2) => {
          if (err2) {
            res.writeHead(500);
            res.end('Internal Server Error: ' + err2.message);
            return;
          }
          res.writeHead(200, {
            'Content-Type':   'text/html; charset=utf-8',
            'Content-Length': data2.length,
          });
          res.end(data2);
        });
        return;
      }
      res.writeHead(500);
      res.end('Internal Server Error: ' + err.message);
      return;
    }

    res.writeHead(200, {
      'Content-Type':   getMimeType(filePath),
      'Content-Length': data.length,
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log('[test-server] Listening on http://localhost:' + PORT);
});

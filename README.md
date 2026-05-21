# City Distance Service — Frontend

A lightweight, static frontend for the City Distance Service.

## Structure

- `website/` — Static frontend (HTML + ES modules + client-side localization)
- `tests/` — Playwright E2E tests (mocked backend, no real API required)
- `scripts/test-server.js` — Lightweight static server used by Playwright

## Running Tests

Tests use Playwright and mock all API calls — no backend required.

```bash
npm install
npx playwright install

# Run all tests headlessly
npm run test:e2e

# Run with Playwright's interactive UI
npm run test:e2e:ui

# Run in debug mode with step-through
npm run test:e2e:debug
```

The test server (`scripts/test-server.js`) is started automatically by Playwright's `webServer` config. It substitutes `__AUTH_USERNAME__` and `__AUTH_PASSWORD__` placeholders in `website/index.html` with test credentials, then serves the site.

## Notes

- The frontend loads the CDS client library from CDN (`https://cdn.jsdelivr.net/npm/@xfilipnamefilip/cds-client@1.3.0/dist/index.global.js`).
- All UI text is localized client-side using the static catalogue in `website/js/l10n.js` (21 languages, no backend `/languages` endpoint needed).
- Language preference is persisted via cookie (`cds_lang`) and falls back to the browser's `navigator.language`.

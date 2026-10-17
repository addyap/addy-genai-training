import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

// Pages are rendered and written under the /ia base path (see vite.config.ts).
const BASE_PATH = '/ia';
const template = fs.readFileSync(toAbsolute(`dist${BASE_PATH}/index.html`), 'utf-8');
const { render, preloadAllPages } = await import('./dist/server/entry-server.js');
// Lazy page chunks must be loaded before renderToString, which cannot wait for them.
await preloadAllPages();

const frRoutes = [
  '/',
  '/formations',
  '/faq',
  '/ressources',
  '/diagnostic',
  '/a-propos',
  '/mentions-legales',
];

// English mirror: /en, /en/formations, … (same components, locale from the /en prefix)
const enRoutes = frRoutes.map((r) => (r === '/' ? '/en' : `/en${r}`));

const routesToPrerender = [...frRoutes, ...enRoutes];

// Vercel serves dist/404.html for any path with no file, including unknown
// /ia/* URLs. Prerender the app's own NotFound page there: Vercel's default
// 404 page has inline scripts that this app's CSP blocks. It stands in for
// every unknown URL (FR or EN), so main.tsx renders it fresh, not hydrates it.
{
  const { html, head, htmlAttrs } = render(`${BASE_PATH}/404`);
  const finalHtml = template
    .replace('<html lang="fr">', htmlAttrs ? `<html ${htmlAttrs}>` : '<html lang="fr">')
    .replace('<!--app-head-->', head)
    .replace('<div id="root"><!--app-html-->', `<div id="root" data-not-found>${html}`);
  fs.writeFileSync(toAbsolute('dist/404.html'), finalHtml);
  console.log('Pre-rendered: dist/404.html');
}

for (const url of routesToPrerender) {
  const { html, head, htmlAttrs } = render(`${BASE_PATH}${url === '/' ? '' : url}`);
  const finalHtml = template
    .replace('<html lang="fr">', htmlAttrs ? `<html ${htmlAttrs}>` : '<html lang="fr">')
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html);

  const filePath = `dist${BASE_PATH}${url === '/' ? '/index' : url}.html`;
  const dirPath = path.dirname(toAbsolute(filePath));

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(toAbsolute(filePath), finalHtml);
  console.log('Pre-rendered:', filePath);
}

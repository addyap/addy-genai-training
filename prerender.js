import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');
const { render } = await import('./dist/server/entry-server.js');

const frRoutes = [
  '/',
  '/formations',
  '/faq',
  '/ressources',
  '/diagnostic',
  '/generateur-programme',
  '/correction-email',
  '/a-propos',
  '/contact',
  '/mentions-legales',
];

// English mirror: /en, /en/formations, … (same components, locale from the /en prefix)
const enRoutes = frRoutes.map((r) => (r === '/' ? '/en' : `/en${r}`));

const routesToPrerender = [...frRoutes, ...enRoutes];

for (const url of routesToPrerender) {
  const { html, head, htmlAttrs } = render(url);
  const finalHtml = template
    .replace('<html lang="fr">', htmlAttrs ? `<html ${htmlAttrs}>` : '<html lang="fr">')
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html);

  const filePath = `dist${url === '/' ? '/index' : url}.html`;
  const dirPath = path.dirname(toAbsolute(filePath));

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(toAbsolute(filePath), finalHtml);
  console.log('Pre-rendered:', filePath);
}

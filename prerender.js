import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');
const { render } = await import('./dist/server/entry-server.js');

const routesToPrerender = [
  '/',
  '/formations',
  '/faq',
  '/a-propos',
  '/contact',
  '/mentions-legales',
];

for (const url of routesToPrerender) {
  const { html, head } = render(url);
  const finalHtml = template
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

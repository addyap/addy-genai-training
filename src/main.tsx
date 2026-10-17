
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { BASE_PATH } from './lib/site';
import { preloadPage } from './routes';
import './index.css';

const root = document.getElementById("root")!;
const app = (
  <HelmetProvider>
    <BrowserRouter basename={BASE_PATH}>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

if (import.meta.env.PROD) {
  // The prerendered page is only hydratable once its chunk is in (see lib/lazy-page.tsx).
  preloadPage(window.location.pathname.slice(BASE_PATH.length) || '/').then(() => hydrateRoot(root, app));
} else {
  createRoot(root).render(app);
}

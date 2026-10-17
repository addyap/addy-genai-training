
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { BASE_PATH } from './lib/site';
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
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}

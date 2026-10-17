import { lazyPage } from './lib/lazy-page';
import Home from './pages/Home';

// Home stays in the main bundle (it is the landing page); every other page is
// its own chunk, so the first visit parses and hydrates only what it shows.
const Formations = lazyPage(() => import('./pages/Formations'));
const FAQ = lazyPage(() => import('./pages/FAQ'));
const Resources = lazyPage(() => import('./pages/Resources'));
const Diagnostic = lazyPage(() => import('./pages/Diagnostic'));
const APropos = lazyPage(() => import('./pages/APropos'));
const MentionsLegales = lazyPage(() => import('./pages/MentionsLegales'));

/** French paths; each one is mirrored under /en with the same component. */
export const routeList = [
  { path: '/', Page: Home },
  { path: '/formations', Page: Formations },
  { path: '/faq', Page: FAQ },
  { path: '/ressources', Page: Resources },
  { path: '/diagnostic', Page: Diagnostic },
  { path: '/a-propos', Page: APropos },
  { path: '/mentions-legales', Page: MentionsLegales },
];

const lazyPages = [Formations, FAQ, Resources, Diagnostic, APropos, MentionsLegales];

/** Loads every page chunk, for the prerender. */
export const preloadAllPages = () => Promise.all(lazyPages.map((p) => p.preload()));

/** Loads the chunk of the page at `pathname` (router path, base path stripped), if it has one. */
export const preloadPage = async (pathname: string) => {
  const path = pathname.replace(/^\/en(?=\/|$)/, '').replace(/\/$/, '') || '/';
  const Page = routeList.find((r) => r.path === path)?.Page;
  if (Page && 'preload' in Page) await Page.preload();
};

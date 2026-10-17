import { lazy, type ComponentType } from 'react';

type PageModule = { default: ComponentType };

export type LazyPage = ComponentType & { preload: () => Promise<void> };

/**
 * A route component in its own chunk that still hydrates prerendered HTML.
 * React.lazy alone would suspend on the first client render and throw away
 * the server markup, so once preload() has resolved the page renders
 * synchronously. prerender.js preloads every page before rendering, and
 * main.tsx preloads the current route's page before hydrating.
 */
export function lazyPage(load: () => Promise<PageModule>): LazyPage {
  let Loaded: ComponentType | null = null;
  let pending: Promise<void> | null = null;
  const preload = () =>
    (pending ??= load().then((m) => {
      Loaded = m.default;
    }));
  // Client-side navigation to a page not loaded yet suspends until its chunk arrives.
  const Lazy = lazy(() => preload().then(() => ({ default: Loaded! })));

  const Page = () => (Loaded ? <Loaded /> : <Lazy />);
  return Object.assign(Page, { preload });
}

import { useLocation } from 'react-router-dom';

export type Locale = 'fr' | 'en';
export const LOCALES: Locale[] = ['fr', 'en'];
export const DEFAULT_LOCALE: Locale = 'fr';

/** Derive the active locale from a pathname ('/en' or '/en/...' → 'en'). */
export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr';
}

/** Strip any locale prefix to get the canonical (French) path, e.g. '/en/formations' → '/formations'. */
export function canonicalPath(pathname: string): string {
  const stripped = pathname.replace(/^\/en(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

/** Build the path for a canonical route in a given locale. localizePath('/formations', 'en') → '/en/formations'. */
export function localizePath(path: string, locale: Locale): string {
  const clean = canonicalPath(path);
  if (locale === 'en') return clean === '/' ? '/en' : `/en${clean}`;
  return clean;
}

/** Active locale from the router. */
export function useLocale(): Locale {
  return getLocaleFromPath(useLocation().pathname);
}

/**
 * Pick the strings for the active locale from a { fr, en } content object.
 * Usage: const t = useT(CONTENT);
 */
export function useT<T>(content: Record<Locale, T>): T {
  return content[useLocale()];
}

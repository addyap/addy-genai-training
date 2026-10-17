// Served at www.antonyaddy.com/ia: the main site forwards /ia/* to this
// project. BASE_PATH must match `base` in vite.config.ts.
export const BASE_PATH = '/ia';
export const SITE_URL = `https://www.antonyaddy.com${BASE_PATH}`;

/** Absolute URL of a route on this site: '/' → …/ia, '/faq' → …/ia/faq. */
export const siteUrl = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);

/** A file in public/, which is served under the base path. */
export const asset = (file: string) => `${BASE_PATH}${file}`;

// Enquiries go to the main site's protected contact form, preset to the
// "IA générative" subject. Plain <a>, not <Link>: it lives outside /ia.
export const CONTACT_URL = '/contact?sujet=ia';

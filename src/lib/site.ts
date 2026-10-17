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

// The one Antony Addy identity, defined in full by the main site's JSON-LD.
// Reference it by @id (name/url kept for parsers that don't follow @id).
export const PERSON_REF = {
  "@type": "Person",
  "@id": "https://www.antonyaddy.com/#antony-addy",
  "name": "Antony Addy",
  "url": "https://www.antonyaddy.com",
  "sameAs": ["https://www.linkedin.com/in/antonyaddy"],
};
export const BUSINESS_REF = {
  "@type": "ProfessionalService",
  "@id": "https://www.antonyaddy.com/#business",
  "name": "Antony Addy",
  "url": "https://www.antonyaddy.com",
};

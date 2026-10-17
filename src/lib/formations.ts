// The three activities of www.antonyaddy.com, in the hub's order, numbering and
// line colours ("01 · Anglais", "02 · IA générative", "03 · Sites web & outils").
// This site is 02. The other two are plain <a> links: they live outside /ia.

import type { Locale } from '@/i18n';

export interface Formation {
  key: 'anglais' | 'ia' | 'sites';
  number: '01' | '02' | '03';
  label: Record<Locale, string>;
  detail: Record<Locale, string>;
  /** Absolute path on www.antonyaddy.com; '/' for this site's own home. */
  href: string;
  current: boolean;
  /** The activity's line colour on the hub. */
  color: string;
}

export const FORMATIONS: Formation[] = [
  {
    key: 'anglais',
    number: '01',
    label: { fr: 'Anglais professionnel', en: 'Business English' },
    detail: { fr: 'Prenez la parole avec confiance', en: 'Speak up with confidence' },
    href: 'https://www.antonyaddy.com/',
    current: false,
    color: '#BB3C30',
  },
  {
    key: 'ia',
    number: '02',
    label: { fr: 'IA générative', en: 'Generative AI' },
    detail: { fr: 'Faites travailler les outils pour vous', en: 'Make the tools work for you' },
    href: '/',
    current: true,
    color: '#553B9B',
  },
  {
    key: 'sites',
    number: '03',
    label: { fr: 'Sites web & outils', en: 'Websites & tools' },
    detail: { fr: 'Pour votre activité ou pour apprendre', en: 'For your business or for learning' },
    href: 'https://www.antonyaddy.com/sites-web',
    current: false,
    color: '#914F1D',
  },
];
